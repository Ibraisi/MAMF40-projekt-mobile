import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { readDataMatrix } from 'datamatrix-decoder';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [formattedData, setFormattedData] = useState('Sikta på en streckkod för att skanna');
  const [scannedDataList, setScannedDataList] = useState([]);
  const [scanButtonText, setScanButtonText] = useState('Skanna');

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    setScanned(true);
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    try {
      const decodedData = readDataMatrix(data);

      const gtin = decodedData.gtin || 'N/A';
      const expiry = decodedData.expiry || 'N/A';
      const lot = decodedData.lot || 'N/A';
      const serial = decodedData.serial || 'N/A';

      const formattedText = `GTIN: ${gtin}\nExpiry: ${expiry}\nLOT: ${lot}\nSerial: ${serial}`;
      setFormattedData(formattedText);

      const scannedItem = {
        id: new Date().getTime().toString(),
        data: formattedText,
      };

      setScannedDataList((prevList) => [scannedItem, ...prevList]);

      setScanned(true);
      setScanButtonText('Skanna igen');
    } catch (error) {
      console.error('Fel vid hantering av streckkodsskanning:', error);
    }
  };

  const handleRescan = () => {
    setFormattedData('Sikta på en streckkod för att skanna');
    setScanned(false);
  };

  if (hasPermission === null) {
    return <Text>Begär behörighet att använda kameran...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Ingen åtkomst till kameran.</Text>;
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center', // Center all content vertically and horizontally
    },
    sectionHeader: {
      flex: 1, // Takes 10% of the screen height
      fontSize: 20, // Bigger font size
      fontWeight: 'bold', // Bolder text
      marginVertical: 20,
      marginLeft: 0,
      alignItems: 'flex-end', // Align text to the left
    },
    emptyContainer1: {
      flex: 1, // Takes 10% of the screen height
    },
    cameraContainer: {
      flex: 4, // Takes 70% of the screen height
      width: '70%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
    },
    camera: {
      aspectRatio: 1,
      width: '100%',
      backgroundColor: 'lightgray',
      borderRadius: 40,
    },
    buttonContainer: {
      flex: 0.8, // Takes 10% of the screen height
      width: '40%',
      marginTop: 20,
      marginBottom: 15,
      justifyContent: 'center',
      borderWidth: 1, // Add a border
      borderColor: 'black', // Border color
      borderRadius: 40,
      // Remove border properties from buttonContainer
    },
    button: {
      height: 10, // Set the height of the button as needed
      borderWidth: 1, // Add a border
      borderColor: 'white', // Border color
      borderRadius: 40,
      color:'red',
      
    },
    emptyContainer2: {
      flex: 1, // Takes 10% of the screen height
    },
    listContainer: {
      flex: 4, // Takes 70% of the screen height
      borderStyle: 'solid',
      borderWidth: 1,
      width: '70%',
      borderRadius: 20,
    },
    listItem: {
      fontSize: 16,
      marginVertical: 4,
      paddingLeft:7,
    },
    scrollView: {
      // Customize the height
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.emptyContainer1}></View>
      <View style={styles.sectionHeader}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'left' }}>
          Avdelnig: Hjärt och Lung
        </Text>
      </View>

      <View style={styles.cameraContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.camera}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title={scanButtonText} onPress={handleRescan} disabled={!scanned} style={styles.button} />
      </View>

      <View style={styles.listContainer}>
        <ScrollView style={styles.scrollView}>
          {scannedDataList.map((item) => (
            <Text key={item.id} style={styles.listItem}>
              {item.data}
            </Text>
          ))}
        </ScrollView>
      </View>
      <View style={styles.emptyContainer2}></View>
    </View>
  );
}
