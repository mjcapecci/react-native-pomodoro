export default {
  name: 'Simple Pomodoro',
  version: '0.1',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#000000',
  },
  extra: {
    enableDevTools: false,
    environment: 'development',
    eas: {
      projectId: '0d00ccaf-7ed8-4649-ae23-7a1ae775efe9',
    },
  },
  ios: {
    bundleIdentifier: 'com.michaelcapecci.simplepomodoro',
  },
  android: {
    package: 'com.michaelcapecci.simplepomodoro',
  },
}
