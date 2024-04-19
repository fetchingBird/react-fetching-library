module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'prettier',
    'prettier/prettier',
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    '.lintstagedrc.cjs',
    'commitlint.config.cjs',
    'jest.config.js',
    'vite.config.js',
    'vitest.setup.js',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 'off',
  },
};
