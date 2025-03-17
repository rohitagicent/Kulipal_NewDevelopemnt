import React, {useEffect, useState, useMemo, useCallback, memo} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  FlatList,
  Platform,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../src/utils/colors';
import Icon from '../src/utils/icons';
import {fp} from '../src/utils/dimension';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Memoized smaller components
const TabItem = memo(({active, label, onPress}) => (
  <TouchableOpacity
    style={[styles.tabItem, active && styles.activeTab]}
    onPress={onPress}>
    <Text style={[styles.tabText, active && styles.activeTabText]}>
      {label}
    </Text>
  </TouchableOpacity>
));
const FilterTab = memo(({name, isActive, onToggle}) => (
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

const RestaurantItem = memo(({ name, image, onPress }) => (
  <TouchableOpacity style={styles.restaurantItem} onPress={onPress}>
    <Image
      source={{uri: image}}
      style={styles.restaurantImage}
      resizeMode="cover"
    />
    <Text style={styles.restaurantName}>{name}</Text>
  </TouchableOpacity>
));

const MoodItem = memo(({label, image}) => (
  <TouchableOpacity style={styles.moodItem}>
    <View style={styles.imageContainer}>
      <Image
        source={{uri: image}}
        style={styles.moodImage}
        resizeMode="cover"
      />
      <View style={styles.textOverlay}>
        <Text style={styles.moodLabel}>{label}</Text>
      </View>
    </View>
  </TouchableOpacity>
));

const RestaurantCard = memo(
  ({name, image, rating, reviews, hours, cuisine, location, distance}) => (
    <TouchableOpacity style={[styles.redCardWrapper, styles.shadowStyle]}>
      <View style={styles.restaurantCard}>
        <Image
          source={{uri: image}}
          style={styles.restaurantCardImage}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.favoriteButton}>
          <Icon name="favorite-border" size={fp(2.5)} color="#fff" />
        </TouchableOpacity>
        <View style={styles.deliveryInfo}>
          <Icon name="restaurant" size={fp(2.5)} color={colors.BLUE} />
          <Icon name="delivery-dining" size={fp(2.5)} color={colors.BLUE} />
          <Text style={styles.deliveryText}>Deliver/Dine-in</Text>
        </View>
        <View style={styles.restaurantInfo}>
          <View style={styles.infoHeader}>
            <Text style={styles.restaurantCardName}>{name}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>{rating}</Text>
              <Icon name="star" size={fp(2)} color="#FFD700" />
            </View>
          </View>

          <View
            style={[styles.ratingContainer, {justifyContent: 'space-between'}]}>
            <Text style={styles.hoursText}>{hours}</Text>
            <Text style={styles.reviewsText}>({reviews} Reviews)</Text>
          </View>
          <Text style={styles.cuisineText}>{cuisine}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.locationContainer}>
              <Icon name="location-on" size={fp(2)} color={colors.BLUE} />
              <Text style={styles.cardLocationText}>{location}</Text>
            </View>
            <View style={styles.distanceContainer}>
              <Icon name="directions-walk" size={fp(2)} color={colors.BLUE} />
              <Text style={styles.distanceText}>{distance} km Away</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  ),
);

