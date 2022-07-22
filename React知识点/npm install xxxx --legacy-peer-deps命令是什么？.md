# npm install xxxx --legacy-peer-deps命令是什么？

> **摘要：**带着好奇心，研究学习了一番npm install xxxx --legacy-peer-deps命令是什么？为什么可以解决下载时候产生的依赖冲突呢？

在日常使用命令npm install / npm install XX下载依赖的操作中，我经常会遇到无法解析依赖树的问题（依赖冲突）：

![img](https://pic4.zhimg.com/80/v2-64d128e0832653b2cc3d2fd662012b53_720w.jpg)

![img](https://pic1.zhimg.com/80/v2-ff7697363976aa20c58c420b9a6a1edc_720w.jpg)

但是每当遇到这种情况的时候，我用命令npm install --legacy-peer-deps就可以顺利进行下载操作：

![img](https://pic4.zhimg.com/80/v2-497af2796fd6a4296c4c978539ce35ab_720w.jpg)

![img](https://pic2.zhimg.com/80/v2-72f025b47b241800d030f39b6c7e0859_720w.jpg)

这是为什么呢？带着好奇心，我去研究学习了一番npm install xxxx --legacy-peer-deps命令是什么？为什么可以解决下载时候产生的依赖冲突呢？（注：我本地当前正在使用的npm版本是8.6.0）

**本文导航**：什么是peerDependency？；npm install xxxx --legacy-peer-deps命令是什么？为什么可以解决下载时候产生的依赖冲突呢？；参考资料。

## 什么是peerDependency？

我们日常在前端项目开发过程中，见到最多的一定是package.json文件里的devDependencies（用于在开发环境下依赖的模块）和dependencies（无论开发环境还是生产环境都需要的依赖模块）这两个字段（感兴趣的小伙伴可以看我这篇文章：[package.json文件里的dependencies和devDependencies有什么区别吗？](https://link.zhihu.com/?target=https%3A//bbs.huaweicloud.com/blogs/346736)）。

那么命令--legacy-peer-dep里的peerDependency是什么依赖呢？根据geeksforgeeks网站里的定义：

> Peer Dependencies: In package.json file, there is an object called as peerDependencies and it consists of all the packages that are exactly required in the project or to the person who is downloading and the version numbers should also be the same. That is the reason they were named as peerDependencies. The best example is ‘react’ which is common in every project to run similarly.

翻译一下就是说，在package.json文件中，存在一个叫做peerDependencies（对等依赖关系）的对象，它包含了项目里需要的所有的包或则用户正在下载的版本号相同的所有的包（很绕，但意思就是对等依赖关系指定我们的包与某个特定版本的npm包兼容）；对等依赖关系最好的例子就是React，一个声明式的创建用户界面的JS库。

那么我们为什么需要对等依赖关系呢？

假设我们现在有一个HelloHWCloud工程，已经在其根目录下的package.json文件中的dependencies字段里声明了packageA作为依赖，而其下面有两个项目app_A和app_B，它们也依赖packageA。如果我们用dependencies而不是peerDepenedencies来声明，那么npm install安装完项目之后的依赖结构如下图所示：

```text
├── HelloHWCloud
│   └── node_modules
│       ├── packageA
│       ├── app_A
│       │   └── nodule_modules
│       │       └── packageA
│       └── app_B
│       │   └── nodule_modules
│       │       └── packageA
```

从上图可以看出，packageA依赖包被安装了3次，造成了2次安装冗余。

而如果采用peerDepenedency来下载，就可以避免这个核心依赖库被重复下载的问题。还是上面那个场景，我们在项目app_A和app_B的package.json文件里的peerDependencies字段声明一下核心依赖库packageA，然后在根目录的package.json文件里的dependencies字段也声明一下packageA。接着再执行npm install，生成的依赖结构就会如下图所示：

```text
├── HelloHWCloud
│   └── node_modules
│       ├── packageA
│       ├── app_A
│       └── app_B
```

如上图所示，packageA就只会被安装一次。因此，npm 从**版本v7**开始，install就默认以peerDependencies的方式去下载了：

1. 如果用户在根目录的package.json文件里显式依赖了核心库，那么各个子项目里的peerDepenedencies声明就可以忽略
2. 如果用户没有显式依赖核心库，那么就按照子项目的peerDepenedencies中声明的版本将依赖安装到项目根目录里

而方式2就会导致一个问题：用户依赖的包版本与各个子项目依赖的包版本相互不兼容，那么就会报错（无法解析依赖树的问题（依赖冲突））让用户自行去修复，因而导致安装过程的中断。（因为是从npm v7引入的，因此npm v3-v6就不会发生这个错误）

## npm install xxxx --legacy-peer-deps命令是什么？为什么可以解决下载时候产生的依赖冲突呢？

npm install xxxx --legacy-peer-deps命令与其说是告诉npm要去干什么，不如说是告诉npm不要去干什么。

legacy的意思：遗产/（软件或硬件）已过时但因使用范围广而难以替代的；而npm install xxxx --legacy-peer-deps命令用于绕过peerDependency里依赖的自动安装；它告诉npm忽略项目中引入的各个依赖模块之间依赖相同但版本不同的问题，以npm v3-v6的方式去继续执行安装操作。

所以其实该命令并没有真的解决冲突，而是忽略了冲突，以“过时”（v3-v6）的方式进行下载操作。

## 参考资料

1. [https://classic.yarnpkg.com/en/docs/dependency-types](https://link.zhihu.com/?target=https%3A//classic.yarnpkg.com/en/docs/dependency-types)
2. [https://github.blog/2021-02-02-npm-7-is-now-generally-available/](https://link.zhihu.com/?target=https%3A//github.blog/2021-02-02-npm-7-is-now-generally-available/)
3. [https://blog.logrocket.com/whats-new-in-npm-v7/](https://link.zhihu.com/?target=https%3A//blog.logrocket.com/whats-new-in-npm-v7/)
4. [https://stackoverflow.com/questions/66239691/what-does-npm-install-legacy-peer-deps-do-exactly-when-is-it-recommended-wh](https://link.zhihu.com/?target=https%3A//stackoverflow.com/questions/66239691/what-does-npm-install-legacy-peer-deps-do-exactly-when-is-it-recommended-wh)
4. https://zhuanlan.zhihu.com/p/506596270