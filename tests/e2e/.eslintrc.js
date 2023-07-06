module.exports = {
  plugins: [
    'cypress'
  ],
  env: {
    'cypress/globals': true
  },
  rules: {
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    strict: 'off'
  },
  extends: [
    'plugin:cypress/recommended'
  ],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parserOptions: {
        project: './tests/e2e/tsconfig.json'
      }
    }
  ]
}
