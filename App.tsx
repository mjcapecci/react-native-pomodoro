import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

import Timer from './components/Timer';
import Profile from './components/Profile';

const App = () => {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name='Timer'
          component={Timer}
          options={{
            tabBarLabelPosition: 'beside-icon',
            tabBarIcon: () => <Ionicons name='timer-outline' size={22} />,
          }}
        />
        <Tab.Screen
          name='Profile'
          component={Profile}
          options={{
            tabBarLabelPosition: 'beside-icon',
            tabBarIcon: () => (
              <Ionicons name='person-circle-outline' size={22} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
