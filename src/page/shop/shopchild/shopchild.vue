<template>
  <div class="padtop50 bgf5">
      <mt-header fixed class="fs1-2" title="商家详情">
          <router-link to=''  slot="left">
              <mt-button icon="back" @click="back"></mt-button>
          </router-link>
      </mt-header>

      <div class="maina bgfff">
          <mt-cell class="after" title="活动与属性"></mt-cell>
          <div class="pad10">
              <div class="ih30 fs0-8 ">
                  <span class="colfff myicon bgcolred mgr5">减</span>
                  <span class="col9f">满30减5，满60减8</span>
              </div>
              <div class="ih30 fs0-8 ">
                  <span class="colfff myicon bgcolred mgr5">减</span>
                  <span class="col9f">满30减5，满60减8</span>
              </div>
              <div class="ih30 fs0-8 ">
                  <span class="colfff myicon bgcolred mgr5">减</span>
                  <span class="col9f">满30减5，满60减8</span>
              </div>
              <div class="ih30 fs0-8 ">
                  <span class="colfff myicon bgcolred mgr5">减</span>
                  <span class="col9f">满30减5，满60减8</span>
              </div>
          </div>
      </div>

      <div class="mgtop10 bgfff">
          <mt-cell class="after" title="食品监督安全公示" to="https://user.qzone.qq.com/361769547/infocenter" is-link value="企业认证详情"></mt-cell>
          <div class="pad10 flex">
                <div class="w60 mgr5">
                     <img class="">
                </div>
                <div class="flex1">
                      <div class="ih30"><span class="col9f">督查检查结果:</span><span class="colred">差</span></div>
                      <div class="ih30"><span class="col9f">检查日期:</span><span class="col9f">2017-02-03</span></div>
                </div>
          </div>
      </div>

      <div class="mgtop10 bgfff">
          <mt-cell class="after" title="商家信息"></mt-cell>
          <div class="shopmain fs0-8">
            <div class="ih50 after padr10">
                <span>商家名称:效果演示</span>
            </div>
            <div class="ih50 after padr10">
                <span>地址:上海市江岸区</span>
            </div>
            <div class="ih50 after padr10">
                <span>营业时间:9:30-22:00</span>
            </div>
            <div class="ih50 after padr10">
                <span>营业执照</span>
                <span class="right"><icon class="w15 col9f" name="right"></icon></span>
            </div>
            <div class="ih50 after padr10">
                <span>餐饮服务许可证</span>
                <span class="right"><icon class="w15 col9f" name="right"></icon></span>
            </div>
          </div>
      </div>
  </div>
</template>

<script>


export default {
  data () {
    return {

    }
  },
  // route: {
  //     data() {
  //       this.$root.showLoading();
  //       return this.fetchCertificates().then((res) => {
  //         this.$root.dismissLoading();
  //         if (res.error) return this.$root.toastError(res.error);
  //         if(res.data.certificates.length >0){
  //           return res.data;
  //         }else{
  //           console.log(this.$route ,"----当前页面的url信息----");
  //         }
  //       });
  //     },
  //     canActivate (transition) {
  //       console.log(transition,"======上一个页面的url信息=======");
  //       transition.next();
  //     }
  //   },
  components:{
  //注册组件

  },
  mounted:function(){
  //生命周期

  },
  computed:{
  //计算属性

  },
  methods:{
  //函数
   back:function(){
       this.$router.go(-1);
   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.myicon{
  padding:0px 2px;
  border-radius:3px;
}
.bgcolred{
  background-color:red;
}
.shopmain{
  box-sizing:border-box;
  padding-left:10px;
}
</style>
