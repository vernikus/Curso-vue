import { uploadBytes,ref, getDownloadURL } from "firebase/storage";
import {auth, storage } from "../firebaseConfig.js";
import { userStore } from "./user.js";
import { storeToRefs } from "pinia";
import { updateProfile } from "firebase/auth";

const user = userStore();
const { userData } = storeToRefs(user);


console.log(userData.value.uid)
export const updateImage = async(img) =>{
    try{  
      const storageRef = ref(storage,`profiles/${userData.value.uid}`)
      await uploadBytes(storageRef,img.originFileObj)
      const imgUrl = await getDownloadURL(storageRef)
      await updateProfile(auth.currentUser,{
        photoURL : imgUrl
      })
      user.setUser(auth.currentUser)
      console.log(userData.value)
    }catch(err){
      console.log(err)
    }
}

