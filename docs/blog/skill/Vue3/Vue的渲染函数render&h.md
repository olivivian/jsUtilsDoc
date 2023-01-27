

# 前言

vue中我们一般会用模板来创建HTML，但是在有些情况也会需要用到**渲染函数**。

渲染函数是用来生成Virtual DOM的。Vue推荐使用模板来构建我们的应用界面，在底层实现中Vue会将模板编译成渲染函数。

# render 函数

render 函数即渲染函数，它接收一个`createElement` 方法作为第一个参数用来创建 `VNode`。（简单的说就是 render函数的参数也是一个函数）

## render

```
/*
* render: 渲染函数
* 参数: createElement
* 参数类型: Function
*/
render: function (createElement) {}
```



## Vue2 createElement

createElement也是一个函数，它接受三个参数

- 【必填】一个 HTML **标签**名、**组件**选项对象，或者resolve 了上述任何一种的一个 async 函数。`类型：{String | Object | Function}`
- 【可选】一个与模板中 attribute 对应的数据对象。 `类型:{Object}`
- 【可选】子级虚拟节点 (VNodes) `类型：{String | Array}`

示例：

```
//模板写法
 <div id="demo" style="color: #ff0000" @click="handleClick">
     Hello Vue!
 </div>

//渲染函数写法
render: function (createElement) {
      return createElement('div', {
        attrs: {
          id: 'demo'
        },
        //给div绑定样式
        style:{
          color: '#ff0000'
        },
        //给div绑定点击事件　
        on: {
          click: this.handleClick
        }
      }, 'Hello Vue!')
 },

```

> createElement-参数 👉 [更多](https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0)
>
>  attribute数据对象  👉 [更多](https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1)

将 `h` 作为 `createElement` 的别名是 Vue 生态系统中的一个通用惯例。



## Vue3 h()参数

vue3的官方文档中，render的参数都是用`h()`来表示。

> 官网说：`h()` 函数是一个用于创建 VNode 的实用程序。也许可以更准确地将其命名为 `createVNode()`，但由于频繁使用和简洁，它被称为 `h()`

它接受[三个参数](https://v3.cn.vuejs.org/guide/render-function.html#h-%E5%8F%82%E6%95%B0)：

- 【必填】一个 HTML 标签名、一个组件、一个异步组件、或一个函数式组件。`类型：{String | Object | Function} tag`、
- 【可选】与 attribute、prop 和事件相对应的对象。`类型：{Object} props`
- 【可选】子 VNodes, 使用 `h()` 构建,或使用字符串获取 "文本 VNode" 或者有插槽的对象。`类型：{String | Array | Object} children`

> 如果没有第二个参数 prop，可以把第三个参数children作为第二个参数传入。
>
> 如果觉得会产生歧义，可以将将 `null` 作为第二个参数传入，将 children 作为第三个参数传入。

简单的说就是：

```
h('标签元素','标签属性',[标签文本内容]);
```

示例：

![image-20220225204445924](https://gitee.com/Olivivian/PicGoImages/raw/master/img//Typora/typora-user-images/2022/02/25/image-20220225204445924.png)

参考资料：

[render 函数](https://cn.vuejs.org/v2/api/#render)

[Vue2渲染函数](https://v3.cn.vuejs.org/guide/render-function.html)

[Vue3渲染函数](https://v3.cn.vuejs.org/guide/render-function.html#%E6%B8%B2%E6%9F%93%E5%87%BD%E6%95%B0)
