import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from 'pinia'


import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
    {
        name: 'micro-react', // app name registered
        entry: '//localhost:8088',
        container: '#micro-react',
        activeRule: '/micro-react',
    },
    {
        name: 'micro-vue', // app name registered
        entry: '//localhost:8086',
        container: '#micro-vue',
        activeRule: '/micro-vue',
    },
    {
        name: 'micro-vue2', // app name registered
        entry: '//localhost:8089',
        container: '#micro-vue2',
        activeRule: '/micro-vue2',
    },
    {
        name: 'micro-angular', // app name registered
        entry: '//localhost:8090',
        container: '#micro-angular',
        activeRule: '/micro-angular',
    }
]);

start();

// Create a pinia instance
const pinia = createPinia()

let app = createApp(App);

// 挂载pinia
app.use(pinia)

//  挂载app
app.mount('#app')
