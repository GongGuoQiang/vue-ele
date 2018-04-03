<template>

        <mt-tabbar v-model="$store.state.selected">
           <mt-tab-item id="miste">
              <icon slot="icon" name="miste"></icon>
             外卖
           </mt-tab-item>
           <mt-tab-item id="order">
             <icon slot="icon" name="order"></icon>
             订单
           </mt-tab-item>
           <mt-tab-item id="search">
              <icon slot="icon" name="search"></icon>
             搜索
           </mt-tab-item>
           <mt-tab-item id="profile">
             <icon slot="icon" name="profile"></icon>
             我的
           </mt-tab-item>
     </mt-tabbar>
</template>

<script>
 export default {
    data(){
        return {

        }
    },
    component:{

    },
    mounted:function(){

    },
    computed:{

    },
    methods:{


    }
}
</script>
<style >

</style>
