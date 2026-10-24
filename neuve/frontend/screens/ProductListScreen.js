import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Image, TextInput, Modal, Pressable, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useShop } from '../context/ShopContext';
import CustomMessageModal from '../components/CustomMessageModal';
import { COLORS, SIZES } from '../styles/GlobalStyles';

// ---------- PRODUCT DATA ----------
export const allProducts = [
  // --- ACCESSORIES ---
  { id: 1, name: 'Gold Bracelet', price: 3500, image: require('../../assets/images/gold brac.jpg'), category: 'Accessories', section: 'Female', subcategory: 'Jewellery', type: 'Bracelet', rating: 4.5, badge: 'NEW' },
  { id: 2, name: 'Pearl Necklace', price: 2800, oldPrice: 2950, image:require('../../assets/images/pearl.jpg') , category: 'Accessories', section: 'Female', subcategory: 'Jewellery', type: 'Necklace', rating: 4.7, badge: 'SALE' },
  { id: 3, name: 'Diamond Ring', price: 4000, oldPrice: 4210, image:require('../../assets/images/ring.jpg'), category: 'Accessories', section: 'Female', subcategory: 'Jewellery', type: 'Ring', rating: 4.3, badge: 'SALE' },
  { id: 4, name: 'Chain Bracelet', price: 3200, image: require('../../assets/images/brac.jpg'), category: 'Accessories', section: 'Female', subcategory: 'Jewellery', type: 'Bracelet', rating: 4.6 },
  { id: 5, name: 'Gold Pendant', price: 5500, image: require('../../assets/images/gold pen.jpg'), category: 'Accessories', section: 'Female', subcategory: 'Jewellery', type: 'Necklace', rating: 4.8 },
  { id: 6, name: 'Beige Handbag', price: 4200, image: require('../../assets/images/hand.jpg'), category: 'Accessories', section: 'Female', subcategory: 'Purses', type: 'Bag', rating: 4.6, badge: 'HOT' },
  { id: 7, name: 'Mini Crossbody', price: 3100, image: require('../../assets/images/cross.jpg'), category: 'Accessories', section: 'Female', subcategory: 'Purses', type: 'Bag', rating: 4.4 },
  { id: 8, name: 'Tote Bag', price: 5000, image: require('../../assets/images/tote.jpg'), category: 'Accessories', section: 'Female', subcategory: 'Purses', type: 'Bag', rating: 4.8 },
  { id: 9, name: 'Leather Wallet', price: 1800, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600', category: 'Accessories', section: 'Male', subcategory: 'Purses / Wallets', type: 'Bag', rating: 4.2 },
  { id: 10, name: 'Black Wallet', price: 2100, image: require('../../assets/images/men.jpg'), category: 'Accessories', section: 'Male', subcategory: 'Purses / Wallets', type: 'Bag', rating: 4.1 },
  { id: 11, name: 'Classic Watch', price: 5500, image: require('../../assets/images/wat.jpg'), category: 'Accessories', section: 'Male', subcategory: 'Watches', type: 'Watch', rating: 4.9 },
  { id: 12, name: 'Silver Dial', price: 6200, image: require('../../assets/images/silver.jpg'), category: 'Accessories', section: 'Male', subcategory: 'Watches', type: 'Watch', rating: 4.5 },
  { id: 13, name: 'Steel Watch', price: 4800, image: require('../../assets/images/steel.jpg'), category: 'Accessories', section: 'Male', subcategory: 'Watches', type: 'Watch', rating: 4.3 },

  // --- CLOTHES ---
  { id: 14, name: 'Floral Dress', price: 3900, image: require('../../assets/images/dress.png'), category: 'Clothes', section: 'Female', subcategory: 'Stitched', type: 'Dress', rating: 4.6 },
  { id: 15, name: 'Summer Kurti', price: 2500, image: require('../../assets/images/kurti.jpg'), category: 'Clothes', section: 'Female', subcategory: 'Stitched', type: 'Shirt', rating: 4.4 },
  { id: 16, name: 'Embroidered Lawn', price: 4500, image: require('../../assets/images/lawn.jpg'), category: 'Clothes', section: 'Female', subcategory: 'Unstitched', type: 'Fabric', rating: 4.7 },
  { id: 17, name: 'White Kurta', price: 3200, image: require('../../assets/images/kurta.jpg'), category: 'Clothes', section: 'Male', subcategory: 'Stitched', type: 'Shirt', rating: 4.5 },
  { id: 18, name: 'Grey Shirt', price: 2800, image: require('../../assets/images/grey.jpg'), category: 'Clothes', section: 'Male', subcategory: 'Stitched', type: 'Shirt', rating: 4.3 },
  { id: 19, name: 'Cotton Fabric', price: 1800, image: require('../../assets/images/unmen.jpg'), category: 'Clothes', section: 'Male', subcategory: 'Unstitched', type: 'Fabric', rating: 4.2 },

  // --- MAKEUP ---
  { id: 20, name: 'Hydrating Face Wash', price: 1200, oldPrice: 1263, image:  require('../../assets/images/face.jpg'), category: 'Makeup', section: 'Skincare', subcategory: 'Skin Care', type: 'Skincare', rating: 4.5, badge: 'SALE' },
  { id: 21, name: 'Vitamin C Serum', price: 2500, oldPrice: 2631, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600', category: 'Makeup', section: 'Skincare', subcategory: 'Skin Care', type: 'Serum', rating: 4.8, badge: 'SALE' },
  { id: 22, name: 'Lip Balm', price: 400, image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=600', category: 'Makeup', section: 'Skincare', subcategory: 'Lip Care', type: 'Lip Care', rating: 4.3 },
  { id: 23, name: 'Matte Foundation', price: 2200, oldPrice: 2315, image:  require('../../assets/images/ff.jpg'), category: 'Makeup', section: 'Makeup Products', subcategory: 'Face Makeup', type: 'Foundation', rating: 4.6, badge: 'SALE' },
  { id: 24, name: 'Compact Powder', price: 1500, image:  require('../../assets/images/com.jpg'), category: 'Makeup', section: 'Makeup Products', subcategory: 'Face Makeup', type: 'Powder', rating: 4.4 },
  { id: 25, name: 'Rose Nude Lipstick', price: 800, oldPrice: 842, image:  require('../../assets/images/lip.jpg'), category: 'Makeup', section: 'Makeup Products', subcategory: 'Lip Makeup', type: 'Lipstick', rating: 4.7, badge: 'SALE' },
  { id: 26, name: 'Lip Gloss', price: 600, oldPrice: 632, image:  require('../../assets/images/gloss.jpg'), category: 'Makeup', section: 'Makeup Products', subcategory: 'Lip Makeup', type: 'Lip Gloss', rating: 4.5, badge: 'SALE' },
];

const badgeStyles = {
  NEW: { bg: '#4CAF50' },
  SALE: { bg: '#E74C3C' },
  HOT: { bg: '#FF9800' },
};

const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under Rs. 2,000', min: 0, max: 2000 },
  { label: 'Rs. 2,000 - 4,000', min: 2000, max: 4000 },
  { label: 'Rs. 4,000 - 6,000', min: 4000, max: 6000 },
  { label: 'Above Rs. 6,000', min: 6000, max: Infinity },
];

const sortOptions = [
  { key: 'default', label: 'Recommended' },
  { key: 'newest', label: 'Recently added' },
  { key: 'priceLow', label: 'Price: Low to High' },
  { key: 'priceHigh', label: 'Price: High to Low' },
  { key: 'topRated', label: 'Top rated' },
];

export default function ProductListScreen({ route, navigation }) {
  const { category, section, subcategory, badge } = route.params || {};
  
  // Context se isDarkMode nikala
  const { user, addToCart, isDarkMode } = useShop(); 

  const isSaleScreen = badge === 'SALE';

  const [search, setSearch] = useState('');
  const [badgeFilter, setBadgeFilter] = useState(badge ? badge : 'All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [priceRange, setPriceRange] = useState(0);
  const [sortBy, setSortBy] = useState('default');

  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  // CustomMessageModal state
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [messageModalType, setMessageModalType] = useState('success');
  const [messageModalTitle, setMessageModalTitle] = useState('');
  const [messageModalMessage, setMessageModalMessage] = useState('');

// filter
  const [tempBadge, setTempBadge] = useState(badgeFilter);
  const [tempType, setTempType] = useState(typeFilter);
  const [tempPrice, setTempPrice] = useState(priceRange);

  // --- DARK MODE THEME ---
  const theme = {
    bg: isDarkMode ? COLORS.darkBg : COLORS.light,
    card: isDarkMode ? COLORS.darkCard : COLORS.white,
    text: isDarkMode ? COLORS.darkText : COLORS.textDark,
    subText: isDarkMode ? '#AAAAAA' : COLORS.textGray,
    border: isDarkMode ? COLORS.darkBorder : COLORS.border,
    inputBg: isDarkMode ? '#2C2C2C' : COLORS.light,
    sheetBg: isDarkMode ? COLORS.darkCard : COLORS.white,
  };

  const openFilter = () => {
    setTempBadge(badgeFilter);
    setTempType(typeFilter);
    setTempPrice(priceRange);
    setFilterOpen(true);
  };

  const applyFilters = () => {
    setBadgeFilter(tempBadge);
    setTypeFilter(tempType);
    setPriceRange(tempPrice);
    setFilterOpen(false);
  };

  const resetTemp = () => {
    setTempBadge('All');
    setTempType('All');
    setTempPrice(0);
  };

  const headerTitle = badge === 'SALE' ? 'Sale Items' : (subcategory || section || category || 'Products');
//all types
  const availableTypes = useMemo(() => {
    let base = [...allProducts];
    if (category) base = base.filter(p => p.category === category);
    if (section) base = base.filter(p => p.section === section);
    if (subcategory) base = base.filter(p => p.subcategory === subcategory);
    return ['All', ...new Set(base.map(p => p.type).filter(Boolean))];
  }, [category, section, subcategory]);        //cat,sec,sub change acc to type

  //filtering actual products
  const products = useMemo(() => {
    let list = [...allProducts];
    if (isSaleScreen) {
      list = list.filter(p => p.badge === 'SALE');
    } else {
      if (category) list = list.filter(p => p.category === category);
      if (section) list = list.filter(p => p.section === section);
      if (subcategory) list = list.filter(p => p.subcategory === subcategory);
      if (badgeFilter !== 'All') list = list.filter(p => p.badge === badgeFilter);
      if (typeFilter !== 'All') list = list.filter(p => p.type === typeFilter);
    }
    
//ALL PRODUCTS UNDER selected price
    const range = priceRanges[priceRange];
    list = list.filter(p => p.price >= range.min && p.price <= range.max);

    if (search.trim()) {
      list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (sortBy === 'priceLow') list.sort((a, b) => a.price - b.price);
    else if (sortBy === 'priceHigh') list.sort((a, b) => b.price - a.price);
    else if (sortBy === 'topRated') list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'newest') list.sort((a, b) => b.id - a.id);

    return list;
  }, [category, section, subcategory, badge, badgeFilter, typeFilter, priceRange, search, sortBy]);

  //count
  const activeFilterCount =
    (badgeFilter !== 'All' ? 1 : 0) +
    (typeFilter !== 'All' ? 1 : 0) +
    (priceRange !== 0 ? 1 : 0);

  // Show custom message modal
  const showMessageModal = (type, title, message) => {
    setMessageModalType(type);               //succ,f
    setMessageModalTitle(title);             // addtoc
    setMessageModalMessage(message);         // p addtoca
    setMessageModalVisible(true);             //visible
  };   

  const handleQuickAdd = async (product) => {
    if (!user) {
      navigation.navigate('Login', {
        redirectTo: {
          name: 'ProductList',
          params: route.params,    //current screen ke parameters bhi saath rakhta hai.
        }
      });
      return;
    }

    try {
      await addToCart(product);    //prom wait
      showMessageModal('success', 'ADDED TO CART', `${product.name} has been added to your cart.`);
    } catch (error) {
      console.log('Quick add failed:', error);
      showMessageModal('error', 'OH NO...', 'Could not add to cart. Please try again.');
    }
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.bg }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>{headerTitle}</Text>
          <Text style={[styles.headerCount, { color: theme.subText }]}>{products.length} results</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Main', { screen: 'Cart' })}>
          <Ionicons name="bag-handle-outline" size={22} color={theme.text} />
        </TouchableOpacity>
      </View>

      {/* SORT / FILTER BAR */}
      {!isSaleScreen && (
        <View style={[styles.actionBar, { backgroundColor: 'transparent', borderColor: theme.border }]}>
          <TouchableOpacity style={styles.actionHalf} onPress={() => setSortOpen(true)}>
            <Ionicons name="swap-vertical-outline" size={18} color={theme.text} />
            <Text style={[styles.actionHalfText, { color: theme.text }]}>Sort by</Text>
          </TouchableOpacity>

          <View style={[styles.actionDivider, { backgroundColor: theme.border }]} />

          <TouchableOpacity style={styles.actionHalf} onPress={openFilter}>
            <Ionicons name="options-outline" size={18} color={theme.text} />
            <Text style={[styles.actionHalfText, { color: theme.text }]}>
              Filter{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* SEARCH */}
      {!isSaleScreen && (
        <View style={[styles.searchWrapper, { backgroundColor: 'transparent', borderColor: theme.border }]}>
          <Ionicons name="search-outline" size={18} color={theme.subText} />
          <TextInput
            placeholder="Search products"
            placeholderTextColor={theme.subText}
            style={[styles.searchInput, { color: theme.text }]}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color={theme.subText} />
            </TouchableOpacity>
          )}  
        </View>
        //if 1 char, cross if none stay same
      )}
       
      {/* GRID for filtered/sorted ones */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {products.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons name="search-outline" size={50} color={theme.subText} />
            <Text style={[styles.emptyText, { color: theme.subText }]}>No products found</Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {products.map(p => (
              <TouchableOpacity
                key={p.id}
                style={styles.card}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('ProductDetail', { product: p })}
              >
                <View style={[styles.imageBox, { backgroundColor: theme.card }]}>
                  <Image 
  source={typeof p.image === 'string' ? { uri: p.image } : p.image} 
  style={styles.image} 
  resizeMode="cover" 
/>                  
                  {p.badge && badgeStyles[p.badge] && (
                    <View style={[styles.badge, { backgroundColor: badgeStyles[p.badge].bg }]}>
                      <Text style={styles.badgeText}>{p.badge}</Text>
                    </View>
                  )}

                  <TouchableOpacity 
                    style={[styles.cartBtnSmall, { backgroundColor: theme.card }]} 
                    onPress={() => handleQuickAdd(p)}
                  >
                    <Ionicons name="cart-outline" size={16} color={theme.text} />
                  </TouchableOpacity>
                </View>
                
                <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>{p.name}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={11} color="#FFB800" />
                  <Text style={[styles.ratingText, { color: theme.text }]}>{p.rating}</Text>
                </View>
                
                <View style={styles.priceRow}>
                  {p.oldPrice && (
                    <Text style={[styles.oldPrice, { color: theme.subText }]}>Rs. {p.oldPrice.toLocaleString()}</Text>
                  )}
                  <Text style={styles.price}>Rs. {p.price.toLocaleString()}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View style={{ height: 30 }} />
      </ScrollView>

      {/* ============ SORT — BOTTOM SHEET ============ */}
      <Modal visible={sortOpen} transparent animationType="slide" onRequestClose={() => setSortOpen(false)}>   
        <Pressable style={styles.modalBg} onPress={() => setSortOpen(false)}>
          <Pressable style={[styles.sheet, { backgroundColor: theme.sheetBg }]} onPress={() => {}}>
            <View style={styles.barHandleWrap}><View style={[styles.barHandle, { backgroundColor: theme.border }]} /></View>
            <Text style={[styles.sheetTitle, { color: theme.subText }]}>SORT BY</Text>
            {sortOptions.map(opt => (
              <TouchableOpacity key={opt.key} style={styles.sortRow} onPress={() => { setSortBy(opt.key); setSortOpen(false); }}>
                <Text style={[styles.sortRowText, { color: theme.text }]}>{opt.label}</Text>
                <View style={[styles.radioOuter, { borderColor: theme.border }, sortBy === opt.key && { borderColor: theme.text }]}>
                  {sortBy === opt.key && <View style={[styles.radioInner, { backgroundColor: theme.text }]} />}
                </View>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>

      {/* ============ FILTER — BOTTOM SHEET ============ */}
      <Modal visible={filterOpen} transparent animationType="slide" onRequestClose={() => setFilterOpen(false)}>
        <Pressable style={styles.modalBg} onPress={() => setFilterOpen(false)}>
          <Pressable style={[styles.sheet, { backgroundColor: theme.sheetBg }]} onPress={() => {}}>
            <View style={styles.barHandleWrap}><View style={[styles.barHandle, { backgroundColor: theme.border }]} /></View>
            <View style={styles.filterHeaderRow}>
              <Text style={[styles.sheetTitle, { color: theme.subText }]}>FILTER</Text>
              <TouchableOpacity onPress={resetTemp}><Text style={styles.resetText}>Reset</Text></TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={[styles.filterSection, { borderBottomColor: theme.border }]}>
                <Text style={[styles.filterSectionTitle, { color: theme.text }]}>Type</Text>
                <View style={styles.typeRow}>
                  {availableTypes.map(t => (
                    <TouchableOpacity key={t} style={[styles.typePill, { backgroundColor: theme.inputBg, borderColor: theme.border }, tempType === t && { backgroundColor: theme.text, borderColor: theme.text }]} onPress={() => setTempType(t)}>
                      <Text style={[styles.typePillText, { color: theme.text }, tempType === t && { color: theme.bg }]}>{t}</Text>
                    </TouchableOpacity>                                          //seleted ka dark colour
                  ))}
                </View>
              </View> 
              <View style={[styles.filterSection, { borderBottomColor: theme.border }]}>
                <Text style={[styles.filterSectionTitle, { color: theme.text }]}>Badge</Text>
                <View style={styles.typeRow}>
                  {['All', 'NEW', 'SALE', 'HOT'].map(b => (
                    <TouchableOpacity key={b} style={[styles.typePill, { backgroundColor: theme.inputBg, borderColor: theme.border }, tempBadge === b && { backgroundColor: theme.text, borderColor: theme.text }]} onPress={() => setTempBadge(b)}>
                      {b !== 'All' && <View style={[styles.dot, { backgroundColor: badgeStyles[b]?.bg || COLORS.gold }]} />}
                      <Text style={[styles.typePillText, { color: theme.text }, tempBadge === b && { color: theme.bg }]}>{b}</Text>    
                    </TouchableOpacity>   //dot all kay ilawa sab par aay        //seleted ka dark colour
                  ))}  
                </View>
              </View>
              <View style={[styles.filterSection, { borderBottomWidth: 0 }]}>
                <Text style={[styles.filterSectionTitle, { color: theme.text }]}>Price Range</Text>
                <View style={styles.priceGrid}>
                  {priceRanges.map((range, index) => (
                    <TouchableOpacity key={range.label} style={[styles.pricePill, { backgroundColor: theme.inputBg, borderColor: theme.border }, tempPrice === index && { backgroundColor: theme.text, borderColor: theme.text }]} onPress={() => setTempPrice(index)}>
                      <Text style={[styles.pricePillText, { color: theme.text }, tempPrice === index && { color: theme.bg }]}>{range.label}</Text>
                    </TouchableOpacity>                                          //seleted ka dark colour
                  ))} 
                </View>
              </View>
            </ScrollView>
            <View style={styles.applyFooter}>
              <TouchableOpacity style={styles.applyBtn} onPress={applyFilters}>
                <Text style={styles.applyText}>Show {products.length} results</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* ============ CUSTOM MESSAGE MODAL ============ */}
      <CustomMessageModal
        visible={messageModalVisible}
        type={messageModalType}
        title={messageModalTitle}
        message={messageModalMessage}
        onClose={() => setMessageModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SIZES.screenPadding, paddingTop: 50, paddingBottom: 16 },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: 'bold' },
  headerCount: { fontSize: 11, marginTop: 2 },
  actionBar: { flexDirection: 'row', borderTopWidth: 1, borderBottomWidth: 1 },
  actionHalf: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14 },
  actionHalfText: { fontSize: 14, fontWeight: '600' },
  actionDivider: { width: 1 },
  searchWrapper: { flexDirection: 'row', alignItems: 'center', marginHorizontal: SIZES.screenPadding, marginTop: 12, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1 },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 14 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: SIZES.screenPadding, paddingTop: 12 },
  card: { width: '48%', marginBottom: 20 },
  imageBox: { width: '100%', aspectRatio: 0.85, borderRadius: SIZES.cardRadius, overflow: 'hidden', marginBottom: 8, position: 'relative' },
  image: { width: '100%', height: '100%' },
  badge: { position: 'absolute', top: 8, left: 8, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  badgeText: { color: COLORS.white, fontSize: 9, fontWeight: 'bold', letterSpacing: 0.5 },
  cartBtnSmall: { position: 'absolute', top: 8, right: 8, width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', elevation: 2 },
  name: { fontSize: 13, fontWeight: '600', marginBottom: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 2 },
  ratingText: { fontSize: 11, fontWeight: '600' },
  priceRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 6 },
  oldPrice: { fontSize: 11, textDecorationLine: 'line-through' },
  price: { fontSize: 13, fontWeight: '700', color: COLORS.gold },
  emptyBox: { alignItems: 'center', paddingTop: 80 },
  emptyText: { fontSize: 14, marginTop: 12 },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  sheet: { borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 20, paddingTop: 4, paddingBottom: 20, maxHeight: '85%' },
  barHandleWrap: { alignSelf: 'center', paddingVertical: 12 },
  barHandle: { width: 40, height: 4, borderRadius: 2 },
  sheetTitle: { fontSize: 11, fontWeight: '700', letterSpacing: 1.5, marginBottom: 8 },
  sortRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16 },
  sortRowText: { fontSize: 15, fontWeight: '500' },
  radioOuter: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, justifyContent: 'center', alignItems: 'center' },
  radioInner: { width: 10, height: 10, borderRadius: 5 },
  filterHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  resetText: { fontSize: 13, fontWeight: '600', color: COLORS.gold, textDecorationLine: 'underline' },
  filterSection: { paddingVertical: 12, borderBottomWidth: 1 },
  filterSectionTitle: { fontSize: 13, fontWeight: '700', marginBottom: 10 },
  typeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  typePill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  typePillText: { fontSize: 12, fontWeight: '600' },
  dot: { width: 8, height: 8, borderRadius: 4 },
  priceGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pricePill: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  pricePillText: { fontSize: 12, fontWeight: '600' },
  applyFooter: { paddingTop: 12 },
  applyBtn: { backgroundColor: COLORS.dark, paddingVertical: 14, borderRadius: SIZES.radius, alignItems: 'center' },
  applyText: { color: COLORS.white, fontWeight: '700', fontSize: 14 },
});