import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from '../../../utils/icons';
import {fp, hp, wp} from '../../../utils/dimension';
import {colors} from '../../../utils/colors';
import StepIndicator from 'react-native-step-indicator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import Dine from '../../../assests/svg/dine.svg';
import BagSvg from '../../../assests/svg/bag.svg';
import DeliverSvg from '../../../assests/svg/deliver.svg';
import TickCircleSvg from '../../../assests/svg/tickCircle.svg';
import VerifiedSvg from '../../../assests/svg/verified.svg';
import LinearGradient from 'react-native-linear-gradient';

interface BusinessProfileProps {
  navigation: any;
}

interface Step {
  label: string;
  subLabel: string;
  subLabelLink?: string; // Optional property
}

interface ServiceSelectState {
  delivery: boolean;
  pickup: boolean;
  dineIn: boolean;
}

// Step indicator style object
const stepIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 35,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#4CAF50',
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: '#4CAF50',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#515151',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#4CAF50',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: fp(25),
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#515151',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
};

const BusinessProfileSetup: React.FC<BusinessProfileProps> = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [serviceSelect, setServiceSelect] = useState<ServiceSelectState>({
    delivery: false,
    pickup: false,
    dineIn: false,
  });

  const refRBSheet = useRef<RBSheet>(null);

  const handleOpen = (): void => {
    refRBSheet.current?.open();
  };
  const handleClose = (): void => {
    refRBSheet.current?.close();
  };
  const nextStep = (): void => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  const prevStep = (): void => {
    setCurrentStep(prevStep => Math.max(0, prevStep - 1));
  };

  const stepperNavigate = (position: number) => {
    if (position === 0) {
      setCurrentStep(prevStep => prevStep + 1);
    } else if (position === 1) {
      setCurrentStep(3);
    }
  };

  const documentList = [
    {id: 1, name: 'NIN (National Identification Number)'},
    {id: 2, name: 'BVN (Bank Verification Number)'},
    {id: 3, name: 'Tax Number'},
    {id: 4, name: 'Voters Card'},
    {id: 5, name: 'Business Registration Certificate'},
  ];

  const handleServiceSelect = value => {
    setServiceSelect(prev => ({
      ...prev, // Keep previous state
      ...value, // Update specific key
    }));
  };

  const isAnyServiceSelected = Object.values(serviceSelect).some(val => val);

  // eslint-disable-next-line react/no-unstable-nested-components
  const BusinessMainScreen = () => {
    const steps: Step[] = [
      {
        label: 'Business Details',
        subLabel: 'Business Name, Address, Cover \nImage, and Operating Hours',
      },
      {label: 'Services Selection', subLabel: 'Delivery, Pick-up or Dine-in'},
      {
        label: 'Account Verification ',
        subLabel: 'Business registration, Valid ID, NIN \nNumber and more.',
        subLabelLink: 'View Verification Types ›',
      },
      {label: 'Menu & Offerings', subLabel: 'Dishes, Category, Image'},
    ];

    const stepIcons: Record<number, any> = {
      0: require('../../../assests/images/stepper1.png'),
      1: require('../../../assests/images/stepper2.png'),
      2: require('../../../assests/images/stepper3.png'),
      3: require('../../../assests/images/stepper4.png'),
    };

    const getStepIcon = ({position}: {position: number}) => {
      return (
        <Image
          source={stepIcons[position] || stepIcons[0]}
          style={{width: wp(5), height: wp(5)}}
          resizeMode="contain"
        />
      );
    };

    return (
      <>
        <View style={styles.screenContainer}>
          {/* top layer */}
          <View style={styles.topLayer}>
            <View style={styles.backButtonContainer}>
              <TouchableOpacity style={styles.backButton1}>
                <Icon name="chevron-left" size={fp(3.2)} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
          {/* Detail Blue Box */}
          <View style={{padding: wp(4)}}>
            <View style={styles.mainscreenBox}>
              <Text style={styles.mainscreenBoxTextBold}>
                Set up Your Food Business in Minutes!
              </Text>
              <Text style={styles.mainscreenBoxText}>
                List your restaurant, fill in the details, and start taking
                orders—simple & quick!
              </Text>
            </View>
            {/* Card */}
            <View style={styles.businessInfoCard}>
              <View style={styles.indicatorBox}>
                <StepIndicator
                  customStyles={stepIndicatorStyles}
                  labels={steps.map(step => step.label)}
                  currentPosition={0} // Change this to see active steps
                  renderLabel={({position}) => (
                    <TouchableOpacity
                      style={styles.labelContainer}
                      onPress={() => stepperNavigate(position)}>
                      <Text style={styles.label}>{steps[position].label}</Text>
                      <Text style={styles.subLabel}>
                        {steps[position].subLabel}
                      </Text>
                      <TouchableOpacity onPress={handleOpen}>
                        <Text style={styles.subLabelText}>
                          {steps[position].subLabelLink}
                        </Text>
                      </TouchableOpacity>
                    </TouchableOpacity>
                  )}
                  direction="vertical"
                  stepCount={steps.length}
                  renderStepIndicator={getStepIcon}
                />
              </View>
            </View>
          </View>
        </View>
        {/* Button */}
        <TouchableOpacity style={[styles.button]} onPress={nextStep}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <RBSheet
          ref={refRBSheet}
          height={hp(65)}
          openDuration={250}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
            },
            container: styles.bottomSheetContainer,
            draggableIcon: {backgroundColor: '#000'},
          }}>
          <View style={styles.bottomsheetInnerBox}>
            <TouchableOpacity style={styles.crossIcon} onPress={handleClose}>
              <Icon name="close" size={fp(4.2)} color="#fff" />
            </TouchableOpacity>
            <View style={styles.bottomBox}>
              <View>
                <Text style={styles.bottomBoxTextBold}>Required Documents</Text>
                <Text style={styles.bottomBoxTextLight}>
                  Ensure you have at least one of the {'\n'}following documents
                  ready before {'\n'}proceeding.
                </Text>
              </View>
              <Image
                source={require('../../../assests/images/docs.png')}
                style={{width: wp(30), height: wp(30)}}
                resizeMode="contain"
              />
            </View>
            <View style={styles.bottomsheetLowerBox}>
              {documentList.map(item => (
                <View key={item.id} style={styles.bottomsheetLowerTextBox}>
                  <Image
                    source={require('../../../assests/images/greenTick.png')}
                    style={{width: wp(5), height: wp(5)}}
                    resizeMode="contain"
                  />
                  <Text style={[styles.label, {fontWeight: '500'}]}>
                    {item.name}
                  </Text>
                </View>
              ))}
            </View>
            <TouchableOpacity
              onPress={handleClose}
              style={[styles.button_next, {alignSelf: 'center'}]}>
              <Text style={styles.button_next_title}>Got it!</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </>
    );
  };

  // Business Detail Screen
  // eslint-disable-next-line react/no-unstable-nested-components
  const BusinessDetailScreen = () => {
    return (
      <>
        <View style={styles.screenContainer}>
          {/* top layer */}
          <View style={styles.topLayer}>
            <View style={styles.backButtonContainer}>
              <TouchableOpacity style={styles.backButton1} onPress={prevStep}>
                <Icon
                  name="chevron-left"
                  size={fp(3.2)}
                  color={colors.icongray}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* Business Detail Box */}
          <View style={{padding: wp(3)}}>
            <View style={styles.businessDetailBox}>
              <Image
                source={require('../../../assests/images/stepper1.png')}
                style={{width: wp(7), height: wp(7)}}
                resizeMode="contain"
              />
              <Text style={styles.businessDetailBoxText}>Business Details</Text>
            </View>
            {/* Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Business Name</Text>
              <View style={styles.inputContainer}>
                <View style={styles.iconContainer1}>
                  <Ionicons
                    name="bag-handle-sharp"
                    size={fp(2.2)}
                    color={colors.BLUE}
                  />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Business name"
                  // value={formData.name}
                  // onChangeText={text => updateFormData('name', text)}
                />
              </View>
            </View>
            {/* Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Location</Text>
              <View style={styles.inputContainer}>
                <View style={styles.iconContainer1}>
                  <Ionicons
                    name="location-sharp"
                    size={fp(2.2)}
                    color={colors.BLUE}
                  />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Address"
                  // value={formData.name}
                  // onChangeText={text => updateFormData('name', text)}
                />
              </View>
            </View>
            {/* upload */}
            <Text style={styles.inputLabel}>Upload Cover Image</Text>
            <TouchableOpacity style={styles.uploadBox}>
              <Ionicons
                name="cloud-upload-outline"
                size={fp(4)}
                color={colors.BLACK}
              />
              <Text style={styles.businessDetailBoxText}>
                Upload Cover Image
              </Text>
              <Text style={[styles.inputLabel, {color: colors.BLUE}]}>
                Browse
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button_next} onPress={nextStep}>
              <Text style={styles.button_next_title}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  // Business Hours Detail
  // eslint-disable-next-line react/no-unstable-nested-components
  const BusinessHoursScreen = () => {
    return (
      <>
        <View style={styles.screenContainer}>
          {/* top layer */}
          <View style={styles.topLayer}>
            <View style={styles.backButtonContainer}>
              <TouchableOpacity style={styles.backButton1} onPress={prevStep}>
                <Icon
                  name="chevron-left"
                  size={fp(3.2)}
                  color={colors.icongray}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* Business Detail Box */}
          <View style={{padding: wp(3)}}>
            <View style={styles.businessDetailBox}>
              <Image
                source={require('../../../assests/images/stepper1.png')}
                style={{width: wp(7), height: wp(7)}}
                resizeMode="contain"
              />
              <Text style={styles.businessDetailBoxText}>Business Hours</Text>
            </View>

            <TouchableOpacity
              style={[styles.button_next, {borderRadius: wp(2)}]}
              onPress={nextStep}>
              <Text style={styles.button_next_title}>Save & Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  // Service Selection Screen
  // eslint-disable-next-line react/no-unstable-nested-components
  const ServiceSelectionScreen = () => {
    return (
      <>
        <View style={styles.screenContainer}>
          {/* top layer */}
          <View style={styles.topLayer}>
            <View style={styles.backButtonContainer}>
              <TouchableOpacity
                style={styles.backButton1}
                onPress={() => setCurrentStep(0)}>
                <Icon
                  name="chevron-left"
                  size={fp(3.2)}
                  color={colors.icongray}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{padding: wp(3)}}>
            <View style={styles.businessDetailBox}>
              <Image
                source={require('../../../assests/images/stepper2.png')}
                style={{width: wp(7), height: wp(7)}}
                resizeMode="contain"
              />
              <Text style={styles.businessDetailBoxText}>
                Service Selection
              </Text>
            </View>
            <View>
              <Text style={styles.businessDetailBoxText}>
                How do you serve your customers?
              </Text>
              <Text style={styles.serviceText}>
                Choose the services your food business provides. You can update
                this anytime.
              </Text>
            </View>
            <LinearGradient
              style={{marginVertical: wp(4), borderRadius: wp(3.5)}}
              colors={['#FFFFFF', '#EDF2FF']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <TouchableOpacity
                style={[
                  styles.serviceBottomBox,
                  {
                    borderColor: serviceSelect.delivery
                      ? colors.BLUE
                      : colors.lightgray,
                  },
                ]}
                onPressIn={() =>
                  handleServiceSelect({delivery: !serviceSelect.delivery})
                }>
                {serviceSelect.delivery && (
                  <View style={styles.tickCircle}>
                    <TickCircleSvg />
                  </View>
                )}
                <View>
                  <Text style={styles.bottomBoxTextBold}>Delivery</Text>
                  <Text style={styles.bottomBoxTextLight}>
                    Deliver orders to customers at their {'\n'}doorstep.
                  </Text>
                </View>
                <DeliverSvg />
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              style={{marginVertical: wp(3.5), borderRadius: wp(3.5)}}
              colors={['#FFFFFF', '#EDF2FF']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <TouchableOpacity
                style={[
                  styles.serviceBottomBox,
                  {
                    borderColor: serviceSelect.pickup
                      ? colors.BLUE
                      : colors.lightgray,
                  },
                ]}
                onPressIn={() =>
                  handleServiceSelect({pickup: !serviceSelect.pickup})
                }>
                {serviceSelect.pickup && (
                  <View style={styles.tickCircle}>
                    <TickCircleSvg />
                  </View>
                )}
                <View>
                  <Text style={styles.bottomBoxTextBold}>Pickup</Text>
                  <Text style={styles.bottomBoxTextLight}>
                    Customers can pick up their orders {'\n'}from your
                    restaurant.
                  </Text>
                </View>
                <BagSvg />
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              style={{marginVertical: wp(3.5), borderRadius: wp(3.5)}}
              colors={['#FFFFFF', '#EDF2FF']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <TouchableOpacity
                style={[
                  styles.serviceBottomBox,
                  {
                    borderColor: serviceSelect.dineIn
                      ? colors.BLUE
                      : colors.lightgray,
                  },
                ]}
                onPressIn={() =>
                  handleServiceSelect({dineIn: !serviceSelect.dineIn})
                }>
                {serviceSelect.dineIn && (
                  <View style={styles.tickCircle}>
                    <TickCircleSvg />
                  </View>
                )}
                <View>
                  <Text style={styles.bottomBoxTextBold}>Dine-in</Text>
                  <Text style={styles.bottomBoxTextLight}>
                    Offer table service for customers {'\n'}who prefer to eat at
                    your place.
                  </Text>
                </View>
                <Dine />
              </TouchableOpacity>
            </LinearGradient>
            <TouchableOpacity
              style={[
                styles.button_next,
                {
                  backgroundColor: isAnyServiceSelected
                    ? colors.BLUE
                    : colors.lightgray,
                },
              ]}
              onPress={nextStep}
              disabled={!isAnyServiceSelected}>
              <Text style={styles.button_next_title}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const ServiceSelectionComplete = () => {
    return (
      <>
        <View style={styles.serviceCompleteContainer}>
            <TouchableOpacity
              style={[styles.backButtonContainer,{opacity:0.7}]}
              onPress={() => setCurrentStep(0)}>
              <Icon
                name="chevron-left"
                size={fp(3.4)}
                color='#ffffff'
              />
            </TouchableOpacity>
            <View style={styles.items}>
          <VerifiedSvg/>
          <Text style={styles.serviceCompleteText}>Congratulations You Have Successfully Setup Your Business With Kulipal.</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {currentStep === 0 && <BusinessMainScreen />}
        {currentStep === 1 && <BusinessDetailScreen />}
        {currentStep === 2 && <BusinessHoursScreen />}
        {currentStep === 3 && <ServiceSelectionScreen />}
        {currentStep === 4 && <ServiceSelectionComplete />}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  screenContainer: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  topLayer: {
    backgroundColor: '#fff',
    padding: wp(4),
    borderBottomWidth: 1.5,
    borderBottomColor: colors.lightgray,
  },
  backButtonContainer: {
    backgroundColor: colors.lightgray,
    width: wp(8.5),
    padding: wp(0.7),
    borderRadius: wp(1.5),
    height: hp(4.6),
  },
  backButton1: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainscreenBox: {
    backgroundColor: colors.BLUE,
    padding: wp(3),
    borderRadius: wp(5),
    marginVertical: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainscreenBoxTextBold: {
    fontSize: fp(3),
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '700',
  },
  mainscreenBoxText: {
    fontSize: fp(2),
    marginTop: 4,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: fp(3),
  },
  businessInfoCard: {
    backgroundColor: '#fff',
    padding: wp(3),
    borderRadius: wp(5),
    marginVertical: wp(3),
    borderWidth: 1,
    borderColor: colors.lightgray,
    justifyContent: 'flex-start',
  },
  button: {
    backgroundColor: colors.BLUE,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    margin: wp(3),
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  indicatorBox: {
    width: '100%',
    height: hp(50),
  },
  // for custom label of step indicator
  labelContainer: {
    marginLeft: 5, // Adds spacing between step icon and text
    // justifyContent: 'flex-start',
    // alignSelf: 'center',
  },
  label: {
    fontSize: fp(2),
    fontWeight: 'bold',
    color: '#333',
  },
  subLabel: {
    fontSize: 12,
    color: '#666',
  },
  subLabelText: {
    fontSize: 12,
    color: colors.BLUE,
    fontWeight: '700',
  },
  // Business Detail Styles
  businessDetailBox: {
    backgroundColor: '#E8EEFF',
    borderRadius: wp(3),
    padding: wp(4),
    paddingVertical: wp(9),
    flexDirection: 'row',
    gap: wp(3),
    alignItems: 'center',
    marginVertical: wp(3),
    borderWidth: 1,
    borderColor: colors.lightgray,
  },
  businessDetailBoxText: {
    fontSize: fp(2.5),
    fontWeight: '600',
    color: '#515151',
  },
  inputGroup: {
    marginBottom: wp(3.5),
  },
  inputLabel: {
    fontSize: fp(1.9),
    color: '#6A6A6A',
    fontWeight: '600',
    marginBottom: hp(1.3),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: wp(3),
    height: hp(7),
    borderWidth: 1,
    borderColor: '#EBEBEB',
    paddingHorizontal: wp(4),
  },
  iconContainer1: {
    backgroundColor: '#E6EAF5',
    borderRadius: wp(1.5),
    padding: wp(1.5),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(9),
  },
  input: {
    flex: 1,
    padding: wp(4),
    fontSize: fp(1.8),
    color: '#333',
  },
  uploadBox: {
    borderWidth: 1.5,
    borderColor: colors.lightgray,
    borderRadius: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: wp(5),
    gap: 5,
  },
  button_next: {
    backgroundColor: colors.BLUE,
    alignSelf: 'flex-end',
    paddingHorizontal: wp(10),
    paddingVertical: wp(2.8),
    marginTop: wp(4),
    borderRadius: 40,
  },
  button_next_title: {
    fontSize: fp(2.5),
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '500',
  },
  bottomSheetContainer: {
    backgroundColor: '#fff',
    padding: wp(4),
    paddingVertical: wp(5),
    borderTopLeftRadius: wp(8),
    borderTopRightRadius: wp(8),
  },
  bottomsheetInnerBox: {
    flex: 1,
    paddingTop: 18,
  },
  crossIcon: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignSelf: 'center',
    padding: wp(2),
    borderRadius: 100,
    position: 'absolute',
    top: -wp(5),
    zIndex: 999,
  },
  bottomBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceBottomBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lightgray,
    padding: wp(3),
    paddingVertical: wp(3.5),
    borderRadius: wp(3.5),
    justifyContent: 'space-between',
    width: '100%',
  },
  tickCircle: {
    position: 'absolute',
    right: wp(4.8),
    top: -wp(4.4),
  },
  bottomBoxTextBold: {
    fontSize: fp(2.5),
    fontWeight: '700',
    color: '#4A4A4A',
  },
  bottomBoxTextLight: {
    fontSize: fp(1.9),
    fontWeight: '400',
    color: '#888888',
  },
  bottomsheetLowerBox: {
    backgroundColor: '#F8F9FA',
    padding: wp(5),
    borderRadius: wp(3),
    gap: wp(5),
    borderWidth: 0.8,
    borderColor: colors.lightgray,
  },
  bottomsheetLowerTextBox: {
    flexDirection: 'row',
    gap: 10,
  },
  serviceText: {
    color: '#888888',
    fontSize: fp(1.98),
  },
  serviceCompleteContainer:{
    flex:1,
    backgroundColor: colors.BLUE,
    padding: wp(3.5),
  },
  items:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    gap: wp(2.5),
  },
  serviceCompleteText:{
    fontSize: fp(3),
    color: '#fff',
    textAlign:'center',
    fontWeight:'600',
    letterSpacing:0.2,
  },
});

export default BusinessProfileSetup;
