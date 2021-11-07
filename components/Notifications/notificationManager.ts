import * as Notifications from 'expo-notifications';

export const askPermissions = async () => {
  return await Notifications.requestPermissionsAsync({
    android: {},
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
    },
  });
};

export const scheduleNotification = async () => {
  return await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Look at that notification',
      body: "I'm so proud of myself!",
    },
    trigger: {
      seconds: 10,
    },
  });
};

export const logNotifications = async () => {
  return await Notifications.getAllScheduledNotificationsAsync();
};
