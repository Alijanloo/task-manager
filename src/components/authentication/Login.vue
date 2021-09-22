<template>
  <div>
    <h1>Login route</h1>
    <form class="custom-form" @submit.prevent="submit">
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
      <button type="submit" class="btn btn-secondary">Submit</button>
    </form>
  </div>
</template>
<script>
import * as auth from "../../services/AuthService";
import router from '@/router/index';

export default {
  setup() {
    const user = {
      username: '',
      password: ''
    }
    async function submit() {
      await auth.login(user);
      router.push({ name: "home" });
    }

    return { submit, user };
  },
};
</script>