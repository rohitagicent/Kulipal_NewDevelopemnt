import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import HomeScreen from '../FoodModule/FoodHomeScreen';
import RestaurantDetailScreen from '../FoodModule/RestaurantDetailScreen';

export type RootStackParamList = {
  Home: undefined;
  RestaurantDetail:
    | {
        restaurantId: string;
      }
    | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RestaurantDetail"
          component={RestaurantDetailScreen}
          options={
            {
              title: 'Restaurant Details',
              animation: 'slide_from_right',
              headerShown: false,
            } as NativeStackNavigationOptions
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
