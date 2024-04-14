<template>
  <v-dialog v-model="isEditDialogVisible" max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" v-on="on">Open Edit Form</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Edit Task</span>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="editedTask.description"
            label="Description"
          ></v-text-field>
          <v-text-field
            v-model="editedTask.deadline"
            label="Deadline"
            type="date"
          ></v-text-field>
          <v-radio-group v-model="editedTask.priority" row>
            <v-radio value="High" label="High"></v-radio>
            <v-radio value="Medium" label="Medium"></v-radio>
            <v-radio value="Low" label="Low"></v-radio>
          </v-radio-group>
          <v-btn color="primary" @click="editTask">Edit Task</v-btn>
          <v-btn color="red" @click="closeEditTaskDialog">Cancel</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

// Define emits for emitting events
const emits = defineEmits(['edit-task']);

// Define a reactive variable for the visibility of the edit task dialog
const isEditDialogVisible = ref(false);

// Define a reactive object for the edited task
const editedTask = ref({
  description: '',
  deadline: '',
  priority: '',
});

// Method to open the edit task dialog
const openEditTaskDialog = () => {
  isEditDialogVisible.value = true;
};

// Method to close the edit task dialog
const closeEditTaskDialog = () => {
  isEditDialogVisible.value = false;
};

// Method to edit a task
const editTask = () => {
  print('truing to edit');
  // Emit 'edit-task' event with the edited task data
  if (editedTask.value.description.trim() !== '') {
    emits('edit-task', {
      description: editedTask.value.description,
      deadline: editedTask.value.deadline,
      priority: editedTask.value.priority,
    });
    // Close the dialog
    closeEditTaskDialog();
  } else {
    alert('Please enter a description for the task.');
  }
};
</script>
