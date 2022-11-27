import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type FavoProps = {
  isFavorite: boolean;
};

const HeartButton = ({isFavorite}: FavoProps) => {
  let iconName = isFavorite ? 'heart' : 'heart-outline';
  let iconColor = isFavorite ? '#f5c518' : 'black';
  return <Icon name={iconName} size={30} color={iconColor} />;
};

const styles = StyleSheet.create({});

export default HeartButton;
