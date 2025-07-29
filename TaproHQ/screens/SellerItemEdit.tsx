import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet;
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../constants/theme';
import HeaderBarNew from '../compos/HeaderBarNew';

const SellerItemEdit = () => {
  const [itemName, setItemName] = useState('');
  const [stock, setStock] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [quantity, setQuantity] = useState('');
  const [variantPrice, setVariantPrice] = useState('');
  const [variants, setVariants] = useState<any[]>([]);

  const addVariant = () => {
    if (!quantity || !variantPrice) {
      Alert.alert('Please enter both quantity and unit price.');
      return;
    }
    const newVariant = { quantity, price: variantPrice };
    setVariants([...variants, newVariant]);
    setQuantity('');
    setVariantPrice('');
  };

  const removeVariant = (indexToRemove: number) => {
    const updated = variants.filter((_, idx) => idx !== indexToRemove);
    setVariants(updated);
  };

  const updateItem = () => {
    if (!itemName || !stock || !unitPrice) {
      Alert.alert('Please fill in all required fields.');
      return;
    }

    const updatedItem = {
      itemName,
      stock,
      unitPrice,
      discount,
      variants,
    };

    // You can replace this with your actual saving logic
    console.log('Updated Item:', updatedItem);
    Alert.alert('Item updated successfully!');
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

      {/* Stock */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Stock Quantity</Text>
        <TextInput
          value={stock}
          onChangeText={setStock}
          placeholder="Enter stock quantity"
          keyboardType="numeric"
          style={styles.inputField}
        />
      </View>

      {/* Unit Price */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Unit Price (Rs)</Text>
        <TextInput
          value={unitPrice}
          onChangeText={setUnitPrice}
          placeholder="Enter unit price"
          keyboardType="numeric"
          style={styles.inputField}
        />
      </View>

      {/* Discount */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Discount (%)</Text>
        <TextInput
          value={discount}
          onChangeText={setDiscount}
          placeholder="Enter discount (optional)"
          keyboardType="numeric"
          style={styles.inputField}
        />
      </View>

      {/* Variant Section */}
      <Text style={styles.subTitle}>Variants</Text>

      <View style={styles.variantRow}>
        <TextInput
          value={quantity}
          onChangeText={setQuantity}
          placeholder="Qty"
          keyboardType="numeric"
          style={[styles.inputField, styles.variantInput]}
        />
        <TextInput
          value={variantPrice}
          onChangeText={setVariantPrice}
          placeholder="Price"
          keyboardType="numeric"
          style={[styles.inputField, styles.variantInput]}
        />
        <TouchableOpacity style={styles.addVariantBtn} onPress={addVariant}>
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={variants}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.variantItem}>
            <Text style={styles.recordText}>
              Qty: {item.quantity} - Rs {item.price}
            </Text>
            <TouchableOpacity onPress={() => removeVariant(index)}>
              <Ionicons name="trash-outline" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Update Button */}
      <TouchableOpacity style={styles.updateBtn} onPress={updateItem}>
        <Ionicons name="save-outline" size={22} color="#fff" />
        <Text style={styles.updateBtnText}>Update Item</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SellerItemEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  title: {
    fontSize: FONTS.largeTitle,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginVertical: 20,
  },
  inputRow: {
    marginBottom: 15,
  },
  label: {
    fontSize: FONTS.medium,
    color: COLORS.text,
    marginBottom: 6,
  },
  inputField: {
    backgroundColor: COLORS.card,
    padding: 10,
    borderRadius: 8,
    fontSize: FONTS.regular,
  },
  subTitle: {
    fontSize: FONTS.heading,
    color: COLORS.primary,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  variantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  variantInput: {
    flex: 1,
  },
  addVariantBtn: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 8,
  },
  variantItem: {
    backgroundColor: COLORS.card,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recordText: {
    fontSize: FONTS.regular,
    color: COLORS.text,
  },
  updateBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 8,
  },
  updateBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: FONTS.medium,
  },
});
