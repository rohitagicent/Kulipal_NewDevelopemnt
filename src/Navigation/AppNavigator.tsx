import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../Screen/common/SplashScreen';
import UserTypeSelectionScreen from '../Screen/common/UserTypeSelectionScreen';
import AuthNavigator from './AuthNavigator';
import CustomerNavigator from './CustomerNavigator';
import VendorNavigator from './VendorNavigator';
import { setAuthToken, setUserType } from '../store/authActions';
import KulipalBusinessScreen from '../Screen/auth/KulipalBusinessScreen';
import LoginScreenVendor from '../Screen/vendor/OnboardingScreen/LoginScreenVendor';
import SimplifiedOnboarding from '../Screen/vendor/OnboardingScreen/SignUpvendor';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const dispatch = useDispatch();
  const { userType, token } = useSelector(state => state.auth);

  const [showSplash, setShowSplash] = useState(true); // <-- Local splash state

  useEffect(() => {
    // Wait for 3 seconds then hide splash
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1000);

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Check for stored user type and token
    const bootstrapAsync = async () => {
      try {
        const storedUserType = await AsyncStorage.getItem('userType');
        const storedToken = await AsyncStorage.getItem('authToken');

        if (storedUserType) {
          dispatch(setUserType(storedUserType));
        }

        if (storedToken) {
          dispatch(setAuthToken(storedToken));
        }
      } catch (error) {
        console.log('Error retrieving data', error);
      }
    };

    bootstrapAsync();
  }, [dispatch]);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {/* {!userType ? (
        // No user type selected yet
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="UserTypeSelection" component={UserTypeSelectionScreen} />
          <Stack.Screen name="KulipalBusinessScreen" component={KulipalBusinessScreen}  />
          <Stack.Screen name="LoginScreenVendor" component={LoginScreenVendor}  />
          <Stack.Screen name="SignUpVendor" component={SimplifiedOnboarding}  />

        </Stack.Navigator>
      ) : !token ? (
        // User type selected but not authenticated
        <AuthNavigator />
      ) : userType === 'customer' ? (
        // Authenticated customer
        <CustomerNavigator />
      ) : (
        // Authenticated vendor
        <VendorNavigator />
      )} */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
  {!userType ? (
    <>
      <Stack.Screen name="UserTypeSelection" component={UserTypeSelectionScreen} />
      <Stack.Screen name="KulipalBusinessScreen" component={KulipalBusinessScreen} />
      <Stack.Screen name="LoginScreenVendor" component={LoginScreenVendor} />
      <Stack.Screen name="SignUpVendor" component={SimplifiedOnboarding} />
    </>
  ) : userType === 'customer' ? (
    <Stack.Screen name="CustomerNavigator" component={CustomerNavigator} />
  ) : (
    <Stack.Screen name="VendorNavigator" component={VendorNavigator} />
  )}
</Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
