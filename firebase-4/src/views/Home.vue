<script setup>
import { userStore } from "@/store/user.js";
import { storeToRefs } from "pinia";
import { useDataBase } from "@/store/dataBase";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

const user = userStore();
const { userData } = storeToRefs(user);
const dataBaseEstore = useDataBase();
const { getUrls, addUrl, deleteUrl } = dataBaseEstore;
const { loadingDocuments, documents } = storeToRefs(dataBaseEstore);

// const url = ref('')
// const handelSubmit = () =>{
//     //validacion de la ur.
//     addUrl(url.value)
// }
const router = useRouter();
const confirm = async (id) => {
    await deleteUrl(id)
    message.success('It was deleted successfully')

}
const cancel =  () => {
    message.error('It was not deleted')
}
getUrls();

// console.log(getUrls())
</script>

<template>
  <section>
    <h1>Home</h1>
    <p>Welcome {{ userData?.email }}</p>
    <add-form />
    <!-- <form @submit.prevent="handelSubmit">
            <input type="text" v-model="url" placeholder="https://example.com">
            <button type="submit">Add</button>
        </form> -->
    <a-row v-if="loadingDocuments" type="flex" justify="center">
      <!--Pintamos un spinner hasta que la peticion se cargue-->
      <a-space>
        <div>
          <a-spin />
        </div>
        <p>Loading ...</p>
      </a-space>
    </a-row>
    <a-space v-else direction="vertical" style="width: 100%">
      <a-card v-for="item of documents" :key="item.id" :title="item.short">
        <template #extra>
          <a-space>
            <a-popconfirm
            title="Are you sure delete this element?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="confirm(item.id)"
            @cancel="cancel"
            >
                <a-button type="danger"
                  >Deleted</a-button
                >
            </a-popconfirm>
            <a-button type="primary" @click="router.push(`/edit/${item.id}`)"
              >Edit</a-button
            >
          </a-space>
        </template>
        <p>{{ item.name }}</p>
      </a-card>
    </a-space>

    <!-- <ul>
      <li v-for="item of documents" :key="item.id">
        {{ item.name }} <br />
        {{ item.short }}
        {{ item.id }} <br />
        <button @click="deleteUrl(item.id)">Deleted</button>
        <button @click="router.push(`/edit/${item.id}`)">Edit</button>
      </li>
    </ul> -->
  </section>
</template>