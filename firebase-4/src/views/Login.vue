<script setup>
import { ref } from 'vue';
import {userStore} from '../store/user'
import { storeToRefs } from 'pinia';

const email = ref('')
const password = ref('')
const user = userStore()
const {loginUser} = user
const {loadinUser} = storeToRefs(user)
const handelSubmit = async () =>{
    if(!email.value || password.value.length < 5){
        return alert('please fill in the fields')
    }else{
        await loginUser(email.value,password.value)
    }
   
}

</script>

<template>
    <section>
        <h1>Login</h1>
        <form class="" @submit.prevent="handelSubmit">
            <input type="email" placeholder="Email" v-model.trim="email">
            <input type="password" placeholder="Password123" v-model.trim="password">
            <button type="submit" :disabled="loadinUser">Acces</button>
        </form>
    </section>
</template>