import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NavigationScreen = () => {
  const [selectedMode, setSelectedMode] = useState('drive');
  
  const travelModes = [
    { id: 'walk', icon: 'directions-walk', label: 'Walk', time: '45 min', cost: 'Free' },
    { id: 'bus', icon: 'directions-bus', label: 'Bus', time: '25 min', cost: 'Rs. 50' },
    { id: 'drive', icon: 'directions-car', label: 'Drive', time: '15 min', cost: 'Rs. 150' },
    { id: 'bike', icon: 'pedal-bike', label: 'Bike', time: '30 min', cost: 'Free' },
  ];

  const reviews = [
    { id: '1', name: 'David', comment: 'Great store selection and easy access', rating: 5 },
    { id: '2', name: 'Priya', comment: 'Saved 20% on my grocery bill using bulk recommendations', rating: 4 },
    { id: '3', name: 'Rahul', comment: 'Route optimization saved me 15 minutes commute time', rating: 5 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Navigation</Text>
        </View>
        
        {/* Map Section */}
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapText}>ROUTE PREVIEW</Text>
            <Icon name="map" size={50} color="#3498db" />
          </View>
          
          <View style={styles.routeInfo}>
            <View style={styles.routeDetail}>
              <View style={styles.dot} />
              <Text style={styles.locationText}>Your Location</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.routeDetail}>
              <View style={[styles.dot, styles.destination]} />
              <Text style={styles.locationText}>Pizza Delight</Text>
            </View>
          </View>
        </View>
        
        {/* Travel Modes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Travel Mode</Text>
          <View style={styles.modesContainer}>
            {travelModes.map(mode => (
              <TouchableOpacity
                key={mode.id}
                style={[
                  styles.modeCard,
                  selectedMode === mode.id && styles.selectedMode
                ]}
                onPress={() => setSelectedMode(mode.id)}
              >
                <Icon 
                  name={mode.icon} 
                  size={36} 
                  color={selectedMode === mode.id ? '#3498db' : '#7f8c8d'} 
                />
                <Text style={[
                  styles.modeLabel,
                  selectedMode === mode.id && styles.selectedText
                ]}>
                  {mode.label}
                </Text>
                <Text style={styles.modeTime}>{mode.time}</Text>
                <Text style={styles.modeCost}>{mode.cost}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Route Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="bookmark" size={24} color="#3498db" />
            <Text style={styles.actionText}>Save Route</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="share" size={24} color="#2ecc71" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.startButton]}>
            <Icon name="navigation" size={24} color="white" />
            <Text style={[styles.actionText, { color: 'white' }]}>Start</Text>
          </TouchableOpacity>
        </View>
        
        {/* User Reviews */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Reviews</Text>
          {reviews.map(review => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewName}>{review.name}</Text>
                <View style={styles.rating}>
                  <Text style={styles.ratingText}>{review.rating}</Text>
                  <Icon name="star" size={16} color="#f1c40f" />
                </View>
              </View>
              <Text style={styles.reviewText}>{review.comment}</Text>
            </View>
          ))}
        </View>
        
        {/* Store Finder */}
        <View style={styles.finderContainer}>
          <Text style={styles.sectionTitle}>Find a Store or Route</Text>
          <View style={styles.searchBox}>
            <Icon name="search" size={24} color="#7f8c8d" />
            <Text style={styles.searchText}>Search for stores or enter route</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  mapContainer: {
    margin: 15,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  mapPlaceholder: {
    height: 250,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 10,
  },
  routeInfo: {
    padding: 20,
  },
  routeDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3498db',
    marginRight: 10,
  },
  destination: {
    backgroundColor: '#e74c3c',
  },
  locationText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  divider: {
    height: 20,
    width: 2,
    backgroundColor: '#bdc3c7',
    marginLeft: 5,
    marginVertical: 5,
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  modesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  modeCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedMode: {
    borderWidth: 2,
    borderColor: '#3498db',
    backgroundColor: '#e3f2fd',
  },
  modeLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    color: '#2c3e50',
  },
  selectedText: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  modeTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  modeCost: {
    color: '#7f8c8d',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  startButton: {
    backgroundColor: '#3498db',
  },
  actionText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: '500',
    color: '#2c3e50',
  },
  reviewCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  reviewName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
    color: '#2c3e50',
  },
  reviewText: {
    fontSize: 16,
    color: '#7f8c8d',
    lineHeight: 24,
  },
  finderContainer: {
    padding: 15,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#7f8c8d',
  },
});

export default NavigationScreen;