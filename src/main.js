import Vue from 'vue'
import App from './App'
import store from './store/index'
import VueRouter from 'vue-router'
import routes from './router/index'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import './style/mycss.css'
import Resource from 'vue-resource'
import Icon from 'vue-svg-icon/Icon.vue';
Vue.component('icon', Icon);

Vue.use(Resource)
Vue.use(Mint)
Vue.use(VueRouter)

const router = new VueRouter({
    routes
})

Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
new Vue({
    el:'#app',
    store,
    router,
    render: h => h(App)
}).$mount('#app')
