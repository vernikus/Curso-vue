import { ref } from "vue";
import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig.js";
import router from "../router/main";
import { useDataBase } from "./dataBase.js";
import { doc,getDoc, setDoc } from "firebase/firestore/lite";

export const userStore = defineStore("counter", () => {
  const userData = ref(null);
  const loadinUser = ref(false);
  const loader = ref(true);
  const registerUser = async (email, password) => {
    try {
      loadinUser.value = true;
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      userData.value = { email: user.email, uid: user.uid };
      router.push("/");
    } catch (err) {
      console.log(err.code);
      return err.code;
    } finally {
      loadinUser.value = false;
    }
  };
  const setUser = async (user) =>{
    try{
      const userRef = doc(db,'users',user.uid)
      const docSpan = await getDoc(userRef)
      if(docSpan.exists()){
        userData.value = {...docSpan.data()}
      }else{
        await setDoc(userRef,{
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        })
        userData.value = {
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        }
      }
    }catch(err){
      console.log(err)
    }
  }
  const loginUser = async (email, password) => {
    try {
      loadinUser.value = true;
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err) {
      console.log(err.code);
      return err.code;
    } finally {
      loadinUser.value = false;
    }
  };
  const logOutUser = async () => {
    const dataBaseStore = useDataBase();
    try {
      await signOut(auth);
      router.push("/login");
    } catch (err) {
      console.log(err);
    } finally {
      userData.value = null;
      dataBaseStore.$reset();
    }
  };
  const currentUser = () => {
    return new Promise((res, rej) => {
      const unsuscribe = onAuthStateChanged(
        auth,
        async (user) => {
          if (user) {
            await setUser(user)
          } else {
            userData.value = null;
            const dataBaseStore = useDataBase();
            dataBaseStore.$reset();
          }
          res(user);
        },
        (e) => rej(e)
      );
      unsuscribe();
    });
  };
  return {
    loadinUser,
    userData,
    loader,
    registerUser,
    loginUser,
    logOutUser,
    currentUser,
  };
});
