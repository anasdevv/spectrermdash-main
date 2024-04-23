import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
export const QueryBusinesses = async (
  collections: string,
  businessName: string,
  address: string,
) => {
  try {
    console.log("called 2");
    const q = query(
      collection(db, collections),
      where("businessName", "==", businessName),
      where("shortAddress", "==", address),
    );

    const docRef = await getDocs(q);
    console.log("dr ", docRef);
    return docRef;
  } catch (error) {
    console.log(error);
    return error;
  }
};
