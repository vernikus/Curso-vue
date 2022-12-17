<script setup>
import {RouterLink,RouterView} from 'vue-router'
</script>

<template>
  <main>
    <nav class="text-center">
      <h1>App Firebase </h1>
      <RouterLink class="btn btn-outline-primary me-2" to='/'>Home</RouterLink>
      <RouterLink class="btn btn-outline-primary me-2" to='/register'>Register</RouterLink>
      <RouterLink class="btn btn-outline-primary me-2" to='/login'>Login</RouterLink>
      <button class="btn btn-outline-success">Logout</button>
    </nav> 
    <section>
      <router-view class="text-center"></router-view>
    </section>
  </main>
</template>