// components/HeaderBar.tsx

import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';

const HeaderBar = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/tapro-logo.png')}
        style={styles.logoImage}
        resizeMode="contain"
      />

      <View style={styles.tabs}>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>Offline Stores</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButtonInactive}>
          <Text style={styles.tabTextInactive}>Online Stores</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoImage: {
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: '#fff',
  },
  tabs: {
    flexDirection: 'row',
  },
  tabButton: {
    marginRight: 15,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.accent,
  },
  tabText: {
    fontSize: FONTS.regular,
    color: '#fff',
  },
  tabButtonInactive: {
    marginRight: 15,
    paddingBottom: 5,
  },
  tabTextInactive: {
    fontSize: FONTS.regular,
    color: '#ccc',
  },
});
