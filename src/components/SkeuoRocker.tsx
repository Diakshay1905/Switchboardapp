import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { MotiView } from 'moti';
import { useTheme, tokens } from '../theme';
import { ChannelState } from '../lib/models';

interface Props {
  name: string;
  watts: number;
  state: ChannelState;
  onToggle: () => void;
  onLongPress?: () => void;
}

export const SkeuoRocker = ({ name, watts, state, onToggle, onLongPress }: Props) => {
  const { colors } = useTheme();
  const ledColor =
    state === 'ON_ACTIVE'
      ? colors.on
      : state === 'IDLE_GRACE'
      ? colors.idle
      : colors.off;

  return (
    <Pressable onPress={onToggle} onLongPress={onLongPress} accessibilityLabel={name}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: ledColor,
            marginRight: tokens.space.sm
          }}
        />
        <MotiView
          animate={{ translateY: state === 'ON_ACTIVE' ? -6 : 6 }}
          transition={{ type: 'spring', damping: 15, mass: 1 }}
          style={{ padding: tokens.space.sm }}
        >
          <Text style={{ color: colors.text }}>{name}</Text>
          <Text style={{ color: colors.text, fontSize: 12 }}>
            {watts.toFixed(1)} W
          </Text>
        </MotiView>
      </View>
    </Pressable>
  );
};
