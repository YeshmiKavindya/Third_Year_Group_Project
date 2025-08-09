import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { COLORS, FONTS } from '../constants/theme';
import HeaderBarNew from '../compos/HeaderBarNew';
import { API_CONFIG, getApiUrl } from '../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RadioButtonProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

const RadioButton: React.FC<RadioButtonProps> = ({ label, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.radioButton, selected && styles.radioButtonSelected]}
    onPress={onPress}
  >
    <Text style={[styles.radioLabel, selected && styles.radioLabelSelected]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const SellerItemAddition = () => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [storeType, setStoreType] = useState('Retailer');
  const [discountAvailable, setDiscountAvailable] = useState(false);
  const [discountRows, setDiscountRows] = useState([{ quantity: '', discountPercent: '' }]);
  const [sellerName, setSellerName] = useState('');

  const addDiscountRow = () => {
    setDiscountRows([...discountRows, { quantity: '', discountPercent: '' }]);
  };

  type DiscountField = 'quantity' | 'discountPercent';

  const handleDiscountRowChange = (index: number, field: DiscountField, value: string) => {
    const updatedRows = [...discountRows];
    updatedRows[index][field] = value;
    setDiscountRows(updatedRows);
  };

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!itemName || !quantity || !storeType ) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }

      const discounts = discountAvailable ? discountRows.map(row => ({
        minQuantity: parseInt(row.quantity),
        discountPercent: parseInt(row.discountPercent)
      })) : [];

      const token = await AsyncStorage.getItem('authorization');
      const email = await AsyncStorage.getItem('x-user-email');
      const username = await AsyncStorage.getItem('x-username');

      console.log("username:",username);
      console.log("email:",email);
      console.log("token:",token);
      console.log("itemName:",itemName);
      console.log("quantity:",quantity);
      console.log("storeType:",storeType);
      console.log("discounts:",discounts);
      console.log("sellerName:",username);

      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.ADD_ITEM), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token || '',
          'x-email': email || '',
        },
        body: JSON.stringify({
          item_name: itemName,
          unit_price: parseInt(unitPrice),
          quantity: parseInt(quantity),
          store_type: storeType,
          discount: discountAvailable ? discounts : [],
          seller_name: username,
        })
        
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Item added successfully');
        // Reset form
        setItemName('');
        setUnitPrice('');
        setQuantity('');
        setStoreType('Retailer');
        setDiscountAvailable(false);
        setDiscountRows([{ quantity: '', discountPercent: '' }]);
        setSellerName('');
      } else {
        Alert.alert('Error', data.message || 'Failed to add item');
      }

    } catch (error) {
      console.error('Submit error:', error);
      Alert.alert('Error', 'Network error. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <HeaderBarNew />

      <Text style={styles.title}>Item Addition (Seller)</Text>

      <View style={styles.inputRow}>
        <Text style={styles.label}>Item Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Item Name"
          value={itemName}
          onChangeText={setItemName}
        />
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.label}>Unit Price</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Unit Price"
          keyboardType="number-pad"
          value={unitPrice}
          onChangeText={setUnitPrice}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Quantity</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Quantity"
          keyboardType="number-pad"
          value={quantity}
          onChangeText={setQuantity}
        />
      </View>

      <Text style={styles.label}>Store Type</Text>
      <View style={styles.radioContainer}>
        {['Retailer', 'Wholeseller', 'Both'].map((type) => (
          <RadioButton
            key={type}
            label={type}
            selected={storeType === type}
            onPress={() => setStoreType(type)}
          />
        ))}
      </View>

      

      <View style={styles.switchRow}>
        <Text style={styles.label}>Discount Available</Text>
        <Switch
          value={discountAvailable}
          onValueChange={setDiscountAvailable}
          thumbColor={discountAvailable ? COLORS.primary : '#ccc'}
        />
      </View>

      {discountAvailable && (
        <View style={styles.inputRow}>
          <Text style={styles.subTitle}>Discount Tiers</Text>
          {discountRows.map((row, index) => (
            <View key={index} style={styles.tableRow}>
              <TextInput
                style={styles.tableInput}
                placeholder="Min Qty"
                keyboardType="number-pad"
                value={row.quantity}
                onChangeText={(val) => handleDiscountRowChange(index, 'quantity', val)}
              />
              <TextInput
                style={styles.tableInput}
                placeholder="Discount %"
                keyboardType="number-pad"
                value={row.discountPercent}
                onChangeText={(val) => handleDiscountRowChange(index, 'discountPercent', val)}
              />
            </View>
          ))}
          <TouchableOpacity style={styles.addRowBtn} onPress={addDiscountRow}>
            <Text style={styles.addRowText}>Add Discount Tier</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SellerItemAddition;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: FONTS.largeTitle,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginVertical: 20,
  },
  inputRow: {
    marginBottom: 10,
  },
  label: {
    fontSize: FONTS.medium,
    color: COLORS.text,
    marginBottom: 6,
  },
  input: {
    backgroundColor: COLORS.card,
    padding: 10,
    borderRadius: 8,
    fontSize: FONTS.regular,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  radioButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    minWidth: 90,
    alignItems: 'center',
  },
  radioButtonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  radioLabel: {
    color: COLORS.text,
  },
  radioLabelSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: FONTS.heading,
    color: COLORS.text,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  tableInput: {
    flex: 1,
    backgroundColor: COLORS.card,
    padding: 10,
    borderRadius: 8,
    fontSize: FONTS.regular,
  },
  addRowBtn: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addRowText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: FONTS.medium,
  },
});
