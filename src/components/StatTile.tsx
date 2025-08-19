import React from 'react';
import { View, Text } from 'react-native';
import { tokens } from '../theme';

export const StatTile = ({ label, value }: { label: string; value: string }) => (
  <View style={{ padding: tokens.space.md }}>
    <Text style={{ fontWeight: 'bold' }}>{value}</Text>
    <Text style={{ fontSize: 12 }}>{label}</Text>
  </View>
);
