import { ref } from "vue";
import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "../firebaseConfig.js";
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

      userData.value = {
        email: user.email,
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL
      }
      
      await setDoc(userRef,userData.value)

     
    }catch(err){
      console.log(err)
    }
  }
  const loginUser = async (email, password) => {
    try {
      loadinUser.value = true;
      const {user} = await signInWithEmailAndPassword(auth, email, password);
      await setUser(user)
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
      router.push("/login");    
      await signOut(auth);
    } catch (err) {
      console.log(err);
    } finally {
      dataBaseStore.$reset();
    }
  };
  const currentUser = () => {
    return new Promise((res, rej) => {
      const unsuscribe = onAuthStateChanged(
        auth,
        async (user) => {
          if (user) {
            // await setUser(user)
            userData.value = {
              email: user.email,
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL
            };
          } else {
            userData.value = null;
            const dataBaseStore = useDataBase();
            dataBaseStore.$reset();
          };
          res(user);
        },
        (e) => rej(e)
      );
      unsuscribe();
    });
  };
  const updateUser = async (displayName) =>{
    try {
      await updateProfile(auth.currentUser,{
        displayName,
      })
      setUser(auth.currentUser)
    } catch (error) {
      console.log(error)
      return error.code
    }
  }
  return {
    loadinUser,
    userData,
    loader,
    registerUser,
    loginUser,
    logOutUser,
    currentUser,
    updateUser,
    setUser
  };
});
