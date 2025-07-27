import { StyleSheet, TextInput, Pressable, Modal, View, SafeAreaView, ScrollView } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';

const dummyResults = [
  {
    sellerName: "ABC Suppliers",
    location: "https://maps.google.com/?q=1.3521,103.8198",
    contactNo: "+65 9123 4567",
    transportation: [
      { type: "Car", distance: 5, bulkPrice: 100 },
      { type: "Bike", distance: 5, bulkPrice: 80 },
      { type: "Walk", distance: 5, bulkPrice: 50 },
    ]
  },
 
];

export default function HomeScreen() {
  const [showMap, setShowMap] = useState(false);
  const [searchResults, setSearchResults] = useState<{ 
    sellerName: string; 
    location: string; 
    contactNo: string; 
    transportation: { 
      type: string; 
      distance: number; 
      bulkPrice: number; 
    }[]; 
  }[]>([]);
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: '',
    budgetPrice: '',
    location: '',
  });

  const handleSearch = () => {
    setSearchResults(dummyResults);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Main Search Area */}
        <View style={styles.searchContainer}>
          <ThemedText style={styles.searchTitle}>Find Suppliers</ThemedText>
          <ThemedText style={styles.searchSubtitle}>Get the best deals nearby</ThemedText>
          
          <View style={styles.searchForm}>
            <View style={styles.inputGroup}>
              <Ionicons name="search" size={20} color="#666" style={styles.inputIcon} />
              <TextInput 
                style={styles.input}
                placeholder="What are you looking for?"
                value={formData.itemName}
                onChangeText={(text) => setFormData({...formData, itemName: text})}
              />
            </View>
            
            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Ionicons name="cube" size={20} color="#666" style={styles.inputIcon} />
                <TextInput 
                  style={styles.input}
                  placeholder="Quantity"
                  keyboardType="numeric"
                  value={formData.quantity}
                  onChangeText={(text) => setFormData({...formData, quantity: text})}
                />
              </View>
              
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Ionicons name="cash" size={20} color="#666" style={styles.inputIcon} />
                <TextInput 
                  style={styles.input}
                  placeholder="Budget"
                  keyboardType="numeric"
                  value={formData.budgetPrice}
                  onChangeText={(text) => setFormData({...formData, budgetPrice: text})}
                />
              </View>
            </View>

            <Pressable 
              style={styles.locationButton}
              onPress={() => setShowMap(true)}>
              <Ionicons name="location" size={20} color="#666" />
              <ThemedText style={styles.locationText}>Select Location</ThemedText>
            </Pressable>

            <Pressable 
              style={styles.searchButton}
              onPress={handleSearch}>
              <ThemedText style={styles.buttonText}>Find Suppliers</ThemedText>
            </Pressable>
          </View>
        </View>

        
        {searchResults.map((result, index) => (
          <View key={index} style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <ThemedText style={styles.sellerName}>{result.sellerName}</ThemedText>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </View>
            <View style={styles.resultInfo}>
              <View style={styles.infoRow}>
                <Ionicons name="call" size={16} color="#666" />
                <ThemedText style={styles.infoText}>{result.contactNo}</ThemedText>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="location" size={16} color="#666" />
                <ThemedText style={styles.infoText}>View on Map</ThemedText>
              </View>
            </View>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <ThemedText style={styles.tableCell}>Transport</ThemedText>
                <ThemedText style={styles.tableCell}>Distance</ThemedText>
                <ThemedText style={styles.tableCell}>Total Amount</ThemedText>
              </View>
              {result.transportation.map((t, i) => (
                <View key={i} style={styles.tableRow}>
                  <ThemedText style={styles.tableCell}>{t.type}</ThemedText>
                  <ThemedText style={styles.tableCell}>{t.distance}km</ThemedText>
                  <ThemedText style={styles.tableCell}>
                    ${(t.distance * 10 + t.bulkPrice).toFixed(2)}
                  </ThemedText>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      
      <Modal visible={showMap} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.map}>
            <ThemedText>Map is unavailable</ThemedText>
          </View>
          <Pressable 
            style={styles.closeButton}
            onPress={() => setShowMap(false)}>
            <ThemedText>Close</ThemedText>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  searchTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  searchSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  searchForm: {
    gap: 16,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  locationText: {
    fontSize: 16,
    color: '#666',
  },
  searchButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    paddingBottom: 20,
    paddingTop: 12,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  navText: {
    fontSize: 12,
    color: '#666',
  },
  resultCard: {
    margin: 16,
    padding: 20,
    backgroundColor: '#000',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sellerName: {
    fontSize: 18,
    fontWeight: '600',
  },
  resultInfo: {
    gap: 8,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },
  table: {
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  tableCell: {
    flex: 1,
    fontSize: 15,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  map: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  closeButton: {
    position: 'absolute',
    top: 48,
    right: 20,
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
