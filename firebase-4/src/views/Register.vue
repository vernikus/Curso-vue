<script setup>
import { reactive, ref } from "vue";
import { userStore } from "../store/user";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { message } from "ant-design-vue";
const user = userStore();
const { registerUser } = user;
const { loadinUser } = storeToRefs(user);
const router = useRouter();

const formState = reactive({
  email: "fatima@test.com",
  password: "123456",
  repassword: "123456",
});

const onFinished = async (values) => {
  console.log("succes:", values);
  const possibleMistake = await registerUser(
    formState.email,
    formState.password
  );

  if (!possibleMistake) {
    router.push("/login");
    return message.success("Account created successfully");
  }

  switch (possibleMistake) {
    case "auth/email-already-in-use":
      message.error("This email already in use");
      break;
    case "auth/wrong-password":
      message.error("Invalid password");
      break;
    default:
      message.error("Wrong account or password ");
  }
};
const onFinishedFailed = (errorInfo) => {
  console.log("failed:", errorInfo);
};

const validatorPassword = async (_rule, value) => {
  if (value === "") {
    return Promise.reject("The field cannot be empty");
  }
  if (value !== formState.password) {
    return Promise.reject("Passwords do not match");
  }
  return Promise.resolve();
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
          <a-form-item
            name="repassword"
            label="Re-password"
            :rules="[{ validator: validatorPassword }]"
          >
            <a-input-password
              v-model:value="formState.repassword"
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