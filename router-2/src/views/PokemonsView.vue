<script setup>
// import axios from "axios";
// import { ref } from "vue";
import {RouterLink} from 'vue-router'
import {useGetData} from '@/composables/getData.js'

// const pokemons = ref("[]");

const {data,getData,loading,errorData} = useGetData()
// const getData = async () => {
//   try {
//     const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon"); //destructuramos data, se crea una constante, se tiene que tener invocar a la propiedad del objeto, es decir, el nombre especifico de la propiedad a la que se quiere acceder
//     // console.log(data);
//     // console.log(data.results);
//     pokemons.value = data.results //igualamos los pokemons al array
//   } catch (err) {
//     console.log(err);
//   }
// };
getData("https://pokeapi.co/api/v2/pokemon");

</script>

<template>
    <section>
      <h1>Pokemons</h1>
      <p v-if="loading">Loading information ....</p>
      <div class="alert alert-danger" v-if="errorData">{{errorData}}</div> <!--Asi es como se pueden pintar los errores, se manejan en el composable-->
      <div v-if="data">
        <ul>
          <li 
          v-for="pokemon in data.results"
          :key='pokemon.name'
          
          >
          <RouterLink :to="`/pokemons/${pokemon.name}`">{{pokemon.name}}</RouterLink> <!--Se convierten a rutas dinamicas todos los resultados conel RouterLink-->
          </li>
        </ul>
        <button :disabled="!data.previous" class="btn btn-warning me-2" @click="getData(data.previous)">Previus</button>
        <button :disabled="!data.next" class="btn btn-primary" @click="getData(data.next)">Next</button>
      </div>
    </section>
</template>