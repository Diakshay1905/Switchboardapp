export const tokens = {
  radius: { xl: 22, lg: 16, md: 12 },
  space: { xs: 6, sm: 10, md: 14, lg: 18 },
  colors: {
    light: {
      face: "#f4f5f7",
      edge: "#e1e4ea",
      text: "#14161a",
      on: "#20c997",
      idle: "#ffb020",
      off: "#9aa0a6"
    },
    dark: {
      face: "#16181d",
      edge: "#0f1115",
      text: "#e6e8eb",
      on: "#34d399",
      idle: "#fbbf24",
      off: "#6b7280"
    }
  }
} as const;
export type ThemeColors = typeof tokens.colors.light;
