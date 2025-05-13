import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

import { Text, View } from '@/components/Themed';
import styles from './tabStyles.style';

export default function ModalScreen() {
  return (
    <View style={[styles.container, {alignItems: 'center', justifyContent: 'center'}]}>
      <Text style={styles.title}>Be AwAir</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text>Developed by: </Text>
      <Text>Jocher Joaquin B. Escueta</Text>
      <Text></Text>
      <Text>Members:</Text>
      <Text>Jobelyn Bandola</Text>
      <Text>Amiel Emmanuel Basibas:</Text>
      <Text>Keirk Xandrex Brual</Text>
      <Text>Godwin Miles Ricafort</Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
