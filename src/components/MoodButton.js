import React from 'react';
import { Button, View } from 'react-native';

export default function MoodButton({ label, onPress }) {
  return (
    <View>
      <Button title={label} onPress={onPress} />
    </View>
  );
}
