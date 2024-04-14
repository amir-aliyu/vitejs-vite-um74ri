<template>
  <v-dialog v-model="isAddDialogVisible" max-width="500px" persistent>
   
    <v-card>
        <v-banner :icon ="whichIcon" id="taskBanner" bg-color="primary" lines="one">
            <div id="taskText">{{ isAddOrEdit }}</div> </v-banner>
      <v-card-text >
        <v-form @submit.prevent="addTask">
           <v-text-field
            v-show="showTitle"
            v-model="newTask.title"
            label="Title"
            :rules="[() => !!newTask.title.trim() || 'Title is required', () => isTitleUnique.value || 'Title must be unique']"
          ></v-text-field>
      
          <!-- do not display title if it is not add -->
          <v-textarea
            v-model="newTask.description"
            label="Description"
            :rules="[() => !!newTask.description.trim() || 'Description is required']"
          ></v-textarea>
         
          <v-text-field
          v-show="isAddDialog" 
            v-model="newTask.deadline"
            label="Deadline"
            :rules="[() => !!newTask.deadline.trim() || 'Deadline is required']"
            type="date"
          ></v-text-field>

          <v-radio-group v-model="newTask.priority" row
          :rules="[() => !!newTask.priority.trim() || 'Priority is required']">
            <v-radio value="High" label="High"></v-radio>
            <v-radio value="Medium" label="Medium"></v-radio>
            <v-radio value="Low" label="Low"></v-radio>
          </v-radio-group>
 
          <v-btn id="right-btn" :prepend-icon="whichIcon" type="submit" color="primary" @click="addTask(taskIndex, showTitle,tableRows)">
            {{ whichButton }}</v-btn
          >
           <!-- Cancel button -->
          <v-btn id="cancel" color="red" prepend-icon="mdi mdi-close-circle-outline" @click="cancelAddTask">Cancel</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue';

// props
const props = defineProps({
  isAddOrEdit: String,
  whichButton: String,
  taskIndex: Number,
  addedOrUpdated: String,
  showTitle: Boolean,
  tableRows: Array,
  whichIcon: String
});

// Define a reactive variable for the visibility of the add task dialog
const isAddDialogVisible = ref(true);

// Define emits for emitting events
const emits = defineEmits(['add-task', 'no-task', 'update:isAddDialog', 'update:isEditDialog']);
// Define a ref for tracking form submission
const formSubmitted = ref(false);

// check if the title's unique :3
const isTitleUnique = ref(true);

// check if there's a description
const hasDescription = ref(false);

// check if there's a deadline
const hasDeadline = ref(false);

// check if there's a priority
const hasPriority = ref(false);

// Define reactive variables for isAddDialog and isEditDialog
const isAddDialog = ref(true);
const isEditDialog = ref(false);

// Define a reactive object for the new task
const newTask = ref({
  title: '',
  description: '',
  deadline: '',
  priority: '',
});

const uniqueTitle = (newTask, tableRows) => {
  for(let i = 0; i < tableRows.length; i++) {
    if (newTask.value.title == tableRows[i].title) {
      
      isTitleUnique.value = false;
      alert("title not unique" + isTitleUnique.value)
      return false;
    }
  }
  isTitleUnique.value = true;
  return true;
}

const newTaskIsValid = (newTask) => {
  if (newTask.value.title.trim() !== '' &&
    newTask.value.description.trim() !== '' ) {
      return true;
    } else
    
    return false;
}

const validateDescription = (newTask) => {
  if (newTask.value.description.trim() !== '') {
    hasDescription.value = true;
    return true;
  } else {
    hasDescription.value = false;
    return false;
  }
}

const validateDeadline = (newTask) => {
  if (newTask.value.deadline.trim() !== '') {
    hasDeadline.value = true;
    return true;
  } else {
    hasDeadline.value = false;
    return false;
  }
}

const validatePriority = (newTask) => {
  if (newTask.value.priority.trim() !== '') {
    hasPriority.value = true;
    return true;
  } else {
    hasPriority.value = false;
    return false;
  }
}


// Method to add a new task
const addTask = (index, showTitle, tableRows) => {
  formSubmitted.value = true;

  // If the form is valid, emit 'add-task' event
    // If showTitle is false, set the newTask.title to its current title
    if (!showTitle) {
     // alert(tableRows[index].title);
      newTask.value.title = tableRows[index].title;

      // validate entries 
      // update the task accordingly with new values

      if (
        validateDescription(newTask) && 
        validateDeadline(newTask) && 
        validatePriority(newTask)
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

          showSnackbar('Task updated successfully', 'success');
        }
    } 
    // title is shown, go thru add validation
    else if (showTitle) {
      if (
          newTaskIsValid(newTask) && uniqueTitle(newTask, tableRows) 
          && validateDeadline(newTask) && validatePriority(newTask)
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
          
          showSnackbar('Task added successfully', 'success');

        } 
    }
  
};

// Method to cancel adding a task
const cancelAddTask = () => {
  // Emit 'no-task' event to inform the parent component to close the dialog
  emits('no-task');
  formSubmitted.value = false;
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
#taskBanner {
  font-size: 25px;
 
}
#taskText {
  margin-left: 1em;
  margin-right:5em;
}
#right-btn {
  margin-left: 8em;

}
#cancel {
  margin-left: 1em;
  margin-right:1em;
}

</style>
