<script setup>
import {RouterLink,RouterView} from 'vue-router'
import { userStore } from './store/user'; 

const user = userStore()
const {logOutUser} = userStore()
</script>

<template>
  <nav class="text-center">
    <h1>App Firebase </h1>
    <RouterLink class="btn btn-outline-primary me-2" to='/'>Home</RouterLink>
    <RouterLink class="btn btn-outline-primary me-2" to='/register'>Register</RouterLink>
    <RouterLink class="btn btn-outline-primary me-2" to='/login'>Login</RouterLink>
    <button class="btn btn-outline-danger" @click="logOutUser">Logout</button> <!--Creamo el botton para salir de la sesion-->
  </nav> 
  <main>
      <router-view class="text-center"></router-view>
  </main>
</template>