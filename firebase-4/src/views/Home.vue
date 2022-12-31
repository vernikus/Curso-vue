<script setup>
import {userStore} from '@/store/user.js'
import { storeToRefs } from 'pinia';
import { useDataBase } from '@/store/dataBase';
import { ref } from 'vue';

const user = userStore();
const {userData} = storeToRefs(user);
const dataBaseEstore = useDataBase()
const {getUrls,addUrl,deleteUrl} = dataBaseEstore
const {loadingDocuments,documents} = storeToRefs(dataBaseEstore)

const url = ref('')
const handelSubmit = () =>{
    //validacion de la ur.
    addUrl(url.value)
}


getUrls()
</script>

<template>
    <section>
        <h1>Home</h1>
        <p>Welcome {{userData?.email}} </p>
        <form @submit.prevent="handelSubmit">
            <input type="text" v-model="url" placeholder="https://example.com">
            <button type="submit">Add</button>
        </form>
        <div v-if="loadingDocuments" class="d-flex justify-content-center mt-5" > <!--Pintamos un spinner hasta que la peticion se cargue-->
            <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <ul v-else>
            <li v-for="item of documents" :key="item.id">
                {{ item.name }} <br>
                {{ item.short }}
                {{ item.id }} <br>
                <button @click="deleteUrl(item.id)">Deleted</button>
            </li>
        </ul>
    </section>
</template>