import React, { useRef, useState, useCallback, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar, 
  FlatList
} from 'react-native';
import { fp, wp, hp } from '../../utils/dimension';
import { colors } from '../../utils/colors';
import Icon from '../../utils/icons';
import { useNavigation } from '@react-navigation/native';

type SlideItem = {
  key: string;
  description: string;
};

const SlideItem = React.memo(({ description }: { description: string }) => (
  <Text style={styles.subheading}>{description}</Text>
));

const PaginationDots = React.memo(({ 
  slides, 
  currentIndex 
}: { 
  slides: SlideItem[]; 
  currentIndex: number 
}) => (
  <View style={styles.paginationContainer}>
    {slides.map((_, index) => (
      <View
        key={index}
        style={[
          styles.paginationDot,
          currentIndex === index && styles.activeDot,
        ]}
      />
    ))}
  </View>
));

const KulipalBusinessScreen = () => {
  const navigation = useNavigation();
  const flatListRef = useRef<FlatList | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = useMemo(() => [
    {
      key: '1',
      description: 'Connect with customers seeking food, stay, and event services.',
    },
    {
      key: '2',
      description: 'Reach thousands of potential customers every day.',
    },
    {
      key: '3',
      description: 'Easily handle bookings, inquiries, and feedback in one place.',
    },
    {
      key: '4',
      description: 'Join Kulipal and take your business to the next level!',
    },
  ], []);

  const viewConfigRef = useRef({
    itemVisiblePercentThreshold: 50, // Add this line
  });  
  const onViewRef = useRef(({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const handleRegisterPress = useCallback(() => {
    navigation.navigate('LoginScreenVendor' as never);
  }, [navigation]);

  const renderItem = useCallback(({ item }: { item: SlideItem }) => (
    <SlideItem description={item.description} />
  ), []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assests/images/kpslogo.png')}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.imageContainer}>
        <Image 
          source={require('../../assests/images/bussinesslogo.png')} 
          style={styles.mainImage}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Grow Your Business With Ease!</Text>
        <FlatList
          ref={flatListRef}
          data={slides}
          keyExtractor={(item) => item.key}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          renderItem={renderItem}
        />
      </View>

      <PaginationDots slides={slides} currentIndex={currentIndex} />
      
      <TouchableOpacity 
        style={styles.registerButton}   
        onPress={handleRegisterPress}
      >
        <Text style={styles.buttonText}>Register Your Business</Text>
        <Icon
          name="doubleright"
          type="AntDesign"
          color={colors.WHITE}
          size={fp(2.2)}
          style={styles.buttonIcon}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: hp(10),
    alignItems: 'center',
  },
  imageContainer: {
    width: '40%',
    height: hp(25),
    marginTop: hp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    marginTop: hp(2),
    width: '90%',
    alignItems: 'center',
  },
  heading: {
    fontSize: fp(2.5),
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subheading: {
    fontSize: fp(1.8),
    color: '#666',
    textAlign: 'center',
    lineHeight: hp(2),
    width: wp(100),
    paddingHorizontal: wp(5),
  },
  paginationContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DDDDDD',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.BLUE,
  },
  registerButton: {
    marginTop: hp(20),
    backgroundColor: colors.BLUE,
    width: '80%',
    height: hp(7),
    borderRadius: wp(7),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: fp(2.2),
    fontWeight: '500',
  },
  buttonIcon: {
    left: wp(4)
  }
});

export default React.memo(KulipalBusinessScreen);