<template>
    <div>
        <mt-header title="个人中心">
          <router-link to="/" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
        </mt-header>
        <div class="text">
            <div class="head">
                <span>头像</span>
                <div class="fr">
                    <input type="file" name="file" class="upload__input" @change="uploadChange" accept="image/png,image/gif">
                    <img :src="imgDataUrl" alt="" />
                    <icon class="right"  name="right" width="16" height="16"></icon>
                </div>
            </div>
            <div class="head">
                <span>用户名</span>
                <div class="fr">
                    <span>{{user.name}}</span>
                    <icon class="right" name="right" width="16" height="16"></icon>
                </div>
            </div>
            <div class="g-num">
                账号绑定
            </div>
            <div class="head">
                <span>手机</span>
                <div class="fr">
                    <span>{{user.password}}</span>
                    <icon class="right" name="right" width="16" height="16"></icon>
                </div>
            </div>
            <div class="g-num">
                安全设置
            </div>
            <div class="head">
                <span>登录密码</span>
                <div class="fr">
                    <span>未设置</span>
                    <icon class="right" name="right" width="16" height="16"></icon>
                </div>
            </div>
            <div class="login_out">
                <a href="javascript:;" @click="loginOut">退出登录</a>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import img from '../../images/2.jpg';
 export default {
    data(){
        return {
          user: {
              "name":'',
              "password":''
          },
          imgDataUrl:img
        }
    },
    component:{

    },
    mounted:function(){
        this.getCookie();
    },
    computed:{
        mytype:function(){
            return this.value ? 'password':''
        }
    },
    methods:{
        back:function(){
            this.$router.go(-1);
        },
        getCookie:function () {
            if (document.cookie.length > 0) {
                    var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                    for (var i = 0; i < arr.length; i++) {
                        var arr2 = arr[i].split('='); //再次切割
                        //判断查找相对应的值
                        if (arr2[0] == 'name') {
                            this.user.name = arr2[1]; //保存到保存数据的地方
                        } else if (arr2[0] == 'password') {
                            this.user.password = arr2[1];
                        }
                    }
                }
        },
        loginOut:function(){
             this.setCookie('','', -1);
        },
        setCookie(c_name, c_pwd, exdays) {
               var self=this;
               var exdate = new Date(); //获取时间
               exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
               //字符串拼接cookie
               window.document.cookie = "name" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
               window.document.cookie = "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
               self.$router.push({path:"login"})
           },
           uploadChange(event){
                if(event.target.files.length>0){
                    this.files = event.target.files[0];  //提交的图片
                    this.getBase64(event.target,(url)=>{
                        this.imgDataUrl = 'data:image/png;base64,'+url;   //显示的图片
                    });
                }

            },
            getBase64 : function(file,callback){
            var maxWidth = 640;
            if(file.files && file.files[0]){
                var thisFile = file.files[0];
                if(thisFile.size>2019200){
                    // mualert.alertBox("图片不能超过800K");
                    alert("图片不能超过2M");
                    return
                };
                var reader = new FileReader();
                reader.onload = function(event){
                    var imgUrl = event.target.result;
                    var img = new Image();
                    img.onload = function(){
                        var canvasId = 'canvasBase64Imgid',
                        canvas = document.getElementById(canvasId);
                        if(canvas!=null){document.body.removeChild(canvas);}
                        var canvas = document.createElement("canvas");
                        canvas.innerHTML = 'New Canvas';
                        canvas.setAttribute("id", canvasId);
                        canvas.style.display='none';
                        document.body.appendChild(canvas);
                        canvas.width = this.width;
                        canvas.height = this.height;
                        var imageWidth = this.width,
                        imageHeight = this.height;
                        if (this.width > maxWidth){
                            imageWidth = maxWidth;
                            imageHeight = this.height * maxWidth/this.width;
                            canvas.width = imageWidth;
                            canvas.height = imageHeight;
                        }
                        var context = canvas.getContext('2d');
                        context.clearRect(0, 0, imageWidth, imageHeight);
                        context.drawImage(this, 0, 0, imageWidth, imageHeight);
                        var base64 = canvas.toDataURL('image/png',1);
                        var imgbase = base64.substr(22);
                        callback(imgbase)
                        //this.imgUrl =
                    }
                    img.src = imgUrl;
                }
                reader.readAsDataURL(file.files[0]);
            }
        },
        /*
        //保存表单数据到后台
        addSub(){
            let data  = {};
            let files = this.files;
            let param = new FormData(); //创建form对象
            if(files!=''){
                param.append('file', files,files.name); //单个图片 ，多个用循环 append 添加
            }else{
                this.$message.error('请添加图片');
            }
            param.append('param', JSON.stringify(data));//添加form表单中其他数据
            let config = {
                headers:{'Content-Type':'multipart/form-data'}
            };  //添加请求头
            this.$ajax.post(this.ajaxUrl +'addStation',param,config)
              .then(response=>{
                var ret = response.data;
                if(ret.status){

                    this.$message({
                        message : '新增成功',
                        type : 'success'
                    })
                    //清空数据
                    this.imgDataUrl = '';
                    this.files = [];
                }else{
                    this.msg(ret.msg);
                }
            })
        },
        */
    }
}
</script>
<style >
.text .head{
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 0.6rem;
    border-bottom: 1px solid #dcdcdc;
    color: #666;
}
.text .head img{
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
}
.text .head .fr{
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
}
.text .head>span{
    font-weight: bold;
}
.text .g-num{
    font-size: 14px;
    color: #888;
    text-indent: 10px;
    padding: 0.6rem 0;
}
.login_out a{
    text-align: center;
    background: #fff;
    padding: 1rem;
    font-size: 1rem;
    color: #ff5339;
    font-weight: bold;
    display: block;
    margin-top: 20px;
}
.text .right{
    color: #888;
    margin-left: 8px;
}
.upload__input{
    position: absolute;
    width: 100px;
    height: 40px;
    right: 0;top: 0;
    opacity: 0;
}
</style>
