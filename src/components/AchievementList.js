import React from 'react';
import { Text, View } from 'react-native';

export default function AchievementList({ achievements = [] }) {
  return (
    <View>
      <Text>Achievements</Text>
      {achievements.length === 0 ? (
        <Text>No achievements yet.</Text>
      ) : (
        achievements.map((achievement, index) => (
          <Text key={`${achievement}-${index}`}>{achievement}</Text>
        ))
      )}
    </View>
  );
}
