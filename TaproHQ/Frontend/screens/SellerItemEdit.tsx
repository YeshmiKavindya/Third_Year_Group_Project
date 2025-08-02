import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../constants/theme';
import HeaderBarNew from '../compos/HeaderBarNew';
import { API_CONFIG, getApiUrl } from '../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SellerItemEdit = (props: any) => {
  const { item } = props.route.params;
  console.log("item", item);
  const [itemName, setItemName] = useState(item?.item_name || '');
  const [stock, setStock] = useState(item?.quantity || '');
  const [storeType, setStoreType] = useState(item?.store_type || '');
  const [sellerName, setSellerName] = useState(item?.seller_name || '');
  const [unitPrice, setUnitPrice] = useState(item?.unit_price || '');
  const [quantity, setQuantity] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [discounts, setDiscounts] = useState<{minQuantity: number, discountPercent: number}[]>(
    item?.discount?.map((d: any) => ({
      minQuantity: Number(d.minQuantity),
      discountPercent: Number(d.discountPercent)
    })) || []
  );

  const addDiscount = () => {
    if (!quantity || !discountPercent) {
      Alert.alert('Please enter both minimum quantity and discount percentage.');
      return;
    }
    const newDiscount = { 
      minQuantity: Number(quantity), 
      discountPercent: Number(discountPercent)
    };
    setDiscounts([...discounts, newDiscount]);
    setQuantity('');
    setDiscountPercent('');
  };

  const removeDiscount = (indexToRemove: number) => {
    const updated = discounts.filter((_, idx) => idx !== indexToRemove);
    setDiscounts(updated);
  };

  const validateInputs = () => {
    if (!itemName?.trim()) {
      Alert.alert('Error', 'Item name cannot be empty');
      return false;
    }
    if (!stock || isNaN(Number(stock))) {
      Alert.alert('Error', 'Stock quantity must be a valid number');
      return false;
    }
    if (!storeType?.trim() || !['retailer', 'wholesaler'].includes(storeType.toLowerCase())) {
      Alert.alert('Error', 'Store type must be either retailer or wholesaler');
      return false;
    }
    if (!unitPrice || isNaN(Number(unitPrice))) {
      Alert.alert('Error', 'Unit price must be a valid number');
      return false;
    }
    return true;
  };

  const updateItem = async () => {
    if (!validateInputs()) return;

    const updatedItem = {
      _id: item._id,
      item_name: itemName.trim(),
      store_type: storeType.toLowerCase(),
      seller_name: sellerName?.trim(),
      quantity: stock,
      unit_price: Number(unitPrice),
      seller_email: item.seller_email,
      discount: discounts,
      login_date: item.login_date
    };

  try {
      const token = await AsyncStorage.getItem('authorization');
      const email = await AsyncStorage.getItem('x-user-email');
      
      if (!token || !email) {
        Alert.alert('Error', 'Authentication required');
        return;
      }

      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.UPDATE_ITEM), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token,
          'x-email': email,
        },
        body: JSON.stringify(updatedItem),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', data.message || 'Item updated successfully!');
      } else {
        const errorMsg = data.error || data.message || 'Failed to update item';
        Alert.alert('Error', errorMsg);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'An unknown error occurred';
      Alert.alert('Error', errorMsg);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBarNew />
      <Text style={styles.title}>Edit Item</Text>

      {/* Item Name */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Item Name</Text>
        <TextInput
          value={itemName}
          onChangeText={setItemName}
          placeholder="Enter item name"
          style={styles.inputField}
        />
      </View>