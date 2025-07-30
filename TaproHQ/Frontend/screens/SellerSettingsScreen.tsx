import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,FlatList,} from 'react-native';
import HeaderBarNew from '../compos/HeaderBarNew';
import { COLORS, FONTS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const SellerSettingsScreen = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [records, setRecords] = useState<any[]>([]);

  const addRecord = () => {
    if (!name || !location || !contact) {
      alert('Please fill all fields!');
      return;
    }
    const newRecord = { name, location, contact };
    setRecords([...records, newRecord]);
    setName('');
    setLocation('');
    setContact('');
  };

  return (
    <View style={styles.container}>
      <HeaderBarNew />

      <Text style={styles.title}>User Settings (Seller)</Text>

      {/* Seller Name */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Seller Name</Text>
        <TextInput
          placeholder="Enter Seller Name"
          value={name}
          onChangeText={setName}
          style={styles.inputField}
        />
      </View>

      {/* Location */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          placeholder="Enter Location"
          value={location}
          onChangeText={setLocation}
          style={styles.inputField}
        />
      </View>

      {/* Contact No */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Contact No</Text>
        <TextInput
          placeholder="Enter Contact Number"
          value={contact}
          onChangeText={setContact}
          keyboardType="phone-pad"
          style={styles.inputField}
        />
      </View>

      {/* Add Record Button */}
      <TouchableOpacity style={styles.addBtn} onPress={addRecord}>
        <Ionicons name="add-circle-outline" size={22} color="#fff" />
        <Text style={styles.addBtnText}>Add Record</Text>
      </TouchableOpacity>

      {/* Record List */}
      <FlatList
        data={records}
        keyExtractor={(_, index) => index.toString()}
        style={styles.recordList}
        renderItem={({ item }) => (
          <View style={styles.recordItem}>
            <Text style={styles.recordText}>{item.name}</Text>
            <Text style={styles.recordText}>{item.location}</Text>
            <Text style={styles.recordText}>{item.contact}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default SellerSettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: FONTS.largeTitle,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 20,
    marginBottom: 30,
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
  addBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    gap: 8,
  },
  addBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  recordList: {
    marginTop: 15,
  },
  recordItem: {
    backgroundColor: COLORS.card,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  recordText: {
    fontSize: FONTS.regular,
    color: COLORS.text,
  },
});
