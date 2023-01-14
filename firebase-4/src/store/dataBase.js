import { ref } from "vue";
import { defineStore , createPinia} from "pinia";
// importaciones para poder traer la base de datos
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore/lite";
import { db,auth } from "../firebaseConfig";
import storeReset from "./resetStore.js";
import { nanoid } from "nanoid"; //importamos nanoid = libreria que genera un string aleatorio

export const useDataBase = defineStore("dataBase", () => {
  const documents = ref([]);
  const loadingDocuments = ref(false) //Creamos un loading para poner un spinner
  const getUrls = async () => {//Si el array esta vacio o ya tiene alguna informacion 
    // if(documents.value.length == !0){
    //   return;
    // } 
    loadingDocuments.value = true
    try {
      // La documentacion recomienda, incializar una variable 'q', la cual llama a 'querry', la cual tiene el parametro 'colecction' , el cual tiene dos parametros(db,'nombre de la data base')
      const q = query(collection(db, "urls"),where('user','==',auth.currentUser.uid));
      // Inicializamos getDocs, la cual recibe la query, la cual al hacer la peticion se tarda en traer los datos
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach(doc => {
        console.log(doc.id, doc.data())
        documents.value.push({
            id: doc.id,
            ...doc.data()
        })
      })
    } catch (err) {
      console.log(err);
    } finally {
      loadingDocuments.value = false
    }
  };
  //solicitud a la base da datos
  const addUrl = async (name) =>{
    try {
      const objectDoc ={
        name:name,
        short: nanoid(6), //generamos un string aleatorio con 6 caracteres,
        user : auth.currentUser.uid
      }
      // addDoc es el meotodo para agregar documentos a la base de datos addDoc(recibe el collection(db,'nombre de la coleccion en fireStore'),{objeto en cuestion})
      const getRef = await addDoc (collection(db,'urls'),objectDoc)
      documents.value.push({
        ...objectDoc,
        id: getRef.id
      })
    } catch (error) {
      console.log(error)
    }finally{

    }
  }
  const deleteUrl = async (id) =>{
    try {
      //doc se utiliza para obtener una referencia tiene 3 parametreo doc(db,'coellection de datos de fyrestore',id)
      const docRef =  doc(db,'urls',id);
      const docSnap = await getDoc(docRef)
      //eliminamos el archivo
      await deleteDoc(docRef)
      // Validacion para que solo se puedan borrar archivos creados por el mismo usuario
      if(!docSnap.exists()){
        throw new Error('No exist docSnap')
      }else if(docSnap.data().user !== auth.currentUser.uid){
        throw new Error('No exist doc')
      }
      //filramos el array de documentos para solo pintar los que se quedaton sin eliminar
      documents.value = documents.value.filter(item => item.id !== id)
      console.log(documents.value)
    } catch (error) {
      console.log(error)
    }finally{

    }
  }
  const readUrl = async (id) =>{
    try {
      const docRef = doc(db,'urls',id)
      const docSnap = await getDoc(docRef)
      
      if(!docSnap.exists()){
        throw new Error('No exist docSnap')
      }else 
      if(docSnap.data().user !== auth.currentUser.uid){
        throw new Error('No exist doc')
      }
      return docSnap.data().name
    } catch (error) {
      console.log(error)
    }
  }
  const updateUrl = async (id,name) =>{
    try {
      const docRef = doc(db,'urls',id)
      const docSnap = await getDoc(docRef)
      
      if(!docSnap.exists()){
        throw new Error('No exist docSnap')
      }else 
      if(docSnap.data().user !== auth.currentUser.uid){
        throw new Error('No exist doc')
      }
      await updateDoc(docRef,{
        name : name
      });
      documents.value = documents.value.map((item) => item.id === id ? ({...item, name: name}) : item)
    } catch (error) {
      console.log(error)
    }finally{

    }
  }
  return {
    documents,
    getUrls,
    loadingDocuments,
    addUrl,
    deleteUrl,
    readUrl,
    updateUrl
  };
});
const store = createPinia();
store.use(storeReset); 