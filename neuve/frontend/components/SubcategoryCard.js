import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../styles/GlobalStyles';

const SubcategoryCard = ({ image, name, onPress }) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.imageBox}>
        <Image source={image} style={styles.image} resizeMode="cover" />
      </View>

      <View style={styles.labelRow}>
        <Text style={styles.label}>{name}</Text>
        <Ionicons name="chevron-forward" size={18} color={COLORS.textDark} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '48%',
    backgroundColor: '#eee6e0',
    borderRadius: SIZES.cardRadius,
    overflow: 'hidden',
    marginBottom: 20,
  },
  imageBox: {
    width: '100%',
    aspectRatio: 1,
    overflow: 'hidden',
    backgroundColor: COLORS.light,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
  },
});

export default SubcategoryCard;