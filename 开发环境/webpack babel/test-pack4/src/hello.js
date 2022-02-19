
function stringHello() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('hello string')
        }, 2000);
    })
}



async function hello() {

    let string= await stringHello()
    console.log(string)
}

export default hello