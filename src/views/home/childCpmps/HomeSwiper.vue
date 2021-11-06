<<template>
   <swiper class="home-swiper">
    <swiper-item v-for="item in banners" :key="item.image">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from '../../../components/common/swiper/idnex'
export default {
    name:'HomeSwiper',
    props:{
        banners:{
            type:Array,
            default(){
                return{
                    
                }
            }
        }
    },
    components:{
        SwiperItem,
        Swiper
    },
    data(){
      return{
        isLoad:false
      }
    },
    methods: {
      imageLoad(){ //监听图片是否加载完毕
      if(!this.isLoad){
        this.$emit('SwiperImageLoad')
        this.isLoad = true
      } 
      }
    },
}
</script>

<style>

</style>