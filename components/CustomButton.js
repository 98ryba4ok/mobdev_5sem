import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

/**
 * CustomButton:
 * Унифицированная кнопка для всего приложения.
 */
export default function CustomButton({ title, onPress, disabled }) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 6,
  },
  text: { color: '#fff', fontSize: 16, fontWeight: '500' },
  disabled: { backgroundColor: '#aaa' },
});
