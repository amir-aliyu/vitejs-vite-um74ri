<template>
  <div>
    <nav class="navbar navbar-dark bg-primary">
      <div class="container-fluid">
        <span class="navbar-brand">FRAMEWORKS</span>
        <v-icon>fas fa-code</v-icon>
        <button class="btn btn-primary" @click="openAddTaskDialog">
          <i class="bi bi-plus"></i> Add
        </button>
        <button class="btn btn-primary" @click="addSampleTask">
          <i class="bi bi-plus"></i> new sample task
        </button>

        <TaskDialog
  v-if="isAddDialogOpen"
  @add-task="addTask"
  @no-task="closeAddTaskDialog"
  @close="closeAddTaskDialog"
  :data-from-parent="dataToSendToChild"
  :whichButton = "whichButton"
  :taskIndex = "taskIndex"
  :isAddOrEdit = "isAddOrEdit"
  :isAddDialog= "isAddDialog" 
  :isEditDialog="isEditDialog" 
 
  @update:isAddDialog="isAddDialog = $event" 
  @update:isEditDialog="isEditDialog = $event" 
/>

        <!-- TaskDialog Component -->
        <!--<TaskDialog
          v-if="isAddDialogOpen"
          @add-task="addTask"
          @close="closeAddTaskDialog"
        />-->
        <HelloWorld :changeMessage="changeMessage" />

        <!-- Add v-snackbar component -->
        <v-snackbar
          v-model="snackbar.show"
          :color="snackbar.color"
          :timeout="snackbar.timeout"
          class="custom-snackbar"
        >
          {{ snackbar.message }}
        </v-snackbar>
      </div>
    </nav>

    <table class="table">
      <thead class="bg-primary text-white">
        <tr>
          <th v-for="(header, index) in tableHeaders" :key="index">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in tableRows" :key="rowIndex">
          <!-- Loop through row cells -->
          <td v-for="(column, columnIndex) in tableColumns" :key="columnIndex">
            <!-- Render content based on column definition -->
            <template v-if="column.type === 'button'">
              <!-- Display buttons if the column type is 'button' -->
              <div class="col">
                <template v-if="!row.isComplete">
                  <!--if the item is not complete, then can be edited-->
                  <v-btn color="primary" @click="openAddTaskDialog(false, rowIndex)">
                    Update
                  </v-btn>
                </template>
                <!--can always delete tasks-->
                <v-btn color="red" @click="deleteTask(rowIndex)">Delete</v-btn>
              </div>
            </template>
            <template v-if="column.type === 'checkbox'">
              <!-- display checkbox if the column type is 'checkbox' -->
              <input
                class="form-check-input"
                type="checkbox"
                v-model="row.isComplete"
                @click="updateCompletion(rowIndex)"
              />
            </template>

            <template v-else>
              <!-- Render cell content based on column type -->
              {{ row[column.field] }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { createVuetify } from 'vuetify';
import TableComponent from './components/TableComponent.vue';
import TaskDialog from './components/TaskDialog.vue';
//import TaskDialog from './components/TaskDialog.vue';
import HelloWorld from './components/HelloWorld.vue';
import { VCard, VCardText, VCardTitle } from 'vuetify/components/VCard';
import 'vuetify/dist/vuetify.min.css';

// testing can send data ovah 
const dataToSendToChild = 'Data from App.vue!!';
//const isAddOrEdit = "Add Task";

// Snackbar state
const snackbar = ref({
  show: false,
  message: '',
  color: 'success', // Color of the snackbar (you can change it)
  timeout: 3000, // Timeout for the snackbar to disappear (in milliseconds)
});

// Define your table headers
const tableHeaders = [
  'Title',
  'Description',
  'Deadline',
  'Priority',
  'Is Complete',
  'Action',
];

// Define your table columns
const tableColumns = [
  { header: 'Title', field: 'title', type: 'text' },
  { header: 'Description', field: 'description', type: 'text' },
  { header: 'Deadline', field: 'deadline', type: 'text' },
  { header: 'Priority', field: 'priority', type: 'text' },
  { header: 'Is Complete', field: 'isComplete', type: 'checkbox' },
  { header: 'Action', type: 'button', showUpdateButton: true }, // Define a button column
];

// Define ref for isAddDialogOpen
const isAddDialogOpen = ref(false);

// const to check wether its an add or edit
const isAddOrEdit = ref("Add Task default");

// reference for which button it is
const whichButton = ref("Add");

const taskIndex = ref(0);

// Define whether it's an add or edit dialog
const isEditDialog = ref(true);

const isAddDialog = ref(true);

// Define your table rows data
const tableRows = ref([]);

// open task dialog, pass in whether it's an add task and index
const openAddTaskDialog = (isAdd, index) => {
  isAddDialogOpen.value = true;
  if(isAdd) {
    whichButton.value = "Add";
    isAddOrEdit.value = "Add Task";
    taskIndex.value = -1;
  } else {
    whichButton.value = "Edit";
    isAddOrEdit.value = "Edit Task " + index;
    taskIndex.value = index;
    alert("task index=" + index + "and task index value "+ taskIndex.value);
  }
  
 // isEditDialog.value = isEdit;
};

// Method to close the add task dialog
const closeAddTaskDialog = () => {
  isAddDialogOpen.value = false;
};

// Sample task data
const sampleTask = {
  title: 'Sample Task',
  description: 'This is a sample task description from app',
  deadline: '2024-04-30',
  priority: 'High',
  isComplete: false,
  action: '',
};




// Method to handle adding task
const addTask = (task, index) => {
  //taskIndex.value = index;
  isAddOrEdit.value = "Add Task from app.vue";
  isAddDialog.value = true; // Corrected
  isEditDialog.value = false; // Corrected
  if(taskIndex.value < 0) {
    tableRows.value.push(task);
    //alert("app thinks task index is: "+ taskIndex.value);
  } else {

    alert("this is an editing operation my friend");
    tableRows.value[taskIndex.value] = task;
  }
  
  closeAddTaskDialog();
  showSnackbar('Task added successfully', 'success');
};

// Method to handle adding task
const noTask = () => {
  closeAddTaskDialog();
};


// Method to handle updating task
// Method to handle updating task
const updateTask = (task, index) => {
  isAddOrEdit = "Update Task";
  //isEditDialog = true;
  console.log(dataToSendToChild);
  alert("update task" + index)
  // Set isEditDialog to true for editing
  //emits('update:isEditDialog', true);
  //openAddTaskDialog(false); // Pass true to indicate it's an edit dialog
  //console.log('task' + index + ' is to be updated');
 // isEditDialog.value = true;
 // console.log(task);
 // console.log(tableRows.value[index]);
 // tableRows.value[index] = task;
  // Emit event to update isEditDialog in TaskDialog.vue
 
};

const deleteTask = (index) => {
  tableRows.value.splice(index, 1);
  // Show snackbar notification
  showSnackbar('Task deleted successfully', 'success');

  console.log('task' + index + 'must be deleted with extreme prejudice');
};

// Method to add sample task
const addSampleTask = () => {
  // this.$toastr.success('Task deleted successfully');
  addTask(sampleTask);
};

// Method to update task completion
const updateCompletion = (index) => {
  // Toggle the completion status of the task at the specified index
  tableRows.value[index].isComplete = !tableRows.value[index].isComplete;

  // Toggle the showUpdateButton property based on the updated completion status
  tableRows.value[index].showUpdateButton = !tableRows.value[index].isComplete;

  // Log the update
  console.log(
    `Updating completion for task at index ${index}: ${tableRows.value[index].isComplete}`
  );
};

//import EditTaskDialog from './components/EditTaskDialog.vue';

// Define ref for isEditDialogOpen
const isEditDialogOpen = ref(false);

// Method to open the edit task dialog
const openEditTaskDialog = (index) => {
  // Implement logic to open the dialog with the task data at the specified index
  isEditDialogOpen.value = true;
};

// Method to close the edit task dialog
const closeEditTaskDialog = () => {
  isEditDialogOpen.value = false;
};

// Method to show the snackbar notification
const showSnackbar = (message, color) => {
  snackbar.value.message = message;
  snackbar.value.color = color;
  snackbar.value.show = true;
};
</script>

<style scoped>
.custom-snackbar {
  position: fixed;
  bottom: 20px; /* Adjust as needed */
  left: 150px; /* Adjust as needed */
  z-index: 9999; /* Ensure it appears above other content */
}
/* No need for additional styles as we're using Bootstrap */
</style>
