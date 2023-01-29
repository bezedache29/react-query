module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  plugins: ['prettier'],
  globals: {
    __DEV__: true,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'avoid',
        bracketSameLine: true,
        singleQuote: true,
        trailingComma: 'all',
        endOfLine: 'auto',
        semi: false,
      },
      {
        usePrettierrc: false,
      },
    ],
  },
}
