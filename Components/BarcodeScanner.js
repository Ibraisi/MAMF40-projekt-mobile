import React from 'react';
import { View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from '../styles/AppStyle'; // Adjust path as necessary

const BarcodeScannerComponent = ({ onScan, scanned }) => {
  return (
    <View style={styles.cameraContainer}>
      <View style={styles.cameraWrapper}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : onScan}
          style={styles.camera}
        />
      </View>
    </View>
  );
};

export default BarcodeScannerComponent;
