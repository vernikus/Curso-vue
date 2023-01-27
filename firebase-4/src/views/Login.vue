<script setup>
import { ref, reactive } from "vue";
import { userStore } from "../store/user";
import { storeToRefs } from "pinia";
import { message } from "ant-design-vue"; 

const email = ref("");
const password = ref("");
const user = userStore();
const { loginUser } = user;
const { loadinUser } = storeToRefs(user);
const formState = reactive({
  email: "jonathan@test.com",
  password: "123456",
});

const onFinished = async (values) => {
  console.log("succes:", values);
  const possibleMistake = await loginUser(formState.email, formState.password);
  if (!possibleMistake) {
    return message.success(`Welcome ${formState.email}`);
  }

  switch (possibleMistake) {
    case "auth/user-not-found":
      message.error("Acount does no exist");
      break;
    case "auth/wrong-password":
      message.error("Password does no exist");
      break;
    default:
      message.error("Wrong account or password ");
  }
};
const onFinishedFailed = (errorInfo) => {
  console.log("failed:", errorInfo);
};
</script>

<template>
  <section>
    <a-row>
      <a-col span="12" offset="6">
        <a-form
          name="login"
          layout="vertical"
          autocomplete="off"
          :model="formState"
          @finish="onFinished"
          @finishFailed="onFinishedFailed"
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
            <a-input v-model:value="formState.email"></a-input>
          </a-form-item>
          <a-form-item
            name="password"
            label="Password"
            :rules="[
              {
                required: true,
                whitespace: true,
                min: 6,
                message: 'Please enter your password',
              },
            ]"
          >
            <a-input-password
              v-model:value="formState.password"
            ></a-input-password>
          </a-form-item>
          <a-form-item>
            <a-button 
            type="primary" 
            htmlType="submit" 
            :disabled="loadinUser"
            :loading="loadinUser"
              >Acces</a-button
            >
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </section>
</template>