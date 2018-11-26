module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
  },
  extends: 'airbnb',
  globals: {
    document: true,
    window: true,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['./src'],
      },
    },
  },
  rules: {
    'no-console': 0,
    'max-len': 0,
    'object-curly-newline': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/no-did-update-set-state': 0,
    'global-require': 0,
  },
};
