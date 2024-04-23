import {
  FirestoreError,
  doc,
  getDocs,
  getDoc,
  DocumentData,
  collection,
  updateDoc,
  deleteDoc,
  addDoc,
  WithFieldValue,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

type CustomError = FirestoreError | Error | string;

export const GetSingleData = async (
  collection: string,
  id: string,
): Promise<DocumentData | CustomError> => {
  try {
    const docRef = doc(db, collection, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as DocumentData;
    } else {
      throw new Error("Document not found");
    }
  } catch (error) {
    if (error instanceof Error) {
      return error;
    }
    return "An unknown error occurred";
  }
};

export const countDocuments = async (
  collectionName: string,
): Promise<number | FirestoreError> => {
  try {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getCountFromServer(collectionRef);
    console.log("count: ", snapshot.data().count);
    return snapshot.data().count;
  } catch (error) {
    return error as FirestoreError;
  }
};

export const GetAllData = async (collections: string) => {
  try {
    const docRef = await getDocs(collection(db, collections));
    return docRef;
  } catch (error) {
    return error;
  }
};

export const UpdateSingleDoc = async (
  collection: string,
  id: string,
  body: { name?: string; category: string },
) => {
  try {
    const docRef = doc(db, collection, id);
    const docSnap = await updateDoc(docRef, body);

    return docSnap;
  } catch (error) {
    return error;
  }
};

export const DeleteSingleData = async (collection: string, id: string) => {
  try {
    await deleteDoc(doc(db, collection, id));
  } catch (error) {
    return error;
  }
};

export const AddSingleDoc = async <T extends WithFieldValue<DocumentData>>(
  collections: string,
  body: { name: string } | T,
) => {
  try {
    const docRef = await addDoc(collection(db, collections), body);
    await updateDoc(doc(db, collections, docRef.id), {
      id: docRef.id,
    });
    return docRef.id;
  } catch (error) {
    return error;
  }
};
