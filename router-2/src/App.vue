<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <nav class="navbar bg-light">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">
        <img
          src="@/assets/logo.svg"
          alt="Logo"
          width="30"
          height="24"
          class="d-inline-block align-text-top"
        />
        PokeAPI con Vue
      </RouterLink>
      <div>
        <RouterLink class="btn btn-outline-primary me-2" to="/">Home</RouterLink>
        <RouterLink class="btn btn-outline-primary me-2" to="/pokemons">Poke Api</RouterLink>
        <RouterLink class="btn btn-outline-primary" to="/favorite">Favorites pokemons</RouterLink>
      </div>
    </div>
  </nav>
  <main class="container"> 
    <RouterView />
  </main>
</template>

