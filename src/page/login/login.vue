<template>
    <div>
       <mt-header title="密码登录" class="fs1-2" fixed>
          <mt-button slot='left'><mt-button icon="back" @click="back"></mt-button></mt-button>
          <mt-button>登录</mt-button>
        </mt-header>
        <form>
            <div class="padtop40">
                <mt-field  class='mgtop10 after' placeholder="账号"></mt-field>
                <mt-field class='after' placeholder="密码" :type="mytype">
                    <mt-switch v-model='value'></mt-switch>
                </mt-field>
                <mt-field  class='after' placeholder="验证码" >
                   <img src="" alt="">
                </mt-field>
            </div>
        </form>
        <div class="padlr10 fs0-8 colred">
           <p>温馨提示:未注册过的账号，登录时自动注册</p>
           <p>注册过的用户可凭账号密码登录</p>
       </div>
        <div class="padlr10">
          <mt-button size="large" type="primary" >登录</mt-button>
        </div>
        <div class="padlr10 mgtop10">
          <span class='col right'>重置密码</span>
        </div>
    </div>
</template>

<script>
 export default {
    data(){
        return {
          value:''

        }
    },
    component:{

    },
    mounted:function(){

    },
    computed:{
        mytype:function(){
            return this.value?'password':''
        }
    },
    methods:{
        back:function(){
            this.$router.go(-1);
        }
    }
}
</script>
<style >
 .colred{color: red;}
 .yanzhengma_input{

width: 170px;

padding: 5px
0 5px
10px;

margin-left:
30px;

height: 30px;

/* margin-top: 25px; */

border: 1px
solid #e6e6e6;



}

.disappear{

visibility:hidden;

}

.verification1{

vertical-align:
middle;

transform: translate(-15px,0);

width: 102px;

}

.tishixiaoxi{

font-size: 14px;

color:#ed711f;

display: block;

margin-left:
30px;

line-height:
30px;


}

#code{

font-size: 18px;

letter-spacing:3px;

color: #053d84;

background: #f2f2f5;

margin-left:
20px

}
</style>
