import {defineConfig} from 'vite'
import qiankun from 'vite-plugin-qiankun'
import vue from '@vitejs/plugin-vue'
const {name} = require('./package');
export default defineConfig((mode) => {
    return {
        server: {
            port: 8086,
            headers: {
                'Access-Control-Allow-Origin': '*', // 主应用获取子应用时跨域响应头
            },
        },
        plugins: [
            vue(),
            qiankun({name}, { // 微应用名字，与主应用注册的微应用名字保持一致
                useDevMode: true,
            }),

        ],
    }
})
