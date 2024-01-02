module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: { browser: true, es2020: true, node: true },
  extends: [
    '@feature-sliced',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  plugins: ['@typescript-eslint', 'prettier', 'import', 'react', 'react-hooks', 'react-refresh'],
  'parserOptions': {
    'ecmaVersion': 2022,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
    },
  },
  rules: {
    'no-console': 'warn',
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'error',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/order': [
      2,
      {
        pathGroups: [
          'app',
          'processes',
          'pages',
          'widgets',
          'features',
          'entities',
          'shared',
        ].map(
          (layer) => ({
            pattern: `**/?(*)${layer}{,/**}`,
            group: 'internal',
          }),
        ),
        pathGroupsExcludedImportTypes: ['builtin'],
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
      },
    ],
  },
}
