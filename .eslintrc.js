module.exports = {
  env: {
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'eslint:recommended',
    'prettier',
  ],
  globals: {
    JSX: true,
  },
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    camelcase: 'error',
    'spaced-comment': 'error',
    quotes: ['error', 'single'],
    'import/no-duplicates': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
}
