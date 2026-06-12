import antfu from '@antfu/eslint-config'
import tailwind from 'eslint-plugin-better-tailwindcss'

export default antfu({
  formatters: true,
  react: true,
  nextjs: true,
  ignores: [
    'src/types/contentful.d.ts',
    'next-env.d.ts',
    '.next/**',
    'out/**',
    'build/**',
    'public/**',
  ],
}, {
  ...tailwind.configs.recommended,
  settings: {
    [tailwind.meta.name]: {
      entryPoint: 'src/assets/styles.css',
    },
  },
}, {
  rules: {
    'antfu/top-level-function': 'off',
    'antfu/if-newline': 'off',
    'ts/consistent-type-definitions': ['error', 'type'],
    'style/max-len': ['warn', { code: 120, ignoreComments: true, ignoreTemplateLiterals: true, ignoreStrings: true, ignoreRegExpLiterals: true }],
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    'style/operator-linebreak': ['error', 'before', { overrides: { '=': 'after' } }],
    'style/no-extra-parens': 'off',
    'style/brace-style': ['error', '1tbs'],
    'style/multiline-ternary': 'off',
    'style/arrow-parens': ['error', 'as-needed'],
    'style/type-generic-spacing': 'off',
    'style/member-delimiter-style': ['error', {
      multiline: { delimiter: 'comma', requireLast: true },
      singleline: { delimiter: 'comma', requireLast: false },
      multilineDetection: 'brackets',
    }],

    'no-console': 'error',
    'node/prefer-global/process': 'off',

    'no-restricted-syntax': ['error', {
      selector: 'CallExpression[callee.name=\'dump\']',
      message: 'Dump expressions are not allowed',
    }, {
      selector: 'CallExpression[callee.name=\'dumpParams\']',
      message: 'Dump expressions are not allowed',
    }],

    'import/no-default-export': 'error',

    // '@next/next/no-img-element': 'off',
  },
}, {
  files: ['**/*.ts', '**/*.tsx'],
  rules: {
    'ts/consistent-type-imports': ['error', { prefer: 'type-imports', fixStyle: 'inline-type-imports' }],
  },
}, {
  files: ['src/app/**/*.tsx', '*.config.*'],
  rules: {
    'import/no-default-export': 'off',
  },
}, {
  files: ['**/*.md'],
  rules: {
    'style/max-len': 'off',
  },
})
