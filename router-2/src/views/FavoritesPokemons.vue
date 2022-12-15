<script setup>
import { useFavoritesPokemons } from "@/store/favorites.js";
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";
const useFavorites = useFavoritesPokemons();
const { favorites } = storeToRefs(useFavorites);
const {deleted} = useFavorites
</script>

<template>
  <section>
    <h1>Favorites pokemon</h1>
    <div>
      <h1 v-if="favorites.length == 0">You not have favorites pokemons</h1>
      <ul class="list-group" v-else>
        <li class="list-group-item  " v-for="poke in favorites" :key="poke.id">
          <div class="d-flex justify-content-between">
            <p>{{ poke.name }}</p>
            <div>
                <button class="btn btn-outline-danger me-2" @click="deleted(poke.id)">Delete</button>
                <RouterLink class="btn btn-outline-success" :to="`/pokemons/${poke.name}`">More information</RouterLink>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>