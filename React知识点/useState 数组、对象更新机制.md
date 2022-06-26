# useState 数组、对象更新机制

在线demo：[React useState Demo](https://link.juejin.cn/?target=https%3A%2F%2Fstackblitz.com%2Fedit%2Freactusestatehook%3Ffile%3Dsrc%2FApp.js)

参考文章：[React Hook useState复杂数据更新机制踩坑 - 简书 (jianshu.com)](https://link.juejin.cn/?target=https%3A%2F%2Fwww.jianshu.com%2Fp%2Fc04fd2f89e97)

React组件的更新机制对state只进行浅对比，也就是更新某个复杂类型数据时只要它的引用地址没变，那就不会重新渲染组件。对于数组、对象，需要使用**深拷贝**，即改变数组/对象的指针指向的地址，来实现组件的重新渲染。

深拷贝：

```js
const arrCopy = sourceArr.slice() //深拷贝简单数组
const objCopy = Object.assign({}, sourceObj) //深拷贝简单Object
// 当对象中只有一级属性，没有二级属性的时候，Object.assign()方法为深拷贝，
// 但是对象中有对象的时候，此方法在二级属性以后就是浅拷贝。
```

### 数组中使用useState

```js
const [arr, setArr] = React.useState([0, 1, 2]);

return (
<h4>Use useState hook change Array </h4>
<h4>Result arr[0]: {arr[0]}</h4>
<button
onClick={() => {
  setArr((prev) => {
    prev[0] = 1;
    const arrCopy = prev.slice();
    return arrCopy;
  });
}}
>
set a[0] to 1
</button>
)
```

### 对象中使用useState

```js
<h4>Use useState hook change Object</h4>
<h4>Result obj.a1: {obj.a1}</h4>
<button
onClick={() => {
  setObj((prev) => ({
    ...prev,
    a1: 1,
  }));
}}
>
set a1 to 1
</button>
```