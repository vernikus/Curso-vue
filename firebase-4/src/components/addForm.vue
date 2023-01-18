<script setup>
import { message } from "ant-design-vue";
import { reactive } from "vue";
import { useDataBase } from "../store/dataBase";
const formState = reactive({
  url: "",
});
const dataBase = useDataBase()
const {addUrl} = dataBase
const onFinish = async (value) => {
  await addUrl(formState.url)
  formState.url = ''
  message.success('Url add successfuly')
};
</script>

<template>
  <a-form
    name="form"
    autocomplete="off"
    layout="vertical"
    :model="formState"
    @finish="onFinish"
  >
    <a-form-item
      name="url"
      label="Add a url"
      :rules="[
        {
          required: true,
          whitespace: true,
          pattern: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
          message: 'Add a valid url',
        },
      ]"
    >
    <a-input v-model:value="formState.url"></a-input>
    </a-form-item>
    <a-form-item>
        <a-button
        type="primary"
        htmlType="submit"
        >
        Submit
    </a-button>
    </a-form-item>
  </a-form>
</template>