import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useShop } from '../context/ShopContext';
import { COLORS, SIZES } from '../styles/GlobalStyles';

const { width } = Dimensions.get('window');          //get info of scr

const categories = [
  { label: 'Accessories', image: require('../../assets/images/j.jpg'), screen: 'Accessories' },
  { label: 'Clothes', image: require('../../assets/images/femst.jpg'), screen: 'Clothes' },
  { label: 'Makeup', image: require('../../assets/images/skincare.jpg'), screen: 'Makeup' },
];

// 2 SLIDES DATA
const slides = [
  {
    id: 1,
    image: require('../../assets/images/ban1.jpg'),
    title: 'NEW COLLECTIONS',
    subtitle: 'Shop Ready To Wear',
    buttonText: 'SHOP NOW',
    navigateTo: 'Clothes',
  },
  {
    id: 2,
    image: require('../../assets/images/ban2.jpg'),
    title: 'LIMITED TIME OFFER',
    subtitle: 'Get Flat 5% OFF Today',
    buttonText: 'EXPLORE NOW',
    navigateTo: 'ProductList',
    params: { badge: 'SALE' }
  },
];

const HomeScreen = ({ navigation }) => {
  const { user, isDarkMode } = useShop();
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef(null);

  // --- DARK MODE THEME ---
  const theme = {
    bg: isDarkMode ? COLORS.darkBg : COLORS.light,
    card: isDarkMode ? COLORS.darkCard : COLORS.white,
    text: isDarkMode ? COLORS.darkText : COLORS.textDark,
    subText: isDarkMode ? '#AAAAAA' : COLORS.textGray,
    border: isDarkMode ? COLORS.darkBorder : COLORS.border,
  };

  // --- MOVING BANNER ANIMATION ---
  const translateX = useRef(new Animated.Value(width)).current;
  

  useEffect(() => {
    const startAnimation = () => {
      translateX.setValue(width);       //again start value
      Animated.loop(
        Animated.timing(translateX, {     //smoothly
          toValue: -width * 2.5,          //loop
          duration: 18000, 
          useNativeDriver: true,
        })
      ).start();
    };
    startAnimation();
  }, []);

  // Auto Slide Logic
  useEffect(() => {
    const timer = setInterval(() => {
      let nextSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
      setCurrentSlide(nextSlide);
      scrollRef.current?.scrollTo({ x: nextSlide * width, animated: true });
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);                //end to useeff again

  const handleScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentSlide(slideIndex);
  };

  const goToPrev = () => {
    let prevSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    setCurrentSlide(prevSlide);
    scrollRef.current?.scrollTo({ x: prevSlide * width, animated: true });
  };

  const goToNext = () => {
    let nextSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(nextSlide);
    scrollRef.current?.scrollTo({ x: nextSlide * width, animated: true });
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.bg }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                    
        {/* HEADER */}
                {/* HEADER */}
        <View style={styles.header}>
          <Text style={[styles.logo, { color: theme.text }]}>neuve</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Main', { screen: 'Cart' })}>
            <Ionicons name="bag-handle-outline" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>

        {/* MOVING BANNER */}
        <View style={styles.marqueeContainer}>
          <Animated.View style={{ transform: [{ translateX }], flexDirection: 'row' }}>
            <Text style={styles.marqueeText} numberOfLines={1}>
              20% OFF on Shopping Above Rs. 1,200  Available Till 20 Oct
            </Text>
            <Text style={styles.marqueeText} numberOfLines={1}>
              {'                                     '} 
              20% OFF Above Rs. 1,200 till 20 Oct
            </Text>
          </Animated.View>
        </View>

        {/* HERO CAROUSEL */}
        <View style={styles.heroContainer}>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled          //lil rest ban
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {slides.map((slide) => (
              <View key={slide.id} style={styles.slideWrapper}>
                <Image source={slide.image} style={styles.slideImage} resizeMode="cover" />
                <View style={styles.slideOverlay} />
                <View style={styles.slideContent}>
                  <Text style={styles.slideTitle}>{slide.title}</Text>
                  <Text style={styles.slideSubtitle}>{slide.subtitle}</Text>
                  <TouchableOpacity
                    style={styles.slideButton}
                    onPress={() => navigation.navigate(slide.navigateTo, slide.params)}
                  >
                    <Text style={styles.slideButtonText}>{slide.buttonText}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity style={[styles.navArrow, { left: 10 }]} onPress={goToPrev}>
            <Ionicons name="chevron-back" size={30} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navArrow, { right: 10 }]} onPress={goToNext}>
            <Ionicons name="chevron-forward" size={30} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* CATEGORIES */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Categories</Text>
        </View>

        <View style={styles.categoryRow}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.label}     //acc,clo,mak
              style={styles.categoryItem}
              onPress={() => navigation.navigate(cat.screen)}
            >
              <View style={[styles.categoryCircle, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <Image source={cat.image} style={styles.categoryImage} />
              </View>
              <Text style={[styles.categoryLabel, { color: theme.text }]}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* FEATURED SECTION */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Featured</Text>
        </View>

        <TouchableOpacity 
          style={styles.featureCard} 
          onPress={() => navigation.navigate('ProductList', { category: 'Clothes', section: 'Female' })}
        >
          <Image source={require('../../assets/images/ww.jpg')} style={styles.featureImage} resizeMode="cover" />
          <View style={styles.featureOverlay}>
            <Text style={styles.featureTag}>COLLECTION </Text>
            <Text style={styles.featureTitle}>WOMEN'S WEAR </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.featureCard} 
          onPress={() => navigation.navigate('ProductList', { category: 'Clothes', section: 'Male' })}
        >
          <Image source={require('../../assets/images/mm.jpg')} style={styles.featureImage} resizeMode="cover" />
          <View style={styles.featureOverlay}>
            <Text style={styles.featureTag}>TRENDING </Text>
            <Text style={styles.featureTitle}>MEN'S WEAR </Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.screenPadding,
    paddingTop: 50,
    paddingBottom: 16,
  },
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 3,
  },
  marqueeContainer: {
    backgroundColor: 'transparent', 
    paddingVertical: 12,
    overflow: 'hidden',
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
  },
  marqueeText: {
    color: COLORS.gold, 
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  heroContainer: {
    width: '100%',
    height: 400,
    position: 'relative',
    paddingVertical: 10,
  },
  slideWrapper: {
    width: width,
    height: 400,
    position: 'relative',
  },
  slideImage: {
    width: '100%',
    height: '100%',
  },
  slideOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  slideContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  slideTitle: {
    fontSize: 22,           
    fontWeight: 'bold',
    color: '#FFF',
    letterSpacing: 1.5,
    textAlign: 'center',
    marginBottom: 8,
  },
  slideSubtitle: {
    fontSize: 14,           
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '500',
  },
  slideButton: {
    borderWidth: 1.5,       
    borderColor: '#FFF',
    paddingVertical: 10,    
    paddingHorizontal: 24,
    borderRadius: 30,       
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  slideButtonText: {
    color: '#FFF',
    fontSize: 13,           
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  navArrow: {
    position: 'absolute',
    top: '50%',
    marginTop: -25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.screenPadding,
    marginBottom: 12,
    marginTop: 20,
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold' },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: SIZES.screenPadding,
    paddingBottom: 20,
  },
  categoryItem: { alignItems: 'center', flex: 1 },
  categoryCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    overflow: 'hidden',
    marginBottom: 14,
    borderWidth: 1,
  },
  categoryImage: { width: '100%', height: '100%' },
  categoryLabel: { fontSize: 12, fontWeight: '500' },
  featureCard: {
    marginHorizontal: 0,        
    width: width,               
    height: 450,                
    borderRadius: 0,            
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
  },
  featureImage: { width: '100%', height: '100%' },
  featureOverlay: {
    position: 'absolute',
    left: 20,                   
    bottom: 20,
  },
  featureTag: { fontSize: 10, letterSpacing: 2, fontWeight: 'bold', color: COLORS.white, marginBottom: 4 },
  featureTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.white },
});

export default HomeScreen;