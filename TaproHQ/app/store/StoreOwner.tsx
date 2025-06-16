import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function StoreOwnerPage() {
  const [itemName, setItemName] = useState('');
  const [stockQty, setStockQty] = useState('');
  const [price, setPrice] = useState('');
  const [discountAmount, setDiscountAmount] = useState('');
  const [discountQty, setDiscountQty] = useState('');
  const [sellerType, setSellerType] = useState<'Retailer' | 'Wholesaler' | 'Both'>('Retailer');

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>TaproHQ</Text>
        <View style={styles.nav}>
          <Text style={styles.navItem}>Offline Stores</Text>
          <Text style={styles.navItem}>Online Stores</Text>
        </View>
      </View>

      <Text style={styles.title}>Manage Your Store</Text>

      {/* Inputs */}
      <Text style={styles.label}>Available items</Text>
      <TextInput
        style={styles.input}
        placeholder="Add an item"
        value={itemName}
        onChangeText={setItemName}
      />

      <Text style={styles.label}>Stock Quantity</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={stockQty}
        onChangeText={setStockQty}
      />

      <Text style={styles.label}>Retail or Wholesale</Text>
      <View style={styles.radioGroup}>
        {['Retailer', 'Wholesaler', 'Both'].map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setSellerType(type as any)}
            style={styles.radioButton}
          >
            <View style={styles.radioOuter}>
              {sellerType === type && <View style={styles.radioInner} />}
            </View>
            <Text>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Discount</Text>
      <View style={styles.discountRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          keyboardType="numeric"
          placeholder="Discount amount"
          value={discountAmount}
          onChangeText={setDiscountAmount}
        />
        <Text style={{ marginHorizontal: 8, alignSelf: 'center' }}>for</Text>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          keyboardType="numeric"
          placeholder="Item count"
          value={discountQty}
          onChangeText={setDiscountQty}
        />
        <Text style={{ marginLeft: 4, alignSelf: 'center' }}>items</Text>
      </View>

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      {/* Save and Edit Buttons */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 20,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  nav: {
    flexDirection: 'row',
    gap: 20,
  },
  navItem: {
    fontSize: 14,
    fontWeight: '500',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontWeight: '500',
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 16,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#333',
    marginRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#1a8917',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  editButton: {
    backgroundColor: '#444',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
  },
});
