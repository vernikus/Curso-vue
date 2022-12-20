<script setup>
import { ref } from 'vue';
import {userStore} from '../store/user'
// import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia';
const email = ref('')
const password = ref('')
const user = userStore()
const {registerUser} = user
const {loadinUser} = storeToRefs(user)
// const router = useRouter()

// Se hace una pequeña validacion 
const handelSubmit = async () =>{
    if(!email.value || password.value.length < 5){
        return alert('please fill in the fields')
    }else{
        await registerUser(email.value,password.value)
        // router.push('/')  //Forzamos la ruta al terminar la peticion
        console.log('processing infotmation')
    }
   
}

</script>

<template>
    <section>
        <h1>Register</h1>
        <!-- quitamos el evento por defecto de submit -->
        <form class="" @submit.prevent="handelSubmit">
            <input type="email" placeholder="Email" v-model="email">
            <input type="password" placeholder="Password123" v-model="password">
            <button type="submit" :disabled="loadinUser">Create a user</button> <!--Bloqueamo el botton-->
        </form>
    </section>
</template>