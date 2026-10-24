import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SubcategoryCard from '../components/SubcategoryCard';
import { useShop } from '../context/ShopContext';
import { COLORS, SIZES } from '../styles/GlobalStyles';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - SIZES.screenPadding * 2;

const MakeupScreen = ({ navigation }) => {
  const { isDarkMode } = useShop();

  const theme = {
    bg: isDarkMode ? COLORS.darkBg : COLORS.light,
    card: isDarkMode ? COLORS.darkCard : COLORS.white,
    text: isDarkMode ? COLORS.darkText : COLORS.textDark,
    subText: isDarkMode ? '#AAAAAA' : COLORS.textGray,
    border: isDarkMode ? COLORS.darkBorder : COLORS.border,
  };

  const skincare = [
    {
      name: 'Skin Care',
      image: require('../../assets/images/skincare.jpg'),
    },
    {
      name: 'Lip Care',
      image: require('../../assets/images/blam.jpg'),
    },
  ];

  const makeupProducts = [
    {
      name: 'Face Makeup',
      image: require('../../assets/images/makeup.jpg'),
    },
    {
      name: 'Lip Makeup',
      image: require('../../assets/images/lipg.jpg'),
    },
  ];

  const renderSection = (title, items) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>{title}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProductList', {
              category: 'Makeup',
              section: title,
            })
          }
        >
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.grid}>
        {items.map((item) => (
          <SubcategoryCard
            key={item.name}
            image={item.image}
            name={item.name}
            onPress={() =>
              navigation.navigate('ProductList', {
                category: 'Makeup',
                section: title,
                subcategory: item.name,
              })
            }
          />
        ))}
      </View>
    </View>
  );

  return (
    <View style={[styles.root, { backgroundColor: theme.bg }]}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color={theme.text} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={[styles.headerTitle, { color: theme.text }]}>Makeup</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Main', { screen: 'Cart' })}>
            <Ionicons name="bag-handle-outline" size={22} color={theme.text} />
          </TouchableOpacity>
        </View>

        {/* ========== BANNER (No Text, Padding Intact) ========== */}
        <View style={styles.bannerCard}>
          <Image
            source={require('../../assets/images/back.jpg')}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>

        {renderSection('Skincare', skincare)}
        {renderSection('Makeup Products', makeupProducts)}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.screenPadding,
    paddingTop: 50,
    paddingBottom: 16,
  },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: 'bold' },

  // ===== BANNER =====
  bannerCard: {
    width: BANNER_WIDTH,
    height: 160,
    marginHorizontal: SIZES.screenPadding,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },

  // ===== SECTIONS =====
  section: { paddingHorizontal: SIZES.screenPadding, marginBottom: 10 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold' },
  viewAll: { fontSize: 12, color: COLORS.gold, fontWeight: '600' },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default MakeupScreen;