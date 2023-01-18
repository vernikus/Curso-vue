import {ref} from 'vue'
import {defineStore} from 'pinia'
// Importaciones de auth
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {auth} from '../firebaseConfig.js'
import router from '../router/main'
import { useDataBase } from './dataBase.js' //Para poder resetear una store en otro store, se tiene que importar store1 en store2


export const userStore = defineStore('counter',()=>{

    const userData = ref(null);
    const loadinUser = ref(false); //Creamo un loader para poder deshabilitar los botones
    const loader = ref(true)   // Loader para cuando cargue los datos
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
            console.log(err.code)
            return err.code
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
            console.log(err.code)
            return err.code
        }finally{
            loadinUser.value = false
        }
    }
    //Cerramos sesion
    const logOutUser = async () =>{
        const dataBaseStore = useDataBase() //Inicializamos store1
        // console.log(dataBaseStore.documents)
        
        // console.log(dataBaseStore.documents)
        try {
            await signOut(auth)
            router.push('/login')
        } catch (err) {
            console.log(err)
        }finally{
            userData.value = null
            dataBaseStore.$reset() //reseteamos la store1
        }
    }
    //
    const currentUser = () =>{
        // Retornamos una promesa para que despues se pueda manejar con async await
        return new Promise((res,rej) =>{
            // En la documentacion se aconseja que onAuthStateChanged sea inicializado con una variable unsuscribe
            const unsuscribe = onAuthStateChanged(auth,(user) =>{
                if(user){
                    userData.value = {email: user.email, uid : user.uid}
                }else{
                    userData.value = null
                    const dataBaseStore = useDataBase()     
                    dataBaseStore.$reset() 
                }
                res(user)
            }, (e) => rej(e))
            // Llamamos a la funcion
            unsuscribe()
        })
    }
    return{
        loadinUser,
        userData,
        loader,
        registerUser,
        loginUser,
        logOutUser,
        currentUser
    };
});     