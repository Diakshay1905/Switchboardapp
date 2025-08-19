import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Appearance, ColorSchemeName, StyleProp, ViewStyle } from 'react-native';
import { tokens, ThemeColors } from './tokens';

interface ThemeContextValue {
  mode: ColorSchemeName;
  colors: ThemeColors;
  setMode: (m: ColorSchemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'light',
  colors: tokens.colors.light,
  setMode: () => {}
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const scheme = Appearance.getColorScheme() || 'light';
  const [mode, setMode] = useState<ColorSchemeName>(scheme);
  const colors = tokens.colors[mode];
  return (
    <ThemeContext.Provider value={{ mode, colors, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export const skeuo = {
  card(face: 'light' | 'dark'): StyleProp<ViewStyle> {
    const palette = tokens.colors[face];
    return {
      backgroundColor: palette.face,
      borderRadius: tokens.radius.lg,
      shadowColor: face === 'light' ? '#000' : '#000',
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 4,
      padding: tokens.space.md
    };
  },
  innerShadow(depth: number): StyleProp<ViewStyle> {
    return {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: depth },
      shadowOpacity: 0.2,
      shadowRadius: depth
    };
  },
  gloss(): StyleProp<ViewStyle> {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '50%',
      backgroundColor: 'rgba(255,255,255,0.15)'
    };
  }
};
