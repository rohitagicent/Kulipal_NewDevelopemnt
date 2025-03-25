import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RouteProp } from '@react-navigation/native';

// Customer Screens
import HomeScreen from '../Screen/customer/HomeScreen';
import HomeScreenFood from '../FoodModule/FoodHomeScreen';
import RestaurantDetailScreen from '../FoodModule/RestaurantDetailScreen';

/** Define types for stack params */
type HomeStackParamList = {
  Home: undefined;
  ProductDetails: undefined;
  Categories: undefined;
};

type CartStackParamList = {
  Cart: undefined;
  Checkout: undefined;
};

type OrdersStackParamList = {
  Orders: undefined;
};

type ProfileStackParamList = {
  Profile: undefined;
};

type TabParamList = {
  HomeTab: undefined;
  CartTab: undefined;
  OrdersTab: undefined;
  ProfileTab: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const HomeStack = createStackNavigator<HomeStackParamList>();
const CartStack = createStackNavigator<CartStackParamList>();
const OrdersStack = createStackNavigator<OrdersStackParamList>();
const ProfileStack = createStackNavigator<ProfileStackParamList>();

// Home Stack
const HomeStackScreen: React.FC = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreenFood} options={{ headerShown: false }} />
      <HomeStack.Screen name="ProductDetails" component={HomeScreen} options={{ title: 'Product Details' }} />
      <HomeStack.Screen name="Categories" component={HomeScreen} options={{ title: 'Categories' }} />
      <HomeStack.Screen name="RestaurantDetail" component={RestaurantDetailScreen} options={{ title: 'Restaurant Details',headerShown:false }} />

    </HomeStack.Navigator>
  );
};

// Cart Stack
const CartStackScreen: React.FC = () => {
  return (
    <CartStack.Navigator>
      <CartStack.Screen name="Cart" component={HomeScreen} options={{ title: 'My Cart' }} />
      <CartStack.Screen name="Checkout" component={HomeScreen} options={{ title: 'Checkout' }} />
    </CartStack.Navigator>
  );
};

// Orders Stack
const OrdersStackScreen: React.FC = () => {
  return (
    <OrdersStack.Navigator>
      <OrdersStack.Screen name="Orders" component={HomeScreen} options={{ title: 'My Orders' }} />
    </OrdersStack.Navigator>
  );
};

// Profile Stack
const ProfileStackScreen: React.FC = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={HomeScreen} options={{ title: 'My Profile' }} />
    </ProfileStack.Navigator>
  );
};

const CustomerNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({
        route,
      }: {
        route: RouteProp<TabParamList, keyof TabParamList>;
      }) => ({
        tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => {
          let iconName: string = '';

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'CartTab') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'OrdersTab') {
            iconName = focused ? 'clipboard-list' : 'clipboard-list-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'account' : 'account-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FE5F55',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStackScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="CartTab" component={CartStackScreen} options={{ title: 'Cart' }} />
      <Tab.Screen name="OrdersTab" component={OrdersStackScreen} options={{ title: 'Orders' }} />
      <Tab.Screen name="ProfileTab" component={ProfileStackScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
};

export default CustomerNavigator;
