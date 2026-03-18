import React from 'react';
import { Text, View } from 'react-native';

export default function StreakCard({ streak }) {
  return (
    <View>
      <Text>Streak</Text>
      <Text>{streak} days</Text>
    </View>
  );
}
