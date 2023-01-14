<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useDataBase } from '../store/dataBase';

const route = useRoute();
const dataBase = useDataBase()
const {readUrl,updateUrl} = dataBase
const url = ref('')

const handelSubmit = () =>{
    updateUrl(route.params.id, url.value)
}

onMounted(async() =>{
    url.value = await readUrl(route.params.id)
})

</script>

<template>
    <section>
        <h1>Edit</h1>
        <form @submit.prevent="handelSubmit">
            <input type="text" placeholder="https://example.com" v-model="url">
            <button type="submit">Edit</button>
        </form>
    </section>
</template>