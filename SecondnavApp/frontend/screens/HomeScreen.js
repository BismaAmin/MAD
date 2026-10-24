import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useFonts, Poppins_700Bold } from '@expo-google-fonts/poppins';
import globalStyles, { colors } from '../../styles';
import { useTheme } from '../../ThemeContext';

export default function HomeScreen({ goToProfile, goToSettings, goToContact }) {
  const [fontsLoaded] = useFonts({
    'Poppins-Bold': Poppins_700Bold,
  });

  const { background } = useTheme();

  if (!fontsLoaded) {
    return (
      <View style={[globalStyles.container, { backgroundColor: background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const isPropMode =   //checks isPropMode=true, so show 3 butt
    typeof goToProfile === 'function' &&
    typeof goToSettings === 'function' &&
    typeof goToContact === 'function';

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800' }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={[globalStyles.title, { color: '#FFFFFF' }]}>Student App</Text>
        <Text style={[globalStyles.subtitle, { color: '#FFFFFF' }]}>
          Welcome to your dashboard
        </Text>

        {isPropMode && (
          <> 
            <TouchableOpacity style={globalStyles.button} onPress={goToProfile}>
              <Text style={globalStyles.buttonText}>Go to Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={globalStyles.button} onPress={goToSettings}>
              <Text style={globalStyles.buttonText}>Go to Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={globalStyles.button} onPress={goToContact}>
              <Text style={globalStyles.buttonText}>Go to Contact</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});