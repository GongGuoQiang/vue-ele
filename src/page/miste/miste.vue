<template>
    <div>
        <div class="myhead">
                <icon class="search2" name="search2" ></icon>
                <div class="headmain nowarp fs1-2" @click="gocity">环球中心(s2-7-1-739)</div>
                <div class="headright fs0-8" @click="login">登录|注册</div>
        </div>
        <div class="min-height">
        <div class="padtop40">
            <mt-swipe class="myswipe" :auto="0">
                <mt-swipe-item v-for="items in category" :key="items.id" class="myitem">
                  <div v-for="item in items">
                    <div class="imgbox"><img :src="imgBaseUrl+item.image_url"></div>
                    <div class="fs0-8 col9f mgtop5">{{item.title}}</div>
                  </div>
                </mt-swipe-item>
              </mt-swipe>
        </div>
        <div class="mgtop_10 shopping_box">
            <div class="clear">
                <div class="fl">
                     <icon name="listshop" class="listshop"></icon>
                </div>
                <p class="fl name">附近商家</p>
            </div>

            <div v-for="item in shoplist" class="shoplist after">
                <router-link :to='{name:"shop",params:{id:item.id}}'>
                <div class="shopimgbox fl">
                    <img :src="imgshopUrl+item.image_path">
                </div>
                <div class="rightbox fl">
                    <div class="shoptop">
                      <span class="pinpai ">品牌</span>
                      <span class="shopname">{{item.name}}</span>
                      <span class="rightspan right mgr"><span v-for="itemsupports in item.supports" class="">{{itemsupports.icon_name}}</span></span>
                    </div>
                    <div class="xxdiv">
                      <div class="xxbox fs10 mgl">
                        <span v-for="(itemxx,index) in 5" class="xxspan1"><icon v-if="index+1<=item.rating" name="xx2" class="xx"></icon><icon v-if="index+1>item.rating" name="pingfen" class="xx"></icon><span v-if="item.rating-(index)>0&&item.rating-(index)<1" :class="xxclass+(item.rating*10-index*10)"><icon name="xx2" class="xx"></icon></span></span>
                      </div>
                      <span class="colred mgleft8">{{item.rating}}</span>
                      <span class="">月售{{item.recent_order_num}}单</span>
                      <span class="rightspan right mgr">
                          <span v-if="item.delivery_mode" class="fn">{{item.delivery_mode.text}}</span>
                          <span class="zs fs10">准时达</span>
                      </span>
                    </div>
                    <div class="shopfoot">
                        <div><span class="">￥{{item.float_minimum_order_amount}}起送/{{item.piecewise_agent_fee.tips}}</span></div>
                        <div><span class="right mgr"><span class="">{{item.distance}}/</span><span class="col">{{item.order_lead_time}}</span></span></div>
                    </div>
                </div>
                </router-link>
            </div>
        </div>
    </div>
      <foot></foot>
      <load v-if="num!=1"></load>
    </div>
</template>

