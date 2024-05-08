module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
      },
      'dynamic-import-node',
    ],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
  ],
}
