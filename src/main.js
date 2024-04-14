import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';

import App from './App.vue';
//import Vuetify from 'vuetify'
import './style.css';
import 'vuetify/dist/vuetify.min.css';

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';


/* set the default style to something other than classic solid */
//config.styleDefault = 'duotone';
const app = createApp(App);
app
  .use(createPinia())
  .use(
    createVuetify({
      components,
      directives,
    })
  )
  .mount('#app');
