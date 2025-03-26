import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

// Auth screens
import LoginScreen from '../Screen/auth/LoginScreen';
import DashboardScreen from '../Screen/vendor/DashboardScreen';
import KulipalBusinessScreen from '../Screen/auth/KulipalBusinessScreen'; // Imported but not used. Review if needed.

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  VendorOnboarding: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// Define RootState based on your redux store structure
interface RootState {
  auth: {
    userType: string;
  };
}

const AuthNavigator: React.FC = () => {
  const { userType } = useSelector((state: RootState) => state.auth);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFFFFF',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Login', headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={LoginScreen}
        options={{ title: 'Sign Up' }}
      />

      {/* Add vendor-specific onboarding if user type is vendor */}
      {userType === 'vendor' && (
        <>
          <Stack.Screen
            name="VendorOnboarding"
            component={DashboardScreen}
            options={{ title: 'Complete Your Profile' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
