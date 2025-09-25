import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';

export default function HomeScreen({ navigation }) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem('@user_name');
        if (stored) setName(stored);
      } catch (e) {
        console.warn('Не удалось загрузить имя', e);
      }
    })();
  }, []);

  const saveName = async () => {
    try {
      await AsyncStorage.setItem('@user_name', name);
      Alert.alert('Сохранено', 'Имя сохранено локально');
    } catch (e) {
      console.warn('Ошибка сохранения', e);
    }
  };

  const fetchSampleData = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      const json = await res.json();
      await AsyncStorage.setItem('@sample_todo', JSON.stringify(json));
      Alert.alert('Данные загружены', `Загружено todo id=${json.id}`);
    } catch (e) {
      console.warn('Ошибка fetch', e);
      Alert.alert('Ошибка', 'Не удалось получить данные');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добро пожаловать в учебный макет!</Text>

      <InputField
        label="Ваше имя"
        placeholder="Введите ваше имя"
        value={name}
        onChangeText={setName}
      />

      <CustomButton title="Сохранить имя" onPress={saveName} />
      <CustomButton
        title="Перейти к деталям"
        onPress={() => navigation.navigate('Details', { userName: name })}
      />

      <CustomButton title="Загрузить пример API" onPress={fetchSampleData} />
      {loading && <ActivityIndicator style={{ marginTop: 12 }} />}

      <CustomButton
        title="Открыть мультимедиа экран"
        onPress={() => navigation.navigate('Media')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 22, marginBottom: 12, textAlign: 'center' },
});
