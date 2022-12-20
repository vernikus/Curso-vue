<script setup>
import {userStore} from '@/store/user.js'
import { storeToRefs } from 'pinia';
const user = userStore();
const {userData} = storeToRefs(user);
</script>

<template>
    <section>
        <h1>Home</h1>
        <p v-if="userData">Welcome {{userData.email}} </p>
        <p v-else> Welcome no user</p>
    </section>
</template>