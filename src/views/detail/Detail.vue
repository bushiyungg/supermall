<template>
  <div id="detail">
      <detail-nav-bar/>
      <deatil-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <deatil-shop-info :shop="shop"/>
      <detail-goods-info :datainfo="datainfo"/>
      <deatil-goods-params :goodsparams="goodsparams"/>
      <deta-rate :commoninfo="commponinfo"/>
      <goods-list :goods="recommend"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DeatilSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DeatilShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DeatilGoodsInfo.vue'
import DeatilGoodsParams from './childComps/DeatilGoodsParams.vue'
import DetaRate from './childComps/DetaRate.vue'
import GoodsList from '../../components/context/goods/GoodsList.vue'
import {getDetail,Goods,Shop,GoodsParams,getRecommend} from '../../network/detail'

export default {
    name:"Detail",
    data(){
        return{
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            datainfo:{},
            goodsparams:{},
            commponinfo:{},
            recommend:{}
        }
    },
    components:{
        DetailNavBar,
        DeatilSwiper,
        DetailBaseInfo,
        DeatilShopInfo,
        DetailGoodsInfo,
        DeatilGoodsParams,
        DetaRate,
        GoodsList
    },
    created(){
        //保存传入的iid
        this.iid = this.$route.params.iid

        //根据iid请求详情数据
        getDetail(this.iid).then(res =>{
            //console.log(res);
            //获取顶部的图片轮播数据
            const data = res.result
            this.topImages = data.itemInfo.topImages
            // 获取商品信息
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
            this.shop = new Shop(data.shopInfo)
            //保存商品的详情数据
            this.datainfo = data.detailInfo
            //保存尺寸数据
            this.goodsparams = new GoodsParams(data.itemParams.info,data.itemParams.rule)
            //保存评论信息
            if(data.rate.cRate !== 0){
                this.commponinfo = data.rate.list[0]
            }
           
        })
        //请求推荐数据
        getRecommend().then(res =>{
            console.log(res);
            this.recommend = res.data.list
        })
    }
}
</script>

<style>
    #detail{
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
</style>