import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,FlatList,Modal,} from 'react-native';
import HeaderBarNew from '../compos/HeaderBarNew';
import { COLORS, FONTS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const CustomerSettingsScreen = () => {
  const [name, setName] = useState('Customer Name');
  const [editing, setEditing] = useState(false);
  const [vehicleType, setVehicleType] = useState('Car');
  const [distance, setDistance] = useState('');
  const [price, setPrice] = useState('');
  const [records, setRecords] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const addRecord = () => {
    if (!distance || !price) {
      alert('Fill all fields!');
      return;
    }
    const newRecord = { vehicleType, distance, price };
    setRecords([...records, newRecord]);
    setDistance('');
    setPrice('');
  };

  return (
    <View style={styles.container}>
      <HeaderBarNew />

      <Text style={styles.title}>User Settings (Customer)</Text>

      {/* Name Input Row */}
      <View style={styles.row}>
        <TextInput
          value={name}
          editable={editing}
          onChangeText={setName}
          style={styles.nameInput}
        />
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => setEditing(!editing)}
        >
          <Text style={styles.editBtnText}>{editing ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Vehicles</Text>

      {/* Vehicle Type Dropdown Row */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Vehicle Type</Text>
        <TouchableOpacity
          style={styles.inputField}
          onPress={() => setShowDropdown(true)}
        >
          <View style={styles.dropdownContent}>
            <Text style={styles.dropdownText}>{vehicleType}</Text>
            <Text style={styles.arrowText}>⌄</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Modal Dropdown */}
      <Modal
        visible={showDropdown}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDropdown(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setShowDropdown(false)}
        >
          <View style={styles.dropdownMenu}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setVehicleType('Car');
                setShowDropdown(false);
              }}
            >
              <Text style={styles.dropdownText}>🚗 Car</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setVehicleType('Bike');
                setShowDropdown(false);
              }}
            >
              <Text style={styles.dropdownText}>🏍️ Bike</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Distance per 1L */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Distance per 1L (km)</Text>
        <TextInput
          placeholder="e.g., 14"
          value={distance}
          onChangeText={setDistance}
          keyboardType="numeric"
          style={styles.inputField}
        />
      </View>

      {/* Price per 1L */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Price per 1L (LKR)</Text>
        <TextInput
          placeholder="e.g., 230"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          style={styles.inputField}
        />
      </View>

      {/* Add Record */}
      <TouchableOpacity style={styles.addBtn} onPress={addRecord}>
        <Ionicons name="add-circle-outline" size={22} color="#fff" />
        <Text style={styles.addBtnText}>Add Record</Text>
      </TouchableOpacity>

      {/* Records List */}
      <FlatList
        data={records}
        keyExtractor={(_, index) => index.toString()}
        style={styles.recordList}
        renderItem={({ item }) => (
          <View style={styles.vehicleRow}>
            <Text style={styles.recordText}>{item.vehicleType}</Text>
            <Text style={styles.recordText}>{item.distance} km</Text>
            <Text style={styles.recordText}>LKR {item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CustomerSettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: FONTS.largeTitle,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: COLORS.primary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 40,
  },
  nameInput: {
    flex: 1,
    fontSize: FONTS.regular,
    backgroundColor: COLORS.card,
    padding: 10,
    borderRadius: 8,
  },
  editBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  editBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: FONTS.heading,
    marginBottom: 30,
    color: COLORS.text,
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
  dropdownContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: FONTS.regular,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  dropdownText: {
    fontSize: FONTS.regular,
    color: COLORS.text,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownMenu: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 15,
    width: '70%',
    elevation: 10,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  addBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
    marginTop: 10,
  },
  addBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  vehicleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 10,
  },
  recordList: {
    marginTop: 15,
  },
  recordText: {
    flex: 1,
    fontSize: FONTS.regular,
    color: COLORS.text,
  },
});
