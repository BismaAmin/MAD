import React, { useState } from 'react';
import { View, Text, Image, TextInput, ScrollView } from 'react-native';
import globalStyles from '../styles';
import { useTheme } from '../ThemeContext';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const { background, text, card } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={[globalStyles.container, { backgroundColor: background }]}
    >
      <Image
        source={{
          uri: 'https://img.magnific.com/free-vector/woman-floral-traditional-costume_1308-176159.jpg?semt=ais_hybrid&w=740&q=80',
        }}
        style={{ width: 130, height: 130, borderRadius: 65, marginBottom: 15 }}
      />

      <Text style={[globalStyles.title, { color: text }]}>Profile</Text>

      <Text style={[globalStyles.label, { color: text }]}>Name</Text>
      <TextInput
        style={[globalStyles.input, { backgroundColor: card, color: text }]}
        placeholder="Enter your name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
        inputMode="text"
      />

      <Text style={[globalStyles.label, { color: text }]}>Age</Text>
      <TextInput
        style={[globalStyles.input, { backgroundColor: card, color: text }]}
        placeholder="Enter your age"
        placeholderTextColor="#999"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        inputMode="numeric"
        maxLength={3}
      />

      <Text style={[globalStyles.liveText, { color: text }]}>
        👤 {name || 'Your name here'}
      </Text>
      <Text style={[globalStyles.liveText, { color: text }]}>
        🎂 {age ? `${age} years old` : 'Your age here'}
      </Text>
    </ScrollView>
  );
}