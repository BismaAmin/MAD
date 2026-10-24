import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput, Image, 
  KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomMessageModal from '../components/CustomMessageModal';
import { COLORS, SIZES } from '../styles/GlobalStyles';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  
  // Modal States
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('error');
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [onSuccessAction, setOnSuccessAction] = useState(null);

  const showMessage = (type, title, message, action = null) => {
    setModalType(type);
    setModalTitle(title);
    setModalMessage(message);
    setOnSuccessAction(action);
    setModalVisible(true);
  };

  const handleResetPassword = () => {
    if (!email) {
      showMessage('error', 'OH NO...', 'Please enter your email address.');
      return;
    }

    // Strict Email Check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage('error', 'INVALID EMAIL', 'Please enter a valid email address.');
      return;
    }

    // Demo Success (Bina asli email bheje)
    const nextAction = () => {
      navigation.navigate('Login');
    };
    showMessage('success', 'EMAIL SENT!', 'Check your inbox and spam folder for our email.', nextAction);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    if (modalType === 'success' && onSuccessAction) {
      onSuccessAction();
    }
  };

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <Text style={styles.headerTitle}>Back to you</Text>
              <Text style={styles.headerSub}>Account recovery</Text>
            </View>
            <View style={{ width: 24 }} />
          </View>

          {/* ICON */}
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Ionicons name="key-outline" size={30} color={COLORS.gold} />
            </View>
          </View>

          {/* TITLE */}
          <Text style={styles.title}>Forgot your password?</Text>
          <Text style={styles.subtitle}>
            No worries. Enter the email linked to your neuve account and we'll send you a reset link.
          </Text>

          {/* FORM CARD */}
          <View style={styles.card}>
            <Text style={styles.inputLabel}>Email address</Text>
            
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color={COLORS.textGray} />
              <TextInput 
                style={styles.input}
                placeholder="ayesha.khan@email.com"
                placeholderTextColor={COLORS.textLight}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
              <Text style={styles.buttonText}>Send Reset Link</Text>
              <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
            </TouchableOpacity>
            
            <Text style={styles.helperText}>Check your inbox and spam folder for our email.</Text>
          </View>

        

          {/* FOOTER BRANDING */}
          <View style={styles.footer}>
            <View style={styles.footerLine} />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      <CustomMessageModal 
        visible={modalVisible} 
        type={modalType} 
        title={modalTitle} 
        message={modalMessage} 
        onClose={handleCloseModal} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.light },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SIZES.screenPadding, paddingTop: 50, paddingBottom: 20 },
  headerCenter: { flex: 1, paddingLeft: 12 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textDark },
  headerSub: { fontSize: 11, color: COLORS.textGray, marginTop: 2 },
  
  iconContainer: { alignItems: 'center', marginTop: 10, marginBottom: 20 },
  iconCircle: { width: 70, height: 70, borderRadius: 20, backgroundColor: '#F9F3E3', justifyContent: 'center', alignItems: 'center' },
  
  title: { fontSize: 26, fontWeight: 'bold', color: COLORS.textDark, paddingHorizontal: SIZES.screenPadding, marginBottom: 10 },
  subtitle: { fontSize: 13, color: COLORS.textGray, paddingHorizontal: SIZES.screenPadding, lineHeight: 20, marginBottom: 30 },

  card: { backgroundColor: COLORS.white, marginHorizontal: SIZES.screenPadding, borderRadius: 20, padding: 20, marginBottom: 20 },
  inputLabel: { fontSize: 12, fontWeight: '600', color: COLORS.textDark, marginBottom: 8 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 20, backgroundColor: COLORS.light },
  input: { flex: 1, marginLeft: 10, fontSize: 14, color: COLORS.textDark },
  
  button: { flexDirection: 'row', backgroundColor: COLORS.dark, paddingVertical: 16, borderRadius: 30, alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 },
  buttonText: { color: COLORS.white, fontSize: 15, fontWeight: 'bold' },
  helperText: { fontSize: 11, color: COLORS.textGray, textAlign: 'center' },


  footer: { alignItems: 'center' },
});