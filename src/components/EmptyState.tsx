import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const EmptyState = () => {
  return (
    <View style={{ alignItems: 'center', marginTop: 40 }}>
      <Text style={{ fontSize: 16, color: '#666' }}>No users found</Text>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({});
