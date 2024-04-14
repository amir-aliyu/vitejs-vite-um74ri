<template>
<div>
  <nav class="navbar navbar-dark bg-primary">
    <div class="container-fluid">
      <span class="navbar-brand">FRAMEWORKS</span>
      <button class="btn btn-primary" @click="openAddTaskDialog">
        <i class="bi bi-plus"></i> Add
      </button>
      <button class="btn btn-primary" @click="addTask(sampleTask)">
        <i class="bi bi-plus"></i> new sample task
      </button>

      <AddTaskDialog
        v-if="isAddDialogOpen"
        @add-task="addTask"
        @close="closeAddTaskDialog"
      />

      <!-- TaskDialog Component -->
      <!--<TaskDialog
        v-if="isAddDialogOpen"
        @add-task="addTask"
        @close="closeAddTaskDialog"
      />-->
      <HelloWorld :changeMessage="changeMessage" />
    </div>
  </nav>

  <TableComponent :rows="tableRows" />
</div>
</template>

<script setup>
import { ref } from 'vue';
import { createVuetify } from 'vuetify';

import TableComponent from './components/TableComponent.vue';
import AddTaskDialog from './components/AddTaskDialog.vue';
//import TaskDialog from './components/TaskDialog.vue';
import HelloWorld from './components/HelloWorld.vue';
import { VCard, VCardText, VCardTitle } from 'vuetify/components/VCard';
import 'vuetify/dist/vuetify.min.css';

// define ref for message
const message = ref('heyyyy');

const changeMessage = (message) => {
myref.value = 'message';
};

// Define ref for isAddDialogOpen
const isAddDialogOpen = ref(false);

// Define your table rows data
const tableRows = ref(['hello']);

// Method to open the add task dialog
const openAddTaskDialog = () => {
isAddDialogOpen.value = true;
};

// Method to close the add task dialog
const closeAddTaskDialog = () => {
isAddDialogOpen.value = false;
};

// Sample task data
const sampleTask = {
task: 'Sample Task',
description: 'This is a sample task description from app',
deadline: '2024-04-30',
priority: 'High',
isComplete: false,
action: '',
};

// Method to handle adding task
const addTask = (task) => {
console.log(task);
tableRows.value.push(task);
closeAddTaskDialog();
};
</script>
