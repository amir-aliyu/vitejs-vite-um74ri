<script setup>
import { ref } from 'vue';

defineProps({
  changeMessage: Function,
});

const count = ref(0);
const message = ref('mymessage');

const changeMessage = () => {
  if (message.value == 'mymessage') {
    message.value = 'meowww';
  } else {
    message.value = 'mymessage';
  }
};
</script>

<template>
  <button class="btn btn-primary" @click="changeMessage">
    <i class="bi bi-plus"></i> chamge message
  </button>
  <h1>{{ message }}</h1>
</template>

<style scoped></style>
