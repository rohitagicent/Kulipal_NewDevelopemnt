import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RestaurantDetailScreen from '../Screen/RestaurantDetailScreen'; // Assuming it's here
import HomeScreen from '../../../FoodModule/FoodHomeScreen'; // Assuming it's here

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }} // or customize
        />
        <Stack.Screen
          name="RestaurantDetail"
          component={RestaurantDetailScreen}
          options={{
            title: 'Restaurant Details',
            animation: 'slide_from_right', // smooth navigation
            headerShown: false 
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
