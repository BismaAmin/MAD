import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useShop } from '../context/ShopContext';
import { COLORS, SIZES } from '../styles/GlobalStyles';

const CartScreen = ({ navigation }) => {
  // Context se isDarkMode nikala
  const { cart, removeFromCart, updateQuantity, getSubtotal, getDiscount, getFinalTotal, isDarkMode } = useShop();

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const finalTotal = getFinalTotal();
  const deliveryFee = cart.length > 0 ? 150 : 0;

  // --- DARK MODE THEME ---
  const theme = {
    bg: isDarkMode ? COLORS.darkBg : COLORS.light,
    card: isDarkMode ? COLORS.darkCard : COLORS.white,
    text: isDarkMode ? COLORS.darkText : COLORS.textDark,
    subText: isDarkMode ? '#AAAAAA' : COLORS.textGray,
    border: isDarkMode ? COLORS.darkBorder : COLORS.border,
  };

  if (cart.length === 0) {
    return (
      <View style={[styles.emptyRoot, { backgroundColor: theme.bg }]}>
        <Ionicons name="cart-outline" size={60} color={theme.subText} />
        <Text style={[styles.emptyText, { color: theme.subText }]}>Your cart is empty</Text>
        <TouchableOpacity
          style={styles.shopBtn}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.shopBtnText}>Start Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.root, { backgroundColor: theme.bg }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Your shopping bag</Text>
          <Text style={[styles.headerCount, { color: theme.subText }]}>{cart.length} items</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Main', { screen: 'Cart' })}>
          <Ionicons name="bag-handle-outline" size={22} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 180 }}>
        
        {/* CART ITEMS */}
        {cart.map((item) => (
          <View key={item.id} style={[styles.cartItem, { backgroundColor: theme.card }]}>
           <Image 
  source={
    typeof item.image === 'string' 
      ? { uri: item.image } 
      : item.image
  } 
  style={[styles.itemImage, { backgroundColor: theme.bg }]} 
/>            
            <View style={styles.itemInfo}>
              <Text style={[styles.itemName, { color: theme.text }]} numberOfLines={1}>{item.name}</Text>
              <Text style={[styles.itemVariant, { color: theme.subText }]}>Caramel • One size</Text>
              <Text style={styles.itemPrice}>Rs. {item.price?.toFixed(0)}</Text>
            </View>

            {/* QTY CONTROLS */}
            <View style={[styles.qtyContainer, { borderColor: theme.border }]}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => updateQuantity(item.id, -1)}
              >
                <Ionicons name="remove" size={16} color={theme.text} />
              </TouchableOpacity>
              <Text style={[styles.qtyText, { color: theme.text }]}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => updateQuantity(item.id, 1)}
              >
                <Ionicons name="add" size={16} color={theme.text} />
              </TouchableOpacity>
            </View>

            {/* Remove X */}
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => removeFromCart(item.id)}
            >
              <Ionicons name="close" size={18} color={theme.subText} />
            </TouchableOpacity>
          </View>
        ))}

        {/* PROMO CODE */}
        <View style={[styles.promoRow, { backgroundColor: theme.card }]}>
          <View style={styles.promoLeft}>
            <Ionicons name="ticket-outline" size={20} color={COLORS.gold} />
            <Text style={[styles.promoText, { color: theme.text }]}>Promo code</Text>
            <Text style={[styles.promoCode, { color: theme.text }]}>MUSE20</Text>
          </View>
          <Text style={styles.appliedText}>Applied</Text>
        </View>

        {/* SAVINGS INDICATOR */}
        {subtotal > 1200 && (
          <View style={styles.savingsRow}>
            <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
            <Text style={styles.savingsText}>20% saved! Your subtotal is above Rs. 1,200.</Text>
          </View>
        )}

        {/* BAG SUMMARY */}
        <View style={[styles.summaryBox, { backgroundColor: theme.card }]}>
          <Text style={[styles.summaryTitle, { color: theme.text }]}>Bag summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.subText }]}>Subtotal ({cart.length} items)</Text>
            <Text style={[styles.summaryValue, { color: theme.text }]}>Rs. {subtotal.toFixed(0)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: COLORS.gold }]}>MUSE20 - 20% discount</Text>
            <Text style={[styles.summaryValue, { color: COLORS.gold }]}>- Rs. {discount.toFixed(0)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.subText }]}>Delivery</Text>
            <Text style={[styles.summaryValue, { color: theme.text }]}>Rs. {deliveryFee}</Text>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.summaryRow}>
            <Text style={[styles.totalLabel, { color: theme.text }]}>Total</Text>
            <Text style={styles.totalValue}>Rs. {(finalTotal + deliveryFee).toFixed(0)}</Text>
          </View>
        </View>

      </ScrollView>

      {/* BOTTOM FIXED BUTTON */}
      <View style={[styles.bottomBar, { backgroundColor: theme.bg }]}>
        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => navigation.navigate('Checkout')}
        >
          <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
          <Text style={styles.checkoutText}>Proceed To Checkout</Text>
        </TouchableOpacity>
        <Text style={[styles.secureText, { color: theme.subText }]}>Secure checkout · No hidden charges</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  emptyRoot: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, marginTop: 16, marginBottom: 20 },
  shopBtn: { backgroundColor: COLORS.dark, paddingHorizontal: 24, paddingVertical: 12, borderRadius: SIZES.radius },
  shopBtnText: { color: COLORS.white, fontWeight: 'bold' },

  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SIZES.screenPadding, paddingTop: 50, paddingBottom: 16 },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  headerCount: { fontSize: 11, marginTop: 2 },

  cartItem: { flexDirection: 'row', marginHorizontal: SIZES.screenPadding, borderRadius: 16, padding: 12, marginBottom: 16, position: 'relative', alignItems: 'center' },
  itemImage: { width: 80, height: 80, borderRadius: 12, marginRight: 12 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  itemVariant: { fontSize: 11, marginBottom: 6 },
  itemPrice: { fontSize: 15, fontWeight: 'bold', color: COLORS.gold },
  qtyContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 20, paddingHorizontal: 4, paddingVertical: 2 },
  qtyBtn: { width: 24, height: 24, justifyContent: 'center', alignItems: 'center' },
  qtyText: { fontSize: 14, fontWeight: '600', width: 20, textAlign: 'center' },
  removeBtn: { position: 'absolute', top: 12, right: 12 },

  promoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: SIZES.screenPadding, borderRadius: 12, padding: 16, marginBottom: 12 },
  promoLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  promoText: { fontSize: 13 },
  promoCode: { fontSize: 13, fontWeight: 'bold' },
  appliedText: { fontSize: 13, color: COLORS.gold, fontWeight: '600' },

  savingsRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: SIZES.screenPadding, marginBottom: 20 },
  savingsText: { fontSize: 12, color: '#4CAF50', fontWeight: '500' },

  summaryBox: { marginHorizontal: SIZES.screenPadding, borderRadius: 16, padding: 20 },
  summaryTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 16 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  summaryLabel: { fontSize: 13 },
  summaryValue: { fontSize: 13, fontWeight: '500' },
  divider: { height: 1, marginVertical: 8 },
  totalLabel: { fontSize: 16, fontWeight: 'bold' },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: COLORS.gold },

  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: SIZES.screenPadding, paddingVertical: 16, paddingBottom: 30 },
  checkoutBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.dark, paddingVertical: 16, borderRadius: 30, gap: 8, marginBottom: 12 },
  checkoutText: { color: COLORS.white, fontWeight: 'bold', fontSize: 15 },
  secureText: { textAlign: 'center', fontSize: 11 },
});

export default CartScreen;