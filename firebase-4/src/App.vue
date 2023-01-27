<script setup>
import { RouterLink, RouterView, useRoute } from "vue-router";
import { userStore } from "./store/user";
import { storeToRefs } from "pinia";
import { ref,watch} from 'vue'
const user = userStore();
const { logOutUser } = userStore();
const { userData, loader } = storeToRefs(user);
const route = useRoute()
const selectedKeys = ref([])


watch(() => route.name, () => {
  selectedKeys.value = [route.name]
})
</script>

<template>
  <a-layout>
    <a-layout-header v-if="loader"> 
      <a-menu v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal" 
        :style="{ lineHeight: '64px' }">
        <a-menu-item v-if="userData" key="home">
          <RouterLink type="primary" to="/" >Home</RouterLink>
        </a-menu-item>
        <a-menu-item  v-if="!userData" key="register">
          <RouterLink type="primary" to="/register">Register</RouterLink>
        </a-menu-item>
        <a-menu-item v-if="!userData" key="login">
          <RouterLink type="primary" to="/login" >Login</RouterLink>
        </a-menu-item>
        <a-menu-item v-if="userData" key="perfil">
          <RouterLink type="primary" to="/perfil" >Perfil</RouterLink>
        </a-menu-item>
        <a-menu-item type="danger" @click="logOutUser" v-if="userData" key="logout">Logout</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content v-else  style="padding: 0 50px">
      <div class="example" style="text-aling:center">
        <a-spin />
      </div>
    </a-layout-content>
    
    <a-layout-content v-if="loader"   style="padding: 0 50px" >
      <router-view :style="{ background: '#fff', padding: '24px', minHeight: '280px' }"></router-view>
    </a-layout-content>

  </a-layout>
</template>