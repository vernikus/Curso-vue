<script setup>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { useDataBase } from "../store/dataBase";
import { message } from "ant-design-vue";

const route = useRoute();
const dataBase = useDataBase();
const { readUrl, updateUrl } = dataBase;

// const handelSubmit = () =>{
//     updateUrl(route.params.id, url.value)
// }

const formState = reactive({
    url: "",
});
const onFinish = async (value) => {
    await updateUrl(route.params.id, formState.url);
    formState.url = "";
    message.success("Url edited successfuly");
};
onMounted(async () => {
    formState.url = await readUrl(route.params.id);
});
</script>

<template>
  <!-- <section>
        <h1>Edit</h1>
        <form @submit.prevent="handelSubmit">
            <input type="text" placeholder="https://example.com" v-model="url">
            <button type="submit">Edit</button>
        </form>
    </section> -->
    <h1>Edit: {{ route.params.id }}</h1>
    <a-form
    name="editForm"
    autocomplete="off"
    layout="vertical"
    :model="formState"
    @finish="onFinish"
    >
        <!-- el name tiene que ser igual al valor de v-model -->
        <a-form-item
        name="url"
        label="Edit url"
        :rules="[{
        required: true,
        whitespace: true,
        pattern: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
        //  message: 'Add a valid url',
        }]"
        >
            <a-input v-model:value="formState.url"></a-input>
        </a-form-item>
        <a-form-item>
            <a-button type="primary" htmlType="submit"> Edit </a-button>
        </a-form-item>
    </a-form>
</template>