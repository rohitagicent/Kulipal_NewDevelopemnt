import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import Icon from '../utils/icons';
import {colors} from '../utils/colors';
import {fp, wp, hp} from '../utils/dimension';
import FastImage from 'react-native-fast-image';

const {height} = Dimensions.get('window');

const FoodItemModal = ({isVisible, onClose, foodItem, onAddToCart}) => {
  console.log(foodItem, 'foodItem');
  const [quantity, setQuantity] = useState(1);
  const [slideAnim] = useState(new Animated.Value(height));

  React.useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, slideAnim]);

  const incrementQuantity = () => setQuantity(quantity + 1);

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart({...foodItem, quantity});
    onClose();
    setQuantity(1); // Reset quantity after adding to cart
  };

  // Calculate the total price based on quantity
  const totalPrice = foodItem
    ? parseFloat(foodItem.price.replace('$', '')) * quantity
    : 0;

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Animated.View
          style={[
            styles.modalContainer,
            {transform: [{translateY: slideAnim}]},
          ]}>
          <Pressable onPress={e => e.stopPropagation()}>
            <View style={styles.modalContent}>
              {/* Handle bar at top of modal */}
              {/* <View style={styles.handleBar} /> */}
              <TouchableOpacity
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  width: wp(8),
                  height: wp(8),
                  borderRadius: wp(4),
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  top: hp(-4),
                }}
                onPress={onClose}>
                {' '}
                <Icon
                  name="close"
                  type="AntDesign"
                  color={colors.WHITE}
                  size={fp(2.5)}
                />
              </TouchableOpacity>
              <View style={styles.foodDetails}>
                {/* <Image
                  source={{uri: foodItem?.image}}
                  style={styles.restaurantCardImage}
                  resizeMode="cover"
                /> */}
                  <FastImage
                  style={styles.restaurantCardImage}
                  source={{
            uri: foodItem?.image,
    priority: FastImage.priority.high,
  }}
  resizeMode={FastImage.resizeMode.cover}
