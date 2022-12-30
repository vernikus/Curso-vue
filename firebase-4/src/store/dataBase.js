import { ref } from "vue";
import { defineStore , createPinia} from "pinia";
// importaciones para poder traer la base de datos
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { db,auth } from "../firebaseConfig";
import storeReset from "./resetStore.js";

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
  return {
    documents,
    getUrls,
    loadingDocuments
  };
});
const store = createPinia();
store.use(storeReset); 