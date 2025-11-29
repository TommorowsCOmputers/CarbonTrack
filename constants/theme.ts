import { Platform } from "react-native";

const tintColorLight = "#00D4FF";
const tintColorDark = "#00E5FF";
const javenelyRed = "#E53935";

export const CategoryColors = {
  energy: "#FFA000",
  transport: "#E53935",
  food: "#43A047",
  shopping: "#8E24AA",
  waste: "#6D4C41",
  lifestyle: "#1E88E5",
};

export const DifficultyColors = {
  easy: "#43A047",
  medium: "#FFA000",
  hard: "#E53935",
};

export const BrandColors = {
  cyan: "#00D4FF",
  red: "#E53935",
  green: "#43A047",
};

export const Colors = {
  light: {
    text: "#11181C",
    buttonText: "#FFFFFF",
    tabIconDefault: "#7F8C8D",
    tabIconSelected: tintColorLight,
    link: tintColorLight,
    backgroundRoot: "#FFFFFF",
    backgroundDefault: "#F8F9FA",
    backgroundSecondary: "#E6E6E6",
    backgroundTertiary: "#D9D9D9",
    primary: tintColorLight,
    secondary: javenelyRed,
    amber: javenelyRed,
    red: javenelyRed,
    neutral: "#7F8C8D",
    earthTone: tintColorLight,
    cardBackground: "#FFFFFF",
    card: "#FFFFFF",
    background: "#FFFFFF",
  },
  dark: {
    text: "#ECEDEE",
    buttonText: "#FFFFFF",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    link: tintColorDark,
    backgroundRoot: "#1F2123",
    backgroundDefault: "#2A2C2E",
    backgroundSecondary: "#353739",
    backgroundTertiary: "#404244",
    primary: tintColorDark,
    secondary: javenelyRed,
    amber: javenelyRed,
    red: javenelyRed,
    neutral: "#9BA1A6",
    earthTone: tintColorDark,
    cardBackground: "#2A2C2E",
    card: "#2A2C2E",
    background: "#1F2123",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
  inputHeight: 48,
  buttonHeight: 52,
};

export const BorderRadius = {
  xs: 8,
  sm: 12,
  md: 18,
  lg: 24,
  xl: 30,
  "2xl": 40,
  "3xl": 50,
  full: 9999,
};

export const Typography = {
  h1: {
    fontSize: 32,
    fontWeight: "700" as const,
  },
  h2: {
    fontSize: 28,
    fontWeight: "700" as const,
  },
  h3: {
    fontSize: 24,
    fontWeight: "600" as const,
  },
  h4: {
    fontSize: 20,
    fontWeight: "600" as const,
  },
  body: {
    fontSize: 16,
    fontWeight: "400" as const,
  },
  small: {
    fontSize: 14,
    fontWeight: "400" as const,
  },
  link: {
    fontSize: 16,
    fontWeight: "400" as const,
  },
  caption: {
    fontSize: 14,
    fontWeight: "400" as const,
  },
  display: {
    fontSize: 48,
    fontWeight: "700" as const,
  },
  motivational: {
    fontSize: 18,
    fontWeight: "500" as const,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
