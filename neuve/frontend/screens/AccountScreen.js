import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Modal, Linking, Switch, TextInput, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useShop } from '../context/ShopContext';
import { COLORS, SIZES } from '../styles/GlobalStyles';

export default function AccountScreen({ navigation }) {
  const { 
    user, orders, logout, updateUserName, updateAddress, savedAddress, 
    isDarkMode, toggleDarkMode 
  } = useShop();

  const [logoutModal, setLogoutModal] = useState(false);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [addressModal, setAddressModal] = useState(false);
  const [ordersModal, setOrdersModal] = useState(false);

  const [draftName, setDraftName] = useState('');
  const [draftHouse, setDraftHouse] = useState('');
  const [draftStreet, setDraftStreet] = useState('');
  const [draftCity, setDraftCity] = useState('');

  // --- DARK MODE THEME ---
  const theme = {
    bg: isDarkMode ? COLORS.darkBg : COLORS.light,
    card: isDarkMode ? COLORS.darkCard : COLORS.white,
    text: isDarkMode ? COLORS.darkText : COLORS.dark,
    subText: isDarkMode ? '#AAAAAA' : COLORS.textGray,
    border: isDarkMode ? COLORS.darkBorder : COLORS.border,
    inputBg: isDarkMode ? '#2C2C2C' : COLORS.light,
  };

  const confirmLogout = async () => {
    setLogoutModal(false);
    await logout();
    navigation.replace('Login');
  };

  const openEditProfile = () => {
    setDraftName(user?.name || '');
    setEditProfileModal(true);
  };

  const saveProfile = () => {
    if (draftName.trim().length >= 3) {
      if (updateUserName) updateUserName(draftName.trim());
      setEditProfileModal(false);
    } else {
      Alert.alert('Error', 'Name must be at least 3 characters.');
    }
  };

  const openAddressModal = () => {
    setDraftHouse(savedAddress?.house || '');
    setDraftStreet(savedAddress?.street || '');
    setDraftCity(savedAddress?.city || '');
    setAddressModal(true);
  };

  const saveAddress = () => {
    if (updateAddress) {
      updateAddress({
        house: draftHouse.trim(),
        street: draftStreet.trim(),
        city: draftCity.trim(),
      });
    }
    setAddressModal(false);
  };

  if (!user) {
    return (
      <View style={[styles.guestRoot, { backgroundColor: theme.bg }]}>
        <Ionicons name="person-circle-outline" size={90} color={theme.subText} />
        <Text style={[styles.guestTitle, { color: theme.text }]}>You are not logged in</Text>
        <Text style={[styles.guestSub, { color: theme.subText }]}>Log in to view your account and continue shopping.</Text>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.primaryBtnText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.secondaryBtn, { backgroundColor: theme.card, borderColor: theme.border }]} onPress={() => navigation.navigate('Signup')}>
          <Text style={[styles.secondaryBtnText, { color: theme.text }]}>Create an Account</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const initial = user.name?.charAt(0).toUpperCase() || 'U';
  
  const hasAddress = savedAddress?.house || savedAddress?.street || savedAddress?.city;
  const displayAddress = hasAddress 
    ? `${savedAddress.house}, ${savedAddress.street}, ${savedAddress.city}` 
    : 'No address saved yet';

  return (
    <View style={[styles.root, { backgroundColor: theme.bg }]}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>A little about you</Text>
          <Text style={[styles.headerSub, { color: theme.subText }]}>Your muse, account</Text>
        </View>
        <TouchableOpacity style={styles.backBtn}>
          <Ionicons name="settings-outline" size={22} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* PROFILE CARD */}
        <View style={[styles.profileCard, { backgroundColor: theme.card }]}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.userName, { color: theme.text }]}>{user.name}</Text>
            <Text style={[styles.userEmail, { color: theme.subText }]}>{user.email}</Text>
            <TouchableOpacity onPress={openEditProfile}>
              <Text style={styles.editProfileText}>Edit profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* MENU LIST GROUP 1 */}
        <View style={[styles.menuGroup, { backgroundColor: theme.card }]}>
          <TouchableOpacity style={styles.menuRow} onPress={() => setOrdersModal(true)}>
            <Ionicons name="cube-outline" size={22} color={theme.text} />
            <View style={styles.menuTextWrap}>
              <Text style={[styles.menuTitle, { color: theme.text }]}>My orders</Text>
              <Text style={[styles.menuSub, { color: theme.subText }]}>Track, review & shop again</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.subText} />
          </TouchableOpacity>
          
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          
          <TouchableOpacity style={styles.menuRow} onPress={openAddressModal}>
            <Ionicons name="location-outline" size={22} color={theme.text} />
            <View style={styles.menuTextWrap}>
              <Text style={[styles.menuTitle, { color: theme.text }]}>Saved addresses</Text>
              <Text style={[styles.menuSub, { color: theme.subText }]} numberOfLines={1}>{displayAddress}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.subText} />
          </TouchableOpacity>
        </View>

        {/* MENU LIST GROUP 2 */}
        <View style={[styles.menuGroup, { backgroundColor: theme.card }]}>
          <View style={styles.menuRow}>
            <Ionicons name={isDarkMode ? "moon" : "moon-outline"} size={22} color={theme.text} />
            <View style={styles.menuTextWrap}>
              <Text style={[styles.menuTitle, { color: theme.text }]}>Dark mode</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: theme.border, true: COLORS.gold }}
              thumbColor={COLORS.white}
            />
          </View>
          
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          
          <TouchableOpacity style={styles.menuRow} onPress={() => Linking.openURL('mailto:support@neuve.com')}>
            <Ionicons name="heart-outline" size={22} color={theme.text} />
            <View style={styles.menuTextWrap}>
              <Text style={[styles.menuTitle, { color: theme.text }]}>Help support</Text>
              <Text style={[styles.menuSub, { color: theme.subText }]}>3 pieces you love</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.subText} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* SIGN OUT BUTTON (Now Black) */}
      <View style={[styles.bottomBar, { backgroundColor: theme.bg }]}>
        <TouchableOpacity 
          style={[styles.signOutBtn, { backgroundColor: COLORS.dark, borderColor: COLORS.dark }]} 
          onPress={() => setLogoutModal(true)}
        >
          <Ionicons name="log-out-outline" size={20} color={COLORS.white} />
          <Text style={[styles.signOutText, { color: COLORS.white }]}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* MY ORDERS MODAL */}
      <Modal visible={ordersModal} transparent animationType="fade" onRequestClose={() => setOrdersModal(false)}>
        <View style={styles.modalBg}>
          <View style={[styles.modalCard, { maxHeight: '80%', backgroundColor: theme.card }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 15 }}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>My Orders</Text>
              <TouchableOpacity onPress={() => setOrdersModal(false)}>
                <Ionicons name="close" size={24} color={theme.text} />
              </TouchableOpacity>
            </View>
            {orders.length === 0 ? (
              <View style={{ alignItems: 'center', paddingVertical: 30 }}>
                <Ionicons name="cube-outline" size={50} color={theme.subText} />
                <Text style={{ marginTop: 10, color: theme.subText }}>No orders yet.</Text>
              </View>
            ) : (
              <ScrollView style={{ width: '100%' }}>
                {orders.map((order) => (
                  <View key={order.id} style={[styles.orderItem, { backgroundColor: theme.inputBg, borderColor: theme.border }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                      <Text style={{ fontWeight: 'bold', color: theme.text }}>#{order.id}</Text>
                      <Text style={{ fontSize: 12, color: '#4CAF50', fontWeight: 'bold' }}>Confirmed</Text>
                    </View>
                    <Text style={{ fontSize: 12, color: theme.subText }}>{order.date} · {order.items} items</Text>
                    <Text style={{ fontSize: 14, color: COLORS.gold, fontWeight: 'bold', marginTop: 4 }}>Rs. {order.total.toFixed(0)}</Text>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      {/* EDIT PROFILE MODAL */}
      <Modal visible={editProfileModal} transparent animationType="fade" onRequestClose={() => setEditProfileModal(false)}>
        <View style={styles.modalBg}>
          <View style={[styles.modalCard, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Edit Display Name</Text>
            <TextInput 
              style={[styles.modalInput, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]} 
              value={draftName} 
              onChangeText={setDraftName} 
              placeholder="Enter your name" 
              placeholderTextColor={theme.subText}
              autoFocus 
            />
            <View style={styles.modalBtnRow}>
              <TouchableOpacity style={[styles.modalBtn, styles.modalCancel, { backgroundColor: theme.inputBg, borderColor: theme.border }]} onPress={() => setEditProfileModal(false)}>
                <Text style={[styles.modalCancelText, { color: theme.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, styles.modalSave]} onPress={saveProfile}>
                <Text style={styles.modalSaveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* EDIT ADDRESS MODAL */}
      <Modal visible={addressModal} transparent animationType="fade" onRequestClose={() => setAddressModal(false)}>
        <View style={styles.modalBg}>
          <View style={[styles.modalCard, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Saved Address</Text>
            
            <Text style={[styles.inputLabel, { color: theme.subText }]}>House / Flat No.</Text>
            <TextInput 
              style={[styles.modalInput, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]} 
              value={draftHouse} 
              onChangeText={setDraftHouse} 
              placeholder="e.g. House 24" 
              placeholderTextColor={theme.subText}
            />

            <Text style={[styles.inputLabel, { color: theme.subText }]}>Street / Area</Text>
            <TextInput 
              style={[styles.modalInput, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]} 
              value={draftStreet} 
              onChangeText={setDraftStreet} 
              placeholder="e.g. Street 5, Gulberg III" 
              placeholderTextColor={theme.subText}
            />

            <Text style={[styles.inputLabel, { color: theme.subText }]}>City</Text>
            <TextInput 
              style={[styles.modalInput, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]} 
              value={draftCity} 
              onChangeText={setDraftCity} 
              placeholder="e.g. Lahore" 
              placeholderTextColor={theme.subText}
            />

            <View style={styles.modalBtnRow}>
              <TouchableOpacity style={[styles.modalBtn, styles.modalCancel, { backgroundColor: theme.inputBg, borderColor: theme.border }]} onPress={() => setAddressModal(false)}>
                <Text style={[styles.modalCancelText, { color: theme.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, styles.modalSave]} onPress={saveAddress}>
                <Text style={styles.modalSaveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* LOGOUT MODAL */}
      <Modal visible={logoutModal} transparent animationType="fade" onRequestClose={() => setLogoutModal(false)}>
        <View style={styles.modalBg}>
          <View style={[styles.modalCard, { backgroundColor: theme.card }]}>
            <View style={[styles.logoutIconCircle, { backgroundColor: theme.text }]}>
              <Ionicons name="log-out-outline" size={28} color={theme.card} />
            </View>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Sign out?</Text>
            <Text style={[styles.modalMessage, { color: theme.subText }]}>You'll need to log in again to access your cart and orders.</Text>
            <View style={styles.modalBtnRow}>
              <TouchableOpacity style={[styles.modalBtn, styles.modalCancel, { backgroundColor: theme.inputBg, borderColor: theme.border }]} onPress={() => setLogoutModal(false)}>
                <Text style={[styles.modalCancelText, { color: theme.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, styles.modalSave]} onPress={confirmLogout}>
                <Text style={styles.modalSaveText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  guestRoot: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: SIZES.screenPadding },
  guestTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 16 },
  guestSub: { fontSize: 13, textAlign: 'center', marginTop: 6, marginBottom: 30 },
  primaryBtn: { backgroundColor: COLORS.dark, paddingHorizontal: 40, paddingVertical: 14, borderRadius: 30, marginBottom: 12, width: '100%', alignItems: 'center' },
  primaryBtnText: { color: COLORS.white, fontWeight: 'bold', fontSize: 15 },
  secondaryBtn: { paddingHorizontal: 40, paddingVertical: 14, borderRadius: 30, borderWidth: 1, width: '100%', alignItems: 'center' },
  secondaryBtnText: { fontWeight: 'bold', fontSize: 15 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20 },
  backBtn: { width: 40, alignItems: 'flex-start' },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  headerSub: { fontSize: 12, marginTop: 2 },
  profileCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, borderRadius: 16, padding: 20, marginBottom: 20 },
  avatarCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#F9F3E3', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  avatarText: { fontSize: 22, fontWeight: 'bold', color: COLORS.gold },
  profileInfo: { flex: 1 },
  userName: { fontSize: 18, fontWeight: 'bold', marginBottom: 2 },
  userEmail: { fontSize: 13, marginBottom: 6 },
  editProfileText: { fontSize: 13, fontWeight: '600', color: COLORS.gold },
  menuGroup: { marginHorizontal: 20, borderRadius: 16, paddingHorizontal: 16, marginBottom: 20 },
  menuRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 18 },
  menuTextWrap: { flex: 1, marginLeft: 16 },
  menuTitle: { fontSize: 15, fontWeight: '600', marginBottom: 2 },
  menuSub: { fontSize: 12 },
  divider: { height: 1, opacity: 0.5 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingVertical: 16, paddingBottom: 30 },
  signOutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, borderRadius: 30, borderWidth: 1 },
  signOutText: { fontWeight: 'bold', fontSize: 15 },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  modalCard: { width: '100%', borderRadius: 20, padding: 24, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  modalMessage: { fontSize: 13, textAlign: 'center', marginBottom: 20, lineHeight: 18 },
  modalInput: { width: '100%', borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, marginBottom: 16 },
  modalBtnRow: { flexDirection: 'row', gap: 10, width: '100%', marginTop: 10 },
  modalBtn: { flex: 1, paddingVertical: 12, borderRadius: 24, alignItems: 'center' },
  modalCancel: { borderWidth: 1 },
  modalCancelText: { fontWeight: 'bold', fontSize: 14 },
  modalSave: { backgroundColor: COLORS.dark },
  modalSaveText: { color: COLORS.white, fontWeight: 'bold', fontSize: 14 },
  logoutIconCircle: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginBottom: 14 },
  inputLabel: { fontSize: 12, fontWeight: '600', alignSelf: 'flex-start', marginBottom: 6 },
  orderItem: { borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 10, width: '100%' },
});