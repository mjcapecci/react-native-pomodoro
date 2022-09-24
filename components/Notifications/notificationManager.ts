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

export const scheduleNotification = async (
  seconds: number,
  roundType: string
) => {
  let pendingContent;

  switch (roundType) {
    case 'work':
      pendingContent = {
        title: 'work round over',
        body: 'Good job',
      };
      break;
    case 'short_break':
      pendingContent = {
        title: 'work round over',
        body: 'Break Over!',
      };
      break;
    case 'long_break':
      pendingContent = {
        title: 'break round over',
        body: 'Good job',
      };
      break;
    default:
      pendingContent = {};
      break;
  }

  return await Notifications.scheduleNotificationAsync({
    content: pendingContent,
    trigger: {
      seconds,
    },
  });
};

export const cancelAllNotifications = async () => {
  return await Notifications.cancelAllScheduledNotificationsAsync();
};

export const getNotifications = async () => {
  return await Notifications.getAllScheduledNotificationsAsync();
};
