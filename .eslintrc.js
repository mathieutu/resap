module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['airbnb', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint/eslint-plugin'],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    semi: ['error', 'never'],
    indent: 'off',
    'max-len': ['error', { code: 120, ignorePattern: '^\\s*className=' }],
    'import/extensions': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: { delimiter: 'comma', requireLast: true },
      singleline: { delimiter: 'comma', requireLast: false },
    }],
    'no-console': 'error',
    'object-curly-newline': 'off',
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'react/prop-types': 'off',
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/state-in-constructor': ['error', 'never'],
    'arrow-parens': 'off', // Erreur avec les generics de TS.
    'react/destructuring-assignment': 'off',
    'no-restricted-syntax': ['error',
      { selector: 'CallExpression[callee.name=\'dump\']', message: 'Dump expresions are not allowed' },
      { selector: 'CallExpression[callee.name=\'dumpParams\']', message: 'Dump expresions are not allowed' },
    ],
  },
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        semi: ['error', 'always'],
        'global-require': 'off',
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      },
    },
    {
      files: ['pages/**/*'],
      rules: {
        'import/no-default-export': 'off',
        'import/prefer-default-export': 'error',
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.json', '.d.ts', '.ts', '.tsx', '.js'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
