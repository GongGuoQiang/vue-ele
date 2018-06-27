<template>
    <div>
        <mt-header :title="$route.params.name" class='fs1-2'>
          <router-link to="/" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
          <mt-button  slot="right" class='fs0-8'>切换城市</mt-button>
        </mt-header>
        <div class="pad10 bgfff padbot10">
            <form v-on:submit.prevent >
                <input  class="cityinput" type="text" name=""  required  placeholder="请输入商务楼、学校、地址" v-model="inputval">
                <input type='submit' name='submit' value='提交' @click="searchcity" class="submit bgcol ih40"></input>
            </form>
        </div>

        <div class="main">
          <div class="his after" v-if="list==''">
            <div class='maintop fs0-8 padlr10'>搜索历史</div>
            <div class="mainbody bgfff " >
              <div class="pad10 after"v-for="item in his" @click="gomiste">
                  <div class="ih30">{{item.name}}</div>
                  <div class="ih30 fs0-8 col9f">{{item.address}}</div>
              </div>
              <div class="clearall ih30 pad10 col9f"  @click='removeall'>
                  清空所有
              </div>
            </div>
          </div>

          <div class='search bgfff'  v-if="list!=''">
              <div class="pad10 after" v-for='address in list' @click="goaddress({name:address.name,latitude:address.latitude,longitude:address.longitude,address:address.address,geohash:address.geohash})">
                  <div class="ih30">{{address.name}}</div>
                  <div class="ih30 fs0-8 col9f">{{address.address}}</div>
              </div>
          </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
 export default {
     name:'city',
    data(){
        return {
           inputval:"",
           list:'',
           his:"",
           title:''
        }
    },
    components:{

    },
    mounted:function(){
        if(localStorage.getItem("his")){
        this.his=JSON.parse(localStorage.getItem("his"));
        }
        this.title=this.$store.state.nowcity.name;
    },
    computed:{

    },
    methods:{
        //函数
        searchcity:function(){
            if (this.inputval) {
                this.$http.get('http://cangdu.org:8001/v1/pois?city_id='+this.$store.state.nowcity.id+'&keyword='+this.inputval+'&type=search').then(response => {
                  console.log(response.body);
                  this.list=response.body;
                  if (response.body=='' || this.inputval=="") {
                     Toast('抱歉，空空如也');
                  }
                }, response => {
                 console.log(response)
                });
            }
          },
          goaddress:function(e){
              var arr=[];
              if (localStorage.getItem('his')) {
                  arr=JSON.parse(localStorage.getItem('his'));
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
              localStorage.setItem('his',JSON.stringify(arr));
              this.his=JSON.parse(localStorage.getItem('his'));
              this.list='';
              this.inputval='';
          },
          removeall:function(){
          localStorage.clear();
          this.his="";
       },
       gomiste:function(){
           this.$router.push({path:'/miste'})
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
}
.maintop{
  border-bottom:2px solid #E4E4E4;
}
.clearall{
  text-align:center;
}
</style>
