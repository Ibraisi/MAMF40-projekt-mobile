import { db } from './firebaseConfig'; // Ensure this path is correct
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { async } from '@firebase/util';
import MedInformation from '../model/MedInformation';
import {Alert} from 'react-native'

export const validateSection = async (sectionId) => {
    console.log("Querying for ID:", sectionId); // Log the ID being queried
  
    const q = query(collection(db, "departments"), where("id", "==", sectionId));
  
    try {
      const querySnapshot = await getDocs(q);
      console.log("Query results:", querySnapshot.docs.map(doc => doc.data())); // Log the query results
  
      if (!querySnapshot.empty) {
        const document = querySnapshot.docs[0].data();
        return document.name;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error validating section: ", error);
      return null;
    }
  };

  export const submitScannedItems = async ({scannedItemsList, setScannedItemsList}) => {
    if (scannedItemsList.length === 0) {
      Alert.alert("Tom lista", "inget läckemedel har skannats.");
      return;
    }
  
    Alert.alert(
      "Confirm Submission",
      "Are you sure you want to submit these items?",
      [
        { text: "avbryt", style: "cancel" },
        {
          text: "OK",
          onPress: async () => {
            try {
              console.log("hello from service :", {scannedItemsList});
              
              for (const item of scannedItemsList) {
                const parsedData = parseItemData(item.data); 
                console.log("Parsed item: ", parsedData);
      
                const docRef = await addDoc(collection(db, 'med-data'), parsedData);
                console.log('Document written with ID: ', docRef.id);
              }
      
              setScannedItemsList([]);

              // Alert after successful submission
              Alert.alert("Success", "Items have been successfully submitted.");

            } catch (e) {
              console.error('Error adding document: ', e);
              // Alert for any error during submission
              Alert.alert("Error", "Failed to submit items. Please try again.");
            }
          },
        },
      ]
    );
};

  


    // A function to parse the item data (modify this according to your data format)
    const parseItemData = (medInfo) => {
      // Check if medInfo is an instance of MedInformation and has the necessary fields
      if (medInfo instanceof MedInformation) {
        return {
          expiry: medInfo.expiry,
          gtin: medInfo.gtin,
          lot: medInfo.lot,
          serial: medInfo.serial,
          section : medInfo.section
        };
      } else {
        // Handle the case where medInfo is not a valid instance of MedInformation
        console.error('Invalid medInfo data:', medInfo);
        return {
          expiry: 'N/A',
          gtin: 'N/A',
          lot: 'N/A',
          serial: 'N/A',
          section: "N/A",
        };
      }
    };

    export const getNameByPN = async (pn) => {
      const q = query(collection(db, "med-name"), where("pn", "==", pn));
  
      try {
          const querySnapshot = await getDocs(q);
  
          if (querySnapshot.empty) {
              // If no document is found with the PN, return the PN itself
              return pn;
          } else {
              // Return the name from the first document found
              // (assuming each PN has only one associated document)
              const doc = querySnapshot.docs[0];
              const data = doc.data();
              return data.name ? data.name : pn;
          }
      } catch (error) {
          console.error('Error fetching data from Firestore:', error);
          throw error;
      }
  };


    
  