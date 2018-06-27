<template>
    <div class="min_height">
        <mt-header title="我的">
          <router-link to="/" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
          <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="logined login_box" v-if="logined">
            <div class="fl">
                <img src="../../images/2.jpg" alt="">
                <div class="text">
                    <a>{{user.name}}</a>
                    <p>{{user.password}}</p>
                </div>
            </div>
            <div class="fr" @click="loginOut()">
                <icon name="right" width="20" height="20"></icon>
            </div>
        </div>
        <div class="login_box" v-else>
            <div class="fl">
                <img src="../../images/head.png" alt="">
                <div class="text">
                    <router-link to="login">
                        登录/注册
                    </router-link>
                    <p>登录后享受更多特权</p>
                </div>
            </div>
            <div class="fr">
                <icon name="right" width="20" height="20"></icon>
            </div>
        </div>
        <div class="g-money">
            <ul>
                <li>
                    <icon name="qianbao" width="1.5rem" height="1.5rem"></icon>
                    <p>钱包</p>
                </li>
                <li>
                    <icon name="hongbao" width="1.5rem" height="1.5rem"></icon>
                    <p>红包</p>
                </li>
                <li>
                    <icon name="jinbi" width="1.5rem" height="1.5rem"></icon>
                    <p>金币</p>
                </li>
            </ul>
        </div>
        <div class="g-bottom">
            <ul>
                <li>
                    <icon class="fl" name="dingwei" width="1.5rem" height="1.5rem"></icon>
                    <p>我的地址</p>
                    <icon class="fr" name="right" width="0.8rem" height="0.8rem"></icon>
                </li>
            </ul>
            <ul>
                <li>
                    <icon class="fl" name="mingxi" width="1.6rem" height="1.6rem"></icon>
                    <p>金币商城</p>
                    <icon class="fr" name="right" width="0.8rem" height="0.8rem"></icon>
                </li>
                <li>
                    <icon class="fl" name="libao" width="1.5rem" height="1.5rem"></icon>
                    <p>分享拿5元现金</p>
                    <icon class="fr" name="right" width="0.8rem" height="0.8rem"></icon>
                </li>
            </ul>
            <ul>
                <li>
                    <icon class="fl" name="kefu" width="1.6rem" height="1.6rem"></icon>
                    <p>我的客服</p>
                    <icon class="fr" name="right" width="0.8rem" height="0.8rem"></icon>
                </li>
                <li>
                    <icon class="fl" name="elm" width="1.5rem" height="1.5rem"></icon>
                    <p>下载饿了么app</p>
                    <icon class="fr" name="right" width="0.8rem" height="0.8rem"></icon>
                </li>
            </ul>
        </div>
     <foot></foot>
    </div>
</template>

<script>
import foot from '../../components/foot/footer'
 export default {
    data(){
        return {
            logined:false,
            user:{
                name:'',
                password:''
            }
        }
    },
    components:{
        foot
    },
    mounted:function(){
        this.getCookie();
    },
    computed:{

    },
    methods:{
        getCookie:function () {
            if (document.cookie.length > 0) {
                    var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                    for (var i = 0; i < arr.length; i++) {
                        var arr2 = arr[i].split('='); //再次切割
                        //判断查找相对应的值
                        if (arr2[0] == 'name') {
                            this.logined = true;
                            this.user.name = arr2[1]; //保存到保存数据的地方
                        } else if (arr2[0] == 'password') {
                            this.user.password = arr2[1];
                        }
                    }
                }
        },
        loginOut:function(){
            this.$router.push({path:"loginOut"})
        }

    }
}
</script>
<style >
.login_box{
    background-color: #26a2ff;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    align-items:center;
    padding: 2rem 0;
}
.login_box .fl{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.login_box .fr{
    color: #fff;
}
.login_box .fl .text{
    margin-left: 1rem;
}
.login_box .fl a{
    color: #fff;
    font-size: 1.4rem;

}
.login_box .fl p{
    color: #fff;
    font-size: 0.8rem;
}
.login_box .fl img{
    height: 4rem;
    width: 4rem;
    border-radius: 50%;
}
.g-money ul{
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    padding: 1rem 0;;
}
.g-money ul li p{
   font-size: 0.8rem;
   margin-top: 0.3rem;
}
ul {
  list-style-type: none;
  padding: 0;
}
.g-bottom ul{
    margin-bottom: 10px;
    background: #fff;
    overflow: hidden;
}
.g-bottom ul li{
    height: 3rem;
    padding: 0 1rem;
    line-height: 3rem;
}
.g-bottom ul li .fr{
    float: right;
    color: #888;
    margin-top: 1rem;
}
.g-bottom ul li .fl{
    float: left;
    margin-top: 0.8rem;
}
.g-bottom ul li p{
    float: left;
    margin-left: 1rem;
    font-size: 1rem;
    color: #666;
}
.min_height{position: absolute;bottom: 60px;left: 0px;top: 0px;overflow: auto;width: 100%}
</style>
