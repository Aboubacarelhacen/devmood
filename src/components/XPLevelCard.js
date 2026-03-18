import React from 'react';
import { Text, View } from 'react-native';

export default function XPLevelCard({ level, xp, xpGoal = 100 }) {
  return (
    <View>
      <Text>Level</Text>
      <Text>{level}</Text>
      <Text>
        XP {xp}/{xpGoal}
      </Text>
    </View>
  );
}
