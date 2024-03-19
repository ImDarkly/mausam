/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['sznm/react', 'plugin:react/jsx-runtime'],
  rules: {
    'no-console': [
      'error',
      {
        allow: ['info', 'warn', 'error'],
      },
    ],
    'react/prop-types': 'off',
    'react/no-unstable-nested-components': 'off',
  },
};
