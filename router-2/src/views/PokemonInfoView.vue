<script setup>
// import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'; 
// import {ref} from 'vue'
import {useGetData} from '@/composables/getData.js'
const route = useRoute()// se importa useRoute el cual es que tiene acceso a los parametros
const router = useRouter() // se importa useRouter el cual tiene un metodo push, el que nos puede hacer regresar a una url 

// const pokemon = ref({})

// const getData = async () =>{
//     try {
//         const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${route.params.name}`)
//         pokemon.value = data //igualamos la data a una constante para que se pueda usar en el template
//     } catch (error) {
//         console.log(error)
//         pokemon.value = null //pasamos a null pokemon ya que no se encuentra
//     }
// }
const {data,getData,errorData,loading,} = useGetData()
getData(`https://pokeapi.co/api/v2/pokemon/${route.params.name}`)

const back = () =>{
    router.push('/pokemons')
}


</script>

<template>
    <main>
        <section>
            <p v-if="loading">Loading information ....</p>
            <div class="alert alert-danger" v-if="errorData">{{errorData}}</div>
            <div v-if="data">
                <h1>Name: {{$route.params.name}}</h1> <!--Accedemos al objeto completo de route, ingresamos a los parametros y llamamos a la variable que creamos en el router en este caso 'name'-->
                <img :src="data.sprites?.front_default" alt=""> <!--pintamos la imagen con, pokemon = data-->
            </div>
            <h2 v-else>No existe el pokemon</h2>
            <button @click="back" class="btn btn-outline-primary">Regresar</button>
        </section>
    </main>
</template>