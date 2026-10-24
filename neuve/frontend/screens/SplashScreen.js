import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { COLORS, SIZES } from '../styles/GlobalStyles';

const { width } = Dimensions.get('window');

const backgroundImage = require('../../assets/images/splash.jpg');

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Main');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground 
      source={backgroundImage} 
      style={styles.background}
      resizeMode="cover"
    >
      {/* Ek dark overlay taake white text saaf nazar aaye */}
      <View style={styles.overlay}>
        
        {/* Logo Circle */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>neuve</Text>
        </View>

        {/* App Name */}
        <Text style={styles.appName}>neuve</Text>

        {/* Offer Text */}
        <Text style={styles.offerText}>20% OFF — Limited Stock!</Text>

        {/* Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace('Main')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1, // Poori screen cover karega
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1, // Poori screen cover karega
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Image ko thoda dark karega taake text dikhe
    justifyContent: 'center', // Sab kuch vertically center mein
    alignItems: 'center',     // Sab kuch horizontally center mein
    paddingHorizontal: 20,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D4C4B7',
  },
  appName: {
    fontSize: 42, // Bara aur wazeh text
    fontWeight: 'bold',
    color: COLORS.white,
    letterSpacing: 2,
    marginBottom: 10,
  },
  offerText: {
    fontSize: 16,
    color: COLORS.white,
    marginBottom: 40,
    fontWeight: '600',
    textAlign: 'center',
  },
  button: {
    backgroundColor: COLORS.white,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: SIZES.radius,
  },
  buttonText: {
    color: COLORS.dark,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SplashScreen;