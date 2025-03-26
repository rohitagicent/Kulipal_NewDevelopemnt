import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {fp, wp, hp} from '../../../utils/dimension';
import {colors} from '../../../utils/colors';
import Icon from '../../../utils/icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
const SimplifiedOnboarding = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    businessType: '',
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmpassword: '',

  });
  const [rememberMe, setRememberMe] = useState(false);

  const updateFormData = (key, value) => {
    setFormData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  const nextStep = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(prevStep => Math.max(0, prevStep - 1));
  };

  const submitForm = () => {
    console.log('Form submitted:', formData);
    // Here you would typically make an API call
    alert('Account created successfully!');
  };

  // Business Type Selection Screen
  const BusinessTypeScreen = () => {
    const businessTypes = [
      {
        id: 'food_vendor',
        title: 'I am a Food Vendor',
        icon: 'restaurant-outline',
        image: require('../../../assests/images/Bread.png'),
      },
      {
        id: 'stay_provider',
        title: 'I am a Stay Provider',
        icon: 'bed-outline',
        image: require('../../../assests/images/Store.png'),
      },
      {
        id: 'event_organizer',
        title: 'I am an Event Organizer',
        icon: 'calendar-outline',
        image: require('../../../assests/images/Activities.png'),
      },
    ];

    return (
      <View style={styles.screenContainer}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            style={styles.backButton1}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={fp(3.2)} color={colors.icongray} />
          </TouchableOpacity>
        </View>

        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../../assests/images/onboardimage.png')}
            resizeMode="contain"
          />
        </View>

        <View style={styles.optionsContainer}>
          {businessTypes.map(type => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.optionCard,
                formData.businessType === type.id && styles.selectedOptionCard,
              ]}
              onPress={() => updateFormData('businessType', type.id)}>
              <View style={styles.iconContainer}>
                <Image source={type.image} resizeMode="contain" />
              </View>
              <Text style={styles.optionText}>{type.title}</Text>
              <View
                style={[
                  styles.radioOuter,
                  formData.businessType === type.id &&
                    styles.radioOuterSelected,
                ]}>
                {formData.businessType === type.id && (
                  <View style={styles.radioInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            !formData.businessType && styles.disabledButton,
          ]}
          onPress={nextStep}
          disabled={!formData.businessType}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Registration Form Screen
  const RegistrationFormScreen = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const updateFormData = (key, value) => {
      setFormData(prevData => ({
        ...prevData,
        [key]: value,
      }));
    };
    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    const isFormValid = () => {
      return (
        formData.name && formData.phone && formData.email && formData.password
      );
    };
    const emojisWithIcons = [
      {title: 'Social Media', icon: 'emoticon-happy-outline'},
      {title: 'Friend Referral', icon: 'emoticon-cool-outline'},
      {title: 'Google Search', icon: 'emoticon-lol-outline'},
      {title: 'Advertisement', icon: 'emoticon-sad-outline'},
      {title: 'Other', icon: 'emoticon-cry-outline'},
    ];
   
    return (
      <View style={styles.screenContainer}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity style={styles.backButton1} onPress={prevStep}>
            <Icon name="chevron-left" size={fp(3.2)} color={colors.icongray} />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../../assests/images/kpslogo.png')}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.screenTitle}>Create Your Vendor Account</Text>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Name</Text>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer1}>
                <Ionicons
                  name="person"
                  size={fp(2.2)}
                  color={colors.BLUE}
                  style={styles.inputIcon}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={formData.name}
                onChangeText={text => updateFormData('name', text)}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer1}>
                <Ionicons
                  name="phone-portrait"
                  size={fp(2.2)}
                  color={colors.BLUE}
                  style={styles.inputIcon}
                />
              </View>

              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={text => updateFormData('phone', text)}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer1}>
                <Icon
                  name="email"
                  type="MaterialCommunityIcons"
                  size={fp(2.2)}
                  color={colors.BLUE}
                  style={styles.inputIcon}
                />
              </View>

              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={text => updateFormData('email', text)}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer1}>
                <Icon name="lock" size={fp(2.2)} color={colors.BLUE} />
              </View>

              <TextInput
                style={styles.input}
                placeholder="Create a password"
                secureTextEntry={!passwordVisible}
                value={formData.password}
                onChangeText={text => updateFormData('password', text)}
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.eyeIcon}>
                <Ionicons
                  name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer1}>
                <Icon name="lock" size={fp(2.2)} color={colors.BLUE} />
              </View>

              <TextInput
                style={styles.input}
                placeholder="Create a Confirm password"
                secureTextEntry={!passwordVisible}
                value={formData.confirmpassword}
                onChangeText={text => updateFormData('confirmpassword', text)}
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.eyeIcon}>
                <Ionicons
                  name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>How Did You Hear About Us?</Text>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer1}>
                <Icon
                  name="web"
                  type="MaterialCommunityIcons"
                  size={fp(2.2)}
                  color={colors.BLUE}
                />
              </View>

              <SelectDropdown
                data={emojisWithIcons}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
                renderButton={(selectedItem, isOpened) => {
                  return (
                    <View style={styles.dropdownButtonStyle}>
                      <Text style={styles.dropdownButtonTxtStyle}>
                        {(selectedItem && selectedItem.title) ||
                          'Select an Option'}
                      </Text>
                      <Icon
                        name={isOpened ? 'up' : 'down'}
                        size={20}
                        color="#999"
                        type="AntDesign"
                      />
                    </View>
                  );
                }}
                renderItem={(item, index, isSelected) => {
                  return (
                    <View
                      style={{
                        ...styles.dropdownItemStyle,
                        ...isSelected,
                      }}>
                      <Text
                        style={{
                          ...styles.dropdownItemTxtStyle,
                          ...(isSelected && {
                            color: colors.BLUE,
                            fontSize: fp(2.2),
                            fontWeight: '600',
                          }),
                        }}>
                        {item.title}
                      </Text>
                    </View>
                  );
                }}
                showsVerticalScrollIndicator={true}
                dropdownStyle={styles.dropdownMenuStyle}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, !isFormValid() && styles.disabledButton]}
            onPress={submitForm}
            disabled={!isFormValid()}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.rememberForgotContainer}>
            <TouchableOpacity
              style={styles.rememberContainer}
              onPress={() => setRememberMe(!rememberMe)}>
              <View style={[styles.checkbox, rememberMe && styles.checkedBox]}>
                {rememberMe && (
                  <Icon name="check" size={wp(3.5)} color={colors.WHITE} />
                )}
              </View>
              <Text style={styles.rememberText}>
                I have read and agree to all{' '}
                <Text style={styles.loginLink}>Terms & conditions</Text>{' '}
              </Text>
            </TouchableOpacity>
            x
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>Or</Text>
            <View style={styles.divider} />
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require('../../../assests/images/google.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <View style={styles.appleIconContainer}>
              <Icon
                name="apple1"
                type="AntDesign"
                size={fp(2.5)}
                color="black"
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.loginLinkContainer}>
          <Text style={styles.loginText}>
            Already have an account?{' '}
            <Text style={styles.loginLink1} 
              onPress={() => navigation.navigate("LoginScreenVendor")}
            >Login</Text>
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {currentStep === 0 && <BusinessTypeScreen />}
        {currentStep === 1 && <RegistrationFormScreen />}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(5),
    height: hp(5),
    marginBottom: hp(1),
    backgroundColor: colors.WHITE,
    elevation: 10,
    width: '25%',
  },
  socialIcon: {
    width: wp(5),
    height: wp(5),
  },
  appleIconContainer: {
    width: wp(5),
    height: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialButtonText: {
    fontSize: fp(2),
    color: colors.icongray,
    fontWeight: '500',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
    paddingVertical: hp(1),
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#9CA3AF',
  },
  dividerText: {
    marginHorizontal: wp(2),
    color: '#9CA3AF',
    fontSize: fp(2),
  },
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(2),
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: wp(4.5),
    height: wp(4.5),
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: wp(1),
    marginRight: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: colors.BLUE,
    borderColor: colors.BLUE,
  },
  rememberText: {
    fontSize: fp(1.6),
    color: colors.icongray,
  },
  dropdownButtonStyle: {
    width: '93%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(4),
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: fp(1.8),
    color: '#333',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#EBEBEB',
    borderRadius: 18,
    marginTop: hp(2.5),
    width: '90%',
    left: wp(6),
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: wp(2),
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: fp(2),
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingVertical: 4,
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },

  label: {
    marginBottom: 8,
    fontSize: 16,
    color: '#333',
  },
  dropdownButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dropdownButtonText: {
    color: '#000',
    textAlign: 'left',
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  dropdownRow: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  dropdownRowText: {
    color: '#000',
    textAlign: 'left',
  },
  selectedRow: {
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    backgroundColor: '#fff',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    height: 40,
  },

  iconContainer: {
    marginRight: 10,
  },
  selectedText: {
    flex: 1,
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 10,
    maxHeight: 300,
  },
  modalOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iconContainer: {
    backgroundColor: colors.BLUE,
    borderRadius: wp(1.5),
    padding: wp(1.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer1: {
    backgroundColor: '#E6EAF5',
    borderRadius: wp(1.5),
    padding: wp(1.5),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(9),
  },
  backButtonContainer: {
    marginBottom: hp(0),
    backgroundColor: colors.lightgray,
    width: wp(8.5),
    padding: wp(1),
    borderRadius: wp(1.5),
    height: hp(4.6),
  },
  backButton1: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
  },
  screenContainer: {
    flex: 1,
  },
  screenTitle: {
    fontSize: fp(2.5),
    fontWeight: 'bold',
    color: '#333',
    marginVertical: hp(3),
    textAlign: 'center',
  },
  optionsContainer: {
    marginTop: hp(8),
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: wp(3),
    padding: 18,
    marginBottom: hp(2),
    borderWidth: 1,
    borderColor: '#EBEBEB',
  },
  selectedOptionCard: {
    borderColor: '#4169E1',
    backgroundColor: '#F0F5FF',
  },
  optionText: {
    flex: 1,
    fontSize: fp(2),
    color: colors.icongray,
    marginLeft: 10,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#EBEBEB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: '#4169E1',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4169E1',
  },
  button: {
    backgroundColor: colors.BLUE,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: hp(3),
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: colors.lightgray,
    opacity: 0.7,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#333',
  },
  formContainer: {
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: fp(1.8),
    color: colors.icongray,
    marginBottom: hp(1.5),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: wp(3),
    height: hp(6.5),
    borderWidth: 1,
    borderColor: '#EBEBEB',
    paddingHorizontal: wp(4),
  },
  inputIcon: {},
  input: {
    flex: 1,
    padding: wp(4),
    fontSize: fp(1.8),
    color: '#333',
  },
  eyeIcon: {
    padding: 8,
  },
  loginLinkContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    fontSize: fp(1.6),
    color: '#666',
  },
  loginLink: {
    color: '#1DA1F2',
    fontWeight: 'bold',
  },
  loginLink1: {
    color: colors.BLUE,
    fontWeight: 'bold',
  },
});

export default SimplifiedOnboarding;
