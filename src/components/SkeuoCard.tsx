import React, { ReactNode, useState } from 'react';
import { Pressable, StyleProp, View, ViewStyle } from 'react-native';
import { skeuo, useTheme } from '../theme';

interface Props {
  children: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const SkeuoCard = ({ children, onPress, style }: Props) => {
  const { mode } = useTheme();
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[skeuo.card(mode || 'light'), pressed && skeuo.innerShadow(2), style]}
    >
      <View>{children}</View>
    </Pressable>
  );
};
