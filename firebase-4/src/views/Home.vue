<script setup>
import {userStore} from '@/store/user.js'
const user = userStore();
const {userData} = user;
</script>

<template>
    <section>
        <h1>Home</h1>
        <p>Welcome {{userData}}</p>
    </section>
</template>