<template>
<table class="table">
  <thead class="bg-primary text-white">
    <tr>
      <th v-for="(header, index) in tableHeaders" :key="index">
        {{ header }}
      </th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
      <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
      <div class="col">
      <v-btn for="update" color="primary">update</v-btn>
      <v-btn for="delete" color="red">delete</v-btn>
      </div>
    </tr>
    
  </tbody>
  
</table>
</template>

<script setup>
import { ref } from 'vue';

// Method to handle updating task
const updateTask = (index) => {
// Emit an event to notify the parent component about the update task action
$emit('update-task', index);
};

// Define your table headers
const tableHeaders = [
'Task',
'Description',
'Deadline',
'Priority',
'Is Complete',
'Action',
];

// Sample task data
const sampleTask = {
task: 'Sample Task',
description: 'This is a sample task description',
deadline: '2024-04-30',
priority: 'High',
isComplete: false,
action: 'Edit/Delete',
};

// Receive rows data as prop
const props = defineProps({
rows: {
  type: Array,
  default: () => [],
},
});

// Add the sample task to the rows array
const rowsWithSampleTask = ref([sampleTask, ...props.rows]);
</script>

<style scoped>
/* No need for additional styles as we're using Bootstrap */
</style>
