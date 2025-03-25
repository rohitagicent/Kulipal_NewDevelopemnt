import React, { useState, useMemo, useCallback, memo } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../utils/colors';
import Icon from '../utils/icons';
import {fp, wp, hp} from '../utils/dimension';
import {useNavigation} from '@react-navigation/native';

// Type definitions
interface Service {
  icon: string;
  label: string;
}

interface FilterTabProps {
  name: string;
  isActive: boolean;
  onToggle: (name: string) => void;
}

interface FilterTab {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  img: string;
}

interface RecommendedItem {
  id: number;
  name: string;
  price: string;
  rating: string;
  reviews: string;
  image: string;
  isVeg?: boolean;
}

const services: Service[] = [
  {icon: 'cube-outline', label: 'Take away'},
  {icon: 'bicycle', label: 'Deliver'},
];

const recommended: RecommendedItem[] = [
  {
    id: 1,
    name: 'Burger With Meat',
    price: '$45.00',
    rating: '4.9',
    reviews: '89',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349',
    isVeg: false,
  },
  {
    id: 2,
    name: 'Chicken Manchurian',
    price: '$17.00',
    rating: '4.9',
    reviews: '89',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349',
    isVeg: true,
  },
  {
    id: 3,
    name: 'Chicken Tacos',
    price: '$17.00',
    rating: '4.9',
    reviews: '89',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349',
  },
  {
    id: 4,
    name: 'Classic Cheeseburger',
    price: '$17.00',
    rating: '4.9',
    reviews: '89',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349',
    isVeg: false,
  },
  {
    id: 5,
    name: 'Nachos with Cheese',
    price: '$17.00',
    rating: '4.9',
    reviews: '89',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349',
    isVeg: true,
  },
  {
    id: 6,
    name: 'Bubble Tea',
    price: '$17.00',
    rating: '4.9',
    reviews: '89',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
    isVeg: true,
  },
];

const FilterTabComponent = memo(({name, isActive, onToggle}: FilterTabProps) => (
  <TouchableOpacity
    style={[styles.tabItem1, isActive && styles.activeTab1]}
    onPress={() => onToggle(name)}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text style={[styles.tabText1, isActive && styles.activeTabText1]}>
        {name}
      </Text>
      {isActive && (
        <Icon
          name="checkmark-circle-outline"
          type="Ionicons"
          color={colors.BLUE}
          size={fp(2)}
        />
      )}
    </View>
  </TouchableOpacity>
));

