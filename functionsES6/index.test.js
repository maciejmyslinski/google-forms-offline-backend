import request from 'supertest';
import { api } from './';

const savingToTheDatabaseMock = jest.fn();

function mockAdmin() {
  return {
    initializeApp: jest.fn(),
    database: jest.fn(() => ({
      ref: jest.fn(() => ({
        child: jest.fn(() => ({
          set: savingToTheDatabaseMock,
        })),
      })),
    })),
  };
}

function mockFunctions() {
  const original = require.requireActual('firebase-functions');
  return {
    ...original,
    config: jest.fn(() => ({
      firebase: {
        databaseURL: 'https://not-a-project.firebaseio.com',
        storageBucket: 'not-a-project.appspot.com',
        cretendial: jest.fn(() => ({
          getAccessToken: jest.fn(() => ({
            access_token: 'some-access-token',
            expires_in: '3000',
          })),
        })),
      },
    })),
  };
}

jest.mock('firebase-admin', () => mockAdmin());
jest.mock('firebase-functions', () => mockFunctions());

describe('adding form description', async () => {
  const ENDPOINT_URL = '/form-description';
  it('should return 400 when there is no form id', async () => {
    const requestBody = { no: 'id field' };
    const response = await request(api).post(ENDPOINT_URL).send(requestBody);
    expect(response.statusCode).toBe(400);
  });
  it('should save form description', async () => {
    const requestBody = {
      id: 123,
      another: 'form info',
    };
    const response = await request(api).post(ENDPOINT_URL).send(requestBody);
    expect(response.statusCode).toBe(200);
    expect(savingToTheDatabaseMock).toBeCalledWith(requestBody);
  });
});
