import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import Constants from 'expo-constants';
import Ionicons from '@expo/vector-icons/Ionicons';

import Timer from './components/Timer';
import Stats from './components/Stats';
import DevTools from './components/DevTools';

import createTable from './data_layer/createTable';

const App = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const enableDevTools = Constants?.manifest?.extra?.enableDevTools;

  useEffect(() => {
    createTable();
  }, []);

  return (
    <NativeBaseProvider>
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
    </NativeBaseProvider>
  );
};

export default App;
