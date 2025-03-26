import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Button } from 'react-native-paper'; 
import { fp, wp, hp } from '../../utils/dimension';
import { colors } from '../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { setUserType } from '../../store/authActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserType = 'vendor' | 'customer' | null;

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const OptionCard = React.memo(({ 
  title, 
  description, 
  imagePath, 
  isSelected, 
  onPress 
}: { 
  title: string; 
  description: string; 
  imagePath: any; 
  isSelected: boolean; 
  onPress: () => void; 
}) => (
  <LinearGradient
    colors={['#FFFFFF', '#EDF2FF']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={[
      styles.gradientBackground,
      isSelected && styles.selectedOptionBorder
    ]}>
    <TouchableOpacity onPress={onPress} style={styles.option}>
      <Image
        source={imagePath}
        resizeMode="contain"
      />
      <View style={styles.optionTextContainer}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Text style={styles.optionDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  </LinearGradient>
));

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState<UserType>(null);

  const handleVendorPress = useCallback(() => {
    setSelectedOption('vendor');
  }, []);

  const handleCustomerPress = useCallback(() => {
    setSelectedOption('customer');
  }, []);
  const handleContinuePress = useCallback(async () => {
    console.log(selectedOption);
  
    if (selectedOption === "vendor") {
      navigation.navigate("LoginScreenVendor");
    }
    if (selectedOption === "customer") {
      navigation.navigate("LoginScreenCustomer");
    }
  
    // if (selectedOption === "customer") {
  
    //   try {
    //     await AsyncStorage.setItem("userType", selectedOption);
    //     dispatch(setUserType(selectedOption));
    //   } catch (error) {
    //     console.log("Error saving user type", error);
    //   }
    // }
  }, [selectedOption, navigation, dispatch]);
  

  const buttonLabel = useMemo(() => 
    !selectedOption ? "Continue" : `Continue `
  , [selectedOption]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assests/images/kulipal_logo.png')}
          resizeMode="contain"
        />
        <Text style={styles.welcomeText}>Welcome! To Kulipal App</Text>
      </View>

      <Text style={styles.questionText}>How do you want to use this app?</Text>

      <OptionCard
        title="Vendor"
        description="Sell food, stay services, or event bookings."
        imagePath={require('../../assests/images/selectlogo.png')}
        isSelected={selectedOption === 'vendor'}
        onPress={handleVendorPress}
      />

      <OptionCard
        title="Customer"
        description="Order food, book stays, and plan events."
        imagePath={require('../../assests/images/select1.png')}
        isSelected={selectedOption === 'customer'}
        onPress={handleCustomerPress}
      />

      <Button
        onPress={handleContinuePress}
        mode="contained"
        disabled={!selectedOption}
        style={[
          styles.continueButton,
          !selectedOption && styles.disabledButton
        ]}
        labelStyle={[
          styles.continueButtonText,
          !selectedOption && styles.disabledButtonText
        ]}>
        {buttonLabel}
      </Button>

      <Text style={styles.signInText}>
        Already have an account? <Text style={styles.signInLink}>Sign In</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: hp(4),
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: fp(2.2),
    marginVertical: hp(1),
    color: '#777',
  },
  questionText: {
    textAlign: 'left',
    fontSize: fp(2),
    color: 'black',
    fontWeight: '500',
    marginBottom: hp(1),
  },
  gradientBackground: {
    marginVertical: hp(1),
    borderRadius: wp(2),
    elevation: 4,
  },
  selectedOptionBorder: {
    borderWidth: wp(0.5),
    borderColor: colors.BLUE
  },
  option: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  optionTextContainer: {
    marginLeft: wp(3),
    flex: 1,
  },
  optionTitle: {
    fontSize: fp(2.2),
    fontWeight: 'bold',
  },
  optionDescription: {
    fontSize: fp(1.9),
    color: '#888888',
  },
  continueButton: {
    marginTop: hp(4),
    height: hp(6),
    backgroundColor: colors.BLUE
  },
  disabledButton: {
    backgroundColor: '#EDEDED',
  },
  continueButtonText: {
    fontWeight: '600',
    marginTop: hp(2),
    fontSize: fp(2),
    color: "white"
  },
  disabledButtonText: {
    color: "#8D8D8D"
  },
  signInText: {
    textAlign: 'center',
    fontSize: fp(1.7),
    marginTop: 20,
    color: 'black',
  },
  signInLink: {
    color: colors.BLUE
  },
});

export default React.memo(WelcomeScreen);