// Main component
const HomeScreen = ({navigation}) => {
  const [selectedTabs, setSelectedTabs] = useState([]);
  const [activeMainTab, setActiveMainTab] = useState('Food');

  // Use callback for event handlers to prevent re-creation on each render
  const toggleTab = useCallback(tabName => {
    setSelectedTabs(prevTabs => {
      if (prevTabs.includes(tabName)) {
        return prevTabs.filter(tab => tab !== tabName);
      } else {
        return [...prevTabs, tabName];
      }
    });
  }, []);

  const handleMainTabPress = useCallback(tabName => {
    setActiveMainTab(tabName);
  }, []);

  // Memoize check function
  const isTabActive = useCallback(
    tabName => selectedTabs.includes(tabName),
    [selectedTabs],
  );

  // Status bar effect only runs once
  useEffect(() => {
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor('transparent');
  }, []);

  // Memoized data to prevent re-creating on every render
  const moodItems = useMemo(
    () => [
      {
        id: '1',
        label: 'Pizza',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
      },
      {
        id: '2',
        label: 'Biryani',
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8',
      },
      {
        id: '3',
        label: 'Burger',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
      },
    ],
    [],
  );

  const restaurants = useMemo(
    () => [
      {
        id: '1',
        name: 'Pizza Hut',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
      },
      {
        id: '2',
        name: "McDonald's",
        image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9',
      },
      {
        id: '3',
        name: 'Burger King',
        image: 'https://images.unsplash.com/photo-1559304822-9eb2813c9844',
      },
    ],
    [],
  );

  const restaurants2 = useMemo(
    () => [
      {
        id: '4',
        name: 'The Kitchen',
        image: 'https://images.unsplash.com/photo-1574936145840-28808d77a0b6',
      },
      {
        id: '5',
        name: 'Italian Best',
        image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb',
      },
      {
        id: '6',
        name: 'Taco Bells',
        image: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2',
      },
    ],
    [],
  );

  const featuredRestaurants = useMemo(
    () => [
      {
        id: '1',
        name: "Zoobi's Kitchen",
        image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88',
        rating: 4.3,
        reviews: 200,
        hours: '10:00am to 12:00pm',
        cuisine: 'Italian, Fast Food',
        location: 'Kola Adeyina, Lekki Phase',
        distance: 3.7,
      },
      {
        id: '2',
        name: 'Machan Lakeview',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
        rating: 4.3,
        reviews: 200,
        hours: 'Open 24 Hours',
        cuisine: 'Indian, Chinese',
        location: 'Kola Adeyina, Lekki Phase',
        distance: 3.7,
      },
    ],
    [],
  );

  const mainTabs = useMemo(
    () => [
      {id: '1', name: 'All'},
      {id: '2', name: 'Food'},
      {id: '3', name: 'Stay'},
      {id: '4', name: 'Events'},
    ],
    [],
  );

  const filterTabs = useMemo(
    () => [
      {id: '1', name: 'Dine-in'},
      {id: '2', name: 'Delivery'},
      {id: '3', name: 'Pickup'},
    ],
    [],
  );

  // Render optimized lists with FlatList
  const renderMoodItem = useCallback(
    ({item}) => <MoodItem label={item.label} image={item.image} />,
    [],
  );
  const handleRestaurantPress = (restaurant) => {
    navigation.navigate('RestaurantDetail', { restaurant });
  };
  
  const renderRestaurantItem = useCallback(
    ({item}) => <RestaurantItem name={item.name} image={item.image}       onPress={() => handleRestaurantPress(item)}
    />,
    [],
  );

  const renderMainTab = useCallback(
    ({item}) => (
      <TabItem
        label={item.name}
        active={activeMainTab === item.name}
        onPress={() => handleMainTabPress(item.name)}
      />
    ),
    [activeMainTab, handleMainTabPress],
  );

  const renderFilterTab = useCallback(
    ({item}) => (
      <FilterTab
        name={item.name}
        isActive={isTabActive(item.name)}
        onToggle={toggleTab}
      />
    ),
    [isTabActive, toggleTab],
  );

  // Memoized restaurant cards for better performance
  const restaurantCards = useMemo(
    () =>
      featuredRestaurants.map(restaurant => (
        <RestaurantCard
          key={restaurant.id}
          name={restaurant.name}
          image={restaurant.image}
          rating={restaurant.rating}
          reviews={restaurant.reviews}
          hours={restaurant.hours}
          cuisine={restaurant.cuisine}
          location={restaurant.location}
          distance={restaurant.distance}
        />
      )),
    [featuredRestaurants],
  );

  // Extract HeaderComponent for better organization
  const HeaderComponent = useMemo(
    () => (
      <View>
        
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          }}
          style={[
            styles.locationBarBackground,
            { 
              paddingTop: Platform.OS === 'ios' ? 50 : 0, // Add padding for iOS status bar
              marginTop: Platform.OS === 'ios' ? -50 : 0, // Negative margin to offset the padding
            }
          ]}
                resizeMode="cover">
          <FlatList
            data={mainTabs}
            renderItem={renderMainTab}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabBar}
            contentContainerStyle={{justifyContent: 'space-around'}}
          />

          <View style={styles.locationBarOverlay}>
            <View style={styles.locationInfo}>
              <Icon
                name="location-pin"
                type="Entypo"
                color={colors.WHITE}
                size={fp(3.5)}
              />
              <Text style={styles.locationText}>Current Location</Text>
            </View>
            <Text style={styles.locationSubText}>
              Lekki Phase 1 - Admiralty Way
            </Text>
            <View style={styles.locationIcons}>
            <View style={styles.iconWithBadge}>
    <TouchableOpacity style={styles.iconCircle}>
      <Icon name="shopping-cart" size={fp(3.5)} color="#fff" />
    </TouchableOpacity>
    <View style={styles.badge}>
      <Text style={styles.badgeText}>6</Text>
    </View>
  </View>
  <View style={styles.iconWithBadge}>
    <TouchableOpacity style={styles.iconCircle}>
      <Icon name="notifications" size={fp(3.5)} color="#fff" />
    </TouchableOpacity>
    <View style={styles.badge}>
      <Text style={styles.badgeText}>3</Text>
    </View>
  </View>

              <TouchableOpacity style={styles.iconCircle}>
                <Image
                  source={{
                    uri: 'https://randomuser.me/api/portraits/men/32.jpg',
                  }}
                  style={styles.profilePic}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Icon name="search" size={fp(3)} color="#51515199" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search for Pizza"
                placeholderTextColor="#51515199"
              />
              <Icon
                name="mic"
                type="Feather"
                color={colors.BLUE}
                size={fp(2.5)}
              />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Icon
                name="sliders"
                type="FontAwesome"
                color={colors.WHITE}
                size={fp(2.5)}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    ),
    [mainTabs, renderMainTab],
  );
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container} forceInset={{top: 'never'}}>
      <FlatList
        ListHeaderComponent={HeaderComponent}
        data={[{key: 'content'}]} // Only one item to render the main content
        renderItem={() => (
          <>
            <View style={styles.quickFilters}>
              <Text style={styles.quickFiltersTitle}>Quick Filters</Text>
              <View style={styles.tabBar1}>
                <TouchableOpacity
                  style={{
                    paddingVertical: hp(1.2),
                    paddingHorizontal: wp(7),
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
                <View style={[styles.tabBar1, {right: wp(10)}]}>
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

            <View style={styles.section}>
              <View style={[styles.sectionHeader, {justifyContent: 'center'}]}>
                <View style={styles.sectionWrapper}>
                  <View style={styles.line} />

                  <Text
                    style={[
                      styles.sectionTitle,
                      {textAlign: 'center', fontWeight: '600'},
                    ]}>
                    {' '}
                    Food Around You
                  </Text>

                  <View style={[styles.line, {left: wp(2)}]} />
                </View>
              </View>
              <Text style={styles.moodText}>What's Your Mood Today?</Text>
              <View style={styles.viewAllContainer}>
                <TouchableOpacity>
                  <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
              </View>

              <FlatList
                data={moodItems}
                renderItem={renderMoodItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.moodScroll}
              />
            </View>

            <View style={styles.section}>
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    textAlign: 'left',
                    left: wp(4),
                    color: colors.BLUE,
                    fontSize: fp(2.5),
                  },
                ]}>
                Exclusive Offers
              </Text>
              <TouchableOpacity style={styles.offerCard}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9',
                  }}
                  style={styles.offerImage}
                  resizeMode="cover"
                />
                <View style={styles.offerOverlay}>
                  <View style={styles.offerContent}>
                    <Text style={styles.offerTitle}>KOREAN FOOD</Text>
                    <Text style={styles.offerDescription}>
                      Embark To Taste of Authentic Korean Delicacies &
                      Experience Traditional Flavors, Textures, and Spices
                    </Text>
                    <Text style={styles.offerTime}>
                      OPEN DAILY 10 AM - 10 PM
                    </Text>
                    <TouchableOpacity style={styles.orderButton}>
                      <Text style={styles.orderButtonText}>ORDER NOW</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.offerDetails}>
                    <Text style={styles.deliveryFree}>
                      DELIVERY ORDER $50+ FREE
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.paginationDots}>
                <View style={[styles.dot, styles.activeDot]} />
                <View style={styles.dot} />
                <View style={styles.dot} />
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Popular Restaurants</Text>
                <TouchableOpacity>
                  <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
              </View>

              <FlatList
                data={restaurants}
                renderItem={renderRestaurantItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.restaurantsScroll}
              />

              <FlatList
                data={restaurants2}
                renderItem={renderRestaurantItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.restaurantsScroll}
              />
            </View>

            <View style={styles.featuredRestaurants}>{restaurantCards}</View>
          </>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  locationBarBackground: {
    width: '100%',
    height: hp(30),
    paddingTop: StatusBar.currentHeight || hp(4),
    paddingBottom: hp(2),
    borderBottomLeftRadius: wp(5),
    borderBottomRightRadius: wp(5),
    overflow: 'hidden',
  },
  locationBarOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(3),
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#fff',
    fontSize: fp(2),
    fontWeight: '600',
    marginLeft: wp(1),
    marginBottom: hp(1),
    bottom: hp(0.4),
  },
  locationSubText: {
    color: '#fff',
    fontSize: fp(1.4),
    position: 'absolute',
    top: hp(5),
    fontWeight: '500',
    marginLeft: wp(1),
    left: wp(10),
    paddingVertical: hp(0.3),
  },
  locationIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(1),
  },
  iconCircle: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(2),
  },

