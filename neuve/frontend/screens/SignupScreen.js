import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useShop } from '../context/ShopContext';
import CustomInput from '../components/CustomInput';
import CustomMessageModal from '../components/CustomMessageModal';
import { GlobalStyles, COLORS } from '../styles/GlobalStyles';

const backgroundImage = require('../../assets/images/login.jpg');

const SignupScreen = ({ navigation, route }) => {
  const { signup } = useShop();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const redirectTo = route?.params?.redirectTo;

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('error');
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);

  const showMessage = (type, title, message) => {
    setModalType(type);
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  };

  const handleSignup = async () => {
    // 1. Khali fields check
    if (!name || !email || !password) {
      showMessage('error', 'OH NO...', 'Please fill in all fields.');
      return;
    }

    // 2. STRICT NAME CHECK (Sirf letters aur spaces, kam az kam 3 characters)
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (name.trim().length < 3 || !nameRegex.test(name)) {
      showMessage('error', 'INVALID NAME', 'Name can only contain letters and spaces (min 3 characters).');
      return;
    }

    // 3. STRICT EMAIL CHECK (Bina @ aur . ke signup nahi hoga)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage('error', 'INVALID EMAIL', 'Please enter a valid email address (e.g., name@example.com).');
      return;
    }

    // 4. Password length check (kam az kam 6 characters)
    if (password.length < 6) {
      showMessage('error', 'WEAK PASSWORD', 'Password must be at least 6 characters long.');
      return;
    }

    // 5. Terms checkbox check
    if (!agreed) {
      showMessage('error', 'TERMS REQUIRED', 'Please agree to the terms of service to continue.');
      return;
    }

    try {
      await signup(name, email, password);
      setIsSignupSuccess(true);
      showMessage('success', 'SUCCESS!', 'Account created successfully.');
    } catch (error) {
      if (error.message === 'EMAIL_EXISTS') {
        showMessage('error', 'EMAIL EXISTS', 'This email is already registered. Please log in.');
      } else {
        showMessage('error', 'OH NO...', 'Something went wrong. Let\'s try again.');
      }
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    if (modalType === 'success' && isSignupSuccess) {
      // Signup ke baad wapas Login pe bhejo, redirectTo carry karo
      navigation.navigate('Login', { redirectTo });  //back to where it req to login
    }
  };

  return (
    <View style={styles.root}>
      <Image source={backgroundImage} style={styles.backgroundImage} resizeMode="cover" blurRadius={15} />
      <View style={styles.darkOverlay} />

      <View style={GlobalStyles.container}>
        <Text style={GlobalStyles.title}>Create{'\n'}your account</Text>

        <View style={styles.formContainer}>
          <CustomInput placeholder="Your Name" value={name} onChangeText={setName} />
          <CustomInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <CustomInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} isPassword={true} />

          <View style={styles.termsContainer}>
            <TouchableOpacity style={styles.checkbox} onPress={() => setAgreed(!agreed)}>
              <View style={[styles.checkboxBox, agreed && styles.checkboxActive]}>
                {agreed && <Ionicons name="checkmark" size={14} color={COLORS.white} />}
              </View>
              <Text style={styles.termsText}>
                By signing up you agree to the terms of service and privacy policy
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={GlobalStyles.buttonDark} onPress={handleSignup}>
            <Text style={GlobalStyles.buttonTextDark}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login', { redirectTo })}>
            <Text style={GlobalStyles.linkText}>Already have account? Log In</Text>
          </TouchableOpacity>
        </View>
      </View>

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
  termsContainer: { marginBottom: 20 },
  checkbox: { flexDirection: 'row', alignItems: 'center' },
  checkboxBox: { width: 18, height: 18, borderWidth: 1.5, borderColor: COLORS.white, borderRadius: 4, justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  checkboxActive: { backgroundColor: COLORS.gold, borderColor: COLORS.gold },
  termsText: { color: COLORS.white, fontSize: 12, flex: 1, opacity: 0.9 },
});

export default SignupScreen;