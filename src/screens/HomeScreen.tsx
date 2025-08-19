import React, { useEffect } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../lib/state';
import { SkeuoCard } from '../components/SkeuoCard';
import { useTheme } from '../theme';

export const HomeScreen = () => {
  const nav = useNavigation<any>();
  const boards = useStore(s => s.boards);
  const hydrate = useStore(s => s.hydrateFromBle);
  const { mode, setMode } = useTheme();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Pressable
        onPress={() => setMode(mode === 'light' ? 'dark' : 'light')}
        style={{ alignSelf: 'flex-end', marginBottom: 10 }}
      >
        <Text>Toggle Theme</Text>
      </Pressable>
      <FlatList
        data={boards}
        keyExtractor={b => b.id}
        numColumns={2}
        renderItem={({ item }) => (
          <SkeuoCard
            onPress={() => nav.navigate('Board', { id: item.id })}
            style={{ flex: 1, margin: 8 }}
          >
            <Text>{item.name}</Text>
          </SkeuoCard>
        )}
      />
    </View>
  );
};
