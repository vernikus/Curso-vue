<script setup>
import { RouterLink } from "vue-router";
import { useGetData } from "@/composables/getData.js";


const { data, getData, loading, errorData } = useGetData();

getData("https://pokeapi.co/api/v2/pokemon");
</script>

<template>
  <section>
    <h1>Pokemons</h1>
    <p v-if="loading">Loading information ....</p>
    <div class="alert alert-danger" v-if="errorData">{{ errorData }}</div>
    <div v-if="data">
      <ul class="list-group">
        <li
          class="list-group-item d-flex justify-content-center text-uppercase"
          v-for="pokemon in data.results"
          :key="pokemon.name"
        >
          <RouterLink class="btn btn-outline-primary w-25 " :to="`/pokemons/${pokemon.name}`">{{
            pokemon.name
          }}</RouterLink>
        </li>
      </ul>
      <div class="d-flex justify-content-between">
        <button
          :disabled="!data.previous"
          class="btn btn-primary mt-5 w-25 "
          @click="getData(data.previous)"
        >
          Previus
        </button>
        <button
          :disabled="!data.next"
          class="btn btn-primary mt-5 w-25"
          @click="getData(data.next)"
        >
          Next
        </button>
      </div>
    </div>
  </section>
</template>