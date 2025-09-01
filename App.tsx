import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './src/Authentication/Onboarding';
import LoginScreen from './src/Authentication/LoginScreen';
import HomeScreen from './src/Home/HomeScreen';
import { Provider } from 'react-redux';
import { store } from './src/Redux/Store';
import RegisterScreen from './src/Authentication/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false, gestureEnabled: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}