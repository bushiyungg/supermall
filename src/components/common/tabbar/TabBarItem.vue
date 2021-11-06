<template>
  <div class="tab-baritem" @click="btnitem">
      <div v-if="!isactive"><slot name='item-icon'></slot></div>
      <div v-else ><slot name="item-icon-active"></slot></div>
      <div :style="activeStyle"><slot name='item-text'></slot></div>
  </div>
</template>

<script>
export default {
    name:'TabBarItem',
    props:{
        path:String, //把父组件里面的数据传送过来
        activeColor:{
            type:String,
            default:'red'
        }
    },
    data(){
        return{
            //isactive:true,
        }
    },
    computed:{
        isactive(){
            return this.$route.path.indexOf(this.path)!== -1  //判断当前你的path是不是传入的path
        },
        activeStyle(){
            return this.isactive ? {color:this.activeColor} : {}
        }
    },
    methods: {
        btnitem(){
            this.$router.push(this.path)
        }
    },
}
</script>

<style>
    .tab-baritem{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;

  }
  .tab-baritem img{
      width: 24px;
      height: 24px;
      margin-top: 3px;
      vertical-align: middle;
  }
  /* .itemColor{
      color: red;
  } */
</style>