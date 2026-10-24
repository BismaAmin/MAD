import { Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import { useNavigation } from '@react-navigation/native';
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import globalStyles, { colors } from '../styles';
import { useTheme } from '../ThemeContext';

export default function HomeScreen({ navigation }) {
  const navHook = useNavigation();   //get navobj frm ReactNav

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

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800' }}
      style={styles.background}
      resizeMode="cover"    //fill scr
    >
      <View style={styles.overlay}>
        <Text style={[globalStyles.title, { color: '#FFFFFF' }]}>Student App</Text>

        <Text style={[globalStyles.subtitle, { color: '#FFFFFF' }]}>
          Welcome to your dashboard
        </Text>

        {/* ── PROPS NAVIGATION ── 
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={globalStyles.buttonText}>Go to Profile (props)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => navigation.navigate('Contact')}
        >
          <Text style={globalStyles.buttonText}>Go to Contact (props)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={globalStyles.buttonText}>Go to Settings (props)</Text>
        </TouchableOpacity>
        */}

        {/* ── HOOK NAVIGATION ──*/}
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => navHook.navigate('Profile')}
        >
          <Text style={globalStyles.buttonText}>Go to Profile (hook)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => navHook.navigate('Contact')}
        >
          <Text style={globalStyles.buttonText}>Go to Contact (hook)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => navHook.navigate('Settings')}
        >
          <Text style={globalStyles.buttonText}>Go to Settings (hook)</Text>
        </TouchableOpacity>
      

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});