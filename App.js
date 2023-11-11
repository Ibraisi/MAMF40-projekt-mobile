import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { readDataMatrix } from 'datamatrix-decoder';
import styles from './styles/AppStyle';
import ScannerPermissionRequest from './Components/PermissionRequest';
import BarcodeScannerView from './Components/BarcodeScanner';
import ScannedItemsListView from './Components/ScannedDataList';

export default function App() {
  const [hasScannerPermission, setHasScannerPermission] = useState(null);
  const [isBarcodeScanned, setIsBarcodeScanned] = useState(false);
  const [barcodeDataDisplay, setBarcodeDataDisplay] = useState('Sikta på en streckkod för att skanna');
  const [scannedItemsList, setScannedItemsList] = useState([]);
  const [rescanButtonText, setRescanButtonText] = useState('Skanna');
  const [isSectionSelected, setIsSectionSelected] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isSectionScannerVisible, setIsSectionScannerVisible] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasScannerPermission(status === 'granted');
    };
    setIsBarcodeScanned(true);
    getBarCodeScannerPermissions();
  }, []);

  const onSectionScanComplete = ({ type, data }) => {
    setSelectedSection("Determined Section");
    setIsSectionSelected(true);
    setIsSectionScannerVisible(false);
  };

  const onBarcodeScanComplete = async ({ type, data }) => {
    try {
      const decodedData = readDataMatrix(data);
      const gtin = decodedData.gtin || 'N/A';
      const expiry = decodedData.expiry || 'N/A';
      const lot = decodedData.lot || 'N/A';
      const serial = decodedData.serial || 'N/A';
      const formattedText = `GTIN: ${gtin}\nExpiry: ${expiry}\nLOT: ${lot}\nSerial: ${serial}`;
      setBarcodeDataDisplay(formattedText);

      const scannedItem = { id: new Date().getTime().toString(), data: formattedText };
      setScannedItemsList((prevList) => [scannedItem, ...prevList]);

      setIsBarcodeScanned(true);
      setRescanButtonText('Skanna igen');
    } catch (error) {
      console.error('Fel vid hantering av streckkodsskanning:', error);
    }
  };

  const triggerRescan = () => {
    setBarcodeDataDisplay('Sikta på en streckkod för att skanna');
    setIsBarcodeScanned(false);
  };

  const resetSectionSelection = () => {
    setIsSectionSelected(false);
    setSelectedSection(null);
    setIsSectionScannerVisible(true);
    setIsBarcodeScanned(false);
    setScannedItemsList([])
    setBarcodeDataDisplay('Sikta på en streckkod för att skanna');
    setRescanButtonText('Skanna');
  };

  if (hasScannerPermission === null || hasScannerPermission === false) {
    return <ScannerPermissionRequest hasPermission={hasScannerPermission} />;
  }

  if (!isSectionSelected && !isSectionScannerVisible) {
    return (
      <View style={styles.container}>
        <Button title="Start Section Scan" onPress={() => setIsSectionScannerVisible(true)} />
      </View>
    );
  }

  if (isSectionScannerVisible) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'left' }}>Scan the section first</Text>
        <BarcodeScannerView onScan={onSectionScanComplete} scanned={isSectionSelected} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {selectedSection && <Text>Selected Section: {selectedSection}</Text>}
      <View style={styles.topSpacer}></View>
      <View style={styles.sectionHeader}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'left' }}>Section: {selectedSection}</Text>
      </View>
      <BarcodeScannerView onScan={onBarcodeScanComplete} scanned={isBarcodeScanned} />
      <View style={styles.buttonContainer}>
        <Button title={rescanButtonText} onPress={triggerRescan} disabled={!isBarcodeScanned} style={styles.button} />
      </View>
      <ScannedItemsListView scannedDataList={scannedItemsList} />
      <View style={{...styles.buttonContainer, marginTop: 0}}>
        <Button title="Change Section" onPress={resetSectionSelection} style={styles.button} />
      </View>
      <View style={styles.bottomSpacer}></View>
    </View>
  );
}

