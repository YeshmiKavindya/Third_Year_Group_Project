import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../constants/theme';
import HeaderBarNew from '../compos/HeaderBarNew';
import { API_CONFIG, getApiUrl } from '../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Discount = {
  minQuantity: number;
  discountPercent: number;
};

type Item = {
  _id: string;
  item_name: string;
  quantity: string;
  store_type: string;
  discount: Discount[];
};

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

const AllSellerItems = ({ navigation }: { navigation: any }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [refreshing, setRefreshing] = useState(false);

  // Memoized dummy data for initial state
  const dummyItems = useMemo(() => [
    {
      _id: '1',
      item_name: 'Premium Coffee Beans',
      quantity: '100',
      store_type: 'Retailer',
      discount: [
        { minQuantity: 10, discountPercent: 5 },
        { minQuantity: 25, discountPercent: 10 }
      ]
    },
    {
      _id: '2', 
      item_name: 'Smart Speakers',
      quantity: '50',
      store_type: 'Wholeseller',
      discount: [
        { minQuantity: 5, discountPercent: 8 },
        { minQuantity: 15, discountPercent: 15 }
      ]
    }
  ], []);

  const fetchItems = useCallback(async (isRefresh = false) => {
    try {
      setLoadingState(isRefresh ? 'idle' : 'loading');
      
      const token = await AsyncStorage.getItem('authorization');
      const email = await AsyncStorage.getItem('x-user-email');
      
      if (!token || !email) {
        Alert.alert('Error', 'Authentication required');
        setLoadingState('error');
        return;
      }

      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.GET_ITEMS), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token,
          'x-email': email,
        }
      });
          
      const data = await response.json();
      
      if (response.ok && data.data) {
        setItems(data.data);
        setLoadingState('success');
      } else {
        // Fallback to dummy data if API fails
        
        setLoadingState('success');
        console.warn('API failed, using dummy data:', data.message);
      }
    } catch (error) {
      console.error('Fetch items error:', error);
      // Fallback to dummy data on network error
      
      setLoadingState('success');
      if (!isRefresh) {
        Alert.alert('Warning', 'Using offline data. Check your connection.');
      }
    } finally {
      if (isRefresh) {
        setRefreshing(false);
      }
    }
  }, [dummyItems]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchItems(true);
  }, [fetchItems]);

  const handleEditItem = useCallback((item: Item) => {
    navigation.navigate('SellerItemEdit', { item });
  }, [navigation]);

  const deleteItem = async (itemId: string) => {
    const token = await AsyncStorage.getItem('authorization');
    const email = await AsyncStorage.getItem('x-user-email');
    try{
        const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.DELETE_ITEM), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token || '',
                'x-email': email || '',
            },
            body: JSON.stringify({_id: itemId})
        });
        const data = await response.json();
        if(response.ok){
            Alert.alert('Success', 'Item deleted successfully');
            fetchItems();
        }else{
            Alert.alert('Error', data.message);
        }
    }catch(error){
        Alert.alert('Error', error as string);
  }  
}


  const handleDeleteItem = useCallback((itemId: string, itemName: string) => {
    Alert.alert(
      'Delete Item',
      `Are you sure you want to delete "${itemName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            //setItems(prevItems => prevItems.filter(item => item._id !== itemId));
            console.log("itemId", itemId);
            deleteItem(itemId);
          }
        }
      ]
    );
  }, []);

  const handleAddNewItem = useCallback(() => {
    navigation.navigate('SellerItemEdit');
  }, [navigation]);

  const renderDiscount = useCallback((discount: Discount, index: number, itemId: string) => (
    <Text key={`${itemId}-discount-${index}`} style={styles.discountText}>
      Min Qty: {discount.minQuantity} - {discount.discountPercent}% off
    </Text>
  ), []);

  const renderItem = useCallback(({ item }: { item: Item }) => (
    <View style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemName} numberOfLines={2}>
          {item.item_name}
        </Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.editButton} 
            onPress={() => handleEditItem(item)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="create-outline" size={20} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => handleDeleteItem(item._id, item.item_name)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="trash-outline" size={20} color="#ff4444" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.itemDetails}>
        <Text style={styles.detailText}>Quantity: {item.quantity}</Text>
        <Text style={styles.detailText}>Store Type: {item.store_type}</Text>
      </View>

      {item.discount && item.discount.length > 0 && (
        <View style={styles.discountSection}>
          <Text style={styles.discountTitle}>Discount Tiers:</Text>
          {item.discount.map((discount, index) => 
            renderDiscount(discount, index, item._id)
          )}
        </View>
      )}
    </View>
  ), [handleEditItem, handleDeleteItem, renderDiscount]);

  const renderEmptyState = useCallback(() => (
    <View style={styles.emptyState}>
      <Ionicons name="cube-outline" size={64} color={COLORS.border} />
      <Text style={styles.emptyStateText}>No items found</Text>
      <Text style={styles.emptyStateSubtext}>Add your first item to get started</Text>
    </View>
  ), []);

  const renderLoadingState = useCallback(() => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.loadingText}>Loading items...</Text>
    </View>
  ), []);

  if (loadingState === 'loading') {
    return (
      <SafeAreaView style={styles.container}>
        <HeaderBarNew />
        {renderLoadingState()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBarNew />
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={[
          styles.listContainer,
          items.length === 0 && styles.emptyListContainer
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        ListEmptyComponent={renderEmptyState}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100 // Space for floating button
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 16,
    fontSize: FONTS.medium,
    color: COLORS.text
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40
  },
  emptyStateText: {
    fontSize: FONTS.heading,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 16
  },
  emptyStateSubtext: {
    fontSize: FONTS.regular,
    color: COLORS.text,
    marginTop: 8,
    textAlign: 'center'
  },
  itemCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12
  },
  itemName: {
    fontSize: FONTS.heading,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
    marginRight: 12
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12
  },
  editButton: {
    padding: 8
  },
  deleteButton: {
    padding: 8
  },
  itemDetails: {
    marginBottom: 12
  },
  detailText: {
    fontSize: FONTS.regular,
    color: COLORS.text,
    marginBottom: 4
  },
  discountSection: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 12
  },
  discountTitle: {
    fontSize: FONTS.medium,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8
  },
  discountText: {
    fontSize: FONTS.regular,
    color: COLORS.text,
    marginBottom: 4
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4
  },
  addButtonText: {
    color: '#fff',
    fontSize: FONTS.medium,
    fontWeight: 'bold',
    marginLeft: 8
  }
});

export default AllSellerItems;
