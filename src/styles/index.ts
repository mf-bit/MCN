export { colors, gradients } from './colors';
export { typography, textStyles } from './typography';
export { spacing, layout, borderRadius, shadows } from './spacing';

// Common style combinations
export const commonStyles = {
  // Container styles
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7', // colors.background.primary
  },
  
  safeContainer: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingTop: 60, // Status bar height
  },
  
  // Card styles
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  // Button styles
  buttonPrimary: {
    backgroundColor: '#c4914f', // colors.primary[500]
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  
  buttonSecondary: {
    backgroundColor: '#f8e6d3', // colors.primary[100]
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  
  // Input styles
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#2c1810', // colors.text.primary
  },
  
  // Header styles
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fdf6f0',
  },
  
  // Navigation styles
  navbar: {
    flexDirection: 'row' as const,
    backgroundColor: '#1E1E1E', // colors.secondary[800]
    borderRadius: 30,
    marginHorizontal: 16,
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 8,
    justifyContent: 'space-around' as const,
  },
};



