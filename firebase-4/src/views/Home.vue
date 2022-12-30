<script setup>
import {userStore} from '@/store/user.js'
import { storeToRefs } from 'pinia';
import { useDataBase } from '@/store/dataBase';
const user = userStore();
const {userData} = storeToRefs(user);
const dataBaseEstore = useDataBase()
const {getUrls,documents} = dataBaseEstore
const {loadingDocuments} = storeToRefs(dataBaseEstore)


getUrls()
</script>

<template>
    <section>
        <h1>Home</h1>
        <p>Welcome {{userData?.email}} </p>
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
            </li>
        </ul>
    </section>
</template>