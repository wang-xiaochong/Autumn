console.log('index.js')

const sum = (a, b) => {
    return a + b
}

const result = sum(10, 20)
console.log(result)


class Student {
    constructor(name) {
        this.name = name
    }
    sayHi() {
        console.log(
            `姓名:` + this.name
        )
    }
}

let xialuo = new Student('夏洛')
xialuo.sayHi()