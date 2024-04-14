<template>
<!-- Add Task Dialog -->
<div
  class="modal"
  tabindex="-1"
  role="dialog"
  :class="{ show: isAddDialogOpen }"
>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Add Task</h5>
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          @click="closeAddDialog"
        ></button>
      </div>

      <div class="modal-body">
        <div class="mb-3">
          <v-text-field label="Password" type="input">password</v-text-field>
          <v-text-field label="taskTitle">Title</v-text-field>
          <label for="taskTitle" class="form-label">Title:</label>
          <input
            type="text"
            class="form-control"
            id="taskTitle"
            v-model="newTask.title"
          />
        </div>

        <div class="mb-3">
          <label for="taskDescription" class="form-label">Description:</label>
          <textarea
            class="form-control"
            id="taskDescription"
            v-model="newTask.description"
          ></textarea>
        </div>
        <div class="mb-3">
          <label for="taskDeadline" class="form-label">Deadline:</label>
          <input
            type="date"
            class="form-control"
            id="taskDeadline"
            v-model="newTask.deadline"
          />
        </div>
        <div class="mb-3">
          <label class="form-check-label">Priority:</label><br />
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              id="priorityHigh"
              value="High"
              v-model="newTask.priority"
            />
            <label class="form-check-label" for="priorityHigh">High</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              id="priorityMedium"
              value="Medium"
              v-model="newTask.priority"
            />
            <label class="form-check-label" for="priorityMedium"
              >Medium</label
            >
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              id="priorityLow"
              value="Low"
              v-model="newTask.priority"
            />
            <label class="form-check-label" for="priorityLow">Low</label>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="addTask">
          <i class="bi bi-plus"></i> Add
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          @click="closeAddDialog"
        >
          <i class="bi bi-x"></i> Cancel
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
//import { VCard, VCardText, VCardTitle} from 'vuetify/components/VCard';
//import { VTextField } from 'vuetify/lib'
//import { VTextField } from 'vuetify/components';

// Define ref for isAddDialogOpen
const isAddDialogOpen = ref(true);

// Define a reactive object for the new task
const newTask = ref({
title: '',
description: '',
deadline: '',
priority: '',
});

// Method to close the add task dialog
const closeAddDialog = () => {
isAddDialogOpen.value = false;
};

// Method to add a new task
const addTask = () => {
// Emit 'add-task' event with the new task data
if (newTask.value.title.trim() !== '') {
  $emit('add-task', {
    title: newTask.value.title,
    description: newTask.value.description,
    deadline: newTask.value.deadline,
    priority: newTask.value.priority,
  });
  // Clear the new task data
  /*newTask.value = {
    title: '',
    description: '',
    deadline: '',
    priority: '',
  };*/
  // Close the dialog
  closeAddDialog();
} else {
  alert('Please enter a title for the task.');
}
};
</script>
