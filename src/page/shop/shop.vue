<template>
  <div id="shop" class="bgfff">
      <transition name="left">
      <div class="big" v-if="myrouter">
        <div class="topbg">
            <img class="topbgimg" :src="imgpath+shopinfo.image_path">
        </div>
        <div class="shoptop">
            <div class="toptop ih30">
            <router-link to="/">
              <icon class="backicon" name="back"></icon>
            </router-link>
              <span class="right">
                  <icon class="backicon2" name="cart"></icon>
                  <icon class="backicon2" name="more"></icon>
              </span>
            </div>
            <div class="topfoot">
                <div class="topleft">
                    <img :src="imgpath+shopinfo.image_path">
                </div>
                <div class="topright nowarp" @click="toshopchild(shopinfo.id)">
                    <div class="foota">
                        <div class="footamain fs1-2 nowarp">{{shopinfo.name}}</div>
                        <icon name="right" class=" icon3"></icon>
                    </div>
                    <div class="footb nowarp">
                        <div class="nowarp">公告:{{shopinfo.promotion_info}}</div>
                    </div>
                    <div class="footc">
                        <span class="footcmain"><span>蜂鸟传送</span>•<span>{{shopinfo.order_lead_time}}</span></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="shopmid mgtop10">
            <div v-if="shopinfo.activities" class="midtop"><span class="te mgr5">{{shopinfo.supports[0].icon_name}}</span><span>{{shopinfo.supports[0].description}}</span><span class="right">{{shopinfo.supports.length}}个活动 <icon name="down" class="icon4"></icon></span></div>
            <div class="mytab">
                <div @click="shoporscore=true" :class="{ on:shoporscore }">商品</div>
                <div @click="shoporscore=false" :class="{ on:!shoporscore }">评价{{shopinfo.rating}}分</div>
            </div>
        </div>
   <transition name="left">
    <div class="shopmain" v-if="shoporscore">
        <div class="mianleft">
            <div class="leftdiv" v-model="index" @click="ison=index,itemgo(index)" :class="{on:ison==index}" v-for="(item,index) in getshopnum">
              <div>
                <icon v-if="index==0" class="icon5 hot" name="hot"></icon>
                <icon v-if="index==1" class="icon5 discount" name="discount"></icon>
                <span>{{item.name}}</span>
                 <!-- <span class="rednum">{{item.mynum}}</span> -->
              </div>
            </div>
        </div>
        <div class="ball-container"><!--小球-->
            <div v-for="ball in balls">
                <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
                    <div class="ball" v-show="ball.show">
                        <div class="inner inner-hook"></div>
                    </div>
                </transition>
            </div>
        </div>
        <div class="mainright">
            <div class="item" v-for="item in getshopnum" >
                <div class="itemtop ih30 after">
                    <span class="fs15">{{item.name}}</span>
                    <span class="fs0-8 col9f">{{item.description}}</span>
                </div>
                <div class="itemmain">
                    <div class="iteminfo after" v-for="itmelist in item.foods">
                        <div class="infoimgbox" >
                            <img :src="imgpath+itmelist.image_path">
                        </div>
                        <div class="inforight" >
                            <div class="fs15 ih20">{{itmelist.name}}</div>
                            <div class="ih15 col9f"><span>{{itmelist.tips}}</span></div>
                            <div class="ih15"><span v-if="false"><span class="zk">7折</span><span class="yh">每单限1份优惠</span></span></div>
                            <div class="ih20">
                            <span class="colred fs12">￥</span>
                            <span class="colred mgr5">{{itmelist.specfoods[0].price}}</span>
                            <span class="fs12 col9f midline">56￥</span>
                            <span @click="addcar($event,itmelist)"><icon v-if="itmelist.specfoods.length==1"  name="add" class="addicon right" ></icon></span>
                            <span class="fs12 right gz" v-if="itmelist.specfoods.length>1">选规则</span>
                            <transition name="right">
                                <span class="ih20 right" style="margin-right:15px;">
                                    <span  v-if="itmelist.mynum" @click="removecar(itmelist)"><icon class="reduce " name="offline"></icon></span>
                                    <span class="ih20 inblock y-4" v-if="itmelist.mynum>0">{{itmelist.mynum}}</span>
                                </span>
                            </transition>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</transition>
    <transition name="right">
    <div class="score" v-if="!shoporscore">
            <div class="scoretop">
              <div class="scoretopleft">
                  <div class="fs1-2 colf60">{{shopinfo.rating}}</div>
                  <div class="fs15 col9f">综合评价</div>
                  <div class="fs0-8 col9f">高于周边商家{{parseInt(scorerating.compare_rating*100)}}%</div>
              </div>
              <div class="scoretopright">
                  <div><span class="fs15 col9f">评价服务</span><stars :num="scorerating.service_score.toFixed(1)"></stars><span class="colf60 right num">{{scorerating.service_score.toFixed(1)}}</span></div>
                  <div><span class="fs15 col9f">菜品评价</span><stars :num="scorerating.food_score.toFixed(1)"></stars><span class="colf60 right num">{{scorerating.food_score.toFixed(1)}}</span></div>
                  <div><span class="fs15 col9f">送达时间</span><span class="fs15 time">{{scorerating.deliver_time}}分钟</span></div>
              </div>
            </div>
            <div class="scoremain">
                <div class="scoremaintop after">
             <div v-for="(item,index) in scoretags" class="ih30 fs0-8" :class="{sty2:item.unsatisfied,sty1:!(item.unsatisfied),on:index==scoreindex}">{{item.name}}({{item.count}})</div>
           </div>
                  <div class="scoremaininfo">
                      <div class="scoreitem after"v-for="item in score" >
                          <div class="scoreitemleft">
                              <img :src="imgaddpath(item.avatar)">
                          </div>
                          <div class="scoreitemright fs12 col9f">
                              <div>
                                  <span>{{item.username}}</span>
                                  <span class="right">{{item.rated_at}}</span>
                              </div>
                              <div>
                                  <stars :num="item.rating_star"></stars>
                              </div>
                              <div>
                                   {{item.time_spent_desc}}
                              </div>
                              <div class="scoreimgbox">
                                <img v-for="itema in item.item_ratings" :src="imgaddpath(itema.image_hash)">
                              </div>
                              <div class="namebox">
                                  <div v-for="itemb in item.item_ratings">{{itemb.food_name}}</div>
                              </div>
                          </div>
                      </div>
                  </div>
            </div>
        </div>
    </transition>

    <transition name="opacity">
       <div v-if="carinfo&&mycar.length>=1" class="car">
          <div class="carmain flex2">
              <div class="cartop padlr10 ih50">
                    <span>购物车</span>
                    <span @click="mycar=[]" class="right"><icon class="w15 mgr5 y2" name="delete"></icon>清空</span>
              </div>
              <div class="carmainbox flex1">
                  <div v-for="item in mycar" class="carbox after padlr10 bgfff ih50">
                        <span class="bold col666">{{item.shop.specfoods[0].name}}</span>
                        <span class="right">
                            <span class="colred mgr5">￥{{item.shop.specfoods[0].price*item.num}}</span>
                            <span @click="item.num=item.num-1"><icon class="reduce y4" name="offline"></icon></span>
                            <span class="ih20 inblock">{{item.num}}</span>
                            <span @click="item.num=item.num+1" class=""><icon name="add" class="addicon y4"></icon></span>
                        </span>
                  </div>
              </div>
          </div>
      </div>
    </transition>

    <transition name="left">
     <div v-if="footdiv" class="foot" :class="{on:mycar.length>=1}">
        <div class="footleft" @click="mycar.length>0?carinfo=!carinfo:carinfo=false">
            <div class="footlogo">
                <icon name="footcar" class="footicon"></icon>
                <div class="rednum" v-if="mycar">{{mycarshopnum}}</div>
            </div>
            <div class="footmain">
                <div v-if="mycar.length<1" class="">未选购商品</div>
                <div class="ih30 fs1-2">￥ {{mycarshoppic}}</div>
                <div class="ih20">{{this.shopinfo.piecewise_agent_fee.tips}}</div>
            </div>
        </div>
        <div class="footright" :class="{on:shoppicbig==1}">
            <span  v-if="mycar.length<1">￥{{this.shopinfo.float_minimum_order_amount}}起送</span>
            <span  v-if="shoppicbig==2">还差￥{{this.shopinfo.float_minimum_order_amount-mycarshoppic}}起送</span>
            <span v-if="shoppicbig==1">去结算</span>
        </div>
      </div>
    </transition>
    <load v-if="num!=1"></load>