const RestaurantDetailScreen: React.FC = () => {
  const navigation = useNavigation();

  const [selectedTabs, setSelectedTabs] = useState<string[]>([]);
  
  const filterTabs = useMemo<FilterTab[]>(
    () => [
      {id: '1', name: 'Dine-in'},
      {id: '2', name: 'Delivery'},
      {id: '3', name: 'Pickup'},
      {id: '4', name: 'Dine-in'},
      {id: '5', name: 'Delivery'},
      {id: '6', name: 'Pickup'},
    ],
    [],
  );
  
  const toggleTab = useCallback((tabName: string) => {
    setSelectedTabs(prevTabs => {
      if (prevTabs.includes(tabName)) {
        return prevTabs.filter(tab => tab !== tabName);
      } else {
        return [...prevTabs, tabName];
      }
    });
  }, []);

  const isTabActive = useCallback(
    (tabName: string) => selectedTabs.includes(tabName),
    [selectedTabs],
  );
  
  const renderFilterTab = useCallback(
    ({item}: {item: FilterTab}) => (
      <FilterTabComponent
        name={item.name}
        isActive={isTabActive(item.name)}
        onToggle={toggleTab}
      />
    ),
    [isTabActive, toggleTab],
  );

  const categories = useMemo<Category[]>(
    () => [
      {
        id: '1',
        name: 'Pizza',
        img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
      },
      {
        id: '2',
        name: 'Biryani',
        img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8',
      },
      {
        id: '3',
        name: 'Burger',
        img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
      },
    ],
    [],
  );
  
  return (
    <ScrollView style={{flex: 1, backgroundColor: 'grey'}}>
      <View style={{height: 240, position: 'relative'}}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
          }}
          style={{width: '100%', height: 240}}
        />
        <View
          style={{
            position: 'absolute',
            top: 50,
            left: 20,
            right: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              padding: wp(1),
              borderRadius: wp(2),
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.goBack()}>
            {' '}
            <Icon
              name="left"
              type="AntDesign"
              color={colors.WHITE}
              size={fp(2.5)}
            />
          </TouchableOpacity>
          <View style={{flexDirection: 'row', gap: 16}}>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                padding: wp(1),
                borderRadius: wp(2),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                name="hearto"
                type="AntDesign"
                color={colors.WHITE}
                size={fp(2.5)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                padding: wp(1),
                borderRadius: wp(2),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {' '}
              <Icon
                name="share"
                type="MaterialCommunityIcons"
                color={colors.WHITE}
                size={fp(2.5)}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: colors.BLUE,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          marginTop: hp(-2),
        }}>
        <View style={{padding: wp(3)}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: fp(2.2),
                fontWeight: 'bold',
                color: colors.WHITE,
              }}>
              Bulgogi Bliss
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{fontSize: fp(2.5), color: colors.WHITE}}>
                4.3
              </Text>
              <Ionicons
                name="star"
                size={fp(2.2)}
                color="gold"
                style={{marginLeft: 4}}
              />
            </View>
          </View>
          <View
            style={[styles.ratingContainer, {justifyContent: 'space-between'}]}>
            <Text
              style={{
                color: colors.WHITE,
                marginTop: 4,
                fontSize: fp(1.8),
              }}>
              Open 24 Hours
            </Text>
            <Text style={styles.reviewsText}>(200 Reviews)</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // gap: hp(0.5),
            }}>
            <TouchableOpacity style={styles.tabButtonActive}>
              <Text style={styles.tabTextActive}>Overview</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabButton}>
              <Text style={styles.tabText}>Book A Table</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabButton}>
              <Text style={styles.tabText}>Takeaway</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabButton}>
              <Text style={styles.tabText}>Delivery</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            padding: wp(2),
            backgroundColor: colors.WHITE,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          }}>
          <Text
            style={{
              fontSize: fp(1.6),
              fontWeight: '500',
              marginTop: hp(1),
              color: colors.BLACK,
              padding: wp(2),
            }}>
            Services
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              padding: wp(2),
            }}>
            {services.map((service, index) => (
              <View
                key={index}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: wp(2),
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    padding: wp(3),
                    backgroundColor: '#F1F5FF',
                    borderRadius: wp(1),
                  }}>
                  <Ionicons name={service.icon} size={fp(3)} color="#007bff" />
                </View>
                <Text style={{marginTop: hp(1), fontWeight: '400'}}>
                  {service.label}
                </Text>
              </View>
            ))}
          </View>

          <Text
            style={{
              color: 'gray',
              fontWeight: '500',
              fontSize: fp(1.6),
              padding: wp(2),
            }}>
            Fast food
          </Text>
          <Text
            style={{
              marginVertical: hp(-1),
              fontWeight: '500',
              fontSize: fp(1.6),
              color: colors.BLACK,
              padding: wp(2),
            }}>
            Location
          </Text>

          <View style={{flexDirection: 'row', marginTop: hp(1)}}>
            <Icon
              name="location-pin"
              type="Entypo"
              color={colors.BLUE}
              size={fp(2.5)}
              style={{marginLeft: wp(2)}}
            />
            <Text
              style={{marginLeft: wp(2), color: 'black', fontWeight: '600'}}>
              30-35mins
            </Text>
            <Text
              style={{
                marginLeft: wp(2),
                marginHorizontal: wp(1),
                fontWeight: '600',
                color: 'black',
              }}>
              • 2.5km
            </Text>

            <Text
              style={{
                color: 'gray',
                marginHorizontal: wp(1),
                fontWeight: '500',
              }}>
              {' '}
              • Lekki Phase
            </Text>
            <Icon
              name="arrow-drop-down"
              type="MaterialIcons"
              color={colors.DARK_GRAY}
              size={fp(2.5)}
            />
          </View>
          <View
            style={{
              borderWidth: fp(0.1),
              borderColor: '#E4E4E4',
              marginVertical: hp(2),
            }}
          />
          <View style={styles.quickFilters}>
            <View style={styles.tabBar1}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: wp(5),
                  borderRadius: 20,
                  right: wp(5),
                }}>
                <Icon
                  name="sliders"
                  type="FontAwesome"
                  color={colors.DARK_GRAY}
                  size={fp(3)}
                />
              </TouchableOpacity>
              <View
                style={[styles.tabBar1, {right: wp(7), marginTop: hp(-0.5)}]}>
                <FlatList
                  data={filterTabs}
                  renderItem={renderFilterTab}
                  keyExtractor={item => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>
          </View>
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <View style={styles.leftSection}>
                <Icon name="search" size={fp(3)} color="#51515199" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search for Pizza"
                  placeholderTextColor="#51515199"
                />
              </View>
              <Icon
                name="mic"
                type="Feather"
                color={colors.BLUE}
                size={fp(2.5)}
              />
            </View>
          </View>

          <View style={{paddingHorizontal: wp(4)}}>
            <Text style={styles.sectionTitle}>Must Try</Text>
            <FlatList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                <TouchableOpacity style={styles.moodItem}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{uri: item.img}}
                      style={styles.moodImage}
                      resizeMode="cover"
                    />
                    <View style={styles.textOverlay}>
                      <Text style={styles.moodLabel}>{item.name}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>

          <View style={{paddingHorizontal: 16, marginTop: 16}}>
            <Text style={styles.sectionTitle}>Recommended for you</Text>
            {recommended.map(item => (
              <View key={item.id} style={styles.recommendedCard}>
                <View>
                  <Image
                    source={{uri: item.image}}
                    style={styles.recommendedImage}
                  />
                  <View style={{flexDirection: 'column', marginTop: 5}}>
                    <TouchableOpacity style={styles.addToCart}>
                      <Text style={styles.addToCartText}>Add to Cart</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.customizableButton}>
                      <Text style={styles.customizableText}>Customizable</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    marginLeft: 12,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{marginTop: hp(0.2)}}>
                    <View
                      style={[
                        styles.circle,
                        {
                          borderColor: item?.isVeg
                            ? colors.veg_Color
                            : colors.nonveg_color,
                        },
                      ]}>
                      <View
                        style={[
                          styles.innerCircle,
                          {
                            backgroundColor: item?.isVeg
                              ? colors.veg_Color
                              : colors.nonveg_color,
                          },
                        ]}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: hp(1),
                      }}>
                      <Text style={styles.recommendedTitle}>{item.name}</Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 4,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 4,
                        }}>
                        <Ionicons name="location" size={14} color="#ff3b30" />
                        <Text
                          style={{marginLeft: 4, color: 'gray', fontSize: 13}}>
                          190m
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 4,
                        }}>
                        <Ionicons name="star" size={14} color="gold" />
                        <Text
                          style={{marginLeft: 4, color: 'gray', fontSize: 13}}>
                          {item.rating} ({item.reviews})
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: hp(1),
                      }}>
                      <Text style={styles.recommendedPrice}>{item.price}</Text>
                    </View>
                  </View>
                  <Text style={styles.recommendedDesc} numberOfLines={2}>
                    Lorem ipsum dolor sit amet consectetur. Accum...
                    <Text style={{color: '#3b82f6'}}>more</Text>
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};


  const styles = StyleSheet.create({

  circle: {
    width: 16,
    height: 16,
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
  tabItem1: {
    paddingVertical: hp(0.7),
    paddingHorizontal: Platform.OS === 'ios' ? wp(4) : wp(3),
    marginRight: wp(3),
    borderRadius: wp(3),
    borderColor: '#E4E4E4',
    backgroundColor: 'white',
    borderWidth: wp(0.5),
  },
  activeTab1: {
    borderColor: colors.BLUE,
    borderWidth: wp(0.5),
    marginRight: wp(1),
  },
  activeTab: {
    backgroundColor: colors.BLUE,
  },
 
  tabText1: {
    fontSize: fp(2),
    fontWeight: '400',
    color: colors.gray,
    textAlign: 'center',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  activeTabText1: {
    color: colors.BLUE,
  },
  tabBar1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickFilters: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    marginVertical: hp(1),
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    borderRadius: wp(4),
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.3),
    borderWidth: wp(0.3),
    borderColor: '#E4E4E4',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: wp(4),
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: fp(2),
    marginLeft: wp(2),
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Take up remaining space
  },
  moodItem: {
    alignItems: 'center',
    marginRight: wp(4),
  },
  imageContainer: {
    width: wp(30),
    height: wp(30),
    borderRadius: wp(2.5),
    overflow: 'hidden',
    position: 'relative',
  },
  moodImage: {
    width: '100%',
    height: '100%',
    borderRadius: wp(2.5),
  },
  textOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodLabel: {
    fontSize: fp(2),
    fontWeight: '600',
    color: '#fff',
  },
  moodText: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    fontSize: fp(3),
    fontWeight: '600',
    color: '#333',
    marginBottom: hp(1),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: fp(2.5),
    fontWeight: '700',
    color: '#333',
    marginRight: wp(0.5),
  },
  reviewsText: {
    fontSize: fp(1.9),
    color: colors.WHITE,
    marginLeft: wp(0.5),
  },
  tabButton: {
    paddingVertical: hp(0.8),
    paddingHorizontal: wp(2.5),
    borderRadius: wp(5),
    backgroundColor: 'skyblue',
  },
  tabText: {color: 'white'},
  tabButtonActive: {
    // paddingVertical: hp(1),
    // paddingHorizontal: wp(3),
    // borderRadius: wp(3),
    paddingVertical: hp(0.8),
    paddingHorizontal: wp(2.5),
    borderRadius: wp(5),
    backgroundColor: 'white',
  },
  tabTextActive: {color: colors.BLUE, fontWeight: 'bold'},
  filterButton: {
    padding: 8,
    borderRadius: 16,
    backgroundColor: '#eee',
    marginRight: 8,
  },
  filterButtonActive: {
    padding: 8,
    borderRadius: 16,
    backgroundColor: '#007bff',
    marginRight: 8,
  },
  filterText: {color: 'gray'},
  filterTextActive: {color: '#fff'},
  sectionTitle: {fontSize: fp(2.8), fontWeight: 'bold', marginVertical: 12},
  categoryCard: {alignItems: 'center', marginRight: wp(4)},
  categoryImage: {width: '100%', height: 80, borderRadius: 8},
  categoryText: {textAlign: 'center', marginTop: 8},
  recommendedCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recommendedImage: {
    width: wp(35),
    height: hp(15),
    borderRadius: 10,
  },
  recommendedTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  recommendedPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 4,
  },
  recommendedDesc: {
    color: '#999',
    fontSize: 13,
    marginBottom: hp(5),
  },
  addToCart: {
    backgroundColor: '#3b82f6',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginTop: 5,
  },
  addToCartText: {
    color: 'white',
    fontWeight: '500',
  },
  customizableButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginTop: 8,
  },
  customizableText: {
    color: '#666',
    fontWeight: '400',
  },
});

export default RestaurantDetailScreen;
