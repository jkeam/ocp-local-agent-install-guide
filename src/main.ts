import './assets/main.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

import { createApp } from 'vue'
import {createBootstrap} from 'bootstrap-vue-next'
import { createPinia } from 'pinia'
import { createVCodeBlock } from '@wdns/vue-code-block';
import axios from 'axios';

import App from './App.vue'
import router from './router'

const app = createApp(App)

const configFetcher = axios.create().get("/config.json").then(resp => {
    const api = axios.create({
        baseURL: resp.data.apiEndpoint,
        headers: {
            'Content-Type': 'application/json'
        },
    });

    app.provide('axios', api);

});

app.use(createPinia())
app.use(router)
app.use(createVCodeBlock({}));
app.use(createBootstrap()) // Important

app.mount('#app')