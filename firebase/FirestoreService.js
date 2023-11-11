import { db } from './firebaseConfig'; // Ensure this path is correct
import { collection, query, where, getDocs } from 'firebase/firestore';

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
  