/>
                <Text style={styles.foodTitle1}>{'Fast Food '}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.foodTitle}>
                    {foodItem?.name || 'Burger With Meat'}
                  </Text>
                  <Text style={styles.foodTitle}>{'$45.00'}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name="location-pin"
                    type="Entypo"
                    color={colors.BLUE}
                    size={fp(2.5)}
                  />
                  <Text
                    style={{
                      marginHorizontal: wp(1),
                      fontWeight: '600',
                      color: 'black',
                    }}>
                    2.5 km
                  </Text>

                  <Text
                    style={{
                      color: 'gray',
                      marginHorizontal: wp(1),
                      fontWeight: '500',
                    }}>
                    {' '}
                    Near sector 65 , Lekki Phase
                  </Text>
                </View>

                <View style={styles.container}>
                  {/* Delivery Time */}
                  <View style={styles.infoItem}>
                    <View style={styles.textContainer}>
                      <View style={styles.iconContainer}>
                        <Icon
                          name="time-outline"
                          type="Ionicons"
                          size={fp(2.2)}
                          color={colors.BLUE}
                        />
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.infoValue}>{'20min'} </Text>
                        <Text style={styles.infoLabel}>Delivery</Text>
                      </View>
                    </View>
                  </View>

                  {/* Rating */}
                  <View style={styles.infoItem}>
                    <View style={styles.textContainer}>
                      <View style={styles.iconContainer}>
                        <Icon
                          name="star"
                          type="Ionicons"
                          size={fp(2.2)}
                          color="#E6B323"
                        />
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.infoValue}>{'4.0'} </Text>
                        <Text style={styles.infoLabel}>Rating</Text>
                      </View>
                    </View>
                  </View>

                  {/* Vegetarian Status */}
                  <View style={styles.infoItem}>
                    <View style={styles.textContainer}>
                      <View
                        style={[
                          styles.circle,
                          {
                            borderColor: colors.veg_Color,
                          },
                        ]}>
                        <View
                          style={[
                            styles.innerCircle,
                            {
                              backgroundColor: colors.veg_Color,
                            },
                          ]}
                        />
                      </View>
                      <Text style={[styles.infoLabel, {top: hp(0.6)}]}>
                        {'Veg'}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text
                  style={[
                    styles.foodTitle,
                    {fontSize: fp(2.2), fontWeight: '500'},
                  ]}>
                  {'Description'}
                </Text>
                <Text style={styles.foodDescription}>
                  A juicy beef patty topped with melted cheddar cheese, fresh
                  lettuce, tomatoes, and our signature sauce, all packed in a
                  toasted brioche bun. Served with crispy golden fries.
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: 'white',
                  paddingHorizontal: wp(2),
                  shadowOffset: 5,
                  flexDirection: 'row',
                  elevation: 2,
                }}>
                <View style={[styles.quantityContainer]}>
                  <TouchableOpacity
                    style={styles.addButton1}
                    onPress={handleAddToCart}>
                    <TouchableOpacity
                      style={[
                        styles.quantityButton,
                        quantity === 1 && styles.quantityButtonDisabled,
                      ]}
                      onPress={decrementQuantity}
                      disabled={quantity === 1}>
                      <Icon
                        name="minus"
                        type="AntDesign"
                        color={quantity === 1 ? colors.WHITE : colors.WHITE}
                        size={fp(2.2)}
                      />
                    </TouchableOpacity>

                    <Text style={styles.quantityText}>{quantity}</Text>

                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={incrementQuantity}>
                      <Icon
                        name="plus"
                        type="AntDesign"
                        color={colors.WHITE}
                        size={fp(2.2)}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                </View>

                <View style={[styles.quantityContainer, {width: '55%'}]}>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAddToCart}>
                    <Text style={styles.addButtonText}>
                      Add Food ${totalPrice.toFixed(2)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: wp(4),
    height: hp(2),
    borderRadius: 4, // Rounded corners
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 8,
    height: 8,
    borderRadius: 2, // Rounded corners
  },
  restaurantCardImage: {
    height: hp(25),
    borderRadius: wp(5),
    bottom: hp(2),
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalContent: {
    padding: wp(4),
  },
  handleBar: {
    width: wp(12),
    height: hp(0.6),
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: hp(2),
  },
  foodDetails: {
    marginBottom: hp(3),
  },
  foodTitle: {
    fontSize: fp(2.8),
    fontWeight: 'bold',
    color: colors.BLACK,
    marginBottom: hp(1),
  },
  foodTitle1: {
    fontSize: fp(1.4),
    fontWeight: '400',
    color: colors.grattext,
  },
  foodDescription: {
    fontSize: fp(1.8),
    color: '#666',
    lineHeight: fp(2.4),
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(1),
    width: '45%',
  },
  quantityButton: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(6),
    borderWidth: 1,
    borderColor: colors.BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.BLUE,
  },
  quantityButtonDisabled: {
    borderColor: colors.DARK_GRAY,
  },
  quantityText: {
    marginHorizontal: wp(5),
    fontSize: fp(2.2),
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  addButton1: {
    borderColor: colors.BLUE,
    borderRadius: wp(2),
    borderWidth: wp(0.5),
    alignItems: 'center',
    justifyContent: 'center',
    height: wp(11),
    flexDirection: 'row',
    paddingHorizontal: hp(3),
  },
  addButton: {
    backgroundColor: colors.BLUE,
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
    height: wp(11),
    flexDirection: 'row',
    paddingHorizontal: hp(3),
  },
  addButtonText: {
    color: colors.WHITE,
    fontSize: fp(2),
    fontWeight: '500',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: wp(3),
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),
    marginVertical: hp(2),
  },
  infoItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),

    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(2),
  },
  vegIcon: {
    width: wp(5),
    height: wp(5),
    borderRadius: wp(2.5),
    borderWidth: 1,
    borderColor: colors.veg_Color,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'column',
  },
  infoValue: {
    fontSize: fp(1.6),
    fontWeight: '600',
    color: colors.BLACK,
  },
  infoLabel: {
    fontSize: fp(1.6),
    fontWeight: '500',

    color: colors.DARK_GRAY,
  },
});

export default FoodItemModal;
