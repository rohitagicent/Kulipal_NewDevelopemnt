import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

interface BusinessProfileProps{
  navigation: any;
}

const BusinessProfileSetup: React.FC<BusinessProfileProps> = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  return (
    <View>
      <Text>BusinessProfileSetup</Text>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default BusinessProfileSetup;