import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput,
  KeyboardAvoidingView, Platform, Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useShop } from '../context/ShopContext';
import { COLORS, SIZES } from '../styles/GlobalStyles';

const CheckoutScreen = ({ navigation }) => {
  const {
    cart, getSubtotal, getDiscount, getFinalTotal, clearCart, user, addOrder, savedAddress, isDarkMode
  } = useShop();

  const [step, setStep] = useState(1);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');

  // --- CUSTOM ERROR MODAL STATE ---
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const showError = (title, message) => {
    setErrorTitle(title);
    setErrorMessage(message);
    setErrorModalVisible(true);
  };

  useEffect(() => {
    if (savedAddress) {
      setStreet(savedAddress.house || '');
      setArea(savedAddress.street || '');
      setCity(savedAddress.city || '');
    }
  }, [savedAddress]);

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const finalTotal = getFinalTotal();
  const deliveryFee = cart.length > 0 ? 150 : 0;
  const totalToPay = finalTotal + deliveryFee;
  const orderId = `MU${Math.floor(Math.random() * 10000)}`;

  // --- DARK MODE THEME ---
  const theme = {
    bg: isDarkMode ? COLORS.darkBg : COLORS.light,
    card: isDarkMode ? COLORS.darkCard : COLORS.white,
    text: isDarkMode ? COLORS.darkText : COLORS.textDark,
    subText: isDarkMode ? '#AAAAAA' : COLORS.textGray,
    border: isDarkMode ? COLORS.darkBorder : COLORS.border,
    inputBg: isDarkMode ? '#2C2C2C' : COLORS.light,
  };

  const handleSaveContinue = () => {
    if (!name || !phone || !street || !city) {
      showError('OH NO...', 'Please fill in all required address fields.');
      return;
    }

    // 1. Name validation
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name.trim())) {
      showError('INVALID NAME', 'Name can only contain letters and spaces.');
      return;
    }

    // 2. Phone validation
    const cleanPhone = phone.replace(/\s+/g, '');         //spaces rem
    const phoneRegex = /^0\d{10}$/;                       //start 0 , digit=10
    if (!phoneRegex.test(cleanPhone)) {
      showError('INVALID PHONE', 'Please enter a valid 11-digit phone number starting with 0 (e.g., 03001234567).');
      return;
    }

    setStep(2);
  };

  const handleViewOrder = async () => {
    addOrder({
      id: orderId,
      items: cart.length,
      total: totalToPay,
      subtotal,
      discount,
      deliveryFee,
      date: new Date().toLocaleDateString(),
      eta: '19–21 Oct',
      address: { name, phone, street, area, city },
    });

    await clearCart();
    navigation.navigate('Main', { screen: 'Home' });
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.bg }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => step === 2 ? setStep(1) : navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            {step === 1 ? 'Shipping address' : 'Order confirmation'}
          </Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      {/* PROGRESS BAR */}
      <View style={styles.progressRow}>
        <TouchableOpacity style={styles.progressItem} onPress={() => setStep(1)}>
          <Text style={[styles.progressText, step === 1 ? styles.progressActive : { color: theme.subText }]}>
            Address
          </Text>
          <View style={[styles.underline, step === 1 ? styles.underlineActive : styles.underlineInactive]} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.progressItem} onPress={() => setStep(2)}>
          <Text style={[styles.progressText, step === 2 ? styles.progressActive : { color: theme.subText }]}>
            Done
          </Text>
          <View style={[styles.underline, step === 2 ? styles.underlineActive : styles.underlineInactive]} />
        </TouchableOpacity>
      </View>

      {/* SCREEN 1: SHIPPING ADDRESS */}
      {step === 1 && (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 10, paddingBottom: 180 }}>

            <View style={[styles.card, { backgroundColor: theme.card }]}>
              <Text style={[styles.inputLabel, { color: theme.subText }]}>Full name</Text>
              <TextInput style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]} value={name} onChangeText={setName} placeholder="Enter your name" placeholderTextColor={theme.subText} />

              <Text style={[styles.inputLabel, { color: theme.subText }]}>Phone number</Text>
              <TextInput style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]} value={phone} onChangeText={setPhone} placeholder="0300 1234567" placeholderTextColor={theme.subText} keyboardType="phone-pad" />

              <Text style={[styles.inputLabel, { color: theme.subText }]}>Street address</Text>
              <TextInput style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]} value={street} onChangeText={setStreet} placeholder="House 24, Street 5" placeholderTextColor={theme.subText} />

              <Text style={[styles.inputLabel, { color: theme.subText }]}>Area / neighbourhood</Text>
              <TextInput style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]} value={area} onChangeText={setArea} placeholder="Gulberg III" placeholderTextColor={theme.subText} />

              <Text style={[styles.inputLabel, { color: theme.subText }]}>City</Text>
              <TextInput style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]} value={city} onChangeText={setCity} placeholder="Lahore" placeholderTextColor={theme.subText} />
            </View>

            <View style={styles.codBox}>
              <View style={styles.codLeft}>
                <Ionicons name="cash-outline" size={20} color={COLORS.gold} />
                <View>
                  <Text style={[styles.codTitle, { color: theme.text }]}>Cash on delivery</Text>
                  <Text style={[styles.codSub, { color: theme.subText }]}>Pay when your order arrives</Text>
                </View>
              </View>
              <Ionicons name="checkmark-circle" size={22} color={COLORS.gold} />
            </View>

            <View style={styles.deliveryInfoRow}>
              <Ionicons name="cube-outline" size={16} color={theme.subText} />
              <Text style={[styles.deliveryInfoText, { color: theme.subText }]}>Delivery Rs. 150 · Estimated 17-19 Oct</Text>
            </View>

            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { color: theme.text }]}>Order total</Text>
              <Text style={styles.totalValue}>Rs. {totalToPay.toFixed(0)}</Text>
            </View>
          </ScrollView>

          <View style={[styles.bottomBar, { backgroundColor: theme.bg }]}>
            <TouchableOpacity style={styles.btn} onPress={handleSaveContinue}>
              <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
              <Text style={styles.btnText}>Save & Continue</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}

      {/* SCREEN 2: ORDER CONFIRMATION */}
      {step === 2 && (
        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 10, paddingBottom: 120 }}>
            <View style={styles.successIconContainer}>
              <Ionicons name="checkmark-circle" size={60} color="#daf7dd" />
              <Ionicons name="checkmark" size={30} color="#4bab4e" style={styles.checkIconAbsolute} />
            </View>

            <Text style={[styles.successTitle, { color: theme.text }]}>Good finds, on their way.</Text>
            <Text style={[styles.successSub, { color: theme.subText }]}>Thank you, {name}. Your order is confirmed!</Text>

            <View style={[styles.deliveryBox, { backgroundColor: isDarkMode ? '#2C2C2C' : '#F9F3E3' }]}>
              <Ionicons name="cube-outline" size={24} color={theme.text} />
              <View style={styles.deliveryBoxText}>
                <Text style={[styles.deliveryLabel, { color: theme.subText }]}>ESTIMATED DELIVERY</Text>
                <Text style={[styles.deliveryDate, { color: theme.text }]}>17–19 Oct</Text>
              </View>
            </View>

            <View style={[styles.card, { backgroundColor: theme.card }]}>
              <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>Order #{orderId}</Text>
                <Text style={[styles.itemCount, { color: theme.subText }]}>{cart.length} items</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: theme.subText }]}>Subtotal</Text>
                <Text style={[styles.summaryValue, { color: theme.text }]}>Rs. {subtotal.toFixed(0)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: '#4CAF50' }]}>20% discount</Text>
                <Text style={[styles.summaryValue, { color: '#4CAF50' }]}>- Rs. {discount.toFixed(0)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: theme.subText }]}>Delivery</Text>
                <Text style={[styles.summaryValue, { color: theme.text }]}>Rs. {deliveryFee}</Text>
              </View>

              <View style={[styles.divider, { backgroundColor: theme.border }]} />

              <View style={styles.summaryRow}>
                <Text style={[styles.totalLabel, { color: theme.text }]}>Total paid</Text>
                <Text style={styles.totalValue}>Rs. {totalToPay.toFixed(0)}</Text>
              </View>

              <Text style={[styles.paidVia, { color: theme.subText }]}>Paid · Cash on Delivery</Text>
              <Text style={[styles.footnote, { color: theme.subText }]}>* 20% applied as subtotal above Rs.1,200.</Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.card }]}>
              <View style={styles.cardHeaderLeft}>
                <Ionicons name="location-outline" size={18} color={theme.text} />
                <Text style={[styles.cardTitle, { color: theme.text }]}>Delivering to</Text>
              </View>
              <Text style={[styles.addressName, { color: theme.text }]}>{name} · {phone}</Text>
              <Text style={[styles.addressText, { color: theme.subText }]}>{street}, {area}, {city}</Text>
            </View>
          </ScrollView>

          <View style={[styles.bottomBar, { backgroundColor: theme.bg }]}>
            <TouchableOpacity style={styles.btn} onPress={handleViewOrder}>
              <Ionicons name="cube-outline" size={18} color={COLORS.white} />
              <Text style={styles.btnText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* --- CUSTOM ERROR MODAL --- */}
      <Modal visible={errorModalVisible} transparent animationType="fade" onRequestClose={() => setErrorModalVisible(false)}>
        <View style={styles.customModalBg}>
          <View style={[styles.customModalCard, { backgroundColor: theme.card }]}>
            <View style={styles.errorIconCircle}>
              <Ionicons name="alert" size={32} color={COLORS.white} />
            </View>
            <Text style={[styles.customModalTitle, { color: theme.text }]}>{errorTitle}</Text>
            <Text style={[styles.customModalText, { color: theme.subText }]}>{errorMessage}</Text>
            <View style={styles.customBtnRow}>
              <TouchableOpacity 
                style={[styles.customBtn, styles.loginBtn]} 
                onPress={() => setErrorModalVisible(false)}
              >
                <Text style={styles.loginBtnText}>TRY AGAIN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SIZES.screenPadding, paddingTop: 50, paddingBottom: 16 },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  headerSub: { fontSize: 11, marginTop: 2 },

  progressRow: { flexDirection: 'row', paddingHorizontal: SIZES.screenPadding, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: 'transparent', paddingBottom: 10, gap: 20 },
  progressItem: { flex: 1, alignItems: 'center' },
  progressText: { fontSize: 12, fontWeight: 'bold', marginBottom: 6 },
  progressActive: { color: COLORS.gold },
  progressInactive: { color: COLORS.textGray },

  underline: { height: 3, width: '80%', borderRadius: 2 },
  underlineActive: { backgroundColor: COLORS.gold },
  underlineInactive: { backgroundColor: 'transparent' },

  card: { marginHorizontal: SIZES.screenPadding, borderRadius: 16, padding: 20, marginBottom: 16, marginTop: 10 },
  inputLabel: { fontSize: 11, marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12, fontSize: 14, marginBottom: 16 },

  codBox: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(201, 169, 97, 0.08)', marginHorizontal: SIZES.screenPadding, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: COLORS.gold, marginBottom: 16 },
  codLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  codTitle: { fontSize: 14, fontWeight: '600' },
  codSub: { fontSize: 11 },

  deliveryInfoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: SIZES.screenPadding, marginBottom: 20 },
  deliveryInfoText: { fontSize: 12 },

  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: SIZES.screenPadding },
  totalLabel: { fontSize: 16, fontWeight: '600' },
  totalValue: { fontSize: 20, fontWeight: 'bold', color: COLORS.gold },

  successIconContainer: { alignItems: 'center', justifyContent: 'center', marginTop: -15, marginBottom: 16 },
  checkIconAbsolute: { position: 'absolute' },
  successTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  successSub: { fontSize: 13, textAlign: 'center', marginHorizontal: 40, marginBottom: 24 },
  deliveryBox: { flexDirection: 'row', alignItems: 'center', marginHorizontal: SIZES.screenPadding, borderRadius: 12, padding: 16, marginBottom: 20, gap: 12 },
  deliveryBoxText: { flex: 1 },
  deliveryLabel: { fontSize: 10, letterSpacing: 1, marginBottom: 2 },
  deliveryDate: { fontSize: 14, fontWeight: 'bold' },

  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  cardHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  cardTitle: { fontSize: 14, fontWeight: 'bold' },
  itemCount: { fontSize: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryLabel: { fontSize: 13 },
  summaryValue: { fontSize: 13, fontWeight: '500' },
  divider: { height: 1, marginVertical: 10 },
  totalLabel: { fontSize: 16, fontWeight: 'bold' },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: COLORS.gold },
  paidVia: { fontSize: 11, marginTop: 12 },
  footnote: { fontSize: 10, marginTop: 4 },
  addressName: { fontSize: 13, fontWeight: '600', marginBottom: 4 },
  addressText: { fontSize: 12 },

  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: SIZES.screenPadding, paddingVertical: 16, paddingBottom: 30 },
  btn: { flexDirection: 'row', backgroundColor: COLORS.dark, paddingVertical: 16, borderRadius: 30, alignItems: 'center', justifyContent: 'center', gap: 8 },
  btnText: { color: COLORS.white, fontWeight: 'bold', fontSize: 15 },

  // --- NEW STYLES FOR CUSTOM ERROR MODAL ---
  customModalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  customModalCard: { width: '100%', borderRadius: 24, padding: 28, alignItems: 'center', elevation: 10 },
  errorIconCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#E74C3C', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  customModalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  customModalText: { fontSize: 14, textAlign: 'center', lineHeight: 20, marginBottom: 24 },
  customBtnRow: { flexDirection: 'row', gap: 12, width: '100%', marginTop: 10 },
  customBtn: { flex: 1, paddingVertical: 14, borderRadius: 30, alignItems: 'center' },
  loginBtn: { backgroundColor: COLORS.dark },
  loginBtnText: { color: COLORS.white, fontWeight: 'bold', fontSize: 15 },
});

export default CheckoutScreen;