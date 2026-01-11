import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  prettierConfig,
  {
    ignores: ['dist/**', 'dist-cjs/**', 'node_modules/**', 'storybook-static/**'],
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      'import': importPlugin,
      'prettier': prettierPlugin,
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        JSX: true,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      // React rules
      'react/function-component-definition': ['error', {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      }],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/require-default-props': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-tag-spacing': ['error', {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never',
      }],

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // TypeScript rules
      '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true }],
      '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true, args: 'none' }],

      // General code quality
      'object-curly-spacing': ['error', 'always'],
      'comma-dangle': ['warn', 'always-multiline'],
      'no-undef': 'error',
      'space-infix-ops': ['error', { int32Hint: false }],
      'max-len': ['error', 180, 2, { ignoreTemplateLiterals: true }],
      'curly': [2, 'all'],
      'no-octal': 'error',
      'no-eval': 'error',
      'no-invalid-this': 'off',
      'prefer-rest-params': 'off',
      'prefer-spread': 'off',
      'no-multi-spaces': ['error', { ignoreEOLComments: true }],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-global-assign': 'error',
      'quotes': ['error', 'single'],
      'jsx-quotes': ['error', 'prefer-double'],
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'camelcase': ['error', { properties: 'never', ignoreDestructuring: true }],
      'func-call-spacing': ['error', 'never'],
      'no-array-constructor': 'error',
      'semi': ['error', 'always'],
      'semi-spacing': ['error', { before: false, after: true }],
      'semi-style': ['error', 'last'],
      'no-extra-semi': 'error',
      'eqeqeq': ['error', 'always', { null: 'ignore' }],
      'block-spacing': ['error', 'always'],
      'no-shadow': 'error',
      'no-unreachable': 'error',
      'no-unsafe-negation': 'error',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'indent': ['error', 2, { SwitchCase: 1 }],
      'arrow-body-style': 'off',

      // Import rules
      'import/no-duplicates': 'error',
      'import/order': 'off',
      'import/prefer-default-export': 'off',

      // Simple import sort
      'simple-import-sort/imports': ['error', {
        groups: [
          // Packages `react` related packages come first and styles after
          ['^react', '^redux', '^.+\\.?(css)$'],
          // Components types, enums
          ['^(types|enums|configs|hooks|helpers)(/.*|$)'],
          ['^@?\\w'],
          // Imported icons
          ['^.+\\.?(svg)$'],
          // Absolute components
          // Parent imports. Put `..` last.
          // Other relative imports. Put same-folder imports and `.` last.
          ['^components(/.*|$)', '^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
        ],
      }],
      'simple-import-sort/exports': 'error',

      // Accessibility
      'jsx-a11y/label-has-associated-control': 'off', // This rule not for libs, because we use such thing as Visually Hidden components
    },
  },
  {
    files: ['**/icons/**/*.tsx'],
    rules: {
      'max-len': 'off',
    },
  },
);
