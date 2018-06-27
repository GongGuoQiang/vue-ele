import App from '../App'
import home from '../page/home'
import login from '../page/login/login'
import city from '../page/city/city'
import miste from '../page/miste/miste'
import profile from '../page/profile/profile'
import search from '../page/search/search'
import order from '../page/order/order'
import shop from '../page/shop/shop'
import loginOut from '../page/loginOut/loginOut'
// import demo from '../page/demo'
import shopchild from '../page/shop/shopchild/shopchild'


export default[{
      path: '/',
      component: App,
      children:[
          {
              path:'',
              redirect:'/miste'
          },
          {
              path:'/home',
              component:home
          },
          // {
          //     path:'/demo',
          //     component:demo
          // },
          {
              path:'/login',
              component:login
          },
          {
              path:'/city:name',
              name:'city',
              component:city
          },
          {
              path:'/miste',
              name:'miste',
              component:miste
          },
          {
              path:'/profile',
              name:'profile',
              component:profile
          },
          {
              path:'/search',
              name:'search',
              component:search
          },
          {
              path:'/order',
              name:'order',
              component:order
          },
          {
              path:'/loginOut',
              name:'loginOut',
              component:loginOut
          },
          {
              path:'/shop/:id',
              name:'shop',
              component:shop,
              children: [
                  {
                     path:'/shop/:id/shopchild',
                     name:'shopchild',
                     component:shopchild
                  }
              ]
          },
      ]
}]
