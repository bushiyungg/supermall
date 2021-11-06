<template>
  <swiper class="detail-swiper">
      <swiper-item v-for="(item,index) in topImages" :key="index">
          <img :src="item" alt="">
      </swiper-item>
  </swiper>
</template>

<script>
import Swiper from '../../../components/common/swiper/Swiper.vue'
import SwiperItem from '../../../components/common/swiper/SwiperItem.vue'
export default {
    name:"DeatilSwiper",
    components:{
        Swiper,
        SwiperItem
    },
    props:{
        topImages:Array,
        default(){
            return []
        }
    }
}
</script>

<style>
    .detail-swiper{
        height: 400px;
        overflow: hidden;
    }
</style>