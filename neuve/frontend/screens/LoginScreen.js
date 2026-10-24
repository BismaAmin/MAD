import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useShop } from '../context/ShopContext';
import CustomInput from '../components/CustomInput';
import CustomMessageModal from '../components/CustomMessageModal';
import { GlobalStyles, COLORS } from '../styles/GlobalStyles';

const backgroundImage = require('../../assets/images/login.jpg');

const LoginScreen = ({ navigation, route }) => {     //back to some scr
  const { login } = useShop();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemembered, setIsRemembered] = useState(false);

  // Modal States
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('error');
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const redirectTo = route?.params?.redirectTo;

  const showMessage = (type, title, message) => {
    setModalType(type);
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  };

  const handleLogin = async () => {
    // 1. Khali fields check
    if (!email || !password) {
      showMessage('error', 'OH NO...', 'Please fill in all fields.');
      return;
    }

    // 2. Strict Email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage('error', 'INVALID EMAIL', 'Please enter a valid email address (e.g., name@example.com).');
      return;
    }

    // 3. Password length check
    if (password.length < 6) {
      showMessage('error', 'WEAK PASSWORD', 'Password must be at least 6 characters long.');
      return;
    }

    try {
      await login(email, password);
      setIsLoginSuccess(true);
      showMessage('success', 'SUCCESS!', 'You have logged in successfully.');
    } catch (error) {
      if (error.message === 'INVALID_CREDENTIALS') {
        showMessage(
          'error',
          'INVALID CREDENTIALS',
          'Email or password is incorrect. Please try again or sign up.'
        );
      } else {
        showMessage('error', 'OH NO...', 'Something went wrong. Let\'s try again.');
      }
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    
    if (modalType === 'success' && isLoginSuccess) {
      if (redirectTo) {
        navigation.replace(redirectTo.name, redirectTo.params);
      } else {
        navigation.replace('Main');
      }
    }
  };

  return (
    <View style={styles.root}>
      <Image source={backgroundImage} style={styles.backgroundImage} resizeMode="cover" blurRadius={15} />
      <View style={styles.darkOverlay} />

      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} showsVerticalScrollIndicator={false}>
        <View style={[GlobalStyles.container, { paddingVertical: 50 }]}>
          
          <Text style={GlobalStyles.title}>Log into{'\n'}your account</Text>

          <View style={styles.formContainer}>
            <CustomInput 
              placeholder="Email" 
              value={email} 
              onChangeText={setEmail} 
              keyboardType="email-address"
            />
            
            <CustomInput 
              placeholder="Password" 
              secureTextEntry 
              value={password} 
              onChangeText={setPassword} 
              isPassword={true} 
            />

            <View style={styles.rememberContainer}>
              <TouchableOpacity 
                style={styles.checkboxContainer} 
                onPress={() => setIsRemembered(!isRemembered)}    //if f, touch f if f,touch t
              >
                <View style={styles.checkboxBox}>
                  {isRemembered && <Ionicons name="checkmark" size={14} color={COLORS.white} />}
                </View>
                <Text style={styles.rememberText}>Remember me</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.rememberText}>Forgot?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={GlobalStyles.buttonDark} onPress={handleLogin}>
              <Text style={GlobalStyles.buttonTextDark}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Signup', { redirectTo })}>
              <Text style={GlobalStyles.linkText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>

      <CustomMessageModal 
        visible={modalVisible} 
        type={modalType} 
        title={modalTitle} 
        message={modalMessage} 
        onClose={handleCloseModal} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#D4C4B7' },
  backgroundImage: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', opacity: 0.55 },
  darkOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.35)' },
  formContainer: { width: '100%' },
  rememberContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center' },
  checkboxBox: { width: 18, height: 18, borderWidth: 1.5, borderColor: COLORS.white, borderRadius: 4, justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  rememberText: { color: COLORS.white, fontSize: 14 },
});

export default LoginScreen;