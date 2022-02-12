// console.log("ajax")

// xhr open() onreadystatechange readyState status responseText

//1.实例化一个请求对象
const xhr = new XMLHttpRequest()
//传递参数 不发送
xhr.open("GET", "http://localhost:7777/js/userInfo?name=test", true) //true表示异步
//  状态改变会触发自定义的函数
console.log(xhr.readyState)



xhr.onreadystatechange = function () {
    // readyState:  0 => 未初始化 没有调用send()
    //              1 => 载入 已经调用send() 正在发送请求
    //              2 => send()执行完成 接收到相应的全部内容
    //              3 => 解析内容
    //              4 => 解析完成 可以在客户端调用
    // console.log(xhr.readyState)
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            // 浏览器自己跳
            // 301 永久重定向
            // 302 临时重定向
            // 304 未更新资源 浏览器用本身缓存的数据
            console.log(xhr.responseText)
        } else {
            console.log(xhr.status)
        }
    }
}

xhr.send()


