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
        <RouterLink class="btn btn-outline-primary " to="/">Home</RouterLink>
        <RouterLink class="btn btn-outline-primary " to="/pokemons">Poke Api</RouterLink>
      </div>
    </div>
  </nav>
  <div class="container"> <!--En boostrap container se unsa para dar un espaciado-->
    <RouterView />

  </div>
  <!--Lo unico que cambia en el template es el RouterView ya que es lo unico dinamico -->
</template>

