import { ref } from "vue";
import { defineStore, createPinia } from "pinia";
// importaciones para poder traer la base de datos
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore/lite";
import { db, auth } from "../firebaseConfig";
import storeReset from "./resetStore.js";
import { nanoid } from "nanoid";
import router from "../router/main";

export const useDataBase = defineStore("dataBase", () => {
  const documents = ref([]);
  const loadingDocuments = ref(false);
  const getUrls = async () => {
    if (documents.value.length !== 0) {
      return;
    }
    loadingDocuments.value = true;
    try {
      const q = query(
        collection(db, "urls"),
        where("user", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        documents.value.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    } catch (err) {
      console.log(err);
    } finally {
      loadingDocuments.value = false;
    }
  };
  const addUrl = async (name) => {
    try {
      const objectDoc = {
        name: name,
        short: nanoid(6),
        user: auth.currentUser.uid,
      };
      await setDoc(doc(db, "urls",objectDoc.short), objectDoc);
      documents.value.push({
        ...objectDoc,
        id: objectDoc.short,
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  const deleteUrl = async (id) => {
    try {
      const docRef = doc(db, "urls", id);
      const docSnap = await getDoc(docRef);
      await deleteDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error("No exist docSnap");
      } else if (docSnap.data().user !== auth.currentUser.uid) {
        throw new Error("No exist doc");
      }
      documents.value = documents.value.filter((item) => item.id !== id);
      console.log(documents.value);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  const readUrl = async (id) => {
    try {
      const docRef = doc(db, "urls", id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error("No exist docSnap");
      } else if (docSnap.data().user !== auth.currentUser.uid) {
        throw new Error("No exist doc");
      }
      return docSnap.data().name;
    } catch (error) {
      console.log(error);
    }
  };
  const updateUrl = async (id, name) => {
    try {
      const docRef = doc(db, "urls", id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error("No exist docSnap");
      } else if (docSnap.data().user !== auth.currentUser.uid) {
        throw new Error("No exist doc");
      }
      await updateDoc(docRef, {
        name: name,
      });
      documents.value = documents.value.map((item) =>
        item.id === id ? { ...item, name: name } : item
      );
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  const getURL = async (id) =>{
    try {
      const docRef = doc(db, "urls", id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return false
      }

      return docSnap.data().name;
    } catch (error) {
      console.log(error);
    }
  }
  return {
    documents,
    getUrls,
    loadingDocuments,
    addUrl,
    deleteUrl,
    readUrl,
    updateUrl,
    getURL,
  };
});
const store = createPinia();
store.use(storeReset);
