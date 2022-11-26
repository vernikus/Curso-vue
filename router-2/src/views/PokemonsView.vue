<script setup>
import axios from "axios";
import { ref } from "vue";
import {RouterLink} from 'vue-router'

const pokemons = ref("[]");

const getData = async () => {
  try {
    const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon"); //destructuramos data, se crea una constante, se tiene que tener invocar a la propiedad del objeto, es decir, el nombre especifico de la propiedad a la que se quiere acceder
    // console.log(data);
    // console.log(data.results);
    pokemons.value = data.results //igualamos los pokemons al array
  } catch (err) {
    console.log(err);
  }
};
getData();

</script>

<template>
  <main>
    <section>
      <h1>Pokemons</h1>
      <ul>
        <li 
        v-for="pokemon in pokemons"
        :key='pokemon.name'
        
        >
        <RouterLink :to="`/pokemons/${pokemon.name}`">{{pokemon.name}}</RouterLink> <!--Se convierten a rutas dinamicas todos los resultados conel RouterLink-->
        </li>
      </ul>
    </section>
  </main>
</template>