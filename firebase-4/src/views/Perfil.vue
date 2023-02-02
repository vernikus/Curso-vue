<script setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { userStore } from '../store/user';
import {updateImage} from '../store/updateImg'
const {loadinUser,userData,updateUser} = userStore()

const onFinished =  async () =>{
  const error = await updateUser(userData.displayName)

  if(fileList.value[0]){
    await updateImage(fileList.value[0])
  }

  if(!error){
    message.success('Your user name was update')
    // console.log(userData)
  }else{
      message.error('An error ocurred')
    }
}
const fileList = ref([])
const beforeUpload = (file) =>{
  fileList.value = [...fileList.value,file]
  return false
}

const handleRemove = file => {
  const index = fileList.value.indexOf(file);
  const newFileList = fileList.value.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;
};

const handleChange = (info) =>{

  if(info.file.status !== 'uploading'){
    const isJpgOrPng = info.file.type === 'image/jpeg' || info.file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG or PNG file!');
        handleRemove(info.file)
        return
      }
      const isLt2M = info.file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
        handleRemove(info.file)
        return
      }
  }

  let reFileList = [...info.fileList]
  reFileList = reFileList.slice(-1)

  reFileList = reFileList.map(file =>{
    if(file.response){
      file.url = file.response.url
    }
    return file
  })
  fileList.value = reFileList
}
</script>

<template>
  <a-row type="flex"  justify="center" >
    <a-space direction="vertical">
      <h1 style="text-align:center">Perfil de {{ userData.displayName }}</h1>
      <a-avatar 
      :src="userData.photoURL"
      :size="200"
      ></a-avatar>
    </a-space>
  </a-row>
    <a-row>
      <a-col span="12" offset="6">
        <a-form
          name="basicPerfil"
          layout="vertical"
          autocomplete="off"
          :model="userData"
          @finish="onFinished"
        >
          <a-form-item
            name="email"
            label="Email"
            :rules="[
              {
                required: true,
                whitespace: true,
                type: 'email',
                message: 'Please enter your email',
              },
            ]"
          >
            <a-input disabled v-model:value="userData.email"></a-input>
          </a-form-item>
          <a-form-item
            name="displayName"
            label="Nick name"
            :rules="[
              {
                required: true,
                whitespace: true,
                message: 'Please enter your nick name',
              },
            ]"
          >
            <a-input v-model:value="userData.displayName"></a-input>
          </a-form-item>
          <a-upload
          v-model:fileList="fileList"
          :beforeUpload="beforeUpload"
          listType="picture"
          @change="handleChange"
          >
            <a-button
            type="primary"
            >Select image</a-button>
          </a-upload>
          <a-form-item>
            <a-button 
            type="primary" 
            htmlType="submit" 
            :disabled="loadinUser"
            :loading="loadinUser"
              >Change information</a-button
            >
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
</template>