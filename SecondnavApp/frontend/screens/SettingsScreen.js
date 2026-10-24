import React from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import globalStyles from '../../styles';
import { useTheme } from '../../ThemeContext';

export default function SettingsScreen({ goHome }) {
  const { isDark, background, text, card, toggle } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: background }]}>

      {goHome && (
        <TouchableOpacity
          onPress={goHome}
          style={{ position: 'absolute',
      top: 20,
      left: 20,
      padding: 8,
      zIndex: 10 }}
        >
          <Text style={{ color: text, fontSize: 18 ,fontWeight:'bold'}}>← Back</Text>
        </TouchableOpacity>
      )}

      <Text style={[globalStyles.title, { color: text }]}>Settings</Text>

      <View style={[styles.card, { backgroundColor: card }]}>
        <Text style={[styles.label, { color: text }]}>
          {isDark ? 'Light Mode ☀️' : 'Dark Mode 🌙'}
        </Text>
        <Switch
          value={isDark}
          onValueChange={toggle}
          trackColor={{ false: '#767577', true: '#d6962f' }}
          thumbColor={isDark ? '#65ff96' : '#f4f3f4'}
        />
      </View>

      <Text style={[styles.mode, { color: text }]}>
        Current Theme: {isDark ? 'Dark' : 'Light'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    padding: 20,
    borderRadius: 15,
    marginVertical: 20,
    elevation: 3,
  },
  label: { fontSize: 18, fontWeight: '600' },
  mode: { fontSize: 16, marginTop: 10 },
});