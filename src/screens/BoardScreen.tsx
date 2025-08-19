import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useStore } from '../lib/state';
import { SkeuoRocker } from '../components/SkeuoRocker';
import { tokens } from '../theme';

export const BoardScreen = () => {
  const route = useRoute<any>();
  const { id } = route.params;
  const board = useStore(s => s.boards.find(b => b.id === id));
  const toggle = useStore(s => s.toggleChannel);
  if (!board) return null;
  return (
    <View style={{ flex: 1, padding: tokens.space.md }}>
      <Text style={{ fontSize: 20, marginBottom: tokens.space.md }}>{board.name}</Text>
      <FlatList
        data={board.channels}
        keyExtractor={c => c.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={{ flex: 1, margin: tokens.space.sm }}>
            <SkeuoRocker
              name={item.name}
              watts={item.watts}
              state={item.state}
              onToggle={() => toggle(board.id, item.id)}
            />
          </View>
        )}
      />
      <Pressable
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: '#6200ee',
          borderRadius: 28,
          width: 56,
          height: 56,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text style={{ color: 'white' }}>+</Text>
      </Pressable>
    </View>
  );
};
