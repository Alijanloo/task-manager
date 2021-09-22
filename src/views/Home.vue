<template>
  <div class="custom-home">
    <div class="p-2 custom-bg-dark rounded-3 col-md-6">
        <div class="container py-2">
          <h1 class="display-6 fw-normal">MEVN Stack Task Manager</h1>
          <p class="fs-5">This is a simple task manager application, built with MongoDB, ExpresJS, VueJS and NodeJS technologies.</p>
          <hr>
          <router-link class="btn btn-outline-success" to="/tasks">View Tasks</router-link>
        </div>
      </div>
  </div>
</template>

<script>
// import Http from '../services/HttpServices'
export default {
  name: 'Home',
  // beforeCreate: function() {
  //   Http().get(this.$store.state.apiUrl + '/task')
  //   // .then(res => res.json())
  //   .then(res => console.log(res))
  // }
}
</script>