iconWithBadge: {
  position: 'relative',
  marginHorizontal: 5,
},



badge: {
  position: 'absolute',
  top: -5,     // positions it to the top
  right: -5,   // positions it to the right (45 degrees)
  backgroundColor: colors.WHITE,
  borderRadius: 10,
  borderColor:"black",
  borderWidth:1,
  height: 20,
  minWidth: 20,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 4,
  zIndex: 1,
},
badgeText: {
  color: 'black',
  fontSize: 12,
  fontWeight: 'bold',
},
  profilePic: {
    width: wp(7),
    height: wp(7),
    borderRadius: wp(4),
    marginLeft: wp(2),
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: wp(4),
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: wp(4),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.6),
    marginRight: wp(2),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    height: wp(12),

  },
  searchInput: {
    flex: 1,
    fontSize: fp(2),
    color: '#333',
    marginLeft: wp(2),
  },
  filterButton: {
    width: wp(12),
    paddingVertical: hp(0.6),
    height: wp(14),
    borderRadius: wp(4),
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    // paddingBottom: hp(8),
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomColor: '#eee',
  },
  tabBar1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#eee',
  },
  tabItem: {
    paddingVertical: hp(1),
    height:Platform.OS === "ios" ?  hp(4):hp(5),
    paddingHorizontal: wp(7),
    borderRadius: wp(3),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: wp(1),
    marginTop:hp(5)
  },
  tabItem1: {
    paddingVertical: hp(1.2),
    paddingHorizontal: Platform.OS === "ios" ? wp(4):wp(5),
    marginRight: wp(5),
    borderRadius: 20,
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
  tabText: {
    fontSize: fp(1.8),
    fontWeight: '500',
    color: 'white',
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
  quickFilters: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
  },
  quickFiltersTitle: {
    fontSize: fp(2),
    color: '#888',
    marginBottom: hp(0.5),
  },
  section: {
    marginVertical: hp(1.5),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    marginBottom: hp(1),
  },
  sectionTitle: {
    fontSize: RFValue(15),
    fontWeight: '700',
    color: colors.BLACK,
    textAlign: 'center',
  },
  sectionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionLine: {
    flex: 1, // stretch to fill space
    height: 3,
    backgroundColor: colors.BLUE, // blue line color
  },
  line: {
    flex: 1,
    height: hp(0.4),
    backgroundColor: colors.BLUE, // Medium blue color
  },
  viewAllContainer: {
    position: 'absolute',
    right: wp(4),
    top: hp(4),
    paddingVertical: hp(1.5),
  },
  viewAllText: {
    fontSize: RFValue(12),
    color: colors.BLUE,
    fontWeight: '600',
  },
  moodScroll: {
    paddingLeft: wp(4),
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
    fontSize: RFValue(12),
    fontWeight: '600',
    color: '#fff',
  },
  moodText: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    fontSize: RFValue(13),
    fontWeight: '600',
    color: '#333',
    marginBottom: hp(1),
  },
  offerCard: {
    position: 'relative',
    marginHorizontal: wp(4),
    height: hp(20),
    top: hp(1),
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  offerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  offerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: wp(4),
    justifyContent: 'space-between',
  },
  offerContent: {
    flex: 1,
  },
  offerTitle: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: hp(0.5),
  },
  offerDescription: {
    fontSize: RFValue(10),
    color: '#fff',
    width: '60%',
    marginBottom: hp(1),
  },
  offerTime: {
    fontSize: RFValue(10),
    color: '#fff',
    marginBottom: hp(1),
  },
  orderButton: {
    backgroundColor: '#fff',
    paddingVertical: hp(0.6),
    paddingHorizontal: wp(3),
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  orderButtonText: {
    fontSize: RFValue(10),
    fontWeight: '700',
    color: '#333',
  },
  offerDetails: {
    alignSelf: 'flex-end',
  },
  deliveryFree: {
    fontSize: RFValue(10),
    color: '#fff',
    fontWeight: '600',
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(1),
    top: hp(1),
  },
  dot: {
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
    backgroundColor: '#ddd',
    marginHorizontal: wp(1),
  },
  activeDot: {
    backgroundColor: '#4285F4',
    width: wp(4),
  },
  restaurantsScroll: {
    paddingLeft: wp(4),
    marginBottom: hp(1.5),
  },
  restaurantItem: {
    alignItems: 'center',
    marginRight: wp(4),
    width: wp(28),
  },
  restaurantImage: {
    width: wp(28),
    height: wp(25),
    borderRadius: 12,
    marginBottom: hp(0.5),
  },
  restaurantName: {
    fontSize: RFValue(11),
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  redCardWrapper: {
    backgroundColor: 'white',
    borderRadius: wp(2),
    padding: 10,
    marginVertical: hp(1),
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredRestaurants: {
    paddingHorizontal: wp(5),
  },
  restaurantCard: {
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  restaurantCardImage: {
    width: '100%',
    height: hp(30),
    borderRadius: wp(2),
  },
  favoriteButton: {
    position: 'absolute',
    top: hp(1),
    right: wp(3),
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryInfo: {
    position: 'absolute',
    bottom: hp(20) - hp(3),
    right: wp(3),
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryText: {
    fontSize: fp(1.6),
    color: '#333',
    marginLeft: wp(1),
    fontWeight: '500',
  },
  restaurantInfo: {
    padding: wp(3),
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(0.5),
  },
  restaurantCardName: {
    fontSize: fp(2.5),
    fontWeight: '700',
    color: '#333',
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
    fontSize: fp(1.6),
    color: '#888',
    marginLeft: wp(0.5),
  },
  hoursText: {
    fontSize: fp(1.6),
    color: colors.BLUE,
    fontWeight: '600',

    marginBottom: hp(0.5),
  },
  cuisineText: {
    fontSize: fp(1.6),
    color: colors.grattext,
    marginBottom: hp(0.5),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardLocationText: {
    fontSize: fp(1.6),
    color: colors.grattext,
    marginLeft: wp(1),
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: fp(1.7),
    color: colors.grattext,
    marginLeft: wp(1),
  },

  // Bottom Navigation
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: hp(1),
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: RFValue(10),
    color: '#888',
    marginTop: hp(0.3),
  },
  activeNavText: {
    color: '#4285F4',
    fontWeight: '600',
  },
});

export default HomeScreen;
