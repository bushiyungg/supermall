<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import pullingUp from '@better-scroll/pull-up'
BScroll.use(pullingUp)
export default {
  name: "Scroll",
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      scroll: null,
    }
  },
  mounted() {
    //创建bscroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click:true,
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad,
      
    })
    //监听上拉事件
    this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp')
    })

    this.scroll.on('scroll',(position)=>{
      //Sconsole.log(position);
      this.$emit('scroll',position)
    })
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    // loadMove(){
    //   this.scroll.ref
    // }
  },
};
</script>

<style>
</style>