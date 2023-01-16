import { createApp } from 'vue';
import App from './App.vue';

import SvgIcon from '@/svg';
import './public-path';

// @ts-ignore
let instance = null;
let router = null;

function render(props = {}) {
    // @ts-ignore
    const { container} = props;
    const {mount,component,use} = createApp(App);
    mount(container ? container.querySelector('#app') : '#app');
    component('SvgIcon',SvgIcon);
}

// 独立运行时
// @ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
    render();
}

export async function bootstrap() {
    console.log('[vue] vue app bootstraped');
}
// @ts-ignore
export async function mount(props) {
    console.log('[vue] props from main framework', props);
    render(props);
}

export async function unmount() {
    // @ts-ignore
    instance.unmount();
    // @ts-ignore
    instance._container.innerHTML = '';
    // @ts-ignore
    instance = null;
    router = null;
}