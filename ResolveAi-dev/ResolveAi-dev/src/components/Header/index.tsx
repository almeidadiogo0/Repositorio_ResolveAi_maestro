import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../style/colors';
import { styles } from './HeaderStyle';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  showNotification?: boolean;
}

export function Header({ title, showBack, onBack, showNotification }: HeaderProps) {
  return (
    <View style={styles.container}>
      {showBack ? (
        <TouchableOpacity
          onPress={onBack}
          style={styles.iconButton}
          accessibilityLabel="Voltar"
          accessibilityRole="button"
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.iconButton}
          accessibilityLabel="Menu"
          accessibilityRole="button"
        >
          <Ionicons name="menu" size={24} color={colors.text} />
        </TouchableOpacity>
      )}

      <Text style={styles.title}>{title}</Text>

      {showNotification ? (
        <TouchableOpacity
          style={styles.iconButton}
          accessibilityLabel="Notificacoes"
          accessibilityRole="button"
        >
          <Ionicons name="notifications-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconSpacer} />
      )}
    </View>
  );
}
