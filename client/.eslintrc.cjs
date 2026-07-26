module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: [
    'react',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: [
    'dist/',
    'coverage/',
    'node_modules/',
  ],
  rules: {
    'react/jsx-uses-vars': 'error',
    'no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_',
      varsIgnorePattern: '^React$',
    }],
  },
  overrides: [
    {
      files: ['src/**/*.test.{js,jsx}', 'src/__tests__/**/*.{js,jsx}', 'src/test-utils/**/*.{js,jsx}'],
      env: {
        jest: true,
      },
      globals: {
        vi: 'readonly',
      },
    },
  ],
}
