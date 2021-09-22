<template>
  <div class="d-flex flex-column">
    <div class="mb-4">
      <h1>All Tasks</h1>
      <router-link to="/tasks/new" class="btn btn-outline-success ms-2 mt-2"
        >Create Task</router-link
      >
    </div>
    <div v-if="tasks && tasks.length > 0" class="d-flex row row-cols-md-3 g-3">
      <div v-for="task in tasks" :key="task._id">
        <div class="card text-white bg-dark h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <h5 class="card-title">{{ task.title }}</h5>
              <span
                :class="{ 'is-late': isLate(task.dueDate) && !task.completed }"
                class="small"
                >{{ filter(task.dueDate) }}</span
              >
            </div>
            <h6 class="card-subtitle text-muted mb-2">
              Created by {{ task.author.username }}
            </h6>
            <p class="card-text">{{ task.body }}</p>
            <div v-if="task.author._id === this.$store.state.userId">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="defaultCheck1"
                  v-model="task.completed"
                  :disabled="task.completed"
                  @click="markAsComplete(task)"
                />
                <label class="form-check-label" for="defaultCheck1">
                  Completed
                </label>
              </div>
              <div class="d-flex justify-content-between">
                <router-link
                  class="card-link btn btn-warning"
                  :to="{ name: 'editTask', params: { id: task._id } }"
                  >Edit</router-link
                >
                <button
                  @click.prevent="currentTaskId = task._id"
                  class="card-link btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-small">
      <div class="modal-content">
        <div class="modal-body text-black fs-3">
          Are you sure you want to delete thid task?
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click.prevent="currentTaskId = null"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-danger"
            data-bs-dismiss="modal"
            @click.prevent="deleteTaskFun"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="tasks && tasks.length === 0">
    <div class="alert alert-info" role="alert">No tasks found!</div>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
import * as TaskSevices from "../../services/TaskSevices";
import moment from "moment";

export default {
  setup() {
    const tasks = ref();
    const currentTaskId = ref();

    function isLate(date) {
      return moment(date).isBefore();
    }

    async function deleteTaskFun() {
      await TaskSevices.deleteTask(currentTaskId.value);
      TaskSevices.getAllTasks().then((res) => {
        tasks.value = res.data.tasks;
      });
      currentTaskId.value = null;
    }

    function markAsComplete(task) {
      task.completed = true;
      TaskSevices.updateTask(task);
    }

    function filter(date) {
      return moment(date).format("MM DD, YYYY");
    }

    return {
      tasks,
      currentTaskId,
      isLate,
      deleteTaskFun,
      markAsComplete,
      filter,
    };
  },
  beforeRouteEnter(to, from, next) {
    TaskSevices.getAllTasks().then((res) => {
      next((vm) => {
        vm.tasks = res.data.tasks;
      });
    });
  },
};
</script>