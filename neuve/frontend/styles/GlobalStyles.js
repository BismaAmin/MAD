import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: '#D4C4B7',
  light: '#F5F1EC',       
  dark: '#222222',
  white: '#FFFFFF',
  textDark: '#333333',
  textLight: '#A0A0A0',
  ban: '#8a5d15', 
  border: '#E0E0E0',
  gold: '#C9A961',        
  red: '#D9534F',         
  
  // 👇 NAYE DARK MODE COLORS 👇
  darkBg: '#121212',      // Poora kaala background
  darkCard: '#1E1E1E',    // Cards/Boxes ka thoda light kaala
  darkText: '#EAEAEA',    // Text ka safed/light color
  darkBorder: '#333333',  // Borders ka color
};

export const SIZES = {
  padding: 30,
  screenPadding: 20,      
  radius: 30,
  cardRadius: 16,         
  h1: 32,
  h2: 24,                 
  h3: 18,                 
  body: 16,
  small: 12,
};

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: SIZES.padding,
    justifyContent: 'center',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  screenContent: {
    padding: SIZES.screenPadding,
  },
  title: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 40,
    lineHeight: 38,
  },
  heading: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  subheading: {
    fontSize: SIZES.h3,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  bodyText: {
    fontSize: SIZES.body,
    color: COLORS.textGray,
  },
  buttonDark: {
    backgroundColor: COLORS.dark,
    paddingVertical: 15,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonLight: {
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonTextDark: { color: COLORS.white, fontSize: SIZES.body, fontWeight: 'bold' },
  buttonTextLight: { color: COLORS.textDark, fontSize: SIZES.body, fontWeight: 'bold' },
  linkText: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});