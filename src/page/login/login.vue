<template>
    <div>
       <mt-header title="密码登录" class="fs1-2" fixed>
          <mt-button slot='left'></mt-button>
          <mt-button>登录</mt-button>
        </mt-header>
        <form>
            <div class="padtop40">
                <mt-field  class='mgtop10 after' placeholder="姓名" v-model="user.name"></mt-field>
                <mt-field class='after' placeholder="密码" :type="mytype" v-model="user.password">
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
          <mt-button size="large" type="primary" @click="login">登录</mt-button>
        </div>
        <div class="padlr10 mgtop10">
          <span class='col right'>重置密码</span>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
 export default {
    data(){
        return {
          value:true,
          user: {
              "name":'',
              "password":''
          }
        }
    },
    component:{

    },
    mounted:function(){
        this.getCookie();
    },
    computed:{
        mytype:function(){
            return this.value ? 'password':''
        }
    },
    methods:{
        back:function(){
            this.$router.go(-1);
        },
        login:function(){
            var self = this;
            Toast('登录成功');
            setTimeout(function(){
                self.$router.push({path: 'home'});
            },2000)
            //存到cookie
            self.setCookie(self.user.name, self.user.password, 7);
            //存到vuex
            this.$store.dispatch('login' , {'name' : self.user.name , 'password' : self.user.password});
        },
        getCookie:function () {
            if (document.cookie.length > 0) {
                    var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                    for (var i = 0; i < arr.length; i++) {
                        var arr2 = arr[i].split('='); //再次切割
                        //判断查找相对应的值
                        if (arr2[0] == 'name') {
                            this.user.name = arr2[1]; //保存到保存数据的地方
                        } else if (arr2[0] == 'password') {
                            this.user.password = arr2[1];
                        }
                    }
                }
        },
        setCookie(c_name, c_pwd, exdays) {
               var exdate = new Date(); //获取时间
               exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
               //字符串拼接cookie
               window.document.cookie = "name" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
               window.document.cookie = "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
           },
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
