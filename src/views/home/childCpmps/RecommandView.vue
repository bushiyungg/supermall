<template>
    <div class="recommend">
        <div v-for="(item,idnex) in recommends" :key="idnex" class="recommend-item">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name:"RecommandView",
    props:{
        recommends:{
            type:Array,
            default(){
                return{

                }
            }
        }
    }
}
</script>

<style>
    .recommend{
        display: flex;
        text-align: center;
        width: 100%;
        font-size: 12px;
        padding: 10px 0 30px;
        border-bottom: 10px solid #eee;
    }
    .recommend-item{
        flex: 1;
        
    }
    .recommend img{
        width: 65px;
        height: 65px;
    }
</style>