<script setup>
import { userStore } from '../store/user';
const {loadinUser,userData} = userStore()
const onFinished = (value) =>{
    
}

</script>

<template>
    <h1>Perfil de usuario</h1>
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
            <a-input v-model:value="userData.email"></a-input>
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