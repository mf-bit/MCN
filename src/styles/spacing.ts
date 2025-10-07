// Spacing scale based on 4px grid system
export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  36: 144,
  40: 160,
  48: 192,
  56: 224,
  64: 256,
};

// Common spacing combinations
export const layout = {
  // Container padding
  containerPadding: spacing[4], // 16px
  containerPaddingLarge: spacing[6], // 24px
  
  // Section spacing
  sectionSpacing: spacing[8], // 32px
  sectionSpacingLarge: spacing[12], // 48px
  
  // Component spacing
  componentSpacing: spacing[4], // 16px
  componentSpacingSmall: spacing[2], // 8px
  componentSpacingLarge: spacing[6], // 24px
  
  // Card spacing
  cardPadding: spacing[4], // 16px
  cardPaddingLarge: spacing[6], // 24px
  
  // Button spacing
  buttonPadding: {
    small: spacing[2], // 8px
    medium: spacing[3], // 12px
    large: spacing[4], // 16px
  },
  
  // Input spacing
  inputPadding: spacing[3], // 12px
  
  // Header spacing
  headerPadding: {
    top: spacing[16], // 64px (for status bar)
    horizontal: spacing[4], // 16px
    bottom: spacing[5], // 20px
  },
  
  // Navigation spacing
  navSpacing: spacing[3], // 12px
  
  // Grid spacing
  gridSpacing: spacing[2], // 8px
  gridSpacingLarge: spacing[4], // 16px
};

// Border radius values
export const borderRadius = {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};

// Shadow definitions
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  
  base: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  
  xl: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
};



