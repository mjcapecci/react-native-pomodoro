import * as Notifications from 'expo-notifications'
import { NotificationPermissionsStatus } from 'expo-notifications'

export const askPermissions = async (): Promise<NotificationPermissionsStatus> => {
  return await Notifications.requestPermissionsAsync({
    android: {},
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
    },
  })
}

export const scheduleNotification = async (seconds: number, roundType: string): Promise<string> => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  })

  let pendingContent

  switch (roundType) {
    case 'work':
      pendingContent = {
        title: 'Work Round Over',
        body: 'Good work! Time for a break.',
        sound: 'default',
      }
      break
    case 'short_break':
      pendingContent = {
        title: 'Break Round Over',
        body: 'Break Over! Time to get back to work.',
        sound: 'default',
      }
      break
    case 'long_break':
      pendingContent = {
        title: 'Long Break Round Over',
        body: 'Long Break Over! Time to get back to work.',
        sound: 'default',
      }
      break
    default:
      pendingContent = {}
      break
  }

  return await Notifications.scheduleNotificationAsync({
    content: pendingContent,
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