</div>
</transition>
    <transition name="right">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import stars from '../../components/star/xx'
import animation from '../../components/animation/animation'
import load from '../load/load'

export default {
  data () {
    return {
    imgpath:'http://cangdu.org:8001/img/',    //商家头像的路径地址path
    shopinfo:'',
    shopmean:"",
    shoporscore:true,
    score:"",                                 //评价信息
    scorerating:"",                           //评价分数
    scoretags:"",                             //评价分类
    scoreindex:0,
    num:1,
    ison:0,
    activeIndex:0,
    index:0,
    modal:false,                              //模态框显示隐藏
    myrouter:true,
    footdiv: true,
    mycar:"",
    addok:false,
    carinfo:false,
    balls: [
         {
           show: false
         },
         {
           show:  false
         },
         {
           show:  false
         },
         {
           show:  false
         },
         {
           show:  false
         }
       ],
       dropBalls:[]
    }
  },
  components:{
  //注册组件
  stars,load,animation

  },
  mounted:function(){
  //生命周期
   //餐馆详情
    var that=this;
    if(localStorage.getItem("mycar")){
          that.mycar=JSON.parse(localStorage.getItem("mycar"));
      }
   that.num=that.num-5;
   this.$http.get('http://cangdu.org:8001/shopping/restaurant/'+this.$route.params.id).then(response => {
     console.log("餐馆详情",response.body);
     this.shopinfo=response.body;
     this.$store.state.foodid=response.body.id;
     that.num=that.num+1;
   }, response => {
       that.num=that.num+1;
     console.log(response);
   });
   //食品详情
     this.$http.get('http://cangdu.org:8001/shopping/v2/menu?restaurant_id=1').then(response => {
       console.log("食品详情",response.body);
       this.shopmean=response.body;
       that.num=that.num+1;
     }, response => {
         that.num=that.num+1;
       console.log(response);
     });
     //评论详情
     this.$http.get('http://cangdu.org:8001/ugc/v2/restaurants/1/ratings?offset=0&limit=10').then(response => {
       console.log(response);
       this.score=response.body;
       that.num=that.num+1;
     }, response => {
       console.log(response);
         that.num=that.num+1;
     });
     //评论分数
     this.$http.get('http://cangdu.org:8001/ugc/v2/restaurants/1/ratings/scores').then(response => {
       console.log(response);
       this.scorerating=response.body;
         that.num=that.num+1;
     }, response => {
       console.log(response);
         that.num=that.num+1;
     });
      //评论分类
     this.$http.get('http://cangdu.org:8001/ugc/v2/restaurants/1/ratings/tags').then(response => {
       console.log(response);
       this.scoretags=response.body;
            that.num=that.num+1;
     }, response => {
       console.log(response);
          that.num=that.num+1;
     });
     let mydiv=document.querySelector('.mainright');
      mydiv.addEventListener('scroll', this.handleScroll);
  },
      computed:{
          //计算属性
              //计算商品数量
              mycarshopnum:function(){
                  var num=0;
                  for(var i=0;i<this.mycar.length;i++){
                        num+=this.mycar[i].num;
                  }
                  return num
              },
              //计算商品价格(商品只有一个种类)
              mycarshoppic:function(){
                  var num=0;
                   if(this.mycar.length){
                      for(var i=0;i<this.mycar.length;i++){
                        num+=(this.mycar[i].shop.specfoods[0].price*this.mycar[i].num);
                      }
                   };
                  return num;
              },
              //判断商家起送价与目前购物车价格
              shoppicbig:function(){
                            if(this.mycarshoppic>=this.shopinfo.float_minimum_order_amount){
                                return 1
                            }else if(this.mycarshoppic==0){
                                return 3
                            }else{
                                return 2
                            }
              },
              //商品与购物车数量结合
            getshopnum:function(){
                for(var i=0;i<this.shopmean.length;i++){
                    for(var k=0;k<this.shopmean[i].foods.length;k++){
                          var isadd=true;                          //判断该商品是否在购物车
                          for( var h=0;h<this.mycar.length;h++){
                              if(this.shopmean[i].foods[k].specfoods[0]._id==this.mycar[h].shop.specfoods[0]._id){
                                  this.shopmean[i].foods[k].mynum=this.mycar[h].num;
                                  isadd=false;
                                  break;
                              }
                          }
                          if(isadd){
                              this.shopmean[i].foods[k].mynum=0;
                          }
                    }
                }
                return this.shopmean
            }

      },
      methods:{
      //函数
      imgaddpath:function(e){
      return "https://fuss10.elemecdn.com/"+e+".jpeg"
    },
    newpage:function(){
        this.myrouter=(this.$route.path=="/shop/"+this.$route.params.id ?true:false);
    },
    toshopchild:function(e){
        this.$store.state.foodid = e;
        console.log(this.$store.state.foodid)
        this.$router.push({path:'/shop/'+e+'/shopchild'})
    },
      itemgo:function(index){
       var canvas=document.getElementsByClassName('item');
       var  p= canvas[index].parentElement;
       var cs = p.children;
           canvas[index].style.display="block";
           for(var i = 0; i < canvas.length; i++){
                var ci = cs[i];
                if(canvas[index] != ci){
                    cs[i].style.display="none";
                }
            }
        },
        addcar:function(event, e){
             this.drop(event.target);
          var that=this;
          if(localStorage.getItem("mycar")){
              var mycar=JSON.parse(localStorage.getItem("mycar"));
              var addok=true;
              console.log(e.item_id)                                             //数据是否添加
              for(var i =0;i<mycar.length;i++){
                  if(mycar[i].shop.item_id==e.item_id&&mycar[i].shop.category_id==e.category_id&&mycar[i].shop.restaurant_id==e.restaurant_id){
                      mycar[i].num=mycar[i].num+1;
                      addok=false;
                      break;
                  }
              }
              if(addok){
                    mycar.push({"shop":e,"num":1});
              }
              that.mycar=mycar;
              localStorage.setItem("mycar",JSON.stringify(mycar));
          }else{
              var mycar=[{"shop":e,"num":1}];
              that.mycar=mycar;
              localStorage.setItem("mycar",JSON.stringify(mycar));
          }
      },
      removecar:function(e){
            for(var i=0;i<this.mycar.length;i++){
                if(this.mycar[i].shop.specfoods[0]._id==e.specfoods[0]._id){
                      this.mycar[i].num==1?this.mycar.splice(i,1):(this.mycar[i].num=this.mycar[i].num-1);
                      break;
                }
            }
            localStorage.setItem("mycar",JSON.stringify(this.mycar));
        },
        drop(el){ //抛物
            for(let i=0;i<this.balls.length;i++){
                let ball= this.balls[i];
                if(!ball.show){
                    ball.show = true;
                    ball.el=el;
                    this.dropBalls.push(ball);
                    return;
                }
            }
        },
        beforeDrop(el) {/* 购物车小球动画实现 */
            let count = this.balls.length;
            while (count--) {
                let ball = this.balls[count];
                if (ball.show) {
                    let rect = ball.el.getBoundingClientRect(); //元素相对于视口的位置
                    let x = rect.left - 32;
                    let y = -(window.innerHeight - rect.top - 22);  //获取y
                    el.style.display = '';
                    el.style.webkitTransform = 'translateY('+y+'px)';  //translateY
                    el.style.transform = 'translateY('+y+'px)';
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = 'translateX('+x+'px)';
                    inner.style.transform = 'translateX('+x+'px)';
                }
            }
        },
        dropping(el, done) { /*重置小球数量  样式重置*/
            let rf = el.offsetHeight;
            el.style.webkitTransform = 'translate3d(0,0,0)';
            el.style.transform = 'translate3d(0,0,0)';
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = 'translate3d(0,0,0)';
            inner.style.transform = 'translate3d(0,0,0)';
            el.addEventListener('transitionend', done);
        },
        afterDrop(el) { /*初始化小球*/
            let ball = this.dropBalls.shift();
            if (ball) {
            ball.show=false;
            el.style.display = 'none';
        }
    }
    },
    watch:{
         "$route":"newpage",
         mycar:{
          handler (val1,val2){
                for(var i=0;i<val1.length;i++){
                    if(val1[i].num==0){
                        val1.splice(i,1);
                    }
                }
                if(!(val1.length>=1)){
                    this.carinfo=false;
                }
                localStorage.setItem("mycar",JSON.stringify(val1));
          },
          deep:true
}
    },
    // 在组件初始化时调用，可以简单理解为页面加载时
     created () {
        this.myrouter=(this.$route.path=="/shop/"+this.$route.params.id ?true:false);
     }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.foot{
  height:50px;
  line-height:50px;
  background-color:#594C46;
  display:flex;
  position:fixed;
  bottom:0px;
  left:0px;
  width:100%;
}
.foot.on .footicon{
  color:#fff;
}
.foot.on .footmain{
  color:#fff;
}
.foot.on .footlogo{
  background-color:#3190E8;
}
.foot.on .footright{
  color:#fff;
}
.footleft{
  flex:2;
  display:flex;
}
.footright{
  flex:1;
  text-align:center;
  color:#B7B7B7;
  background-color:#61686A;
}
.footright.on{
  background-color:#4CD964;
  color:white;
}
.footlogo{
  text-align:center;
  width:50px;
  height:50px;
  border-radius:50%;
  background-color:#515151;
  margin:0px 10px;
  border:3px solid #444446;
  transform:translatey(-15px)
}
.footicon{
  color:#8a8a8a;
  width:40px;
  height:40px;
  margin-top:7px;
}
.footmain{
  height:50px;
  color:#ADADAD;
  font-size:0.8rem;
}
.rednum{
   position: absolute;
   top:-3px;
   right:-5px;
   border-radius:50%;
   background-color:red;
   color:white;
   height:18px;
   width:18px;
   text-align:center;
   line-height:18px;
   font-size:12px;
}
.big{
  display:-webkit-box;
  -webkit-box-orient:vertical;
  height:100vh;
}
.item{display: none;}
.item:first-child{display: block;}
.fs10{
  font-size: 12px;
  transform: scale(.8);
  display:inline-block;
}
.scoretop{
  display:flex;
  padding:0px 10px 10px 10px;
  border-bottom:10px solid #F5F5F5;
}
.scoretopleft{
  flex:1;
  text-align:center;
}
.scoretopright{
  flex:1;
}
.scoretopright span{font-size: 12px;}
.scoremain{
  padding:0px 10px;
}
.scoremaintop{
  padding:10px 0px 5px 0px;
  display:flex;
  flex-wrap:wrap;
}
.scoremaintop>div{
  padding:0px 8px;
  border-radius:5px;
  margin-right:5px;
  margin-bottom:5px;
}
.sty1{
  background-color:#EBF5FF;
  color:#9f9f9f;
}
.sty1.on{
  background-color:#3190E8;
  color:#fff;
}
.sty2{
  background-color:#F5F5F5;
  color:#AFAFAF;
}
.scoreitem{
  display:flex;
  margin-top:10px;
}
.scoreitemleft{
  width:50px;
  height:50px;
  margin-right:10px;
  background: #fff;
  border: 1px solid #eee;
}
.on span{color: #0B89FF!important;}
.scoreitemleft>img{
  width:100%;
  border-radius:50%;
}
.scoreitemright{
  flex:1;
}
.num{margin-right: 20px;}
.namebox{
  display:flex;
  flex-wrap: wrap;
}
.namebox>div{
  border:1px solid;
  padding:3px 3px;
  margin-right:5px;
  border-radius:3px;
  margin-bottom:5px;
}
.score{
  padding-top:10px;
  flex:1;
  overflow: scroll;
}
.scoreimgbox>img{
  width:4rem;
  height:4rem;
  background-color:#fff;;
  border: 1px solid #eee;
  margin-right:10px;
}
.shoptop{
  height:120px;
  background-color: rgba(119,103,137,.43);
  box-sizing:border-box;
  padding:10px 10px 0px 10px;
  position: relative;
}
.topbg{
  position: absolute;
  width:100%;
  height:120px;
  left:0px;
  right:0px;
  overflow:hidden;
}
.topbgimg{
  width:100%;
  filter: blur(10px);
}
.backicon{
  height:30px;
  width:30px;
}
.backicon2{
  height:25px;
  width:25px;
}
.toptop{
  margin-bottom:10px;
}
.topfoot{
  height:70px;
  display:flex;
}
.topleft{
  height:80px;
  width:80px;
  background-color:#3c3c3c;
  margin-right:10px;
  border-radius:3px;
  box-shadow:0 0 5px #3c3c3c;
}
.topleft>img{
  max-width:100%;
  max-height:100%;
  height: 100%;
  width: 100%;
}
.topright,.topleft{
  float:left;
}
.topright{
  height:100%;
  flex:1;
}
.foota{
  height:30px;
  color:white;
  line-height:30px;
  display:flex;
}
.time{margin-left: 20px;color: #999;}
.icon3{
  width:20px;
  height:20px;
  margin-top:5px;
}
.footc{
  height:20px;
  line-height:20px;
  font-size:12px;
}
.footb{
  font-size:12px;
  color:white;
}
.scoreitemright span{font-size: 12px;}
.namebox>div{font-size: 14px;}
.footcmain{
  background-color:#0097FF;
  color:white;
  padding:0px 5px;
}
.shopmid{
  padding:10px 10px 0px 10px;
  margin-bottom:10px;
  border-bottom:2px solid #F8F8F8;
}
.midtop{
  font-size:12px;
}
.te{
  background-color:#F08449;
  padding:0px 1px;
  color:white;
}
.mytab{
  overflow:hidden;
  margin-top:10px;
}
.mytab>div{
  float:left;
  padding-bottom:10px;
  margin-right:10px;
  border-bottom:2px solid white;
}
.mytab>div.on{
  color:#0B89FF;
  border-color:#0B89FF;
}
.leftdiv{
  width:70px;
  color:#727272;
  background-color:#F8F8F8;
  text-align: center;
  position: relative;
}
.leftdiv>div{
  padding:15px 0px;
  border-bottom:1px solid #F1F1F1;
}
.leftdiv>div span{font-size: 14px;color: #333;}
.leftdiv.on{
  background-color:white;
  color:#080808;
}
.leftdiv.on>div{
  border:0px;
}
.icon5{
  width:15px;
  height:15px;
}
.mianleft{
  width:80px;
  box-sizing:border-box;
  overflow:scroll;
  margin-bottom: 50px;
}
#shop{
  display:-webkit-box;
  -webkit-box-orient:vertical;
  height:100vh;
}
.shopmain{
  -webkit-box-flex:1;
  display:-webkit-box;
}
.mainright{
  -webkit-box-flex:1;
  overflow:scroll;
  padding-left:10px;
  margin-bottom: 50px;
}
.foot{
  height:50px;
  line-height:50px;
  background-color:#594C46;
  display:flex;
}
.footleft{
  flex:2;
  display:flex;
}
.footright{
  flex:1;
  text-align:center;
  color:#B7B7B7;
  background-color:#61686A;
}
.footlogo{
  text-align:center;
  width:50px;
  height:50px;
  border-radius:50%;
  background-color:#515151;
  margin:0px 10px;
  border:3px solid #444446;
  transform:translatey(-15px)
}
.hot{fill:red;}
.discount{color: yellow;}
.footicon{
  width:40px;
  height:40px;
  margin-top:7px;
}
.footmain{
  height:50px;
  color:#ADADAD;
  font-size:0.8rem;
}
.itemmain{
  padding-right:10px;

}
.iteminfo{
   height:70px;
   display:flex;
   padding:10px 0px;
}
.colf60{color: red;}
.infoimgbox{
  width:70px;
  height:70px;
  margin-right:5px;
  background-color:red;
}
.infoimgbox>img{
  width:100%;
  height:100%;
}
.inforight{
  flex:1;
}
.ih20{
  height:20px;
  line-height:20px;
}
.ih15{
  height:15px;
  line-height:15px;
  font-size: 12px;
}
.addicon{
  width:20px;
  height:20px;
  color: #0B89FF;
}
.reduce{width:16px;
height:16px;
color: #0B89FF;}
.colred{color: red;}
.midline{text-decoration: line-through;font-size: 12px;}
.gz{background: #0B89FF;font-size: 12px;padding: 0 2px;color: #fff;border-radius: 4px;}
.zk{
  background-color:#FF5F15;
  padding:0px 3px;
  color:white;
  border:1px solid #FF5F15;

}
.yh{
  padding:0px 3px;
  color:#FF5F15;
  border:1px solid #FF5F15;
}
.backicon{color: #fff;}
.backicon2{color: #fff;}
.car{
   position: fixed;
   top:0px;
   left:0px;
   width:100vw;
   height:100vh;
   background-color:rgba(0,0,0,0.5);
}
.carmain{
  position:absolute;
  width:100%;
  bottom:0px;
  left:0px;
  padding-bottom:50px;
  max-height:70%;
}
.rednum2{position: absolute;right: 5px;top: -5px;background: red;width: 10px;height: 10px;border-radius: 50%;}
.cartop{
  background-color:#ECEFF1;
}
.carmainbox{
  overflow-y: scroll;
}
.y2{
  transform: translateY(2px);
}
.y4{
  transform: translateY(4px);
}
.bold{
  font-weight: bold;
}
.col666{
  color: #666;
}
.ball-container .ball{
    position :fixed;
    left: 32px;
    bottom: 22px;
    z-index:200;
    transition: all .6s cubic-bezier(0.49, -0.29, 0.75, 0.41);
}
.ball-container .ball{
       position :fixed;
       left: 32px;
       bottom: 22px;
       z-index:200;
       transition: all .6s cubic-bezier(0.49, -0.29, 0.75, 0.41);
       }
.ball-container .inner{
         width :16px;
         height: 16px;;
         border-radius: 50%;
         background: rgb(0,160,220);
         transition: all .6s linear;
     }
</style>
