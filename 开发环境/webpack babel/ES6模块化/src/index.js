// console.log('index.js')

// const sum = (a, b) => {
//     return a + b
// }

// const result = sum(10, 20)
// console.log(result)


// class Student {
//     constructor(name) {
//         this.name = name
//     }
//     sayHi() {
//         console.log(
//             `姓名:` + this.name
//         )
//     }
// }

// let xialuo = new Student('夏洛')
// xialuo.sayHi()

// 单个引入
// import { fn } from './a.js'
// fn()

// a中导出未使用default 可使用{}拆开对应接收
// import { fn2, name, obj } from './a.js'
// fn2()
// console.log(name)
// console.log(obj)

// b 中导出使用了default
import b from './b.js'
b.fn2()
console.log(b.name)
console.log(b.obj)