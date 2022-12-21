<script setup>
import {RouterLink,RouterView} from 'vue-router'
import { userStore } from './store/user'; 
import { storeToRefs } from 'pinia';
const user = userStore()
const {logOutUser} = userStore()
const {userData,loader} = storeToRefs(user)
</script>

<template>
  <!-- Si el lodaer es verdadero se mostrara el nav y el router-view -->
  <nav class="text-center" v-if="loader">
    <h1>App Firebase </h1>
    <!-- Segun si la data existe o no, es decir si el usuario esta logeado o no , se le pintaran los diferentes bonotes -->
    <RouterLink class="btn btn-outline-primary me-2" to='/' v-if="userData">Home</RouterLink>
    <RouterLink class="btn btn-outline-primary me-2" to='/register' v-if="!userData">Register</RouterLink>
    <RouterLink class="btn btn-outline-primary me-2" to='/login' v-if="!userData">Login</RouterLink>
    <button class="btn btn-outline-danger" @click="logOutUser" v-if="userData">Logout</button> <!--Creamo el botton para salir de la sesion-->
  </nav>
  <div v-else class="d-flex justify-content-center mt-5" >
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <main v-if="loader">
    <router-view class="text-center"></router-view>
  </main>
</template>