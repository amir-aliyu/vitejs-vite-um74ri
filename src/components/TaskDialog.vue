<template>
  <v-dialog v-model="isAddDialogVisible" max-width="500px">
    <v-card>
      <v-card-title v-show="isEditDialog">
        <span class="headline">Edit Task</span>
      </v-card-title>
      <v-card-title v-show="isAddDialog">
        <span class="headline">Add Task</span>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="addTask">
          <v-text-field
            v-model="newTask.title"
            label="Title"
            :rules="[() => !!newTask.title.trim() || 'Title is required']"
          ></v-text-field>
          <v-textarea
            v-model="newTask.description"
            label="Description"
            :rules="[() => !!newTask.title.trim() || 'Title is required']"
          ></v-textarea>
          <v-text-field
            v-model="newTask.deadline"
            label="Deadline"
            type="date"
          ></v-text-field>

          <v-radio-group v-model="newTask.priority" row>
            <v-radio value="High" label="High"></v-radio>
            <v-radio value="Medium" label="Medium"></v-radio>
            <v-radio value="Low" label="Low"></v-radio>
          </v-radio-group>

          <v-btn color="primary" @click="submitTask">
            {{ isEdit ? 'Update' : 'Add' }} Task
          </v-btn>
          <v-btn color="red" @click="cancelTask">Cancel</v-btn>

          <v-btn color="primary" @click="addTask">
            <i class="fa-solid fa-circle-plus"></i>
            <v-icon icon="fa-check" />
            <v-icon icon="fas fa-home" />
            <font-awesome-icon :icon="['fas', 'code']" />Add Task</v-btn
          >
          <v-btn color="red" @click="cancelAddTask">Cancel</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

// Define emits for emitting events
const emits = defineEmits(['add-task', 'no-task']);
// Define a ref for tracking form submission
const formSubmitted = ref(false);

// Define a reactive variable for the visibility of the add task dialog
const isAddDialogVisible = ref(true);

// Define a reactive object for the new task
const newTask = ref({
  title: '',
  description: '',
  deadline: '',
  priority: '',
});

// Method to add a new task
const addTask = () => {
  // Set formSubmitted to true to indicate form submission
  formSubmitted.value = true;

  // If the form is valid, emit 'add-task' event
  if (
    newTask.value.title.trim() !== '' &&
    newTask.value.description.trim() !== ''
  ) {
    emits('add-task', {
      title: newTask.value.title,
      description: newTask.value.description,
      deadline: newTask.value.deadline,
      priority: newTask.value.priority,
    });
    // Clear the new task data
    newTask.value.title = '';
    newTask.value.description = '';
    newTask.value.deadline = '';
    newTask.value.priority = '';
    // Close the dialog
    isAddDialogVisible.value = false;
    // Reset formSubmitted flag
    formSubmitted.value = true;
  } else {
    // Set formSubmitted to true to indicate form submission
  }
};

// Method to cancel adding a task
const cancelAddTask = () => {
  // Emit 'no-task' event to inform the parent component to close the dialog
  emits('no-task');
  formSubmitted.value = false;
};

// Method to close the add task dialog
const closeAddTaskDialog = () => {
  isAddDialogVisible.value = false;
};
</script>

<style>
.error-input .v-text-field__details {
  color: red; /* Error message color */
}

.error-input .v-input__control {
  border-color: red; /* Border color for input */
}

/* Regular textarea fields */
.v-textarea__slot textarea {
  border: 1px solid #ccc !important; /* Regular border color */
  border-radius: 4px !important; /* Regular border radius */
  padding: 8px 12px !important; /* Regular padding */
  font-size: 16px !important; /* Regular font size */
}
</style>