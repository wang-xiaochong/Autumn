async function getLodash() {
    const { default: _ } = await import('lodash')
    const element = document.createElement('div')
    element.innerHTML = _.join(['hello', 'webpack'], ' ')
    return element
}

// 此处动态加载lodash
getLodash().then((element) => {
        document.body.appendChild(element)
})