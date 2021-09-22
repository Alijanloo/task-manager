<template>
  <div>
    <h2>Register route</h2>
    <form class="custom-form" @submit.prevent="onSubmit">
      <div class="mb-3">
        <label for="first" class="form-label">First Name:</label>
        <input
          type="text"
          class="form-control"
          id="first"
          placeholder="first name..."
          v-model="user.first"
        />
      </div>
      <div class="mb-3">
        <label for="last" class="form-label">Last Name:</label>
        <input
          type="text"
          class="form-control"
          id="last"
          placeholder="last name..."
          v-model="user.last"
        />
      </div>
      <div class="mb-3">
        <label for="username" class="form-label">Username:</label>
        <input
          type="text"
          class="form-control"
          id="username"
          placeholder="username..."
          v-model="user.username"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password:</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="password..."
          v-model="user.password"
        />
      </div>
      <hr />
      <button type="submit" class="btn btn-secondary">Register</button>
    </form>
  </div>
</template>
<script>
import * as auth from "../../services/AuthService";
import router from "../../router/index";

export default {
  setup() {
    const user = {
      first: "",
      last: "",
      username: "",
      password: "",
    };
    async function onSubmit() {
      const promisRegister = auth.register(user);
      const promisLogin = auth.login(user);
      await Promise.all([promisRegister, promisLogin]);
      router.push({ name: "home" });
    }

    return {
      user,
      onSubmit,
    };
  },
};
</script>