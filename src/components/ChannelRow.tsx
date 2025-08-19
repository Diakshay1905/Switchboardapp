import React from 'react';
import { View } from 'react-native';
import { SkeuoRocker } from './SkeuoRocker';
import { ChannelState } from '../lib/models';
import { tokens } from '../theme';

interface Props {
  name: string;
  watts: number;
  state: ChannelState;
  onToggle: () => void;
  onLongPress?: () => void;
}

export const ChannelRow = (props: Props) => (
  <View style={{ marginBottom: tokens.space.md }}>
    <SkeuoRocker {...props} />
  </View>
);
