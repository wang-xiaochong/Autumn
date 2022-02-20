
// 单个导出
export function fn() {
    console.log('fn')
}

// 多个导出
function fn2() {
    console.log('fn2')
}

let name = 'name'

let obj = {
    name:'obj.name'
}

export {
    fn2,
    name,
    obj
}