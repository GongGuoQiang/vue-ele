<template>
    <div>
        <mt-header title="多个按钮">
          <router-link to="/" slot="left">
            <mt-button icon="back">返回</mt-button>
            <mt-button @click="handleClose">关闭</mt-button>
          </router-link>
          <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
 export default {
     name:'find',
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
