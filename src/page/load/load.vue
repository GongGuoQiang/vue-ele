<template>
  <div id="elmloading">
    <div class="imgbox">
        <div class="img"></div>
    </div>
    <div class="loadfoot">
        <span class="footspan"></span>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#elmloading{
        width: 50px;
        height:130px;
        position:fixed;
        top: 50%;
        left: 50%;
        margin-top: -65px;
        margin-left: -25px;
        z-index:100;
    }
    .imgbox{
        width: 50px;
        height: 50px;
        animation: myfirst 0.8s infinite;
    }
    .img{
        height: 100%;
        width: 100%;
        background: url('../../images/load.png') no-repeat;
        background-size:100%;
        animation: myf 5.6s infinite;
    }
    .loadfoot{
        height: 20px;
        position: absolute;
        bottom: 0px;
        width: 100%;
        text-align: center;
    }
    .footspan{
        display: inline-block;
        height: 10px;
        width: 20px;
        margin: 5px 0px;
        border-radius: 50%;
        animation: foot 0.8s infinite;
        background: radial-gradient(#7E7E7E, #EDEDED);
    }

    @keyframes myfirst
    {
        0% {margin-top:0px;}
        50% {margin-top:50px;}
        100% {margin-top:0px;}
    }
    @keyframes myf
    {
        0% {background-position:0% 0%;}
        14.2% {background-position:0% 0%;}
        14.2001% {background-position:0% 16%;}
        28.4% {background-position:0% 16%;}
        28.4001% {background-position:0% 33%;}
        42.6% {background-position:0% 33%;}
        42.6001% {background-position:0% 50%;}
        56.8% {background-position:0% 50%;}
        56.8001% {background-position:0% 67%;}
        71% {background-position:0% 67%;}
        71.0001% {background-position:0% 84%;}
        85.2% {background-position:0% 84%;}
        85.2001% {background-position:0% 100%;}
        100% {background-position:0% 100%;}
    }

    @keyframes foot
    {
        0% {width:20px;}
        50% {width:100%;}
        100% {width:20px;}
    }
</style>
