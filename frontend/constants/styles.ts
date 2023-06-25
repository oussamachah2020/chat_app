export const FONTS = {
  medium: "PoppinsMedium",
  regular: "PoppinsRegular",
  bold: "PoppinsBold",

  RobotoMedium: "RobotoMedium",
  RobotoRegular: "RobotoRegular",
  RobotoBold: "RobotoBold",
};

export const COLORS = {
  primary: "#5E30E7",
  secondary: "#9c8ef7",
  white: "#FFFFFF",
  gray: "#74858C",
};

export const SIZES = {
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  extraLarge: 24,
};

export const SHADOWS = {
  light: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  medium: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  dark: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
};
