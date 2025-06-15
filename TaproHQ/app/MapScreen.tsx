import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MapScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  
  

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>TAPRO</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Icon name="settings" size={28} color="#2c3e50" />
        </TouchableOpacity>
      </View>
      
      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={styles.tabText}>Offline Stores</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Online Stores</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView>
        {/* Map Section */}
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapText}>MAP VIEW</Text>
            <Icon name="location-pin" size={50} color="#3498db" />
          </View>
          <Text style={styles.sectionTitle}>Explore Nearby Stores and Routes</Text>
        </View>
        
        {/* Recommended Stores */}
        <Text style={styles.sectionHeader}>Recommended Stores <Text style={styles.openNow}>Open Now</Text></Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storeScroll}>
          {stores.map(store => (
            <TouchableOpacity key={store.id} style={styles.storeCard}>
              <Image source={store.image} style={styles.storeImage} />
              <Text style={styles.storeName}>{store.name}</Text>
              <Text style={styles.storeDistance}>{store.distance} away</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* Search Section */}
        <View style={styles.searchContainer}>
          <Text style={styles.sectionHeader}>Search for a destination</Text>
          <View style={styles.searchBox}>
            <Icon name="search" size={24} color="#7f8c8d" />
            <TextInput
              style={styles.searchInput}
              placeholder="Enter location"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>
        
        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="bookmark" size={24} color="#3498db" />
            <Text style={styles.actionText}>Save Route</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="share" size={24} color="#2ecc71" />
            <Text style={styles.actionText}>Share Directions</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.navButton]}
            onPress={() => navigation.navigate('Navigation')}
          >
            <Icon name="navigation" size={24} color="white" />
            <Text style={[styles.actionText, { color: 'white' }]}>Start Navigation</Text>
          </TouchableOpacity>
        </View>
        
        {/* Quick Stats */}
        <TouchableOpacity 
          style={styles.statsPreview}
          onPress={() => navigation.navigate('Stats')}
        >
          <Text style={styles.sectionHeader}>Travel Stats</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>10 km</Text>
              <Text style={styles.statLabel}>Distance Travelled</Text>
              <Text style={styles.statChange}>+10% this week</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>15 litres</Text>
              <Text style={styles.statLabel}>Fuel Consumption</Text>
              <Text style={[styles.statChange, styles.positiveChange]}>-20% this week</Text>
            </View>
          </View>
          <View style={styles.fuelPrice}>
            <Text style={styles.priceLabel}>Rs. 299.00/litre</Text>
            <Text style={styles.priceTotal}>Your total fuel consumption Rs.4485.00</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={24} color="#3498db" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="near-me" size={24} color="#7f8c8d" />
          <Text style={styles.navText}>Nearby</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="store" size={24} color="#7f8c8d" />
          <Text style={styles.navText}>Stores</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="route" size={24} color="#7f8c8d" />
          <Text style={styles.navText}>Routes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#3498db',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  mapContainer: {
    padding: 15,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 15,
  },
  mapText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2c3e50',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    marginBottom: 10,
    color: '#2c3e50',
  },
  openNow: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#27ae60',
  },
  storeScroll: {
    paddingLeft: 15,
    marginBottom: 20,
  },
  storeCard: {
    width: 150,
    marginRight: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  storeImage: {
    width: '100%',
    height: 100,
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
  storeDistance: {
    padding: 10,
    paddingTop: 0,
    color: '#7f8c8d',
  },
  searchContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  navButton: {
    backgroundColor: '#3498db',
  },
  actionText: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
    color: '#2c3e50',
  },
  statsPreview: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statItem: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  statLabel: {
    color: '#7f8c8d',
    marginVertical: 5,
  },
  statChange: {
    color: '#e74c3c',
    fontSize: 12,
  },
  positiveChange: {
    color: '#27ae60',
  },
  fuelPrice: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 10,
  },
  priceLabel: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  priceTotal: {
    marginTop: 5,
    color: '#7f8c8d',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 5,
    color: '#7f8c8d',
  },
});

export default MapScreen;