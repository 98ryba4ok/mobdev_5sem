import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomButton from '../components/CustomButton';
import Card from '../components/Card';

export default function DetailsScreen({ route, navigation }) {
  const { userName } = route.params || {};
  const [storedTodo, setStoredTodo] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem('@sample_todo');
        if (json) setStoredTodo(JSON.parse(json));
      } catch (e) {
        console.warn('Ошибка чтения sample_todo', e);
      }
    })();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Привет, {userName || 'Гость'}!</Text>
      <Text style={styles.subtitle}>Данные из API:</Text>

      {storedTodo ? (
        <Card>
          <Text>ID: {storedTodo.id}</Text>
          <Text>Title: {storedTodo.title}</Text>
          <Text>Completed: {storedTodo.completed ? 'Да' : 'Нет'}</Text>
        </Card>
      ) : (
        <Text>Нет сохранённых данных. Загрузите их с главного экрана.</Text>
      )}

      <CustomButton title="Назад" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: 'stretch' },
  title: { fontSize: 22, marginBottom: 12, textAlign: 'center' },
  subtitle: { fontWeight: '600', marginBottom: 8 },
});
