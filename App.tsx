import React, { useEffect, useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import Constants from 'expo-constants';
import Ionicons from '@expo/vector-icons/Ionicons';

import Timer from './components/Timer';
import Stats from './components/Stats';
import DevTools from './components/DevTools';

import createTable from './data_layer/createTable';

import * as Notifications from 'expo-notifications';
import {
  askPermissions,
  cancelAllNotifications,
  getNotifications,
} from './components/Notifications/notificationManager';
import { TimerContextProvider } from './components/Timer/TimerContextProvider';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const Tab = createBottomTabNavigator();
  const enableDevTools = Constants?.manifest?.extra?.enableDevTools;

  useEffect(() => {
    createTable();
  }, []);

  // get initial notification permissions if not exist
  useEffect(() => {
    async function getInitialPermissions() {
      await askPermissions();
    }

    getInitialPermissions();
  });

  // deletes existing notifications if any exist after full recycle of app
  useMemo(() => {
    (async () => {
      const notifications = await getNotifications();
      if (notifications.length !== 0) {
        console.log('Notifications Canceled');
        cancelAllNotifications();
      }
    })();
  }, []);

  return (
    <PaperProvider>
      <TimerContextProvider>
        <NavigationContainer theme={DarkTheme}>
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
              name='Timer'
              component={Timer}
              options={{
                tabBarLabelPosition: 'beside-icon',
                tabBarIcon: () => (
                  <Ionicons name='timer-outline' size={22} color='white' />
                ),
              }}
            />
            <Tab.Screen
              name='Stats'
              component={Stats}
              options={{
                tabBarLabelPosition: 'beside-icon',
                tabBarIcon: () => (
                  <Ionicons name='stats-chart' size={22} color='white' />
                ),
              }}
            />
            {enableDevTools && (
              <Tab.Screen
                name='Tools'
                component={DevTools}
                options={{
                  tabBarLabelPosition: 'beside-icon',
                  tabBarIcon: () => <Ionicons name='code-outline' size={22} />,
                }}
              />
            )}
          </Tab.Navigator>
        </NavigationContainer>
      </TimerContextProvider>
    </PaperProvider>
  );
};

export default App;
