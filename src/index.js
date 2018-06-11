import Vue from 'vue'
import App from './App.vue'

const root = document.createElement('div');
document.body.appendChild(root);

new Vue ({
    render: (h) => h(App) // h是createElement函数，即创建组件
}).$mount(root);