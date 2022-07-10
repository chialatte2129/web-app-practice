import axios from 'axios'
import Store from '../vuex/index'

const ConfigBaseURL = '后端api地址'

//使用create方法创建axios实例
export const Service = axios.create({
    timeout: 10000, // 请求超时时间
    baseURL: ConfigBaseURL,
    method: 'post',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:""
    },
    validateStatus: function (status) {
        return status >= 200 && status < 300; // 默认的
    },
})

/**
 
* axios请求拦截器
*/
let timerEnd,timestamp;
Service.interceptors.request.use(function (config) {
    // 对所有POST请加密，必须是json数据提交，不支持表单
    timestamp = Date.parse(new Date());
    // Store.commit("showLoading");
    if (config.url == "/api/User/ClientLoginAndRegist"||config.url=="/api/User/IdCardExists") {
        return config
    }
    if (!sessionStorage.getItem("token")){// config.data = {
        //     ciphertext: Aes.EncryptData(config.data)
        // }
        config.headers.Authorization = "Bearer "+sessionStorage.getItem("token");
        return config;
    }
// return config
    //TODO:加密
    if (config.method == "post" && config.headers["Content-Type"] != "multipart/form-data"&&sessionStorage.getItem("token")) {
        config.headers.Authorization = `Bearer  ${sessionStorage.getItem("token")}`;
        // config.data = {
        //     ciphertext: Aes.EncryptData(config.data)
        // }
        return config;
    }
    return config
}, 

function (error) {
    // 对请求错误做些什么
    Store.commit("hideLoading");
    return Promise.reject(error);
})
