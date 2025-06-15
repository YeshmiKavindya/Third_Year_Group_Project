import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StatsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Travel Stats</Text>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Icon name="directions-walk" size={30} color="#3498db" />
              <Text style={styles.statTitle}>Distance Travelled</Text>
            </View>
            <Text style={styles.statValue}>10 km</Text>
            <View style={styles.statProgress}>
              <View style={[styles.progressBar, { width: '70%' }]} />
            </View>
            <Text style={styles.statChange}>+10% this week</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Icon name="local-gas-station" size={30} color="#e74c3c" />
              <Text style={styles.statTitle}>Fuel Consumption</Text>
            </View>
            <Text style={styles.statValue}>15 litres</Text>
            <View style={styles.statProgress}>
              <View style={[styles.progressBar, { width: '50%', backgroundColor: '#e74c3c' }]} />
            </View>
            <Text style={[styles.statChange, styles.positiveChange]}>-20% this week</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Icon name="savings" size={30} color="#27ae60" />
              <Text style={styles.statTitle}>Cost Savings</Text>
            </View>
            <Text style={styles.statValue}>Rs. 1,250</Text>
            <View style={styles.statProgress}>
              <View style={[styles.progressBar, { width: '60%', backgroundColor: '#27ae60' }]} />
            </View>
            <Text style={[styles.statChange, styles.positiveChange]}>+18% this month</Text>
          </View>
        </View>
        
        <View style={styles.fuelSection}>
          <Text style={styles.sectionTitle}>Fuel Consumption Details</Text>
          <View style={styles.fuelCard}>
            <View style={styles.fuelRow}>
              <Text style={styles.fuelLabel}>Current Fuel Price:</Text>
              <Text style={styles.fuelValue}>Rs. 299.00/litre</Text>
            </View>
            <View style={styles.fuelRow}>
              <Text style={styles.fuelLabel}>Total Fuel Used:</Text>
              <Text style={styles.fuelValue}>15 litres</Text>
            </View>
            <View style={styles.fuelRow}>
              <Text style={styles.fuelLabel}>Total Cost:</Text>
              <Text style={styles.fuelTotal}>Rs. 4,485.00</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Weekly Consumption Trend</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartText}>Fuel Consumption Chart</Text>
            <Icon name="show-chart" size={40} color="#3498db" />
          </View>
        </View>
        
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Fuel Saving Tips</Text>
          <View style={styles.tipCard}>
            <Icon name="eco" size={24} color="#27ae60" />
            <Text style={styles.tipText}>Maintain steady speed (60-80 km/h) for optimal fuel efficiency</Text>
          </View>
          <View style={styles.tipCard}>
            <Icon name="tire-repair" size={24} color="#27ae60" />
            <Text style={styles.tipText}>Check tire pressure monthly - underinflated tires increase fuel consumption</Text>
          </View>
          <View style={styles.tipCard}>
            <Icon name="ac-unit" size={24} color="#27ae60" />
            <Text style={styles.tipText}>Use air conditioning sparingly - it increases fuel usage by up to 20%</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  statsContainer: {
    padding: 15,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  statTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    color: '#2c3e50',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  statProgress: {
    height: 8,
    backgroundColor: '#ecf0f1',
    borderRadius: 4,
    marginVertical: 15,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3498db',
    borderRadius: 4,
  },
  statChange: {
    color: '#e74c3c',
    fontWeight: '600',
  },
  positiveChange: {
    color: '#27ae60',
  },
  fuelSection: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  fuelCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  fuelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  fuelLabel: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  fuelValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  fuelTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  chartSection: {
    padding: 15,
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  chartText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 10,
  },
  tipsSection: {
    padding: 15,
    paddingBottom: 30,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#e8f5e9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'flex-start',
  },
  tipText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    lineHeight: 24,
    color: '#2c3e50',
  },
});

export default StatsScreen;