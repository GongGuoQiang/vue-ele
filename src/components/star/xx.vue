<template>
      <div class="xxbox fs10 mgl">
            <span v-for="(itemxx,index) in 5" class="xxspan1"><icon v-if="index+1<=num" name="xx2" class="xx"></icon><icon v-if="index+1>num" name="pingfen" class="xx"></icon><span v-if="num-(index)>0&&num-(index)<1" :class="xxclass+(num*10-index*10)"><icon name="xx2" class="xx"></icon></span></span>
      </div>
</template>

<script>

export default {
  data () {
    return {
       xxclass:"xxspan2 w",     //星星的class
    }
  },
  props:[
    "num"
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fs10{
  font-size: 12px;
  transform: scale(.8);
  display:inline-block;
}
.xxdiv{
  height:25px;
  line-height:25px;
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
  margin-right:1px !important;
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
.xx{
  width:10px;
  height:10px;
}
</style>
