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
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
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
