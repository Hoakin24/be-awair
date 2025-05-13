const COLORS = {
  // primary: "#312651",
  // secondary: "#444262",
  // tertiary: "#FF7754",

  // gray: "#83829A",
  // gray2: "#C1C0C8",
  // gray3: "#DDDDDD",
  // gray4 : "#333333",

  white: "#F3F4F8",
  lightWhite: "#FAFAFC",
    
  id: "#186CB2",
  value: "#AAAAAA",

  // Gray
  white: "#FFFFFF",
  powder: "#F3F6F9",
  dust: "#E4EDF4",
  smoke: "#D0D6DF",
  slate: "#778DB4",
  black: "#333333",

  // Primary Blue
  blue: "#0072FF",
  navy: "#003296",
  blueGray: "#7B90B7",

  // Secondary Blue
  lightBlue: "#80B9FF",
  stoneBlue: "#0046AA",
  smalt: "#003296",
  brightGreen: "3BBE00",

  // Semantics
  positive: "#3CBE00",
  negative: "#EB1F1F", 
  critical: "#FF9900",
  highlight: "#0072FF",
  neutral: "#D0D6DF",
};

const FONT = {
  regular: "InterRegular",
  medium: "InterMedium",
  semibold: "InterSemiBold",
  bold: "InterBold",
};

const SIZES = {
  xxxSmall: 6,
  xxSmall: 8,
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const THEMES = {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};

export { COLORS, FONT, SIZES, SHADOWS, THEMES };