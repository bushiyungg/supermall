import axios from 'axios'
//封装axios实例
export function request(config){
    // //创建axios实例
    // const instance = axios.create({
    //   baseURL:'http://123.207.32.32:8000',
    //   timeout:5000  
    // })
   
            const instance = axios.create({
              baseURL:'http://152.136.185.210:7878/api/hy66',
              timeout:5000  
            })
        //       //网络请求
        // instance(config)
        //   .then((res)=>{
        //       resolve(res)
        // }).cath(err =>{
        //       reject(err)
        // })
            // axios的拦截器
           instance.interceptors.request.use(config=>{
                return config
            },err =>{
                //console.log(err);
            })
 

            instance.interceptors.response.use(res =>{
                return res.data
            },err =>{
                console.log(err);
            })
        //直接return,因为它本身就是一个new promise
        return instance(config)

  
}
