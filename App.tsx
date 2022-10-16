import React, { useEffect, useMemo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DarkTheme, NavigationContainer } from '@react-navigation/native'
import { Provider as PaperProvider } from 'react-native-paper'
import Constants from 'expo-constants'
import Ionicons from '@expo/vector-icons/Ionicons'

import Timer from './components/Timer'
import Stats from './components/Stats'
import DevTools from './components/DevTools'

import createTable from './data_layer/createTable'

import * as Notifications from 'expo-notifications'
import {
  askPermissions,
  cancelAllNotifications,
  getNotifications,
} from './components/Notifications/notificationManager'
import { TimerContextProvider } from './components/Timer/TimerContextProvider'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

// Create a client
const queryClient = new QueryClient()

const App = (): JSX.Element => {
  const Tab = createBottomTabNavigator()
  const enableDevTools = Constants?.manifest?.extra?.enableDevTools

  useEffect(() => {
    async function initializeSQLite(): Promise<void> {
      return await createTable()
    }

    initializeSQLite().catch((err) => console.log(err))
  }, [])

  // get initial notification permissions if not exist
  useEffect(() => {
    async function getInitialPermissions(): Promise<Notifications.NotificationPermissionsStatus> {
      return await askPermissions()
    }

    getInitialPermissions().catch((err) => console.log(err))
  })

  // deletes existing notifications if any exist after full recycle of app
  useMemo(() => {
    void (async () => {
      const notifications = await getNotifications()
      if (notifications.length !== 0) {
        console.log('Notifications Canceled')
        void cancelAllNotifications()
      }
    })()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <TimerContextProvider>
          <NavigationContainer theme={DarkTheme}>
            <Tab.Navigator screenOptions={{ headerShown: false }}>
              <Tab.Screen
                name='Timer'
                component={Timer}
                options={{
                  tabBarLabelPosition: 'beside-icon',
                  tabBarIcon: () => <Ionicons name='timer-outline' size={22} color='white' />,
                }}
              />
              <Tab.Screen
                name='Stats'
                component={Stats}
                options={{
                  tabBarLabelPosition: 'beside-icon',
                  tabBarIcon: () => <Ionicons name='stats-chart' size={22} color='white' />,
                }}
              />
              {Boolean(enableDevTools) && (
                <Tab.Screen
                  name='Tools'
                  component={DevTools}
                  options={{
                    tabBarLabelPosition: 'beside-icon',
                    tabBarIcon: () => <Ionicons name='code-outline' size={22} color='white' />,
                  }}
                />
              )}
            </Tab.Navigator>
          </NavigationContainer>
        </TimerContextProvider>
      </PaperProvider>
    </QueryClientProvider>
  )
}

export default App
