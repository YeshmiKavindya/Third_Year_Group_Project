import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { COLORS, FONTS } from '../constants/theme';
import HeaderBarNew from '../compos/HeaderBarNew';
import { Ionicons } from '@expo/vector-icons';

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
  const [stockQuantity, setStockQuantity] = useState('');
  const [distributionType, setDistributionType] = useState('Retailer');
  const [unitPrice, setUnitPrice] = useState('');
  const [discountAvailable, setDiscountAvailable] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [rows, setRows] = useState([{ quantity: '', unitPrice: '' }]);

  const addRow = () => setRows([...rows, { quantity: '', unitPrice: '' }]);

  type RowField = 'quantity' | 'unitPrice';

  const handleRowChange = (index: number, field: RowField, value: string) => {
  const updatedRows = [...rows];
  updatedRows[index][field] = value;
  setRows(updatedRows);
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
        <Text style={styles.label}>Stock Quantity</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Quantity"
          keyboardType="number-pad"
          value={stockQuantity}
          onChangeText={setStockQuantity}
        />
      </View>

      <Text style={styles.label}>Distribution Type</Text>
      <View style={styles.radioContainer}>
        {['Retailer', 'Wholeseller', 'Both'].map((type) => (
          <RadioButton
            key={type}
            label={type}
            selected={distributionType === type}
            onPress={() => setDistributionType(type)}
          />
        ))}
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.label}>Unit Price (LKR)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Unit Price"
          keyboardType="number-pad"
          value={unitPrice}
          onChangeText={setUnitPrice}
        />
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
          <Text style={styles.label}>Discount (%)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 10"
            keyboardType="number-pad"
            value={discountPercentage}
            onChangeText={setDiscountPercentage}
          />
        </View>
      )}

      <Text style={styles.subTitle}>Quantity & Unit Price Options</Text>
      <FlatList
        data={rows}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.tableRow}>
            <TextInput
              style={styles.tableInput}
              placeholder="Qty"
              keyboardType="number-pad"
              value={item.quantity}
              onChangeText={(val) => handleRowChange(index, 'quantity', val)}
            />
            <TextInput
              style={styles.tableInput}
              placeholder="Price"
              keyboardType="number-pad"
              value={item.unitPrice}
              onChangeText={(val) => handleRowChange(index, 'unitPrice', val)}
            />
          </View>
        )}
      />
      <TouchableOpacity style={styles.addRowBtn} onPress={addRow}>
        <Ionicons name="add-circle-outline" size={20} color="#fff" />
        <Text style={styles.addRowText}>Add Row</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitBtn}>
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
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
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
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: FONTS.medium,
  },
});
