<template>
    <div>
        <mt-header fixed>
            <span slot="left">elm</span>
            <mt-button slot="right" @click="gologin" v-if="!logined">登录|注册</mt-button>
        </mt-header>
       <div class="padtop40">
           <div class="after ih50 padlr10 box bgfff">
               <span>当前选择城市</span>
               <span class="right fs0-8 col9f">定位不准时，请在城市列表选择</span>
           </div>
           <router-link :to='{name:"city",params:{name:this.$store.state.nowcity.name}}'>
            <mt-cell  :title="$store.state.nowcity.name" class="col after" to=''  is-link  value=""></mt-cell>
          </router-link>
            <div class="mgtop10 bgfff">
              <mt-cell class="after" title="热门城市"></mt-cell>
              <div class="itembox ovhid col">
                <div v-for="item in hotcity" @click="gocity({name:item.name,id:item.id})">{{item.name}}</div>
              </div>
            </div>
              <div v-for="(cities,index) in getlist" class="mgtop10 bgfff">
                <mt-cell class="after" :title="index"></mt-cell>
                <div class="itembox ovhid" >
                     <div v-for="city in cities" class="nowarp" @click="gocity({name:city.name,id:city.id})">{{city.name}}</div>
                </div>
              </div>
       </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
       citylist:"",
       hotcity:"",
       logined:false,
       user:{
           name:'',
           password:''
       }
    }
},
 component:{

 },
 mounted:function(){
     this.getCookie();
     //城市列表
     this.$http.get('http://cangdu.org:8001/v1/cities?type=group').then(response => {
         console.log(response)
         this.citylist=response.body;
     },response => {
         console.log(response)
     })
     //热门城市
     this.$http.get('http://cangdu.org:8001/v1/cities?type=hot').then(response => {
        console.log(response);
        this.hotcity=response.body;
      }, response => {
        console.log(response);
      });
      //定位城市
     this.$http.get('http://cangdu.org:8001/v1/cities?type=guess').then(response => {
       console.log(response);
       this.$store.state.nowcity={"name":response.body.name,"id":response.body.id};

     }, response => {
       console.log(response);
     });

 },
 computed:{
   //计算属性
       getlist:function(){
         var mycitylist={};
           for(var i=65;i<=90;i++){
             var num= String.fromCharCode(i);
             mycitylist[num]=this.citylist[num];
           }
           return mycitylist
       }
 },
 methods:{
      gologin:function(){
          this.$router.push('login');
      },
      gocity:function(e){
          this.$router.push({"name":'city',params:{name: e.name}});
          this.$store.state.nowcity = e;
      },
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
              var todo=this.$store.state.userInfo;
              console.log(todo)
      },
 }

}
</script>
<style scoped>
.itembox>div{
  width:25%;
  float:left;
  text-align:center;
  height:40px;
  line-height:40px;
  box-sizing: border-box;
  border-right:1px solid #e4e4e4;
  border-bottom:1px solid #e4e4e4;
}
.itembox>div:nth-child(4n){
  border-right:0px;
}
</style>
