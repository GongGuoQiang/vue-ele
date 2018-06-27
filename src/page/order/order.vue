<template>
    <div>
        <mt-header title="订单">
          <router-link to="/" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
          <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="" v-if="logined">
            <div class="no-data" v-if="!car">
                <img src="../../images/no_order.png" alt="">
                <span>购物车，空空如也！！！</span>
            </div>
            <div class="data" v-if="car" v-for = "item in carlist">
                <div class="carlist">
                    <div class="list">
                        <div class="fl">
                            <img :src="imgshopUrl + item.shop.image_path" alt="">
                            <div class="name">
                                <p>
                                    {{item.shop.name}}
                                    <!-- <span class="">{{item.shop.server_utc}}</span> -->
                                </p>
                                <icon name="right" width="12" height="12"></icon>
                            </div>
                        </div>
                        <div class="fr">
                            等待支付
                        </div>
                    </div>
                    <div class="list_bottom">
                        <span class="naem">{{item.shop.description}}</span>
                        <span class="price">￥{{item.shop.specfoods[0].price}}</span>
                    </div>
                    <div class="g-right">
                        <a href="javascript:;">去支付</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="content" v-if="!logined">
            <img src="../../images/no_order.png" alt="">
            <p>登录后查看外卖订单</p>
            <router-link to="login" tag="button">立即登录</router-link>
        </div>
      <foot></foot>
    </div>
</template>

<script>
import foot from '../../components/foot/footer'
 export default {
     name:'order',
    data(){
        return {
            user:{
                name:"",
                password:'',
            },
            logined:false,
            car:false,
            carlist:'',
            imgshopUrl:"http://cangdu.org:8001/img/",
        }
    },
    components:{
        foot
    },
    mounted:function(){
        this.getCookie();
        this.getCar();
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
                // var todo=this.$store.state.userInfo;
                // console.log(todo)
        },
        getCar:function(){
            var self=this;
            var mycar=localStorage.getItem("mycar");
            console.log(mycar)
            if (JSON.parse(mycar).length>0) {
                self.car = true;
                self.carlist = JSON.parse(mycar);
                console.log(self.carlist)
                console.log(self.car)
            }
        }

    }
}
</script>
<style >
.content{
    margin-top: 2.666667rem;
    margin-top: 26.666667vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.content img{
    display: block;
    width: 5.333333rem;
    width: 53.333333vw;
}
.content p{
    margin: .333333rem 0 .266667rem;
    margin: 3.333333vw 0 2.666667vw;
    color: #6a6a6a;
    font-weight: 400;
    font-size: .453333rem;
}
.content button{
    padding: .266667rem;
    padding: 2.666667vw;
    min-width: 3.2rem;
    min-width: 32vw;
    border: none;
    border-radius: .053333rem;
    border-radius: .533333vw;
    background-color: #56d176;
    color: #fff;
    text-align: center;
    font-size: 0.2em;
    font-family: inherit;
}
.data .carlist .list{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 0.6rem;
    background: #fff;
    border-bottom: 1px solid #e5e5e5;
}
.data .fl img{
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
}
.data .carlist .fl{
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.data .carlist .fl .name{
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.data .carlist{
    margin-bottom: 10px;
}
.data .carlist .fl .name p{
    font-size: 1rem;
    color: #666;
    margin-right: 5px;
}
.data .carlist .fr{
    font-size: 0.8rem;
    color: #888;
}
.list_bottom{
    display: flex;
    justify-content: space-between;
    padding: 1rem 0.6rem;
    font-size: 0.8rem;
    background: #fff;
    border-bottom: 1px solid #e5e5e5;
}
.list_bottom .naem{
    margin-left: 3rem;
}
.price{
    color: #ff5339;
}
.g-right{
    text-align: right;
    padding: 1rem;
    background: #fff;
}
.g-right a{
    font-size: 0.8rem;
    color: #ff5339;
    border: 1px solid #ff5339;
    padding: 0.1rem 0.6rem;
    border-radius: 4px;
}
.no-data img{width:80%;display: block;margin: 0 auto;}
.no-data span{display: block;font-size: 1rem;color: #888;text-align: center;}
</style>
