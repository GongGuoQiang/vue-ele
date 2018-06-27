<template>
    <div>
        <mt-header title="搜索">
          <router-link to="/" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
          <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="pad10 bgfff padbot10">
            <form v-on:submit.prevent >
                <input  class="cityinput" type="text" name=""  required  placeholder="请输入商店、食品" v-model="inputval">
                <input type='submit' name='submit' value='提交' @click="searchfood" class="submit bgcol ih40"></input>
            </form>
        </div>
        <div class="main">

          <div class='search bgfff'  v-if="list!=''">
              <div v-for="item in list" class="shoplist after">
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
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import foot from '../../components/foot/footer'
 export default {
    data(){
        return {
            inputval:"",
            prodct:"",
            list:[],
            xxclass:'xxspan2 w',
            imgBaseUrl:'https://fuss10.elemecdn.com', //图片域名地址
            imgshopUrl:"http://cangdu.org:8001/img/",
        }
    },
    mounted:function(){
        if (localStorage.getItem('prodct')) {
            this.prodct=JSON.parse(localStorage.getItem('prodct'));
        }
    },
    components:{
        foot
    },
    computed:{

    },
    methods:{
        searchfood:function(){
            var self=this;
            self.list=[];
            // str.indexOf(substr) >= 0;
            if(self.inputval){
                self.$http.get("http://cangdu.org:8001/shopping/restaurants?latitude=31.22967&longitude=121.4762").then(response => {
                    var shoplist=response.body;
                    shoplist.filter(function(item){
                        if (item.name.indexOf(self.inputval) >= 0) {
                            self.list.unshift(item);
                        }
                    })
                    if (response.body=='' || this.inputval=="") {
                        Toast('抱歉，空空如也');
                    }
                },response => {
                    console.log(response)
                })
            }
        },
        goaddress:function(e){
            var arr=[];
            if (localStorage.getItem('prodct')) {
                arr=JSON.parse(localStorage.getItem('prodct'));
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].geohash==e.geohash) {
                        var isok=true;
                        console.log(arr[i].geohash)
                    }
                }
            }
            if (!isok) {
                arr.unshift(e)
            }
            localStorage.setItem('prodct',JSON.stringify(arr));
            this.his=JSON.parse(localStorage.getItem('prodct'));
            this.list='';
            this.inputval='';
        },
        removeall:function(){

        }

    }
}
</script>
<style >
.cityinput{
width:100%;
height:40px;
margin:10px 0px;
outline:0px;
padding:0px 5px;
box-sizing:border-box;
}
.submit{
text-align:center;
color:white;
border-radius:3px;
display: block;
border: 0;
width: 100%;
outline: 0;
}
.fs0-8{
font-size:0.8rem !important;
}
.contenttop{
border-top:2px solid #E4E4E4;
border-bottom:2px solid #E4E4E4;
}

.main{
  border-top:2px solid #E4E4E4;
  position: absolute;
  bottom: 60px;
  top: 159px;
  overflow: auto;
  left: 0px;
  width: 100%;
}
.maintop{
  border-bottom:2px solid #E4E4E4;
}
.clearall{
  text-align:center;
}
.shoplist{
  padding:10px;
  overflow: hidden;
  display:flex;
}
.shoplist>a{width: 100%;}
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
