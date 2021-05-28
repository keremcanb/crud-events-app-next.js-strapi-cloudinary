module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-typescript', 'prettier'],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'no-console': 0,
    'react/button-has-type': 0,
    'react/react-in-jsx-scope': 0,
    'react/require-default-props': 0,
    'react/jsx-props-no-spreading': 0,
    'react/no-unescaped-entities': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/label-has-associated-control': 0
  }
};
