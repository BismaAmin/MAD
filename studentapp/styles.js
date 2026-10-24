import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#d6962f',
  secondary: '#FF6584',
  dark: '#1E1E2C',
  light: '#f8f9d3',
  white: '#FFFFFF',
  text: '#333333',
  textLight: '#fff3f3',
};

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: colors.white,
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: colors.textLight,
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginVertical: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    fontSize: 16,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 14,
    color: colors.text,
    marginTop: 10,
    fontWeight: '600',
  },
  liveText: {
    fontSize: 18,
    color: colors.primary,
    marginVertical: 10,
    fontWeight: 'bold',
  },
});

export default globalStyles;