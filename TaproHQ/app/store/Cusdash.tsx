import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Cusdash() {
  const [storeMode, setStoreMode] = useState<'Offline' | 'Online'>('Offline');
  const [travelMode, setTravelMode] = useState<'Walk' | 'Bus' | 'Vehicle'>('Walk');

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>LOGO</Text>
        <View style={styles.tabs}>
          <Text style={styles.tab}>Offline stores</Text>
          <Text style={styles.tab}>Online stores</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>Find Stores that Match to Your Budget</Text>

      {/* Input Fields */}
      <TextInput style={styles.input} placeholder="Location" />
      <TextInput style={styles.input} placeholder="Enter your Budget" keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="What do you want to buy?" />

      {/* Store Mode */}
      <TouchableOpacity style={styles.input}>
        <View style={styles.storeModeContainer}>
          <Text>Choose your store mode</Text>
          <Text style={styles.storeMode}>{storeMode}</Text>
        </View>
      </TouchableOpacity>

      {/* Travel Mode */}
      <Text style={styles.travelModeLabel}>Choose Travel Mode</Text>
      <View style={styles.travelModes}>
        {['Walk', 'Bus', 'Personal Vehicle'].map((mode) => (
          <TouchableOpacity
            key={mode}
            style={[
              styles.travelButton,
              travelMode === mode ? styles.selectedTravel : null,
            ]}
            onPress={() => setTravelMode(mode as any)}
          >
            <Text>{mode}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput placeholder="Find a Store or Route" style={styles.searchInput} />
        <FontAwesome name="search" size={20} color="black" />
      </View>

      {/* Example Shop Images (Optional for Your Layout) */}
      <View style={styles.shopExample}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100x100.png?text=Shop+1' }}
          style={styles.shopImage}
        />
        <Image
          source={{ uri: 'https://via.placeholder.com/100x100.png?text=Shop+2' }}
          style={styles.shopImage}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: { fontSize: 18, fontWeight: 'bold' },
  tabs: { flexDirection: 'row', gap: 20 },
  tab: { fontSize: 14 },
  title: { fontSize: 20, fontWeight: '600', textAlign: 'center', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  storeModeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  storeMode: {
    backgroundColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
  },
  travelModeLabel: {
    marginTop: 10,
    fontWeight: '500',
    marginBottom: 6,
  },
  travelModes: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  travelButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  selectedTravel: {
    backgroundColor: '#ddd',
    borderColor: '#000',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
  },
  shopExample: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginTop: 12,
  },
  shopImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});