<script>
import foot from '../../components/foot/footer'
import Load from '../load/load'

 export default {
    data(){
        return {
           imgshopUrl:"http://cangdu.org:8001/img/",
           xxclass:"xxspan2 w",
           category:[],
            imgBaseUrl:'https://fuss10.elemecdn.com', //图片域名地址
            shoplist:"",
            num:1    //ajax是否加载完成
        }
    },
    components:{
       foot,
       Load
    },
    mounted:function(){
        //生命周期
            //分类
            this.num=this.num-1
            this.$http.get('http://cangdu.org:8001/v2/index_entry').then(response => {
              var mybody=response.body;
              var num=parseInt(mybody.length/8);
              var category=[];
              var arr=[];
              for(var i=0;i<num;i++){
                 arr=[];
                for(var h= 0;h<8;h++){
                  arr.push(mybody[i*8+h]);
                }
                category.push(arr);
              }
              arr=[];
              if(num*8<mybody.length){
                for(var k=num*8;k<mybody.length;k++){
                    arr.push(mybody[num*8+k])
                }
                category.push(arr);
              }
              this.category=category;
              this.num=this.num+1;
              console.log(this.category);
            }, response => {
              console.log(response);
              this.num=this.num+1;


          });
          this.num=this.num-1;
          this.$http.get('http://cangdu.org:8001/shopping/restaurants?latitude=31.22967&longitude=121.4762').then(response => {
             console.log(response);
             this.shoplist=response.body;
             this.num=this.num+1;
           }, response => {
             console.log(response);
             this.num=this.num+1;
           });
        },
    computed:{

    },
    methods:{
    login:function(){
        this.$router.push({path:'/login'})
    },
    gocity:function(){
        this.$router.push({path:'/home'})
    }

    }
}
</script>
<style >
.min-height{position: absolute;left: 0;top: 0px;bottom: 55px;width: 100%;overflow-y: auto;background: #fff;}

.mgr{
  transform-origin:100% 50% 0;
}
.mgl{
  transform-origin:0 50% 0;
}
.myswipe{
  height:210px;
  box-sizing:border-box;
  padding-bottom:30px;
  padding-top:10px;
  background-color:#ffffff;
  border-bottom:1px solid #E4E4E4;
}
.myswipe .mint-swipe-indicators .is-active{
  background-color:#26a2ff;
}

.myitem>div{
  width:25%;
  height:50%;
  box-sizing:border-box;
  float:left;
  text-align:center;
}
.imgbox{
  height:60%;
}
.imgbox img{
  height:100%;
}
.shopicon{
  width:100%;
  height:100%;
  margin-bottom:-2px;
}
.svgbox{
  width:15px;
  height:15px;
}
.mgleft10{
  margin-left:10px;
}
.shoplist{
  padding:10px;
  overflow: hidden;
  display:flex;
}
.shoplist>div{
  float:left;
}
.shopimgbox{
  width:60px;
  height:60px;
  margin-right:5px;
}
.shopimgbox>img{
  height:100%;
  width:100%;
  background-color:red;
}
.maindiv{
  border-top:1px solid #E4E4E4;
}

.search2{
  width:20px;
  height:20px;
}
.rightbox{
  font-size:0.8rem;
  flex:1;
}
.shoptop,.xxdiv{
  height:25px;
  line-height:25px;
}
.pinpai{
  display:inline-block;
  width:30px;
  text-align:center;
  font-weight:bold;
  height:20px;
  line-height:20px;
  background-color:#ffd930;
  border-radius:3px;
  font-size: 12px;
}
.shopname{
  font-weight:bold;
  font-size:0.8rem;
  width: 100px;
  overflow: hidden;
  white-space:nowrap;
  display: inline-block;
  text-overflow: ellipsis;

}
.rightspan>span{
  display:inline-block;
  height:14px;
  border:1px solid #A3ACB7;
  margin-left:3px;
  padding:1px;
  color:#A3ACB7;
  line-height:14px;
  font-size:12px;
  border-radius: 2px;
}

.xx{
  width:10px;
  height:10px;

}
.xxbox{
  display:inline-block;
  height:25px;
  box-sizing:border-box;
}
.xxbox>span{
    margin-right:-2px;
}
.xxspan1{
  position:relative;
  display:inline-block;
}
.xxspan2{
  display:inline-block;
  position:absolute;
  left:0px;
  overflow: hidden;
}
.w1{
  width:10%;
}
.w2{
  width:20%;
}
.w3{
  width:30%;
}
.w4{
  width:40%;
}
.w5{
  width:50%;
}
.w6{
  width:60%;
}
.w7{
  width:70%;
}
.w8{
  width:80%;
}
.w9{
  width:90%;
}
.fn{
  background-color:#3190E8;
  color:white !important;
  border-color:#3190E8 !important;
}
.zs{
  color:#3190E8 !important;
   border-color:#3190E8 !important;
}
.mgleft8{
  margin-left:-8px;
}
.shopfoot>div{
  width:50%;
  float:left;
}
.shopfoot>div>span{font-size: 12px;width: 110px;}
.w1{
  width:10%;
}
.w2{
  width:20%;
}
.w3{
  width:30%;
}
.w4{
  width:40%;
}
.w5{
  width:50%;
}
.w6{
  width:60%;
}
.w7{
  width:70%;
}
.w8{
  width:80%;
}
.w9{
  width:90%;
}
.listshop{width: 15px;height: 15px;color: #999;}
.myhead{
  height:40px;
  box-sizing:border-box;
  line-height:40px;
  position:fixed;
  background-color:#26a2ff;
  width:100%;
  color:white;
  padding:0px 10px;
  text-align:center;
  z-index:1;
}
.myhead>div{
  display:inline-block;
}
.headright{
  position:absolute;
  right:10px;
}
.headmain{
  max-width:55%;
  margin:0px auto;
}
.search2{
  width:20px;
  height:20px;
  position:absolute;
  top:10px;
  left:10px;
}
.shoplist>a{display: flex;color: #333;}
.mint-tab-item{color: #999;}
.name{font-size: 14px;color: #999;margin: 0;margin-left: 10px;}
</style>
