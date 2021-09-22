<template>
    <div>
    <h1>Create Task</h1>
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
      <button type="submit" class="btn btn-secondary">Create</button>
    </form>
  </div>
</template>
<script>
import { createTask } from '../../services/TaskSevices'
import router from '@/router/index';

export default {
  setup() {
    const task = {
      title: '',
      body: '',
      dueDate:''
    }
    async function submit() {
      await createTask(task);
      router.push({ name: "allTasks" });
    }

    return { submit, task };
  },
};
</script>