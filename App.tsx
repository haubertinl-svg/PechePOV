import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<'back' | 'front'>('back');

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Besoin de la permission caméra</Text>
        <TouchableOpacity style={styles.buttonPermission} onPress={requestPermission}>
          <Text style={styles.textButton}>Autoriser</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <CameraView style={styles.camera} facing={facing}>
        <SafeAreaView style={styles.overlay}>
          <View style={styles.header}>
            <View style={styles.recIndicator}>
              <View style={styles.dot} />
              <Text style={styles.recText}>LIVE POV</Text>
            </View>
            <TouchableOpacity onPress={() => setFacing(curr => curr === 'back' ? 'front' : 'back')}>
              <Ionicons name="camera-reverse-outline" size={32} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.iconButtonSmall}>
              <Ionicons name="images-outline" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.recordButton}>
              <View style={styles.recordButtonInner} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButtonSmall}>
              <Ionicons name="settings-outline" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center' },
  message: { textAlign: 'center', color: 'white', paddingBottom: 20, fontSize: 18 },
  camera: { flex: 1 },
  overlay: { flex: 1, justifyContent: 'space-between', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  recIndicator: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#ff4444', marginRight: 8 },
  recText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  bottomBar: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 30 },
  recordButton: { width: 80, height: 80, borderRadius: 40, borderWidth: 4, borderColor: 'white', justifyContent: 'center', alignItems: 'center' },
  recordButtonInner: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#ff4444' },
  iconButtonSmall: { backgroundColor: 'rgba(0,0,0,0.5)', padding: 12, borderRadius: 30 },
  buttonPermission: { backgroundColor: '#deff9a', padding: 15, borderRadius: 10, alignSelf: 'center' },
  textButton: { color: '#000', fontWeight: 'bold' }
});