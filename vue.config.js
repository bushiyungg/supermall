module.exports = {  //配置别名文件
    configureWebpack:{
        resolve:{
            alias:{
            'assets':'@/assets',
            'common':'@/common',
            'components':'@/components',
            'network':'@/network',
            'views':'@/views'
            }
        }
    }
}