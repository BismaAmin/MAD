import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from '../styles';
import { useTheme } from '../ThemeContext';

export default function ContactScreen() {
  const [email, setEmail] = useState('');
  const { background, text, card } = useTheme();

  const handleSubmit = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    Alert.alert('Submitted ✅', `Thank you! We'll contact ${email}`);
    setEmail('');
  };

  return (
    <View style={[globalStyles.container, { backgroundColor: background }]}>
      <Text style={[globalStyles.title, { color: text }]}>Contact Us</Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          backgroundColor: card,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#DDD',
          paddingHorizontal: 12,
        }}
      >
        <Icon name="email" size={22} color="#6C63FF" />
        <TextInput
          style={{ flex: 1, padding: 15, fontSize: 16, color: text }}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          inputMode="email"
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity
        style={[globalStyles.button, { marginTop: 20 }]}
        onPress={handleSubmit}
      >
        <Text style={globalStyles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}