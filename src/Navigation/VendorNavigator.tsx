import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Vendor Screens
import DashboardScreen from '../Screen/vendor/DashboardScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/** Dashboard Stack */
const DashboardStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

/** Products Stack */
const ProductsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Products"
        component={DashboardScreen} // Replace with ProductsScreen
        options={{ title: 'My Products' }}
      />
      <Stack.Screen
        name="AddProduct"
        component={DashboardScreen} // Replace with AddProductScreen
        options={{ title: 'Add New Product' }}
      />
      <Stack.Screen
        name="EditProduct"
        component={DashboardScreen} // Replace with EditProductScreen
        options={{ title: 'Edit Product' }}
      />
    </Stack.Navigator>
  );
};

/** Orders Stack */
const OrdersStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VendorOrders"
        component={DashboardScreen} // Replace with OrdersScreen
        options={{ title: 'Orders' }}
      />
      <Stack.Screen
        name="OrderDetail"
        component={DashboardScreen} // Replace with OrderDetailScreen
        options={{ title: 'Order Details' }}
      />
    </Stack.Navigator>
  );
};

/** Profile Stack */
const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VendorProfile"
        component={DashboardScreen} // Replace with ProfileScreen
        options={{ title: 'Business Profile' }}
      />
    </Stack.Navigator>
  );
};

/** Bottom Tab Navigator */
const VendorNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'circle-outline'; // Fallback icon

          if (route.name === 'DashboardTab') {
            iconName = focused
              ? 'view-dashboard'
              : 'view-dashboard-outline';
          } else if (route.name === 'ProductsTab') {
            iconName = focused
              ? 'package-variant-closed'
              : 'package-variant-closed';
          } else if (route.name === 'OrdersTab') {
            iconName = focused
              ? 'clipboard-list'
              : 'clipboard-list-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'store' : 'store-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="DashboardTab"
        component={DashboardStack}
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen
        name="ProductsTab"
        component={ProductsStack}
        options={{ title: 'Products' }}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrdersStack}
        options={{ title: 'Orders' }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default VendorNavigator;
