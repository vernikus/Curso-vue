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

const router = useRouter();
const confirm = async (id) => {
    await deleteUrl(id)
    message.success('It was deleted successfully')
}
const cancel =  () => {
    message.error('It was not deleted')
}

const copy = (id) =>{
  if(!navigator.clipboard){
    return message.error('Could not copy')
  }
  

  const path = `${window.location.origin}/${id}`
  navigator.clipboard.writeText(path)
    .then(() =>{
      message.success('Text copied to clipboard')
    })
    .catch(err =>{
      message.error('Coudl not copy',err)
    })
}
getUrls();
</script>

<template>
  <section>
    <h1>Home</h1>
    <p>Welcome {{ userData?.email }}</p>
    <add-form />
    <a-row v-if="loadingDocuments" type="flex" justify="center">
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
            <a-button type="primary" @click="copy(item.id)">Copy</a-button>
          </a-space>
        </template>
        <p>{{ item.name }}</p>
      </a-card>
    </a-space>
  </section>
</template>