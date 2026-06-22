module.exports = [
  {
    ignores: ['.next/**', 'node_modules/**', 'generated/**'],
  },
  {
    rules: {
      'no-unused-vars': 'error',
      'prefer-const': 'error',
    },
  },
];