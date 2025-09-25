import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';

import CustomButton from '../components/CustomButton';

export default function MediaScreen() {
  const [imageUri, setImageUri] = useState(null);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    return () => {
      if (sound) sound.unloadAsync().catch(() => {});
    };
  }, [sound]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Разрешение отклонено', 'Нужно разрешение для доступа к галерее');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const playRemoteSound = async () => {
    try {
      const url = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
      const { sound: playbackObject } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true }
      );
      setSound(playbackObject);
    } catch (e) {
      Alert.alert('Ошибка', 'Не удалось воспроизвести аудио');
    }
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Мультимедиа</Text>

      <CustomButton title="Выбрать изображение" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      <CustomButton title="Воспроизвести аудио" onPress={playRemoteSound} />
      <CustomButton title="Остановить аудио" onPress={stopSound} disabled={!sound} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: 'center' },
  title: { fontSize: 20, marginBottom: 12 },
  image: { width: 300, height: 300, marginTop: 12, borderRadius: 8 },
});
