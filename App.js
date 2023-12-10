import React, { useState, useEffect } from "react";
import { Text, View, Button, Alert, TouchableOpacity, Image } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { readDataMatrix } from "datamatrix-decoder";
import { Vibration, Platform } from "react-native";

// Lokala importeringar
import styles from "./styles/AppStyle";
import ScannerPermissionRequest from "./Components/PermissionRequest";
import BarcodeScannerView from "./Components/BarcodeScanner";
import ScannedItemsListView from "./Components/ScannedDataList";
import { submitScannedItems, validateSection, getNameByPN } from "./firebase/FirestoreService";
import MedInformation from "./model/MedInformation";
import WebAppLink from "./Components/WebAppLink";

export default function App() {
  
  // Tillstånd till kameran 
  const [hasScannerPermission, setHasScannerPermission] = useState(null);
  // Felhantering till error, hålla i error meddelandet
  const [scanError, setScanError] = useState(null);
  // Felhantering av vald avdelning, för att sätta vilken avdelning som har skannats om skanats
  const [selectedSection, setSelectedSection] = useState(null);

  // Hantering av tillåtelse för att skanna medicin
  const [isBarcodeScanned, setIsBarcodeScanned] = useState(false);

  // Hantering av tillåtelse för att skanna avdelning
  const [shouldScan, setShouldScan] = useState(true);

  // Tillstånd för att hålla reda på om en avdelning har valts eller inte.
  const [isSectionSelected, setIsSectionSelected] = useState(false);
  
  // Tillstånd för att visa sidan där man skannar avdelning
  const [isSectionScannerVisible, setIsSectionScannerVisible] = useState(false);

  //Vet ej
  const [barcodeDataDisplay, setBarcodeDataDisplay] = useState("Sikta på en streckkod för att skanna");
  // Texten för skanna knappen
  const [rescanButtonText, setRescanButtonText] = useState("Skanna");
 // State för att hantera opacitet och olika tillstånd
  const [buttonOpacity, setButtonOpacity] = useState(1);
 // Listan av skannade medicinerna 
  const [scannedItemsList, setScannedItemsList] = useState([]);


  // Effekt för att begära behörigheter för streckkodsskanner
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasScannerPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  // Hantering av skanning av avdelning
  const onSectionScanComplete = async ({ type, data }) => {
    // Så att den inte skannar mer än en avdelning 
    setShouldScan(false);
    

    try {
      const sectionName = await validateSection(data);

      if (sectionName) {
        // Ifall man kommer in i avdelning så ska man kunna skanna medicin
        setIsBarcodeScanned(true);

        setIsSectionSelected(true);

       // Komma fram till skannigssidan
        setIsSectionScannerVisible(false);

        // om avdelning blir vald så vill man inte att avdelningsidan ska visas
        setSelectedSection(sectionName);
        Vibration.vibrate();

        Alert.alert(
          "Avdelning skannad",
          `Välkommen till: ${sectionName}`
        );
      } else {
        throw new Error("Avdelning finns ej");
      }
    } catch (error) {
      setScanError(error.message);
      setIsSectionScannerVisible(true);
      Alert.alert(
        "Skanning till avdelning misslyckades",
        error.message || "Fel uppstod under skanningen."
      );
    }
  };

  // Hanterare för att ta bort ett objekt från listan
  const handleRemoveItem = (index) => {
    Alert.alert(
      "Bekräfta borttagning",
      `Är du säker på att du vill ta bort ${scannedItemsList[index].data.name}?`,
      [
        { text: "Avbryt", style: "cancel" },
        {
          text: "Ta bort",
          onPress: async () => {
            try {
              setScannedItemsList((prevList) => prevList.filter((_, i) => i !== index));
            } catch (e) {
              console.log(e);
              Alert.alert("Fel", "Det gick inte att ta bort objektet. Försök igen.");
            }
          },
        },
      ]
    );
  };

  // Hantering av skanning av medicin 
  const onBarcodeScanComplete = async ({ type, data }) => {
    console.log(selectedSection);
    setButtonOpacity(1);

    if (!isBarcodeScanned) {
      setIsBarcodeScanned(true);

      try {
        const decodedData = readDataMatrix(data);
        console.log("efter scan " + selectedSection);

        const medNameOrPN = await getNameByPN("0" + decodedData.gtin);

        const medInfo = new MedInformation(
          "0" + decodedData.gtin,
          decodedData.expiry,
          decodedData.lot,
          decodedData.serial,
          selectedSection,
          medNameOrPN
        );

        if (scannedItemsList.some((item) => item.data.gtin === medInfo.gtin)) {
          Alert.alert("Medicin redan skannad", "Den här artikeln har redan skannats.");
          setIsBarcodeScanned(true);
          setButtonOpacity(1);
          return;
        }

        Vibration.vibrate();

        setBarcodeDataDisplay(`Name/PN: ${medInfo.name}`);

        const scannedItem = { data: medInfo };
        setScannedItemsList((prevList) => [...prevList, scannedItem]);
        setRescanButtonText("Skanna igen");

      } catch (error) {
        console.log(error);
        Alert.alert("Skanning misslyckades", "Medicinen finns ej");
        setButtonOpacity(1);
      }
    }
  };

  // Hanterare för att starta om skanningen
  const triggerRescan = () => {
    //setShouldScan(true);

    // För att kunna skanna medicin igen
    setIsBarcodeScanned(false);
    setButtonOpacity(0.5);
  };

  // Avdelning, när man ändrar avelniing 

  // Hanterare för att återställa avdelningsval
  const resetSectionSelection = () => {
    // för att kunna skanna avdelning igen
    setShouldScan(true);
    setButtonOpacity(1);
    // För att kunna skanna med
    //setIsBarcodeScanned(false);

    setIsSectionSelected(false);
    // Visa avdelningsidan
    setIsSectionScannerVisible(true);
    

    setSelectedSection(null);
    
    setScannedItemsList([]);
   // setBarcodeDataDisplay("Sikta på en streckkod för att skanna");
    setRescanButtonText("Skanna");
  };

  // hasScannerPermission frågas bara första gången man använder appen 
  // Om användaren inte har skannertillstånd, visa en begäran om det
  if (hasScannerPermission === null || hasScannerPermission === false) {
    return <ScannerPermissionRequest hasPermission={hasScannerPermission} />;
  }

    // Första sidan 
  if (
    !isSectionSelected  && 
    !isSectionScannerVisible) {
    return (
      <View style={styles.container}>
        <Image
          source={require("./regionskane.jpeg")}
          style={styles.imageStyle}
        />
        <TouchableOpacity
          style={styles.startScanButton}
          onPress={() => setIsSectionScannerVisible(true)}
        >
          <Text style={styles.startScanButtonText}>Skanna avdelning</Text>
        </TouchableOpacity>
        <WebAppLink />
      </View>
    );
  }

  // Om avdelning finns ej 
  // Om skannergränssnittet för avdelningen är synligt
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
                // för att kunna skanna avdelning igen
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
          //I detta exempel används isSectionSelected för att styra om komponenten <BarcodeScannerView /> 
          //ska lyssna på skanningar eller inte. Om isSectionSelected är true, kommer onSectionScanComplete 
          //att kallas när en streckkod skannas, annars kommer ingenting att hända.
          // Det ger möjlighet att hantera olika skanningsbeteenden baserat på om en avdelning redan 
          //har valts eller inte.
        />
      </View>
    );
  }

  // Skanna mediciner, ändra avdelning, skicka in medciner till databsen
  // Om avdelningen är vald och skannergränssnittet för medicinskanning är synligt
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
          Tryck "{rescanButtonText}" för att skanna medicin
        </Text>
      <View style={styles.submitButtonn}>
        <TouchableOpacity
          style={{ opacity: buttonOpacity }}
          onPress={triggerRescan}
         // disabled={!isBarcodeScanned}
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
