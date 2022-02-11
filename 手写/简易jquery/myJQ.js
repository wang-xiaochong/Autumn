
//jQuery原生框架
// (function () {
//     let jQuery = 11
//     window.jQuery = window.$ = jQuery
// })()

// 完善jQuery
(function () {

    var jQuery = function (selector) {

        // 实例化init 得到一个init对象
        return new jQuery.fn.init(selector)

        // init{
        //     0:div  //dom属性
        // }

    }
    function markAll(dom, that) {
        var ret = that
        //节点的遍历 并赋值到init对象中
        for (let i = 0; i < dom.length; i++) {
            ret[i] = dom[i]
        }
        that.length = dom.length
        // 必须返回that,要不然后面的方法就不知道给谁加了
        return that
    }

    jQuery.fn = jQuery.prototype = {

        init: function (selector) {
            var dom = null
            if (typeof (selector) != 'string') {
                // 获取到非字符串的元素 window 或 this
                var ret = this
                ret[0] = selector
                // dom = [selector]
                return ret

            } else {
                //获取到元素
                dom = document.querySelectorAll(selector)
                //返回一个对象
                return markAll(dom, this)
            }
        },


        css: function () {
            // alert("css")
            let arg = arguments
            let length = arg.length
            if (length == 1) {
                // 获取
                return this[0].style[arg[0]]
            } else if (length == 2) {
                //设置
                // console.log(this)
                this[0].style[arg[0]] = arg[1]
                return this
            } else {
                console.log("css参数错误")
            }
            return this

        },
        html: function () {
            // alert("html")
            // console.log(this)
            // this返回的是init
            return this
        },
        first: function () {
            return $(this[0])
        },
        last: function () {
            return $(this[this.length - 1])
        },
        eq: function () {
            let length = arguments.length
            if (length > 1) {
                console.log("eq参数错误")
            } else {
                return $(this[arguments[0] - 1])
            }

        },
    }

    // 添加方法到init原型中 使得jquery.fn jquery.prototype 中的方法在init中可以使用
    jQuery.fn.init.prototype = jQuery.fn
    // 挂载到全局
    window.jQuery = window.$ = jQuery
})()

