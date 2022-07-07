# useEffect模拟函数组件生命周期函数



#### **1、模拟 componentDidMount**

```
useEffect(()=>{},[])
```

最主要的是第二个参数是空数组[],只会在组件挂载后运行一次。

#### 2、模拟 componentDidUpdate

```
useEffect(()=>{})或者useEffect(()=>{},[n])
```

第二个参数的含义解释：如果设置有多个 useState 的初始值，如有 n 和 m。那么，第二个参数不写，表示所有 state 值其中任意一个值变化了都会触发该函数，反而。只想要某个 state 值变化才触发函数，那么第二个参数的数组[]中必须加上要检测更新变化的 state 值。

#### 3、模拟 componentWillUnMount

```
useEffect(()=>{console.log('渲染的时候执行'); return ()=>{console.log('组件要死了')}})
```

在 useEffect 的第一个参数为函数中 return 一个函数，表示组件将死。这个函数就是组件死之前可以执行的最后一次代码。而本身 useEffect 的第一个函数参数就是渲染的时候执行。
