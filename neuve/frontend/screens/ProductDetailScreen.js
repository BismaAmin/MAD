import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Image, Alert, ActivityIndicator, Modal, TextInput,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useShop } from '../context/ShopContext';
import { COLORS, SIZES } from '../styles/GlobalStyles';

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params || {};

  // Context se isDarkMode nikala
  const { user, addToCart, isDarkMode } = useShop();

  const [added, setAdded] = useState(false);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAddedModalOpen, setIsAddedModalOpen] = useState(false);

  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [likedComments, setLikedComments] = useState({});

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewName, setNewReviewName] = useState('');

  // --- DARK MODE THEME ---
  const theme = {
    bg: isDarkMode ? COLORS.darkBg : COLORS.light,
    card: isDarkMode ? COLORS.darkCard : COLORS.white,
    text: isDarkMode ? COLORS.darkText : COLORS.textDark,
    subText: isDarkMode ? '#AAAAAA' : COLORS.textGray,
    border: isDarkMode ? COLORS.darkBorder : COLORS.border,
    inputBg: isDarkMode ? '#2C2C2C' : COLORS.light,
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch('https://dummyjson.com/comments');
        const data = await res.json();
        let allComments = data.comments;
        allComments = allComments.sort(() => 0.5 - Math.random());
        setComments(allComments.slice(0, 3));
      } catch (error) {
        console.log('Error fetching comments:', error);
      } finally {
        setLoadingComments(false);    //loding state end
      }
    };
    fetchComments();
  }, []);     //w,o dep/emp arry

  const handleLike = (commentId) => {
    const isLiked = likedComments[commentId];
    setComments((prevComments) =>
      prevComments.map((c) =>
        c.id === commentId ? { ...c, likes: c.likes + (isLiked ? -1 : 1) } : c
      ) //clicked com = curr com
    );
    setLikedComments((prev) => ({ ...prev, [commentId]: !isLiked }));
  };  //record of liked

  const handleSubmitReview = () => {
    if (!newReviewText.trim() || !newReviewName.trim()) {
      Alert.alert('Error', 'Please enter your name and review.');
      return;
    }
    const myNewReview = {
      id: Date.now(),
      body: newReviewText,
      likes: 0,
      user: { fullName: newReviewName, username: newReviewName.toLowerCase().replace(/\s/g, '') },
    };
    setComments([myNewReview, ...comments]);
    setIsReviewModalOpen(false);
    setNewReviewText('');
    setNewReviewName('');
  };
    //def dexition or use this
  const description = product?.description || 'Your everyday, elevated, fashionable item.';
  const rating = product?.rating || 4.8;
  const reviewsCount = 32;
  const deliveryFee = 150;

  const handleAddToCart = async () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }
    await addToCart(product);
    setAdded(true);
    setIsAddedModalOpen(true);
  };

  useEffect(() => {
    if (user && route.params?.autoAdd && !added) {   
      addToCart(product);
      navigation.setParams({ autoAdd: false });
      setAdded(true);
      setIsAddedModalOpen(true);
    }
  }, [user, route.params?.autoAdd]);

  // Go to Cart — closes modal first, then navigates after animation
  const handleGoToCart = () => {
    setIsAddedModalOpen(false);
    setTimeout(() => {
      navigation.navigate('Main', { screen: 'Cart' });
    }, 400);     //0.4sec wait
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.bg }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>The little details</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Main', { screen: 'Cart' })}>
          <Ionicons name="bag-handle-outline" size={22} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.imageContainer}>
          <Image
            source={
              typeof product?.image === 'string'
                ? { uri: product.image }
                : product?.image
            }
            style={[styles.hero, { backgroundColor: theme.card }]}
            resizeMode="cover"
          />
          <TouchableOpacity style={[styles.heartBtn, { backgroundColor: theme.card }]}>
            <Ionicons name="heart-outline" size={20} color={theme.text} />
          </TouchableOpacity>
        </View>

        <View style={[styles.detailsCard, { backgroundColor: theme.card }]}>
          <View style={styles.rowBetween}>
            <Text style={[styles.name, { color: theme.text }]}>{product?.name}</Text>
            <Text style={styles.stockText}>In stock</Text>
          </View>

          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color="#FFB800" />
            <Text style={[styles.ratingText, { color: theme.text }]}>{rating}</Text>
            <Text style={[styles.reviewText, { color: theme.subText }]}>({reviewsCount} reviews)</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.price}>Rs. {product?.price?.toFixed(0)}</Text>
            {product?.oldPrice && (
              <Text style={[styles.oldPrice, { color: theme.subText }]}>Rs. {product?.oldPrice?.toLocaleString()}</Text>
            )}
          </View>

          <Text style={[styles.desc, { color: theme.subText }]}>{description}</Text>

          <View style={styles.deliveryRow}>
            <Ionicons name="cube-outline" size={18} color={theme.subText} />
            <Text style={[styles.deliveryText, { color: theme.text }]}>Delivery Rs. {deliveryFee} . Arrives in 3-5 days</Text>
          </View>

          <Text style={styles.offerText}>20% off above Rs. 1,200 - Applied at checkout</Text>

          <View style={[styles.reviewsSection, { borderTopColor: theme.border }]}>
            <View style={styles.reviewsHeader}>
              <Text style={[styles.reviewsTitle, { color: theme.text }]}>Customer Reviews</Text>
            </View>
           
            {loadingComments ? (    //activity indicator
              <ActivityIndicator size="small" color={COLORS.gold} style={{ marginTop: 10 }} />
            ) : (
              comments.map((review) => {
                const isLiked = likedComments[review.id];
                return (
                  <View key={review.id} style={[styles.reviewCard, { backgroundColor: theme.inputBg }]}>
                    <View style={styles.reviewTopRow}>

                      <View style={[styles.reviewerAvatar, { backgroundColor: theme.text }]}>
                        <Text style={[styles.avatarText, { color: theme.bg }]}>{review.user.fullName.charAt(0)}</Text>
                      </View>
                      <View style={styles.reviewerInfo}>
                        <Text style={[styles.reviewerName, { color: theme.text }]}>{review.user.fullName}</Text>
                        <Text style={[styles.metaText, { color: theme.subText }]}>@{review.user.username}</Text>
                      </View>
                      <TouchableOpacity
                        style={[styles.likesContainer, isLiked && styles.likesContainerActive]}
                        onPress={() => handleLike(review.id)}
                      >
                        <Ionicons name={isLiked ? "heart" : "heart-outline"} size={14} color={isLiked ? COLORS.white : COLORS.red} />
                        <Text style={[styles.likesText, isLiked && styles.likesTextActive]}>{review.likes}</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={[styles.reviewComment, { color: theme.text }]}>"{review.body}"</Text>
                  </View>
                );
              })
            )}

            <TouchableOpacity style={[styles.writeReviewBtn, { borderColor: theme.text }]} onPress={() => setIsReviewModalOpen(true)}>
              <Text style={[styles.writeReviewText, { color: theme.text }]}>Write a Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { backgroundColor: theme.card }]}>
        <TouchableOpacity style={styles.cartBtn} onPress={handleAddToCart}>
          <Ionicons name="bag-handle-outline" size={18} color={COLORS.white} />
          <Text style={styles.cartText}>Add to Cart · Rs. {product?.price?.toFixed(0)}</Text>
        </TouchableOpacity>
      </View>

      {/* WRITE REVIEW MODAL */}
      <Modal visible={isReviewModalOpen} animationType="slide" transparent={true} onRequestClose={() => setIsReviewModalOpen(false)}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalBg}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>Write a Review</Text>
              <TouchableOpacity onPress={() => setIsReviewModalOpen(false)}><Ionicons name="close" size={24} color={theme.text} /></TouchableOpacity>
            </View>
            <Text style={[styles.inputLabel, { color: theme.subText }]}>Your Name</Text>
            <TextInput style={[styles.textInput, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]} placeholder="e.g. Ali Khan" placeholderTextColor={theme.subText} value={newReviewName} onChangeText={setNewReviewName} />
            <Text style={[styles.inputLabel, { color: theme.subText }]}>Your Review</Text>
            <TextInput style={[styles.textInput, styles.textArea, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]} placeholder="What did you like about this product?" placeholderTextColor={theme.subText} multiline numberOfLines={4} value={newReviewText} onChangeText={setNewReviewText} />
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmitReview}><Text style={styles.submitBtnText}>Submit Review</Text></TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* LOGIN MODAL */}
      <Modal visible={isLoginModalOpen} animationType="fade" transparent={true} onRequestClose={() => setIsLoginModalOpen(false)}>
        <View style={styles.customModalBg}>
          <View style={[styles.customModalCard, { backgroundColor: theme.card }]}>
            <View style={styles.iconCircle}><Ionicons name="lock-closed" size={30} color={COLORS.white} /></View>
            <Text style={[styles.customModalTitle, { color: theme.text }]}>Account Required</Text>
            <Text style={[styles.customModalText, { color: theme.subText }]}>Please create an account or log in to add items to the cart.</Text>
            <View style={styles.customBtnRow}>
              <TouchableOpacity style={[styles.customBtn, styles.cancelBtn, { backgroundColor: theme.inputBg, borderColor: theme.border }]} onPress={() => setIsLoginModalOpen(false)}>
                <Text style={[styles.cancelBtnText, { color: theme.text }]}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.customBtnRow}>
              <TouchableOpacity
                style={[styles.customBtn, styles.signupBtn]}
                onPress={() => {
                  setIsLoginModalOpen(false);
                  navigation.navigate('Signup', {
                    redirectTo: { name: 'ProductDetail', params: { product, autoAdd: true } },
                  });
                }}
              >
                <Text style={styles.signupBtnText}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.customBtn, styles.loginBtn]}
                onPress={() => {
                  setIsLoginModalOpen(false);
                  navigation.navigate('Login', {
                    redirectTo: { name: 'ProductDetail', params: { product, autoAdd: true } },
                  });
                }}
              >
                <Text style={styles.loginBtnText}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ADDED to cart MODAL message */}
      <Modal visible={isAddedModalOpen} animationType="fade" transparent={true} onRequestClose={() => setIsAddedModalOpen(false)}>
        <View style={styles.customModalBg}>
          <View style={[styles.customModalCard, { backgroundColor: theme.card }]}>
            <View style={styles.successIconCircle}><Ionicons name="checkmark" size={32} color={COLORS.white} /></View>
            <Text style={[styles.customModalTitle, { color: theme.text }]}>Added to Cart!</Text>
            <Text style={[styles.customModalText, { color: theme.subText }]}>{product.name} has been added to your cart successfully.</Text>
            <View style={styles.customBtnRow}>
              <TouchableOpacity
                style={[styles.customBtn, styles.cancelBtn, { backgroundColor: theme.inputBg, borderColor: theme.border }]}
                onPress={() => setIsAddedModalOpen(false)}
              >
                <Text style={[styles.cancelBtnText, { color: theme.text }]}>Continue</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.customBtn, styles.loginBtn]}
                onPress={handleGoToCart}
              >
                <Text style={styles.loginBtnText}>Go to Cart</Text>
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
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SIZES.screenPadding, paddingTop: 50, paddingBottom: 16 },
  headerTitle: { fontSize: 16, fontWeight: '600' },
  imageContainer: { width: '100%', height: 420, position: 'relative', marginBottom: 0 },
  hero: { width: '100%', height: '100%' },
  heartBtn: { position: 'absolute', top: 16, right: 16, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', elevation: 2 },
  detailsCard: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 40, marginTop: -24 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  name: { fontSize: 20, fontWeight: 'bold', flex: 1 },
  stockText: { fontSize: 11, color: '#4CAF50', fontWeight: '600' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 12 },
  ratingText: { fontSize: 12, fontWeight: 'bold' },
  reviewText: { fontSize: 11 },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  price: { fontSize: 22, fontWeight: 'bold', color: COLORS.gold },
  oldPrice: { fontSize: 14, textDecorationLine: 'line-through' },
  desc: { fontSize: 13, lineHeight: 20, marginBottom: 20 },
  deliveryRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  deliveryText: { fontSize: 12 },
  offerText: { fontSize: 12, color: '#4CAF50', textAlign: 'center', fontWeight: '500', marginBottom: 30 },
  reviewsSection: { borderTopWidth: 1, paddingTop: 20 },
  reviewsHeader: { marginBottom: 16 },
  reviewsTitle: { fontSize: 16, fontWeight: 'bold' },
  reviewCard: { borderRadius: 12, padding: 12, marginBottom: 12 },
  reviewTopRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  reviewerAvatar: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  avatarText: { fontWeight: 'bold', fontSize: 14 },
  reviewerInfo: { flex: 1 },
  reviewerName: { fontSize: 13, fontWeight: '600' },
  metaText: { fontSize: 10, marginTop: 2 },
  likesContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(231, 76, 60, 0.1)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 16, gap: 4 },
  likesContainerActive: { backgroundColor: COLORS.red },
  likesText: { fontSize: 11, fontWeight: 'bold', color: COLORS.red },
  likesTextActive: { color: COLORS.white },
  reviewComment: { fontSize: 13, lineHeight: 18, fontStyle: 'italic' },
  writeReviewBtn: { borderWidth: 1, paddingVertical: 12, borderRadius: 20, alignItems: 'center', marginTop: 8 },
  writeReviewText: { fontWeight: 'bold', fontSize: 13 },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, minHeight: 350 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold' },
  inputLabel: { fontSize: 12, fontWeight: '600', marginBottom: 6 },
  textInput: { borderWidth: 1, borderRadius: 12, padding: 12, fontSize: 14, marginBottom: 16 },
  textArea: { height: 100, textAlignVertical: 'top' },
  submitBtn: { backgroundColor: COLORS.dark, paddingVertical: 16, borderRadius: 30, alignItems: 'center', marginTop: 10 },
  submitBtnText: { color: COLORS.white, fontWeight: 'bold', fontSize: 15 },
  customModalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  customModalCard: { width: '100%', borderRadius: 24, padding: 28, alignItems: 'center', elevation: 10 },
  iconCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: COLORS.dark, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  successIconCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#4CAF50', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  customModalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  customModalText: { fontSize: 14, textAlign: 'center', lineHeight: 20, marginBottom: 24 },
  customBtnRow: { flexDirection: 'row', gap: 12, width: '100%', marginTop: 10 },
  customBtn: { flex: 1, paddingVertical: 14, borderRadius: 30, alignItems: 'center' },
  cancelBtn: { borderWidth: 1 },
  signupBtn: { backgroundColor: COLORS.gold },
  loginBtn: { backgroundColor: COLORS.dark },
  cancelBtnText: { fontWeight: 'bold', fontSize: 15 },
  signupBtnText: { color: COLORS.white, fontWeight: 'bold', fontSize: 15 },
  loginBtnText: { color: COLORS.white, fontWeight: 'bold', fontSize: 15 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: SIZES.screenPadding, paddingVertical: 16, paddingBottom: 30 },
  cartBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.dark, paddingVertical: 16, borderRadius: 30, gap: 8 },
  cartText: { color: COLORS.white, fontWeight: 'bold', fontSize: 15 },
});