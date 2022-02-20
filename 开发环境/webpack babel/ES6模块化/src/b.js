// 单个导出
// 使用default 后只能导出一次
// function fn() {
//     console.log('fn')
// }
// const xxx = {name:'xxx'}
// export default xxx


// 多个导出
function fn2() {
    console.log('fn2')
}

let name = 'name'

let obj = {
    name: 'obj.name'
}

export default {
    fn2,
    name,
    obj
}