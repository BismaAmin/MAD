import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS, SIZES } from '../styles/GlobalStyles';

const ProductCard = ({ image, name, price, onPress, badge }) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
        {badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </View>
      <Text style={styles.name} numberOfLines={1}>{name}</Text>
      <Text style={styles.price}>{price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '48%',
    marginBottom: 20,
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: SIZES.cardRadius,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    marginBottom: 8,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: COLORS.red,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 13,
    color: COLORS.textDark,
    fontWeight: '500',
    marginBottom: 2,
  },
  price: {
    fontSize: 13,
    color: COLORS.gold,
    fontWeight: '600',
  },
});

export default ProductCard;