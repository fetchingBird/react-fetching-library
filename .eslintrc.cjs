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
    'import/prefer-default-export': 'off',
    'no-useless-return': 'off', //return 시 에러나지 않게 변경
    '@typescript-eslint/no-explicit-any': 'off', // any타입 수용하게 변경 (추후 삭제해야함)
  },
};
