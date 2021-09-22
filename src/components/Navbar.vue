<template>
  <nav class="navbar navbar-expand-lg navbar-dark custom-bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img alt="Vue logo" src="../assets/logo.png" />
        Task Manager
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li v-if="this.$store.state.isLoggedIn" class="nav-item">
            <router-link class="nav-link" to="/tasks">Tasks</router-link>
          </li>
          <li v-if="!this.$store.state.isLoggedIn" class="nav-item">
            <router-link class="nav-link" to="/register">Register</router-link>
          </li>
          <li v-if="!this.$store.state.isLoggedIn" class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li v-if="this.$store.state.isLoggedIn" class="nav-item">
            <a @click.prevent="logOut" class="nav-link">Logout</a>
          </li>
          <li class="nav-item">
            <a class="nav-link">{{
              this.$store.state.isLoggedIn ? this.$store.state.username : 'User'
            }}</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import * as auth from '../services/AuthService'
export default {
  name: 'navbar',
  methods: {
    logOut: function() {
      auth.logout();
      this.$router.push({name: 'home'});
    }
  }
};
</script>

<style>
</style>