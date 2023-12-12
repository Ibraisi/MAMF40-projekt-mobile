import React from 'react';
import { View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from '../styles/AppStyle'; 

// Funktionell komponent för att skapa ett streckkodsscanningsgränssnitt
const BarcodeScannerComponent = ({ onScan, scanned,cameraOpacity }) => {
  return (
    // Container för hela komponenten med specifika stilar från styles
    <View style={styles.cameraContainer}>
      {/* En wrapper för att hantera layout-stilar för kameraområdet */}
      <View style={styles.cameraWrapper}>
        {/* BarCodeScanner-komponenten från expo-barcode-scanner */}
        <BarCodeScanner
          // Händelsehanterare för när en streckkod skannas
          // Om true då undefined(har skannat) annars false onScan(tillåtelse att skanna)
          onBarCodeScanned={scanned ? undefined : onScan}
          // Stilar för att anpassa kameraområdet (måste definieras i styles)
          style={[styles.camera, { opacity: cameraOpacity }]} // Update the style here
        />
      </View>
    </View>
  );
};

// Exportera komponenten för att göra den tillgänglig för användning i andra filer
export default BarcodeScannerComponent;
