<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
        class="tab-contoal"
        :titles="['流行', '新款', '精选']"
      @tabClick='tabClick' ref="tabControl1" v-show="isTabFixed" ></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3"
     @scroll="btnconten"
     :pull-up-load="true" @pullingUp="loadMove">
      <home-swiper :banners="banners" @SwiperImageLoad='SwiperImageLoad'></home-swiper>
      <recommand-view :recommends="recommends"></recommand-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
      @tabClick='tabClick' ref="tabControl2" :class="{fixed:isTabFixed}"></tab-control>
      <goods-list :goods="goods[currpage].list"></goods-list>
    </scroll>
    <!-- @click.native=backclick native修饰符表示可以监听元素的组件事件 -->
    <back-top @click.native="backclick" v-show="isShow"></back-top>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import HomeSwiper from "./childCpmps/HomeSwiper.vue";
import RecommandView from "./childCpmps/RecommandView.vue";
import FeatureView from "./childCpmps/FeatureView.vue";
import TabControl from "../../components/context/tabControl/TabControl";
import GoodsList from "../../components/context/goods/GoodsList.vue"
import Scroll from "../../components/common/scoll/Scroll.vue"
import BackTop from "../../components/context/backTop/BackTop.vue"
import { getHomeMultidata, getHomeGoods } from "../../network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommandView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currpage:'pop',
      isShow:false,
      tabOffsetTop:0,
      isTabFixed:false
    };
  },
  created() {//生命周期函数，组件创建时调用
    this.getHomeMultidata()
    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    //网络请方法
    getHomeMultidata(){
      getHomeMultidata().then((res) => {
      //console.log(res);
      this.banners = res.data.banner.list; //保存数据
      this.recommends = res.data.recommend.list;
    });
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then((res) => {
      //console.log(res);
      this.goods[type].list.push(...res.data.list)
      this.goods[type].page +=1
     
      this.$refs.scroll.finishPullUp()
    });

    },
    //事件监听方法
    tabClick(index){
     switch(index){
       case 0:
         this.currpage = 'pop'
         break;
        case 1:
         this.currpage = 'new'
         break;
        case 2:
         this.currpage = 'sell'
         break;
     }
     this.$refs.tabControl1.currpage = index
     this.$refs.tabControl2.currpage = index
    },
    backclick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    btnconten(position){
      //判断backtop是否显示
      this.isShow = (-position.y) > 1000
      //决定tabcontrol是否吸顶
      this.isTabFixed = (-position.y)>(this.tabOffsetTop-990)
    },
    loadMove(){
      this.getHomeGoods(this.currpage)
       this.$refs.scroll.scroll.refresh()
    },
    SwiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    }
  },
};
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0%;
    z-index: 9; */
  }
  /* .tab-contoal {
    position: sticky;
    top: 44px;
    z-index: 9;
  } */
  .content{
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;


  }
  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */

  .tab-contoal{
    position: relative;
    z-index: 9;
  }
</style>