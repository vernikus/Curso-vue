import {ref} from 'vue'
import {defineStore} from 'pinia'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {auth} from '../firebaseConfig.js'
import router from '../router/main'


export const userStore = defineStore('counter',()=>{

    const userData = ref(null);
    const loadinUser = ref(false); //Creamo un loader para poder deshabilitar los botones
    // Registramos a un usuario con correo y contraseña
    const  registerUser = async (email,password) => {
        try{
            loadinUser.value= true
            //Se desctructura el usuario que tra la peticion 
            const { user} = await createUserWithEmailAndPassword(auth,email,password);
            // console.log(user)
            userData.value = {email : user.email, uid: user.uid}
            // console.log(userData)
            router.push('/') //Para mayorr comodidad forzamos las rutas en pinia
        }catch(err){
            console.log(err)
        }finally{
            loadinUser.value= false
        }
    };
    //Iniciamos sesion con una correo y contraseña
    const loginUser = async(email,password) =>{
        try{
            loadinUser.value= true
            const {user} = await signInWithEmailAndPassword(auth,email,password)
            router.push('/')
        }catch(err) {
            console.log(err)
        }finally{
            loadinUser.value = false
        }
    }
    //Cerramos sesion
    const logOutUser = async () =>{
        try {
            await signOut(auth)
            router.push('/login')
            userData.value = null
        } catch (err) {
            console.log(err)
        }
    }
    return{
        loadinUser,
        userData,
        registerUser,
        loginUser,
        logOutUser
    };
});     