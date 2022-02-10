
//jQuery原生框架
// (function () {
//     let jQuery = 11
//     window.jQuery = window.$ = jQuery
// })()

// 完善jQuery
(function () {

    var jQuery = function (selector) {

        // 实例化init方法
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
                dom = [selector]
            } else {
                //获取到元素
                dom = document.querySelectorAll(selector)
                return markAll(dom, this)
            }

        },


        css: function () {

        },
        html: function () {

        },
        eq: function () {

        },
    }

    window.jQuery = window.$ = jQuery
})()

