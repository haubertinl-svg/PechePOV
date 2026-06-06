import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CameraView } from 'expo-camera';

export function CameraWrapper({ isVisible, ...props }: { isVisible: boolean } & any) {
  if (!isVisible) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Caméra désactivée pour iOS</Text>
      </View>
    );
  }

  return <CameraView {...props} />;
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  text: { color: 'white' }
});