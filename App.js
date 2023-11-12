import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { readDataMatrix } from 'datamatrix-decoder';

// Local imports
import styles from "./styles/AppStyle";
import ScannerPermissionRequest from "./Components/PermissionRequest";
import BarcodeScannerView from "./Components/BarcodeScanner";
import ScannedItemsListView from "./Components/ScannedDataList";
import {
  submitScannedItems,
  validateSection,
} from "./firebase/FirestoreService";
import MedInformation from "./model/MedInformation";

export default function App() {
  // State definitions
  const [hasScannerPermission, setHasScannerPermission] = useState(null);
  const [isBarcodeScanned, setIsBarcodeScanned] = useState(false);
  const [barcodeDataDisplay, setBarcodeDataDisplay] = useState(
    "Sikta på en streckkod för att skanna"
  );
  const [scannedItemsList, setScannedItemsList] = useState([]);
  const [rescanButtonText, setRescanButtonText] = useState("Skanna");
  const [isSectionSelected, setIsSectionSelected] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isSectionScannerVisible, setIsSectionScannerVisible] = useState(false);
  const [scanError, setScanError] = useState(null);

  // Effect for requesting barcode scanner permissions
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasScannerPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  // Handler for section scan completion
  const onSectionScanComplete = async ({ type, data }) => {
    const sectionName = await validateSection(data);
    if (sectionName) {
      setSelectedSection(sectionName);
      setIsSectionSelected(true);
      setIsSectionScannerVisible(false);
    } else {
      setScanError("Section not found. Please try scanning again.");
      setIsSectionScannerVisible(true);
    }
  };

  // Handler for removing an item from the list
  const handleRemoveItem = (index) => {
    setScannedItemsList((prevList) => prevList.filter((_, i) => i !== index));
  };

  // Handler for barcode scan completion
  const onBarcodeScanComplete = async ({ type, data }) => {
    try {
      const decodedData = readDataMatrix(data);
      const medInfo = new MedInformation(
        decodedData.gtin,
        decodedData.expiry,
        decodedData.lot,
        decodedData.serial
      );
      setBarcodeDataDisplay(`GTIN: ${medInfo.gtin}`);

      const scannedItem = { data: medInfo };
      setScannedItemsList((prevList) => [scannedItem, ...prevList]);

      setIsBarcodeScanned(true);
      setRescanButtonText("Skanna igen");
    } catch (error) {
      console.error("Fel vid hantering av streckkodsskanning:", error);
    }
  };

  // Handler to trigger rescan
  const triggerRescan = () => {
    setBarcodeDataDisplay("Sikta på en streckkod för att skanna");
    setIsBarcodeScanned(false);
  };

  // Handler to reset section selection
  const resetSectionSelection = () => {
    setIsSectionSelected(false);
    setSelectedSection(null);
    setIsSectionScannerVisible(true);
    setIsBarcodeScanned(false);
    setScannedItemsList([]);
    setBarcodeDataDisplay("Sikta på en streckkod för att skanna");
    setRescanButtonText("Skanna");
  };

  // Render logic
  if (hasScannerPermission === null || hasScannerPermission === false) {
    return <ScannerPermissionRequest hasPermission={hasScannerPermission} />;
  }

  if (!isSectionSelected && !isSectionScannerVisible) {
    return (
      <View style={styles.container}>
        <Button
          title="Start Section Scan"
          onPress={() => setIsSectionScannerVisible(true)}
        />
      </View>
    );
  }

  if (isSectionScannerVisible) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "left" }}>
          Scan the section first
        </Text>
        {scanError && (
          <View>
            <Text style={{ color: "red", marginBottom: 10 }}>{scanError}</Text>
            <Button title="Rescan Section" onPress={() => setScanError(null)} />
          </View>
        )}
        <BarcodeScannerView
          onScan={onSectionScanComplete}
          scanned={isSectionSelected}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topSpacer}></View>
      <View style={styles.sectionHeader}>
        <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "left" }}>
          Avdelning: {selectedSection}
        </Text>
      </View>
      <BarcodeScannerView
        onScan={onBarcodeScanComplete}
        scanned={isBarcodeScanned}
      />
      <View style={styles.buttonContainer}>
        <Button
          title={rescanButtonText}
          onPress={triggerRescan}
          disabled={!isBarcodeScanned}
          style={styles.button}
        />
      </View>
      <ScannedItemsListView
        scannedDataList={scannedItemsList}
        handleRemoveItem={handleRemoveItem}
      />
      <Button
        title="Submit Scanned Items"
        onPress={() =>
          submitScannedItems({ scannedItemsList, setScannedItemsList })
        }
      />
      <View style={{ ...styles.buttonContainer, marginTop: 0 }}>
        <Button
          title="Change Section"
          onPress={resetSectionSelection}
          style={styles.button}
        />
      </View>
      <View style={styles.bottomSpacer}></View>
    </View>
  );
}