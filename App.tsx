import React, { useEffect, useMemo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DarkTheme, NavigationContainer } from '@react-navigation/native'
import { Provider as PaperProvider, DarkTheme as DefaultTheme } from 'react-native-paper'
import * as ScreenOrientation from 'expo-screen-orientation'
import { ToastProvider } from 'react-native-toast-notifications'
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
import { AppContextProvider } from './components/General/AppContextProvider'
import VersionModal from './components/General/VersionModal'
import Info from './components/Info'

void ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)

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

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#616161',
    },
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <PaperProvider theme={theme}>
          <ToastProvider offset={50}>
            <TimerContextProvider>
              <>
                <NavigationContainer theme={DarkTheme}>
                  <Tab.Navigator screenOptions={{ headerShown: true }}>
                    <Tab.Screen
                      name='Timer'
                      component={Timer}
                      options={{
                        tabBarShowLabel: false,
                        tabBarActiveTintColor: 'gold',
                        tabBarIcon: ({ focused, color }) => (
                          <Ionicons
                            focused={focused}
                            name='timer-outline'
                            size={22}
                            color={focused ? color : 'white'}
                          />
                        ),
                      }}
                    />
                    <Tab.Screen
                      name='Stats'
                      component={Stats}
                      options={{
                        tabBarShowLabel: false,
                        tabBarActiveTintColor: 'gold',
                        tabBarIcon: ({ focused, color }) => (
                          <Ionicons
                            focused={focused}
                            name='stats-chart'
                            size={22}
                            color={focused ? color : 'white'}
                          />
                        ),
                      }}
                    />
                    <Tab.Screen
                      name='Help'
                      component={Info}
                      options={{
                        tabBarShowLabel: false,
                        tabBarActiveTintColor: 'gold',
                        title: 'Info',
                        tabBarIcon: ({ focused, color }) => (
                          <Ionicons
                            focused={focused}
                            name='information-circle'
                            size={22}
                            color={focused ? color : 'white'}
                          />
                        ),
                      }}
                    />
                    {Boolean(enableDevTools) && (
                      <Tab.Screen
                        name='Tools'
                        component={DevTools}
                        options={{
                          tabBarShowLabel: false,
                          tabBarActiveTintColor: 'gold',
                          tabBarIcon: ({ focused, color }) => (
                            <Ionicons
                              focused={focused}
                              name='code-outline'
                              size={22}
                              color={focused ? color : 'white'}
                            />
                          ),
                        }}
                      />
                    )}
                  </Tab.Navigator>
                </NavigationContainer>
                <VersionModal />
              </>
            </TimerContextProvider>
          </ToastProvider>
        </PaperProvider>
      </AppContextProvider>
    </QueryClientProvider>
  )
}

export default App
