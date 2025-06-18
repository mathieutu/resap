import { FlatCompat } from '@eslint/eslintrc';
import { globalIgnores } from 'eslint/config';

const compat = new FlatCompat();

const eslintConfig = [
  globalIgnores(['src/types/contentful.d.ts', '.next', 'public']),
  ...compat.extends('airbnb', 'next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/ban-ts-ignore': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',

      '@typescript-eslint/no-unused-vars': ['error', {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/prefer-interface': 'off',
      '@next/next/no-img-element': 'off',
      'arrow-parens': 'off',
      'import/extensions': 'off',
      'import/no-default-export': 'error',
      'import/prefer-default-export': 'off',
      'import/no-anonymous-default-export': 'off',
      'jsx-a11y/anchor-is-valid': 'off',

      'jsx-a11y/label-has-associated-control': ['error', {
        labelComponents: [],
        labelAttributes: [],
        controlComponents: [],
        assert: 'either',
        depth: 25,
      }],

      'max-len': 'off',
      'no-console': 'error',

      'no-restricted-syntax': ['error', {
        selector: "CallExpression[callee.name='dump']",
        message: 'Dump expressions are not allowed',
      }, {
        selector: "CallExpression[callee.name='dumpParams']",
        message: 'Dump expressions are not allowed',
      }],

      'object-curly-newline': 'off',

      'react/destructuring-assignment': 'off',
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
      'react/jsx-one-expression-per-line': 'off',
      'react/jsx-props-no-spreading': 'off',

      'react/require-default-props': 'off',
      'react/function-component-definition': ['off'],

      'spaced-comment': ['error', 'always', {
        markers: ['/'],
      }],

      indent: 'off',
      semi: ['error', 'never'],
      'consistent-return': 'off',
    },
  },
  {
    files: ['src/pages/**/*', '**/*.mjs'],

    rules: {
      'import/no-default-export': 'off',
      'import/prefer-default-export': 'error',
    },
  },
  {
    files: ['**/*.?(m)js'],
    rules: {
      semi: ['error', 'always'],
      'import/no-extraneous-dependencies': ['error', {
        devDependencies: true,
      }],
    },
  },
  {
    files: ['**/*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'global-require': 'off',
    },
  },
  {
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.json', '.d.ts', '.ts', '.tsx', '.js'],
          moduleDirectory: ['node_modules', 'src/'],
        },
      },
    },
  },
];

export default eslintConfig;
