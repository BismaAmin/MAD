import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../styles/GlobalStyles';

const CustomMessageModal = ({ visible, type, title, message, onClose }) => {
  const isSuccess = type === 'success';
  
  // 🎨 ICON COLORS (Green for Success, Red for Error)
  const iconColor = isSuccess ? '#4CAF50' : '#E74C3C'; 
  const iconBgColor = isSuccess ? '#E8F5E9' : '#FDEDEC'; 

  // 🎨 BUTTON COLORS (Black for both)
  const buttonColor = COLORS.dark; // Dono ke liye Dark/Black
  const buttonTextColor = COLORS.white;

  // Icon Name
  const iconName = isSuccess ? 'checkmark' : 'alert';

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBg}>
        <View style={styles.card}>
          
          {/* Icon (Green/Red) */}
          <View style={[styles.iconCircle, { backgroundColor: iconBgColor }]}>
            <Ionicons name={iconName} size={40} color={iconColor} />
          </View>

          {/* Title (Green/Red) */}
          <Text style={[styles.title, { color: iconColor }]}>
            {title}
          </Text>

          {/* Message */}
          <Text style={styles.message}>
            {message}
          </Text>

          {/* Button (Black for both) */}
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: buttonColor }]} 
            onPress={onClose}
          >
            <Text style={[styles.buttonText, { color: buttonTextColor }]}>
              {isSuccess ? 'DONE' : 'TRY AGAIN'}
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    elevation: 10,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    letterSpacing: 1,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: COLORS.textGray,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default CustomMessageModal;