<script setup>
import { useRoute, useRouter } from 'vue-router'; 
import {useGetData} from '@/composables/getData.js';
import {useFavoritesPokemons} from '@/store/favorites.js'
const route = useRoute();
const router = useRouter(); 
const useFavorites = useFavoritesPokemons()

const {data,getData,errorData,loading,} = useGetData()
getData(`https://pokeapi.co/api/v2/pokemon/${route.params.name}`)

const back = () =>{
    router.push('/pokemons')
}

const {add,findPokemon} = useFavorites

</script>

<template>
        <section>
            <p v-if="loading">Loading information ....</p>
            <div class="alert alert-danger" v-if="errorData">{{errorData}}</div>
            <div v-if="data">
                <h1>Name: {{$route.params.name}}</h1> 
                <img :src="data.sprites?.front_default" alt=""> 
                <button class="btn btn-primary " @click="add(data)" :disabled="findPokemon(data.name)" >Add favorites pokemons</button>
            </div>
            <h2 v-else>No existe el pokemon</h2>
            <button @click="back" class="btn btn-outline-primary">Regresar</button>
        </section>
</template>