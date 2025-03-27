import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const DashboardScreen = () => {
  // Sample data - in a real app, this would come from your API
  const stats = {
    totalSales: '₹25,750',
    totalOrders: 47,
    pendingOrders: 5,
    totalProducts: 23
  };

  const recentOrders = [
    { id: 'ORD001', customer: 'Amit Kumar', amount: '₹1,250', status: 'Pending' },
    { id: 'ORD002', customer: 'Priya Singh', amount: '₹750', status: 'Delivered' },
    { id: 'ORD003', customer: 'Rahul Sharma', amount: '₹2,100', status: 'Processing' }
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, Vendor!</Text>
      <Text style={styles.dateText}>Today: {new Date().toDateString()}</Text>
      
      <View style={styles.statsContainer}>
        {/* <Card style={styles.statsCard}>
          <Text style={styles.statValue}>{stats.totalSales}</Text>
          <Text style={styles.statLabel}>Total Sales</Text>
        </Card>
        
        <Card style={styles.statsCard}>
          <Text style={styles.statValue}>{stats.totalOrders}</Text>
          <Text style={styles.statLabel}>Total Orders</Text>
        </Card>
        
        <Card style={styles.statsCard}>
          <Text style={styles.statValue}>{stats.pendingOrders}</Text>
          <Text style={styles.statLabel}>Pending Orders</Text>
        </Card>
        
        <Card style={styles.statsCard}>
          <Text style={styles.statValue}>{stats.totalProducts}</Text>
          <Text style={styles.statLabel}>Products</Text>
        </Card> */}
      </View>
      
      <Text style={styles.sectionTitle}>Recent Orders</Text>
      
      <View style={styles.ordersContainer}>
        {/* {recentOrders.map(order => (
          <Card key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>{order.id}</Text>
              <Text style={[
                styles.orderStatus,
                order.status === 'Delivered' && styles.statusDelivered,
                order.status === 'Pending' && styles.statusPending,
                order.status === 'Processing' && styles.statusProcessing
              ]}>
                {order.status}
              </Text>
            </View>
            
            <View style={styles.orderDetails}>
              <Text style={styles.customerName}>{order.customer}</Text>
              <Text style={styles.orderAmount}>{order.amount}</Text>
            </View>
          </Card>
        ))} */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 15,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statsCard: {
    width: '48%',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  ordersContainer: {
    marginBottom: 20,
  },
  orderCard: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  orderStatus: {
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  statusDelivered: {
    backgroundColor: '#E8F5E9',
    color: '#4CAF50',
  },
  statusPending: {
    backgroundColor: '#FFF8E1',
    color: '#FFA000',
  },
  statusProcessing: {
    backgroundColor: '#E3F2FD',
    color: '#2196F3',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customerName: {
    fontSize: 14,
    color: '#555',
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default DashboardScreen;