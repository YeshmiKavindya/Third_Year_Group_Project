import { StyleSheet, TextInput, Pressable, Modal, View, SafeAreaView, ScrollView, Linking, Platform } from 'react-native';
import { useState, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

import { ThemedText } from '../compos/ThemedText';
import HeaderBarNew from '../compos/HeaderBarNew';


const dummyResults = [
  {
    sellerName: "ABC Suppliers",
    location: "https://maps.google.com/?q=1.3521,103.8198",
    contactNo: "+65 9123 4567", 
    item: "Office Supplies",
    keywords: ["paper", "pens", "notebooks", "staplers", "folders", "office", "stationery"],
    basePrice: 25,
    discountTiers: [
      { minQuantity: 10, discountPercent: 5 },
      { minQuantity: 25, discountPercent: 10 },
      { minQuantity: 50, discountPercent: 15 },
      { minQuantity: 100, discountPercent: 20 }
    ],
    transportation: [
      { type: "Car", distance: 5, bulkPrice: 100 },
      { type: "Bike", distance: 5, bulkPrice: 80 },
      { type: "Walk", distance: 5, bulkPrice: 50 },
    ]
  },
  {
    sellerName: "Mobile World",
    location: "https://maps.google.com/?q=1.3521,103.8198",
    contactNo: "+65 9123 4567",
    item: "Samsung S21",
    keywords: ["samsung", "s21", "phone", "mobile", "smartphone", "android", "galaxy"],
    basePrice: 1299,
    discountTiers: [
      { minQuantity: 2, discountPercent: 5 },
      { minQuantity: 5, discountPercent: 10 },
      { minQuantity: 10, discountPercent: 15 },
      { minQuantity: 20, discountPercent: 20 }
    ],
    transportation: [
      { type: "Car", distance: 4.2, bulkPrice: 90 },
      { type: "Bike", distance: 4.2, bulkPrice: 70 },
      { type: "Walk", distance: 4.2, bulkPrice: 45 },
    ]
  },
  {
    sellerName: "Budget Phones",
    location: "https://maps.google.com/?q=1.3521,103.8198", 
    contactNo: "+65 9123 4567",
    item: "Samsung A21",
    keywords: ["samsung", "a21", "phone", "mobile", "smartphone", "android", "galaxy", "budget"],
    basePrice: 299,
    discountTiers: [
      { minQuantity: 3, discountPercent: 5 },
      { minQuantity: 8, discountPercent: 10 },
      { minQuantity: 15, discountPercent: 15 },
      { minQuantity: 25, discountPercent: 20 }
    ],
    transportation: [
      { type: "Car", distance: 3.8, bulkPrice: 85 },
      { type: "Bike", distance: 3.8, bulkPrice: 65 },
      { type: "Walk", distance: 3.8, bulkPrice: 40 },
    ]
  },
  {
    sellerName: "TechMart Electronics",
    location: "https://maps.google.com/?q=1.2985,103.8494",
    contactNo: "+65 8234 5678",
    item: "Laptops",
    keywords: ["computer", "laptop", "notebook", "macbook", "dell", "hp", "lenovo", "electronics"],
    basePrice: 1200,
    discountTiers: [
      { minQuantity: 5, discountPercent: 8 },
      { minQuantity: 10, discountPercent: 12 },
      { minQuantity: 20, discountPercent: 18 },
      { minQuantity: 50, discountPercent: 25 }
    ],
    transportation: [
      { type: "Car", distance: 3.2, bulkPrice: 85 },
      { type: "Bike", distance: 3.2, bulkPrice: 65 },
      { type: "Walk", distance: 3.2, bulkPrice: 35 },
    ]
  },
  {
    sellerName: "FreshFarm Produce Co.",
    location: "https://maps.google.com/?q=1.3158,103.8160",
    contactNo: "+65 7345 6789",
    item: "Organic Vegetables",
    keywords: ["vegetables", "organic", "fresh", "greens", "carrots", "tomatoes", "produce", "farm"],
    basePrice: 15,
    discountTiers: [
      { minQuantity: 20, discountPercent: 10 },
      { minQuantity: 50, discountPercent: 15 },
      { minQuantity: 100, discountPercent: 20 },
      { minQuantity: 200, discountPercent: 25 }
    ],
    transportation: [
      { type: "Car", distance: 7.8, bulkPrice: 120 },
      { type: "Bike", distance: 7.8, bulkPrice: 95 },
      { type: "Walk", distance: 7.8, bulkPrice: 60 },
    ]
  },
  {
    sellerName: "BuildRight Hardware",
    location: "https://maps.google.com/?q=1.2841,103.8435",
    contactNo: "+65 6456 7890",
    item: "Power Tools",
    keywords: ["drill", "saw", "hammer", "tools", "hardware", "construction", "building", "power tools"],
    basePrice: 180,
    discountTiers: [
      { minQuantity: 5, discountPercent: 12 },
      { minQuantity: 15, discountPercent: 18 },
      { minQuantity: 30, discountPercent: 22 },
      { minQuantity: 50, discountPercent: 28 }
    ],
    transportation: [
      { type: "Car", distance: 4.5, bulkPrice: 90 },
      { type: "Bike", distance: 4.5, bulkPrice: 70 },
      { type: "Walk", distance: 4.5, bulkPrice: 45 },
    ]
  },
  {
    sellerName: "Fashion Forward Textiles",
    location: "https://maps.google.com/?q=1.3279,103.8072",
    contactNo: "+65 5567 8901",
    item: "Cotton Fabric",
    keywords: ["fabric", "cotton", "textile", "cloth", "material", "fashion", "sewing", "design"],
    basePrice: 45,
    discountTiers: [
      { minQuantity: 10, discountPercent: 8 },
      { minQuantity: 25, discountPercent: 12 },
      { minQuantity: 50, discountPercent: 18 },
      { minQuantity: 100, discountPercent: 25 }
    ],
    transportation: [
      { type: "Car", distance: 6.1, bulkPrice: 110 },
      { type: "Bike", distance: 6.1, bulkPrice: 88 },
      { type: "Walk", distance: 6.1, bulkPrice: 55 },
    ]
  },
  {
    sellerName: "Green Energy Solutions",
    location: "https://maps.google.com/?q=1.3021,103.8318",
    contactNo: "+65 4678 9012",
    item: "Solar Panels",
    keywords: ["solar", "energy", "renewable", "panels", "green", "eco", "sustainable", "power"],
    basePrice: 800,
    discountTiers: [
      { minQuantity: 3, discountPercent: 15 },
      { minQuantity: 8, discountPercent: 20 },
      { minQuantity: 15, discountPercent: 25 },
      { minQuantity: 30, discountPercent: 30 }
    ],
    transportation: [
      { type: "Car", distance: 2.8, bulkPrice: 75 },
      { type: "Bike", distance: 2.8, bulkPrice: 58 },
      { type: "Walk", distance: 2.8, bulkPrice: 32 },
    ]
  },
  {
    sellerName: "Ocean Fresh Seafood",
    location: "https://maps.google.com/?q=1.2897,103.8501",
    contactNo: "+65 3789 0123",
    item: "Fresh Fish",
    keywords: ["fish", "seafood", "fresh", "salmon", "tuna", "ocean", "marine", "catch"],
    basePrice: 35,
    discountTiers: [
      { minQuantity: 15, discountPercent: 12 },
      { minQuantity: 30, discountPercent: 18 },
      { minQuantity: 60, discountPercent: 22 },
      { minQuantity: 100, discountPercent: 28 }
    ],
    transportation: [
      { type: "Car", distance: 8.3, bulkPrice: 135 },
      { type: "Bike", distance: 8.3, bulkPrice: 105 },
      { type: "Walk", distance: 8.3, bulkPrice: 68 },
    ]
  },
  {
    sellerName: "Digital Dynamics IT",
    location: "https://maps.google.com/?q=1.3187,103.8254",
    contactNo: "+65 2890 1234",
    item: "Software Licenses",
    keywords: ["software", "license", "it", "digital", "technology", "computer", "program", "system"],
    basePrice: 150,
    discountTiers: [
      { minQuantity: 5, discountPercent: 20 },
      { minQuantity: 15, discountPercent: 30 },
      { minQuantity: 30, discountPercent: 40 },
      { minQuantity: 50, discountPercent: 50 }
    ],
    transportation: [
      { type: "Car", distance: 1.9, bulkPrice: 65 },
      { type: "Bike", distance: 1.9, bulkPrice: 48 },
      { type: "Walk", distance: 1.9, bulkPrice: 28 },
    ]
  },
  {
    sellerName: "Artisan Coffee Beans",
    location: "https://maps.google.com/?q=1.3069,103.8387",
    contactNo: "+65 1901 2345",
    item: "Premium Coffee Beans",
    keywords: ["coffee", "beans", "premium", "artisan", "arabica", "roasted", "brewing", "cafe"],
    basePrice: 28,
    discountTiers: [
      { minQuantity: 10, discountPercent: 8 },
      { minQuantity: 25, discountPercent: 12 },
      { minQuantity: 50, discountPercent: 18 },
      { minQuantity: 100, discountPercent: 25 }
    ],
    transportation: [
      { type: "Car", distance: 3.7, bulkPrice: 82 },
      { type: "Bike", distance: 3.7, bulkPrice: 63 },
      { type: "Walk", distance: 3.7, bulkPrice: 38 },
    ]
  },
  {
    sellerName: "Smart Home Innovations",
    location: "https://maps.google.com/?q=1.2953,103.8562",
    contactNo: "+65 9012 3456",
    item: "Smart Speakers",
    keywords: ["smart", "speaker", "home", "automation", "ai", "voice", "assistant", "iot"],
    basePrice: 120,
    discountTiers: [
      { minQuantity: 5, discountPercent: 10 },
      { minQuantity: 15, discountPercent: 15 },
      { minQuantity: 30, discountPercent: 20 },
      { minQuantity: 50, discountPercent: 25 }
    ],
    transportation: [
      { type: "Car", distance: 5.4, bulkPrice: 95 },
      { type: "Bike", distance: 5.4, bulkPrice: 75 },
      { type: "Walk", distance: 5.4, bulkPrice: 48 },
    ]
  },
];

export default function HomeScreen() {
  const [showMap, setShowMap] = useState(false);
  const [searchResults, setSearchResults] = useState<{ 
    sellerName: string; 
    location: string; 
    contactNo: string; 
    item: string;
    keywords: string[];
    basePrice: number;
    discountTiers: { minQuantity: number; discountPercent: number }[];
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
  const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const calculateDiscount = (quantity: number, discountTiers: { minQuantity: number; discountPercent: number }[]) => {
    let applicableDiscount = 0;
    for (let i = discountTiers.length - 1; i >= 0; i--) {
      if (quantity >= discountTiers[i].minQuantity) {
        applicableDiscount = discountTiers[i].discountPercent;
        break;
      }
    }
    return applicableDiscount;
  };

  const getNextDiscountTier = (quantity: number, discountTiers: { minQuantity: number; discountPercent: number }[]) => {
    for (const tier of discountTiers) {
      if (quantity < tier.minQuantity) {
        return tier;
      }
    }
    return null;
  };

  const handleSearch = () => {
    if (!formData.itemName.trim()) {
      setSearchResults(dummyResults);
      return;
    }
    
    const searchTerm = formData.itemName.toLowerCase();
    const filteredResults = dummyResults.filter(result => 
      result.item.toLowerCase().includes(searchTerm) ||
      result.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm)) ||
      result.sellerName.toLowerCase().includes(searchTerm)
    );
    
    setSearchResults(filteredResults);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Main Search Area */}
        <HeaderBarNew />
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

        
        {searchResults.map((result, index) => {
          const userQuantity = parseInt(formData.quantity) || 0;
          const currentDiscount = calculateDiscount(userQuantity, result.discountTiers);
          const nextTier = getNextDiscountTier(userQuantity, result.discountTiers);
          const baseTotal = userQuantity * result.basePrice;
          const discountedTotal = baseTotal * (1 - currentDiscount / 100);
          
          return (
            <View key={index} style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <ThemedText style={styles.sellerName}>{result.item}</ThemedText>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </View>
              
              {/* Price and Discount Info */}
              <View style={styles.priceSection}>
                <View style={styles.priceRow}>
                  <ThemedText style={styles.priceLabel}>Base Price:</ThemedText>
                  <ThemedText style={styles.priceValue}>LKR {result.basePrice.toFixed(2)}</ThemedText>
                </View>
                
                {userQuantity > 0 && (
                  <>
                    <View style={styles.priceRow}>
                      <ThemedText style={styles.priceLabel}>Quantity:</ThemedText>
                      <ThemedText style={styles.priceValue}>{userQuantity}</ThemedText>
                    </View>
                    
                    <View style={styles.priceRow}>
                      <ThemedText style={styles.priceLabel}>Base Total:</ThemedText>
                      <ThemedText style={styles.priceValue}>LKR {baseTotal.toFixed(2)}</ThemedText>
                    </View>
                    
                    {currentDiscount > 0 && (
                      <View style={styles.discountRow}>
                        <Ionicons name="pricetag" size={16} color="#4CAF50" />
                        <ThemedText style={styles.discountText}>
                          {currentDiscount}% Bulk Discount Applied!
                        </ThemedText>
                      </View>
                    )}
                    
                    <View style={styles.priceRow}>
                      <ThemedText style={styles.priceLabel}>Final Price:</ThemedText>
                      <ThemedText style={[styles.priceValue, styles.finalPrice]}>
                        LKR {discountedTotal.toFixed(2)}
                      </ThemedText>
                    </View>
                    
                    {nextTier && (
                      <View style={styles.nextTierRow}>
                        <Ionicons name="trending-up" size={16} color="#FF9800" />
                        <ThemedText style={styles.nextTierText}>
                          Get {nextTier.discountPercent}% discount for {nextTier.minQuantity}+ items
                        </ThemedText>
                      </View>
                    )}
                  </>
                )}
              </View>
              
              <View style={styles.resultInfo}>
                <View style={styles.infoRow}>
                  <Ionicons name="person" size={16} color="#666" />
                  <ThemedText style={styles.infoText}>{result.sellerName}</ThemedText>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="call" size={16} color="#666" />
                  <ThemedText style={styles.infoText}>{result.contactNo}</ThemedText>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="location" size={16} color="#666" />
                  <ThemedText style={styles.infoText}>View on Map</ThemedText>
                </View>
                
                <View style={styles.keywordsContainer}>
                  {result.keywords.slice(0, 4).map((keyword, index) => (
                    <View key={index} style={styles.keywordTag}>
                      <ThemedText style={styles.keywordText}>{keyword}</ThemedText>
                    </View>
                  ))}
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
                      LKR. {(t.distance * 10 + t.bulkPrice + discountedTotal).toFixed(2)}
                    </ThemedText>
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>

      
      <Modal visible={showMap} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.mapContainer}>
            <WebView
              style={styles.webview}
              source={{
                html: `
                  <!DOCTYPE html>
                  <html>
                  <head>
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD87MWAqrCpUYRq4LjObroGjIaL7swvlOo&libraries=places"></script>
                      <style>
                          body { margin: 0; padding: 0; }
                          #map { width: 100%; height: 100vh; }
                          .info-box {
                              position: absolute;
                              top: 10px;
                              left: 10px;
                              background: white;
                              padding: 10px;
                              border-radius: 5px;
                              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                              z-index: 1000;
                              font-family: Arial, sans-serif;
                              font-size: 14px;
                          }
                      </style>
                  </head>
                  <body>
                      <div class="info-box">
                          <strong>Tap on map to select location</strong><br>
                          <span id="coordinates">No location selected</span>
                      </div>
                      <div id="map"></div>
                      <script>
                          let map;
                          let marker;
                          let selectedLocation = null;
                          
                          function initMap() {
                              const defaultLocation = { lat: 6.9271, lng: 79.8612 };
                              
                              map = new google.maps.Map(document.getElementById('map'), {
                                  center: defaultLocation,
                                  zoom: 12,
                                  mapTypeId: google.maps.MapTypeId.ROADMAP
                              });
                              
                              map.addListener('click', function(event) {
                                  const lat = event.latLng.lat();
                                  const lng = event.latLng.lng();
                                  
                                  if (marker) {
                                      marker.setMap(null);
                                  }
                                  
                                  marker = new google.maps.Marker({
                                      position: { lat: lat, lng: lng },
                                      map: map,
                                      title: 'Selected Location'
                                  });
                                  
                                  selectedLocation = { lat: lat, lng: lng };
                                  document.getElementById('coordinates').innerHTML = 
                                      'Lat: ' + lat.toFixed(4) + ', Lng: ' + lng.toFixed(4);
                                  
                                  // Send message to React Native
                                  window.ReactNativeWebView.postMessage(JSON.stringify({
                                      type: 'location_selected',
                                      latitude: lat,
                                      longitude: lng
                                  }));
                              });
                          }
                          
                          window.initMap = initMap;
                          initMap();
                      </script>
                  </body>
                  </html>
                `
              }}
              onMessage={(event) => {
                try {
                  const data = JSON.parse(event.nativeEvent.data);
                  if (data.type === 'location_selected') {
                    setSelectedLocation({
                      latitude: data.latitude,
                      longitude: data.longitude
                    });
                  }
                } catch (error) {
                  console.log('Error parsing message:', error);
                }
              }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
            />
          </View>
          
          <View style={styles.mapActions}>
            <Pressable 
              style={styles.mapActionButton}
              onPress={() => {
                const lat = selectedLocation?.latitude || 6.9271;
                const lng = selectedLocation?.longitude || 79.8612;
                const url = `https://www.google.com/maps?q=${lat},${lng}`;
                Linking.openURL(url);
              }}>
              <Ionicons name="open-outline" size={20} color="#2196F3" />
              <ThemedText style={styles.mapActionText}>Open in Maps</ThemedText>
            </Pressable>
            
            <Pressable 
              style={styles.mapActionButton}
              onPress={() => {
                // Set default location
                setSelectedLocation({ latitude: 6.9271, longitude: 79.8612 });
              }}>
              <Ionicons name="location" size={20} color="#4CAF50" />
              <ThemedText style={styles.mapActionText}>Use Default</ThemedText>
            </Pressable>
          </View>
          
          <View style={styles.mapControls}>
            <View style={styles.mapHeader}>
              <ThemedText style={styles.mapTitle}>Location Selection</ThemedText>
              <ThemedText style={styles.mapSubtitle}>
                Tap on the map to select a location
              </ThemedText>
            </View>
            
            <View style={styles.mapButtons}>
              <Pressable 
                style={[styles.button, styles.confirmButton]}
                onPress={() => {
                  const defaultLocation = { latitude: 6.9271, longitude: 79.8612 };
                  const location = selectedLocation || defaultLocation;
                  setFormData({ ...formData, location: `${location.latitude},${location.longitude}` });
                  setShowMap(false);
                }}>
                <ThemedText style={styles.buttonText}>Use Location</ThemedText>
              </Pressable>
              <Pressable 
                style={[styles.button, styles.closeButton]}
                onPress={() => setShowMap(false)}>
                <ThemedText style={styles.buttonText}>Cancel</ThemedText>
              </Pressable>
            </View>
          </View>
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
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  confirmButton: {
    backgroundColor: '#2196F3',
  },
  searchContainer: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  searchTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
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
    backgroundColor: '#fff',
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
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  keywordTag: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  keywordText: {
    fontSize: 12,
    color: '#1976d2',
    fontWeight: '500',
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
  priceSection: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  priceValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  finalPrice: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    padding: 8,
    borderRadius: 8,
    marginVertical: 8,
    gap: 6,
  },
  discountText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  nextTierRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
    gap: 6,
  },
  nextTierText: {
    fontSize: 12,
    color: '#FF9800',
    fontWeight: '500',
  },
  mapControls: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
  mapHeader: {
    marginBottom: 16,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  mapSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  mapButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  disabledButtonText: {
    color: '#999',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  mapPlaceholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
  },
  mapPlaceholderSubtext: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 20,
  },
  coordinateInputs: {
    gap: 12,
    marginBottom: 16,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  mapActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
  mapActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    gap: 8,
  },
  mapActionText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  webview: {
    flex: 1,
  },
});
