import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import MediaScreen from './screens/MediaScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Главная' }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Детали' }} />
        <Stack.Screen name="Media" component={MediaScreen} options={{ title: 'Мультимедиа' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
