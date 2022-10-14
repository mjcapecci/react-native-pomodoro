import * as Notifications from 'expo-notifications'

export const askPermissions = async (): Promise<Notifications.NotificationPermissionsStatus> => {
  return await Notifications.requestPermissionsAsync({
    android: {},
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
    },
  })
}

export const scheduleNotification = async (seconds: number): Promise<string> => {
  return await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Look at that notification',
      body: 'I am so proud of myself!',
      sound: 'pomo-marimba.mp3',
    },
    trigger: {
      seconds,
    },
  })
}

export const cancelAllNotifications = async (): Promise<void> => {
  return await Notifications.cancelAllScheduledNotificationsAsync()
}

export const getNotifications = async (): Promise<Notifications.NotificationRequest[]> => {
  return await Notifications.getAllScheduledNotificationsAsync()
}
