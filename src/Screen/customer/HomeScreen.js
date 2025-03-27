import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  FlatList 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample data - in a real app, this would come from your API
  const categories = [
    { id: '1', name: 'Electronics', icon: 'laptop' },
    { id: '2', name: 'Fashion', icon: 'tshirt-crew' },
    { id: '3', name: 'Groceries', icon: 'food-apple' },
    { id: '4', name: 'Home', icon: 'sofa' },
    { id: '5', name: 'Beauty', icon: 'spray' },
    { id: '6', name: 'Sports', icon: 'basketball' },
  ];
  
  const featuredProducts = [
    { 
      id: '1', 
      name: 'Wireless Earbuds', 
      price: '₹1,999', 
      discount: '20%', 
      image: require('../../assests/mo.png'),
      rating: 4.5
    },
    { 
      id: '2', 
      name: 'Smart Watch', 
      price: '₹2,499', 
      discount: '15%', 
      image: require('../../assests/mo.png'),
      rating: 4.2
    },
    { 
      id: '3', 
      name: 'Laptop Backpack', 
      price: '₹1,299', 
      discount: '10%', 
      image: require('../../assests/mo.png'),
      rating: 4.7
    },
  ];
  
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.categoryItem}
      onPress={() => navigation.navigate('Categories', { category: item })}
    >
      <View style={styles.categoryIconContainer}>
        <Icon name={item.icon} size={24} color="#4CAF50" />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );
  
  const renderProductItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <View style={styles.discountBadge}>
        <Text style={styles.discountText}>{item.discount}</Text>
      </View>
      
      <Image source={item.image} style={styles.productImage} />
      
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <View style={styles.productPriceRow}>
          <Text style={styles.productPrice}>{item.price}</Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={14} color="#FFC107" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, User!</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileTab')}>
          <Image 
            source={require('../../assests/mo.png')} 
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <View style={styles.categoriesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>
      
      <View style={styles.banner}>
        <Image 
          source={require('../../assests/mo.png')} 
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </View>
      
      <View style={styles.productsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={featuredProducts}
          renderItem={renderProductItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsList}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginHorizontal: 15,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
  },
  categoriesSection: {
    marginVertical: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#4CAF50',
  },
  categoriesList: {
    paddingHorizontal: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 5,
    width: 70,
  },
  categoryIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
  banner: {
    height: 120,
    marginHorizontal: 15,
    marginVertical: 15,
    borderRadius: 8,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  productsSection: {
    marginVertical: 15,
  },
  productsList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  productItem: {
    width: 150,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginHorizontal: 5,
    padding: 10,
    position: 'relative',
  },
  discountBadge: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: '#FF5722',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 1,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 6,
    marginBottom: 10,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  productPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 2,
  },
});

export default HomeScreen;