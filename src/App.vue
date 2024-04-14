<template>
  <v-container>

      <v-banner bg-color="primary" id="top-banner" class="my-4">
        
        <h4 id="frameworks"><v-app-bar-nav-icon></v-app-bar-nav-icon>
          FRAMEWORKS</h4>
        <div class="col-md-6">
          <v-btn prepend-icon="mdi-plus" color="primary"  @click="openAddTaskDialog">
            Add
          </v-btn></div>
    </v-banner>

        <TaskDialog
          v-if="isAddDialogOpen"
          @add-task="addTask"
          @no-task="closeAddTaskDialog"
          @close="closeAddTaskDialog"
          :whichButton = "whichButton"
          :taskIndex = "taskIndex"
          :isAddOrEdit = "isAddOrEdit"
          :isAddDialog= "isAddDialog" 
          :isEditDialog="isEditDialog" 
          :showTitle = "showTitle"
          :addedOrUpdated = "addedOrUpdated"
          :tableRows = "tableRows"
          :whichIcon = "whichIcon"
        
          @update:isAddDialog="isAddDialog = $event" 
          @update:isEditDialog="isEditDialog = $event" 
        />
    
         <!-- Add v-snackbar component -->
         <v-snackbar
          v-model="snackbar.show"
          :color="snackbar.color"
          :timeout="snackbar.timeout"
          class="custom-snackbar"
        >
          {{ snackbar.message }}
        </v-snackbar>



    <v-table>
      <!-- headers for if its an add task -->
      <thead>
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
                  <v-btn prepend-icon="mdi mdi-update" color="primary" @click="openAddTaskDialog(false, rowIndex)">
                    Update
                  </v-btn>
                </template>
                <!--can always delete tasks-->
                <v-btn prepend-icon="mdi mdi-close-circle-outline" color="red" @click="deleteTask(rowIndex)">Delete</v-btn>
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
    </v-table>
</v-container>
</template>

<script setup>
import { ref } from 'vue';
import TaskDialog from './components/TaskDialog.vue';
import 'vuetify/dist/vuetify.min.css';

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

// determine whether or not to add title
const showTitle = ref(true);

// say it was added or updated successfully
const addedOrUpdated = ref("added");

// Define your table rows data
const tableRows = ref([]);

const whichIcon = ref("mdi-plus");

// open task dialog, pass in whether it's an add task and index
const openAddTaskDialog = (isAdd, index) => {
  isAddDialogOpen.value = true;
  if(isAdd) {
    showTitle.value = true;
    whichButton.value = "Add";
    addedOrUpdated.value = "added";
    isAddOrEdit.value = "Add Task";
    taskIndex.value = -1;
    whichIcon.value = "mdi-plus";
  } else {
    showTitle.value = false;
    whichButton.value = "Edit";
    addedOrUpdated.value = "edited";
    isAddOrEdit.value = "Edit Task";
    taskIndex.value = index;
    whichIcon.value = "mdi mdi-update";
   // alert("task index=" + index + "and task index value "+ taskIndex.value);
  }
  
 // isEditDialog.value = isEdit;
};

// Method to close the add task dialog
const closeAddTaskDialog = () => {
  isAddDialogOpen.value = false;
};

// Method to handle adding task
const addTask = (task, index) => {
  //taskIndex.value = index;
  isAddOrEdit.value = "Add Task from app.vue";
  isAddDialog.value = true; 
  isEditDialog.value = false; 
  if(taskIndex.value < 0) {
    tableRows.value.push(task);
  } else {
    tableRows.value[taskIndex.value] = task;
  }
  
  closeAddTaskDialog();
  if (whichButton.value == "Add") {
    showSnackbar('Task added successfully', 'success');
  } else {
    showSnackbar('Task updated successfully', 'success');
  }
  
};

const deleteTask = (index) => {
  tableRows.value.splice(index, 1);
  showSnackbar('Task deleted successfully', 'success');

};

// Method to update task completion
const updateCompletion = (index) => {
  // Toggle the completion status of the task at the specified index
  tableRows.value[index].isComplete = !tableRows.value[index].isComplete;

  // Toggle the showUpdateButton property based on the updated completion status
  tableRows.value[index].showUpdateButton = !tableRows.value[index].isComplete;

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
#top-banner {
  color:blue;
}
#frameworks {
  margin-left: 11em;
  margin-right:6em;
  font-size: 20;
  text-align: center;
 
}
/* No need for additional styles as we're using Bootstrap */
</style>
