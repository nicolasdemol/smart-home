import { Platform } from "react-native";
import { DefaultTheme, configureFonts } from "react-native-paper";

const fontConfig = {
  fontFamily: Platform.select({
    web: 'Inter, "Helvetica Neue", Helvetica, Arial, sans-serif',
    ios: "System",
    default: "sans-serif",
  }),
};

export const theme = {
  ...DefaultTheme,
  colors: {
    primary: "rgb(0, 0, 0)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(0, 0, 0)",
    onPrimaryContainer: "rgb(255, 255, 255)",
    secondary: "rgb(92, 93, 114)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(255, 255, 255)",
    onSecondaryContainer: "rgb(25, 26, 44)",
    tertiary: "rgb(120, 83, 107)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(255, 216, 238)",
    onTertiaryContainer: "rgb(46, 17, 38)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(255, 255, 255)",
    onBackground: "rgb(27, 27, 31)",
    surface: "rgb(255, 255, 255)",
    onSurface: "rgb(27, 27, 31)",
    surfaceVariant: "rgb(255, 255, 255)",
    onSurfaceVariant: "rgb(70, 70, 79)",
    outline: "rgb(119, 118, 128)",
    outlineVariant: "rgb(199, 197, 208)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(48, 48, 52)",
    inverseOnSurface: "rgb(243, 239, 244)",
    inversePrimary: "rgb(190, 194, 255)",
    elevation: {
      level0: "transparent",
      level1: "rgb(245, 242, 255)",
      level2: "rgb(0, 0, 0)",
      level3: "rgb(233, 230, 255)",
      level4: "rgb(231, 228, 255)",
      level5: "rgb(227, 224, 255)",
    },
    surfaceDisabled: "rgba(27, 27, 31, 0.12)",
    onSurfaceDisabled: "rgba(27, 27, 31, 0.38)",
    backdrop: "rgba(48, 48, 56, 0.4)",
  },
  fonts: configureFonts({ config: fontConfig }),
};
