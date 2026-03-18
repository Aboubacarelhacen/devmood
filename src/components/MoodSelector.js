import React from 'react';
import { Text, View } from 'react-native';
import MoodButton from './MoodButton';

export default function MoodSelector({ onSelectMood }) {
  return (
    <View>
      <Text>Select Mood</Text>
      <MoodButton label="😀 Productive" onPress={() => onSelectMood('😀 Productive')} />
    </View>
  );
}
