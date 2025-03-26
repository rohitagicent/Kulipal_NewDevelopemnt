import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import {fp, wp, hp} from '../../../utils/dimension';
import {colors} from '../../../utils/colors';
import Icon from '../../../utils/icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import CountryPicker from 'react-native-country-picker-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
const SignUpCustomer = () => {
  const [countryCode1, setCountryCode1] = useState('91');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const [modalVisible, setModalVisible] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');

  const handleImageSelected = imagePath => {
    // You can upload the image to your server here
    // uploadProfilePicture(imagePath);
  };
  const handlotppress = useCallback(value => {
    setSelectedOption(value);
  }, []);
  const uploadPhoto = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const [countryState, setCountry] = useState(false);
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
  const onSelect = (country: any) => {
    const formattedCountryCodePlus = `${'+'}${country.callingCode[0]}`;
    setCountryCode1(country?.callingCode[0]);

    setCountry(true);
    setFormData(prevData => ({
      ...prevData,
      ['countryCode']: formattedCountryCodePlus,
    }));
  };
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
  };

  // Business Type Selection Screen
  const uploadToS3 = async (image: {type: string; uri: any}) => {
    const formData = new FormData();
    let uri = image.uri;
    let fileName = uri.split('/').pop();
    let mimeType = image.type === 'video' ? 'video/mp4' : 'image/jpeg';
    formData.append('file', {
      uri: uri,
      name: fileName,
      type: mimeType,
    });

    formData.append('mediaType', '1');
    try {
      var auth_key1 =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoiaXcxMUB5b3BtYWlsLmNvbSIsImlhdCI6MTc0MjM2OTMwOH0.hzVEjzMPQyBDOz7tfmxaz2LcASjwzYCy85NMSpq9bPk';
      const response = await axios.post(
        'https://api.appdevelopmentservices.in:3013' + '/interWoven_v1/media',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `${auth_key1}`,
          },
        },
      );
      if (response.status === 200) {
        return response.data;
      } else {
      }
    } catch (error) {}
    return null;
  };
  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true,
      mediaType: 'photo',
    })
      .then(async image => {
        const Data = await uploadToS3({
          uri: image.path,

          type: 'image',
        });
        const s3Url = Data.signed_url;
        setProfileImage(s3Url);
      })
      .catch(error => {});
  };
  const ProfilePictureUpload = ({isVisible, onClose, onImageSelected}) => {
    const openCamera = () => {
      ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: true,
        mediaType: 'photo',
      })
        .then(image => {
          onImageSelected(image.path);
          onClose();
        })
        .catch(error => {
          console.log('Camera picker error:', error);
        });
    };
    const uploadToS3 = async (image: {type: string; uri: any}) => {
      const formData = new FormData();
      let uri = image.uri;
      let fileName = uri.split('/').pop();
      let mimeType = image.type === 'video' ? 'video/mp4' : 'image/jpeg';
      formData.append('file', {
        uri: uri,
        name: fileName,
        type: mimeType,
      });

      formData.append('mediaType', '1');
      try {
        var auth_key1 =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoiaXcxMUB5b3BtYWlsLmNvbSIsImlhdCI6MTc0MjM2OTMwOH0.hzVEjzMPQyBDOz7tfmxaz2LcASjwzYCy85NMSpq9bPk';
        const response = await axios.post(
          'https://api.appdevelopmentservices.in:3013' + '/interWoven_v1/media',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `${auth_key1}`,
            },
          },
        );
        if (response.status === 200) {
          return response.data;
        } else {
        }
      } catch (error) {}
      return null;
    };
    const openGallery = () => {
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: true,
        mediaType: 'photo',
      })
        .then(async image => {
          const Data = await uploadToS3({
            uri: image.path,

            type: 'image',
          });
          const s3Url = Data.signed_url;
          setProfileImage(s3Url);
          onClose();
          setCurrentStep(2);
        })
        .catch(error => {});
    };

    return (
      <Modal transparent visible={isVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Close Button */}
            <View style={styles.backButtonContainer1}>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Icon
                  name="closecircleo"
                  type="AntDesign"
                  size={24}
                  color={colors.BLUE}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalTitle}>Profile picture</Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                left: '8%',
              }}>
              <View style={{flexDirection: 'column'}}>
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={openCamera}>
                  <Icon      name="camera"
                    type="Feather" size={fp(2.5)} color="#007AFF" />
                </TouchableOpacity>
                <Text style={styles.optionText}>Camera</Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={openGallery}>
                  <Icon name="image"     type="Feather" size={fp(2.5)} color="#007AFF" />
                </TouchableOpacity>
                <Text style={styles.optionText}>Gallery</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const BusinessTypeScreen = () => {
    return (
      <>
        <View style={styles.screenContainer}>
          <View style={styles.backButtonContainer}>
            <TouchableOpacity style={styles.backButton1} onPress={prevStep}>
              <Icon
                name="chevron-left"
                size={fp(3.2)}
                color={colors.icongray}
              />
            </TouchableOpacity>
          </View>
          <View style={{top: hp(3)}}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../../../assests/images/profile.png')}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.screenTitle}>Set Profile Picture </Text>
            <Text style={styles.screenTitle1}>
              Add a profile picture to make your experience more personal.
            </Text>
          </View>
          <View style={{top: hp(30)}}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: 'white',
                  borderWidth: 2,
                  borderColor: colors.BLUE,
                },
              ]}
              onPress={uploadPhoto}>
              <Text style={[styles.buttonText, {color: colors.BLUE}]}>
                Upload photo{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button]} onPress={nextStep}>
              <Text style={styles.buttonText}>Skip for Now</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ProfilePictureUpload
          isVisible={modalVisible}
          onClose={closeModal}
          onImageSelected={handleImageSelected}
        />
      </>
    );
  };
  const ProfilePictureScreen = () => {
    return (
      <View style={styles.screenContainer}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity style={styles.backButton1} onPress={prevStep}>
            <Icon name="chevron-left" size={fp(3.2)} color={colors.icongray} />
          </TouchableOpacity>
        </View>
        <View style={{top: hp(3)}}>
          <View style={{alignItems: 'center'}}>
            {profileImage ? (
              <View style={styles.container1}>
                {/* Dashed Circle */}
                <View style={styles.dashedBorder}>
                  {/* Profile Image */}
                  <Image
                    source={{uri: profileImage}}
                    style={styles.image}
                    resizeMode="cover"
                    onError={e =>
                      console.log('Image load error:', e.nativeEvent.error)
                    }
                  />
                </View>

                {/* Camera Icon */}
                <TouchableOpacity
                  style={styles.iconContainer2}
                  onPress={() => openGallery()}>
                  <Icon
                    name="camera"
                    type="Feather"
                    size={fp(3)}
                    color="#0057FF"
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <Image
                source={require('../../../assests/images/profile.png')}
                resizeMode="cover"
              />
            )}
          </View>
        </View>

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
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 12,
                  backgroundColor: '#F8F9FA',
                  borderRadius: wp(1.5),
                  padding: wp(1.5),
                  width: wp(20),
                  left: wp(3),
                }}>
                <CountryPicker
                  withFlag
                  withFilter
                  withCallingCode
                  withAlphaFilter
                  withCallingCodeButton
                  onSelect={onSelect}
                  style={styles.countryPicker}
                  placeholder={
                    <Text style={styles.placeholderText}>+ {countryCode1}</Text>
                  }
                />
                <AntDesign
                  name="down"
                  size={fp(2)}
                  style={{top: hp(0.4), left: wp(2)}}
                  color={'#818181'}
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
        </View>
        <View style={{top: hp(0)}}>
          <TouchableOpacity style={[styles.button]} onPress={nextStep}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const RegistrationFormScreen = () => {
    const isFormValid = () => {
      return (
        formData.name && formData.phone && formData.email && formData.password
      );
    };

    return (
      <View style={styles.screenContainer}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            style={styles.backButton1}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={fp(3.2)} color={colors.icongray} />
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../../assests/images/wleomcecustomer.png')}
          resizeMode="cover"
        />
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
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 12,
                  backgroundColor: '#F8F9FA',
                  borderRadius: wp(1.5),
                  padding: wp(1.5),
                  width: wp(20),
                  left: wp(3),
                }}>
                <CountryPicker
                  withFlag
                  withFilter
                  withCallingCode
                  withAlphaFilter
                  withCallingCodeButton
                  onSelect={onSelect}
                  style={styles.countryPicker}
                  placeholder={
                    <Text style={styles.placeholderText}>+ {countryCode1}</Text>
                  }
                />
                <AntDesign
                  name="down"
                  size={fp(2)}
                  style={{top: hp(0.4), left: wp(2)}}
                  color={'#818181'}
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

          <TouchableOpacity
            style={[styles.button, !isFormValid() && styles.disabledButton]}
            onPress={nextStep}
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
            <Text
              style={styles.loginLink1}
              onPress={() => navigation.navigate('LoginScreenCustomer')}>
              Login
            </Text>
          </Text>
        </View>
      </View>
    );
  };
  const Sendotpscreen = () => {
    return (
      <>
        <View style={styles.screenContainer}>
          <View style={styles.backButtonContainer}>
            <TouchableOpacity style={styles.backButton1} onPress={prevStep}>
              <Icon
                name="chevron-left"
                size={fp(3.2)}
                color={colors.icongray}
              />
            </TouchableOpacity>
          </View>
          <View style={{top: hp(0)}}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../../../assests/images/circlecheck.png')}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.screenTitle}>Verify Your Contact Info </Text>
            <Text style={styles.screenTitle1}>
              Choose to verify your email or phone number to secure your
              account.
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.container3,
              selectedOption === 'Number'
                ? {borderWidth: 2, borderColor: colors.BLUE}
                : {},
            ]}
            onPress={() => handlotppress('Number')}>
            <View style={{alignItems: 'center'}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Text style={styles.text2}>Verify via phone number</Text>
                <Icon
                  type="FontAwesome5"
                  name="phone"
                  size={fp(2)}
                  color="black"
                  style={styles.icon}
                />
              </View>
            </View>
            {selectedOption === 'Number' ? (
              <View style={{alignItems: 'flex-start'}}>
                <View style={styles.radioButton}>
                  <View style={styles.radioSelected} />
                </View>
              </View>
            ) : (
              ''
            )}
            <Text
              style={[
                styles.phoneNumber,
                selectedOption !== 'Number' ? {top: hp(2)} : {},
              ]}>
              *******923
            </Text>{' '}
          </TouchableOpacity>
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>Or</Text>
            <View style={styles.divider} />
          </View>
          <TouchableOpacity
            style={[
              styles.container3,
              selectedOption === 'Email'
                ? {borderWidth: 2, borderColor: colors.BLUE}
                : {},
            ]}
            onPress={() => handlotppress('Email')}>
            <View style={{alignItems: 'center'}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Text style={styles.text2}>Verify via Email</Text>
                <Icon
                  type="MaterialCommunityIcons"
                  name="email"
                  size={fp(2)}
                  color="black"
                  style={styles.icon}
                />
              </View>
            </View>
            {selectedOption === 'Email' ? (
              <View style={{alignItems: 'flex-start'}}>
                <View style={styles.radioButton}>
                  <View style={styles.radioSelected} />
                </View>
              </View>
            ) : (
              ''
            )}
            <Text
              style={[
                styles.phoneNumber,
                selectedOption !== 'Email' ? {top: hp(2)} : {},
              ]}>
              rohit@gmail.com
            </Text>{' '}
          </TouchableOpacity>
          <View style={{top: hp(10)}}>
            <TouchableOpacity style={[styles.button]} onPress={nextStep}>
              <Text style={styles.buttonText}>Continue otp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };
  const EnterOtp = () => {
    return (
      <>
        <View style={styles.screenContainer}>
          <View style={styles.backButtonContainer}>
            <TouchableOpacity style={styles.backButton1} onPress={prevStep}>
              <Icon
                name="chevron-left"
                size={fp(3.2)}
                color={colors.icongray}
              />
            </TouchableOpacity>
          </View>
          <View style={{top: hp(0)}}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../../../assests/images/circlecheck.png')}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.screenTitle}>Verify Your Contact Info </Text>
            <Text style={styles.screenTitle1}>
              Choose to verify your email or phone number to secure your
              account.
            </Text>
          </View>
      
          <View style={{top: hp(10)}}>
            <TouchableOpacity style={[styles.button]} onPress={nextStep}>
              <Text style={styles.buttonText}>Continue otp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {currentStep === 0 && <RegistrationFormScreen />}
        {currentStep === 1 && <BusinessTypeScreen />}
        {currentStep === 2 && <ProfilePictureScreen />}
        {currentStep === 3 && <Sendotpscreen />}
        {currentStep === 4 && <EnterOtp />}

      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container3: {
    backgroundColor: '#fff',
    paddingVertical: hp(0.76),
    paddingHorizontal: 16,
    borderRadius: wp(1),
    shadowOpacity: 0.1,
    elevation: 5,
    height: hp(9),
    marginTop: hp(2),
  },
  radioButton: {
    width: hp(2.2),
    height: hp(2),
    borderRadius: 10,
    backgroundColor: '#E2EAFF',
    alignItems: 'center',
    justifyContent: 'center',
    left: wp(8),
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1A73E8',
  },
  text2: {
    fontSize: fp(2),
    color: colors.black_test,
  },
  icon: {
    marginLeft: wp(2),
    marginTop: hp(0.3),
  },
  phoneNumber: {
    fontSize: fp(1.8),
    color: '#51515199',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: fp(2.2),
    fontWeight: '500',
    bottom: hp(2),
    color: colors.black_test,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    width: '50%',
    borderRadius: wp(10),
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: fp(1.5),
    left: wp(2),
    marginVertical: hp(1),
  },
  countryPicker: {
    width: wp(30),
    marginRight: wp(8),
  },
  textInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: wp(3),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    color: '#0A2948',
  },
  placeholderText: {
    fontSize: fp(2),
    color: '#818181',
    textAlign: 'center',
  },
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

  selectedText: {
    flex: 1,
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    marginBottom: hp(2),
    backgroundColor: colors.lightgray,
    width: wp(8.5),
    padding: wp(1),
    borderRadius: wp(1.5),
    height: hp(4.6),
  },
  backButtonContainer1: {
    bottom: hp(4),
    backgroundColor: colors.screenbg,
    width: wp(8.5),
    padding: wp(1.5),
    borderRadius: wp(4),
    height: hp(4.6),
  },
  backButton1: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: colors.screenbg,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: colors.screenbg,
  },
  screenTitle: {
    fontSize: fp(2.5),
    fontWeight: 'bold',
    color: colors.black_test,
    marginVertical: hp(2),
    textAlign: 'center',
  },
  screenTitle1: {
    fontSize: fp(1.7),
    fontWeight: '400',
    color: colors.icongray,
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
    marginBottom: hp(2),
    marginTop: hp(2),
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

  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },

  screenSubtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
  },
  cancelButton: {
    width: '100%',
    padding: 15,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    color: 'red',
  },
  container1: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  dashedBorder: {
    width: wp(35),
    height: wp(35),
    borderRadius: wp(15),
    borderWidth: 2,
    borderColor: '#0057FF',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: wp(32),
    height: wp(32),
    borderRadius: wp(14),
  },
  iconContainer2: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.screenbg,
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignUpCustomer;
