import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTheme } from '../theme';

export const SettingsScreen = () => {
  const { mode, setMode } = useTheme();
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Settings</Text>
      <Pressable onPress={() => setMode(mode === 'light' ? 'dark' : 'light')}>
        <Text>Toggle Theme</Text>
      </Pressable>
      <Text style={{ marginTop: 20 }}>Local-first</Text>
    </View>
  );
};
