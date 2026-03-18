import React from 'react';
import { Text, View } from 'react-native';

export default function MoodDisplay({ selectedMood }) {
  return (
    <View>
      <Text>Current Mood</Text>
      <Text>{selectedMood}</Text>
    </View>
  );
}
