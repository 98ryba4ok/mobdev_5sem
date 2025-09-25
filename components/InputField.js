import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

/**
 * InputField:
 * Обёртка над TextInput с подписью.
 */
export default function InputField({ label, value, onChangeText, placeholder }) {
  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 12 },
  label: { fontWeight: '600', marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    borderRadius: 6,
    fontSize: 16,
  },
});
