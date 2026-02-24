import { defineConfig } from 'eslint';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default defineConfig({
  ignores: ['dist/', 'node_modules/'],
  ...eslint.configs.recommended,
  ...tseslint.configs.recommended,
  extends: [
    ...(eslint.configs.recommended && Array.isArray(eslint.configs.recommended)
      ? eslint.configs.recommended
      : []),
    ...(tseslint.configs.recommended && Array.isArray(tseslint.configs.recommended)
      ? tseslint.configs.recommended
      : []),
    'eslint-config-prettier',
  ],
  languageOptions: {
    ecmaVersion: 'latest',
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-console': 'off',
    'prefer-const': 'error',
    'arrow-spacing': ['warn', { before: true, after: true }],
    'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': 'error',
    'comma-style': 'error',
    curly: ['error', 'multi-line', 'consistent'],
    'dot-location': ['error', 'property'],
    'handle-callback-err': 'off',
    indent: ['error', 'tab'],
    'keyword-spacing': 'error',
    'max-nested-callbacks': ['error', { max: 4 }],
    'max-statements-per-line': ['error', { max: 2 }],
    'no-empty-function': 'error',
    'no-floating-decimal': 'error',
    'no-inline-comments': 'error',
    'no-lonely-if': 'error',
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1, maxBOF: 0 }],
    'no-shadow': ['error', { allow: ['err', 'resolve', 'reject'] }],
    'no-trailing-spaces': ['error'],
    'no-var': 'error',
    'no-undef': 'off',
    'object-curly-spacing': ['error', 'always'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'space-before-blocks': 'error',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'space-in-parens': 'error',
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'spaced-comment': 'error',
    yoda: 'error',
  },
});
