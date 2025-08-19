import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useStore } from '../lib/state';
import { SkeuoRocker } from '../components/SkeuoRocker';

export const ChannelScreen = () => {
  const route = useRoute<any>();
  const { boardId, channelId } = route.params;
  const board = useStore(s => s.boards.find(b => b.id === boardId));
  const toggle = useStore(s => s.toggleChannel);
  const extend = useStore(s => s.extendGrace);
  if (!board) return null;
  const channel = board.channels.find(c => c.id === channelId);
  if (!channel) return null;
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <SkeuoRocker
        name={channel.name}
        watts={channel.watts}
        state={channel.state}
        onToggle={() => toggle(board.id, channel.id)}
      />
      <Text style={{ marginTop: 20 }}>Idle threshold: {channel.idleThresholdW}W</Text>
      <Text>Grace: {channel.graceMinutes}min</Text>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Button title="Extend 30 min" onPress={() => extend(board.id, channel.id)} />
        <View style={{ width: 20 }} />
        <Button title="Cut Now" onPress={() => toggle(board.id, channel.id)} />
      </View>
    </View>
  );
};
