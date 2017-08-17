module.exports = {
  root: true,
  extends: 'airbnb-base',
  plugins: ['jest'],
  env: {
    'jest/globals': true,
  },
  rules: {
    'import/prefer-default-export': 'off',
  },
};
