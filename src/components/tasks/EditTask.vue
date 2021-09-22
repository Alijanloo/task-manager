<template>
    <div>
    <h1>Edit Task</h1>
    <form class="custom-form" @submit.prevent="submit">
      <div class="mb-3">
        <label for="title" class="form-label">Title:</label>
        <input
          type="text"
          class="form-control"
          id="title"
          placeholder="Title..."
          v-model="task.title"
        />
      </div>
      <div class="mb-3">
        <label for="body" class="form-label">Body:</label>
        <textarea v-model="task.body" class="form-control" id="body" rows="10" placeholder="Body..."></textarea>
      </div>
      <div class="mb-3">
        <label for="due-date" class="form-label">Due Date:</label>
        <input
          type="date"
          class="form-control"
          id="due-date"
          placeholder="Due date..."
          v-model="task.dueDate"
        />
      </div>
      <hr />
      <button type="submit" class="btn btn-secondary">Save changes</button>
    </form>
  </div>
</template>
<script>
import { updateTask, getTaskById } from '../../services/TaskSevices'
import router from '@/router/index';
import { onBeforeMount, ref } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import moment from 'moment';

export default {
  setup() {
    let task = ref({
      title: '',
      body: '',
      dueDate:''
    });
    async function submit() {
      await updateTask(task.value);
      router.push({ name: "allTasks" });
    }
    onBeforeMount(() => {
        getTaskById(useRoute().params.id)
        .then(res => {
            const result = res.data.task;
            task.value = result;
            task.value.dueDate = moment(result.dueDate).format('yyyy-MM-DD');
        })
    })
    return { submit, task };
  }
};
</script>