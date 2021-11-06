<template>
  <div>
      <nav-bar>
          <div slot="left" class="detailimg" @click="btnleft">
              <img src="../../../assets/img/common/back.svg" alt="" >
          </div>
          <div slot="center" class="title">
              <div v-for="(item,index) in titles" 
              :key="index" class="title-item" 
              :class="{titledeta: index === currIndex}" @click="titleClick(index)">{{item}}</div>
          </div>
      </nav-bar>
  </div>
</template>

<script>
import NavBar from '../../../components/common/navbar/NavBar.vue'

export default {
    name:"DetailNavBar",
    components:{
        NavBar
    },
    data(){
        return{
            titles:['商品','参数','评论','推荐'],
            currIndex: 0
        }
    },
    methods: {
        titleClick(index){
            this.currIndex = index
        },
        btnleft(){
            this.$router.back()
        }
    },
}
</script>

<style>
    .title{
        display: flex;
        font-size: 12px;
    }
    .title-item{
        flex: 1;
    }
    .titledeta{
        color: red
    }
    .detailimg img{
        margin-top: 12px;
    }
</style>