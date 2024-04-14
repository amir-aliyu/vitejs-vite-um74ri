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
        <!-- Loop through row cells -->
        <td v-for="(column, columnIndex) in tableColumns" :key="columnIndex">
          <!-- Render content based on column definition -->
          <template v-if="column.type === 'button'">
            <!-- Display buttons if the column type is 'button' -->
            <div class="col">
              <v-btn color="primary" @click="updateTask(rowIndex)"
                >Update</v-btn
              >
              <v-btn color="red">Delete</v-btn>
            </div>
          </template>
          <template v-else>
            <!-- Render cell content based on column type -->
            {{ row[column.field] }}
          </template>
        </td>
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

// Define your table columns
const tableColumns = [
  { header: 'Task', field: 'task', type: 'text' },
  { header: 'Description', field: 'description', type: 'text' },
  { header: 'Deadline', field: 'deadline', type: 'text' },
  { header: 'Priority', field: 'priority', type: 'text' },
  { header: 'Is Complete', field: 'isComplete', type: 'text' },
  { header: 'Action', type: 'button' }, // Define a button column
];

// Sample task data
const sampleTask = {
  task: 'Sample Task',
  description: 'This is a sample task description from tx',
  deadline: '2024-04-30',
  priority: 'High',
  isComplete: false,
  action: '',
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
