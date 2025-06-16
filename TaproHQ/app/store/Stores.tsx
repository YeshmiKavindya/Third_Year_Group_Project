import { Ionicons } from '@expo/vector-icons'; // for location icon
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Stores(){
    const stores = [
    {
      name: 'Pizza Delight - Kandy',
      items: ['🍕 Pizza', '🍟 Fries', '🥤 Coke'],
      price: '4800',
    },
    {
      name: 'Bake House - Kandy',
      items: ['🍕 Pizza', '🍔 Burger'],
      price: '4500',
	   
    },
  ];
    return(
        <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>TaproHQ</Text>
        <View style={styles.nav}>
          <Text style={styles.navItem}>Offline Stores</Text>
          <Text style={styles.navItem}>Online Stores</Text>
        </View>
      </View>

      {/* Location & Title */}
      <View style={styles.locationRow}>
        <Ionicons name="location-outline" size={20} color="black" />
        <Text style={styles.locationText}>Use your current location</Text>
      </View>
      <Text style={styles.title}>Available Stores in Your Area</Text>

      {/* Store Cards */}
      {stores.map((store, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.cardImagePlaceholder} />
          <View style={styles.cardContent}>
            <Text style={styles.storeName}>{store.name}</Text>
            <Text style={styles.items}>
              Available Items: {store.items.join(', ')}
            </Text>
            <Text style={styles.price}>Price: {store.price}</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View Routes & Directions</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f0ff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  nav: {
    flexDirection: 'row',
    gap: 12,
  },
  navItem: {
    fontSize: 14,
    fontWeight: '500',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  locationText: {
    marginLeft: 6,
    fontSize: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 16,
    padding: 12,
  },
  cardImagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#ccc',
    marginBottom: 12,
  },
  cardContent: {
    marginBottom: 8,
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  items: {
    fontSize: 14,
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    marginTop: 2,
    color: '#1a8917',
  },
  button: {
    backgroundColor: '#444',
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
