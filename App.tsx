import * as React from 'react';
import { View, Text } from 'react-native';
import { createStaticNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/Authentication/Login';
import Home from './src/Home/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}  options={{ headerShown: false, gestureEnabled: false}}/>
        <Stack.Screen name="Home" component={Home}  options={{ headerShown: false, gestureEnabled: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}