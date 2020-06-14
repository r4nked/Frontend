module.exports = {
  plugins: ['chai-expect', 'chai-friendly', 'mocha'],

  env: {
    mocha: true
  },
  extends: [
    'plugin:chai-expect/recommended',
    'plugin:chai-friendly/recommended',
    'plugin:mocha/recommended'
  ],
  rules: {
    strict: 'off',
    'mocha/max-top-level-suites': 'off',
    'mocha/no-hooks-for-single-case': 'off',
    'mocha/no-mocha-arrows': 'off',
    'mocha/no-pending-tests': 'off'
  }
}
