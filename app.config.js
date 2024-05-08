export default {
  name: 'Simply Pomodoro',
  slug: 'simply-pomodoro',
  version: '1.1.0',
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
      projectId: 'dff0a63d-f17e-4a2d-bedb-edb8f808321b',
    },
  },
  ios: {
    bundleIdentifier: 'com.michaelcapecci.simplypomodoro',
  },
  android: {
    package: 'com.michaelcapecci.simplepomodoro',
  },
  owner: 'mjcapecci',
}
