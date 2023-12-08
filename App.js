import React, { useState, useEffect } from "react";
import { Text, View, Button, Alert,TouchableOpacity, Image } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { readDataMatrix } from "datamatrix-decoder";
import { Vibration, Platform } from "react-native";


// Local imports
import styles from "./styles/AppStyle";
import ScannerPermissionRequest from "./Components/PermissionRequest";
import BarcodeScannerView from "./Components/BarcodeScanner";
import ScannedItemsListView from "./Components/ScannedDataList";
import {
  submitScannedItems,
  validateSection,
  getNameByPN,
} from "./firebase/FirestoreService";
import MedInformation from "./model/MedInformation";
import WebAppLink from "./Components/WebAppLink";

export default function App() {
  const [buttonOpacity, setButtonOpacity] = useState(1); // Set the initial opacity

  // State definitions
  const [hasScannerPermission, setHasScannerPermission] = useState(null);
  const [isBarcodeScanned, setIsBarcodeScanned] = useState(false);
  const [barcodeDataDisplay, setBarcodeDataDisplay] = useState(
    "Sikta på en streckkod för att skanna"
  );
  const [shouldScan, setShouldScan] = useState(true);
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
    setShouldScan(false); // Stop the camera from scanning
    setIsBarcodeScanned(true);

    try {
      const sectionName = await validateSection(data);

      if (sectionName) {
        setIsSectionSelected(true);
        setIsSectionScannerVisible(false);
        setSelectedSection(sectionName);
        Vibration.vibrate();

        Alert.alert(
          "Avdelning skannad",
          `Välkommen till : ${sectionName} `
          
        );
      } else {
        throw new Error("Avdelnig finns ej");
      }
    } catch (error) {
      setScanError(error.message);
      setIsSectionScannerVisible(true);
      Alert.alert(
        "Skannig till avdelning misslyckades",
        error.message || "Error occurred during scanning."
      );
    }
  };

  // Handler for removing an item from the list
   handleRemoveItem = (index) => {
    Alert.alert(
      "Bekräfta borttagning",
      `Är du säker på att du vill ta bort ${scannedItemsList[index].data.name}?`,
      [
        { text: "Avbryt", style: "cancel" },
        {
          text: "OK",
          onPress: async () => {
            try {
              setScannedItemsList((prevList) => prevList.filter((_, i) => i !== index));
            // ScannedItemsListView.updateListAfterRemoval(index);

            } catch (e) {
           //  const console.error('Ett fel uppstod vid borttagning: ', e);
              // Avisera om fel uppstår vid borttagning
              console.log(e)
              Alert.alert("Fel", "Det gick inte att ta bort objektet. Försök igen.");
            }
          },
        },
      ]
    );
  };
  
  

  // Handler for barcode scan completion
  const onBarcodeScanComplete = async ({ type, data }) => {
    console.log(selectedSection);
    setButtonOpacity(1); // Set the opacity when something has been scanned

    if (!isBarcodeScanned) {
        setIsBarcodeScanned(true);

        try {
            const decodedData = readDataMatrix(data);
            console.log("efter scan " + selectedSection);

            // Fetch the name based on PN
            const medNameOrPN = await getNameByPN("0" + decodedData.gtin);

            const medInfo = new MedInformation(
                "0" + decodedData.gtin,
                decodedData.expiry,
                decodedData.lot,
                decodedData.serial,
                selectedSection,
                medNameOrPN // Pass the fetched name or PN
            );

            if (scannedItemsList.some((item) => item.data.gtin === medInfo.gtin)) {
                Alert.alert("Duplicate Scan", "This item has already been scanned.");
                setIsBarcodeScanned(true);
                setButtonOpacity(1); // Set the opacity when something has been scanned
                return;
            }

            // Vibrate on successful scan
            Vibration.vibrate();

            setBarcodeDataDisplay(`Name/PN: ${medInfo.name}`);

            const scannedItem = { data: medInfo };
            setScannedItemsList((prevList) => [...prevList, scannedItem]);
            setRescanButtonText("Skanna igen");
        } catch (error) {
            console.log(error)
            Alert.alert("Scan Failed", "Medicin finns ej");
            setButtonOpacity(1); // Set the opacity in case of scan failure
        }
    }
};


  // Handler to trigger rescan
  const triggerRescan = () => {
    setShouldScan(true); // Allow the camera to start scanning again
    setIsBarcodeScanned(false);
    setButtonOpacity(0.5);

  };

  // Handler to reset section selection
  const resetSectionSelection = () => {
    setShouldScan(true);
    setIsSectionSelected(false);
    setSelectedSection(null);
    setIsSectionScannerVisible(true);
    setIsBarcodeScanned(false);
    setScannedItemsList([]);
    setBarcodeDataDisplay("Sikta på en streckkod för att skanna");
    setRescanButtonText("Skanna");
  };

  if (hasScannerPermission === null || hasScannerPermission === false) {
    return <ScannerPermissionRequest hasPermission={hasScannerPermission} />;
  }

  if (!isSectionSelected && !isSectionScannerVisible) {
    return (
      <View style={styles.container}>
         <Image
      source={require("./regionskane.jpeg")} // Adjust the path accordingly
      style={styles.imageStyle} // Add or adjust the style for the image

    />
        <TouchableOpacity
          style={styles.startScanButton}
          onPress={() => setIsSectionScannerVisible(true)}
        >
          
          
          <Text style={styles.startScanButtonText}>Skanna avdelning</Text>
        </TouchableOpacity>
        <WebAppLink/>

      </View>
    );
  }

  if (isSectionScannerVisible) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer1}></View>
        <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
          Skanna avdelning
        </Text>
        {scanError && (
          <View>
            <Text style={{ color: "red", marginBottom: 10 }}>{scanError}</Text>
            <TouchableOpacity
              style={styles.rescanButton}
              onPress={() => {
                setScanError(null);
                setShouldScan(true);
              }}
            >
              <Text style={styles.rescanButtonText}>Skanna avdelning</Text>
            </TouchableOpacity>
          </View>
        )}
        <BarcodeScannerView
          onScan={shouldScan ? onSectionScanComplete : null}
          scanned={isSectionSelected}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.emptyContainer1}></View>
      <View style={styles.sectionHeader}>
        <View style={styles.emptyContainer1}></View>
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
           {selectedSection}
        </Text>
      </View>
      <BarcodeScannerView
        onScan={onBarcodeScanComplete}
        scanned={isBarcodeScanned}
      />
       <Text style={{ fontSize: 17, fontWeight: "bold", textAlign: "center", marginTop:"10%" }}>
          Tryck "{rescanButtonText}" för att registrera medicin
        </Text>
      <View style={styles.submitButtonn}>
        <TouchableOpacity
          style={{ opacity: buttonOpacity }}
          onPress={triggerRescan}
          disabled={!isBarcodeScanned}
        >
          <Text style={styles.submitButtonText}>{rescanButtonText}</Text>
        </TouchableOpacity>
      </View>
      <ScannedItemsListView
        scannedDataList={scannedItemsList}
        handleRemoveItem={handleRemoveItem}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => submitScannedItems({ scannedItemsList, setScannedItemsList })}
      >
        <Text style={styles.submitButtonText}>Skicka in skannde objekt</Text>
      </TouchableOpacity>
      <View >
        <TouchableOpacity
          style={styles.changeSectionButton}
          onPress={resetSectionSelection}
        >
          <Text style={styles.changeSectionButtonText}>Ändra avdelning</Text>
          
        </TouchableOpacity>
      </View>
      <View style={styles.bottomSpacer}></View>
    </View>
  );
}