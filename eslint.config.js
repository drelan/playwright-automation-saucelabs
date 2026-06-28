// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const { defineConfig, globalIgnores } = require('eslint/config');

module.exports = defineConfig([
  // Don't lint build output, deps, generated artifacts, or this config file.
  globalIgnores([
    'dist/**',
    'node_modules/**',
    'reports/**',
    'test-results/**',
    'eslint.config.js',
  ]),

  // Base JS + TypeScript recommended rule sets.
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // Project-specific tweaks.
  {
    rules: {
      // Allow unused args/vars when prefixed with "_" (e.g. unused fixture params).
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
]);
