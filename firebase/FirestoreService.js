import { db } from './firebaseConfig'; // Ensure this path is correct
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { async } from '@firebase/util';
import MedInformation from '../model/MedInformation';

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
    try {
      console.log("hello from service :", {scannedItemsList})
      
      for (const item of scannedItemsList) {
        const parsedData = parseItemData(item.data); // Ensure item.data is an instance of MedInformation
        console.log("Parsed item: ", parsedData);
  
        const docRef = await addDoc(collection(db, 'med-data'), parsedData);
        console.log('Document written with ID: ', docRef.id);
      }
  
      setScannedItemsList([]);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
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
        };
      } else {
        // Handle the case where medInfo is not a valid instance of MedInformation
        console.error('Invalid medInfo data:', medInfo);
        return {
          expiry: 'N/A',
          gtin: 'N/A',
          lot: 'N/A',
          serial: 'N/A',
        };
      }
    };
    
  