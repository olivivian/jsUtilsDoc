



## 关于创建实例

- `vue2`应用都是通过用 `Vue` 函数创建一个新的 **Vue 实例**开始的

```
var vm = new Vue({// 选项})
```

- `vue3`应用都是通过用 `createApp` 函数创建一个新的**应用实例**开始的

```
const app = Vue.createApp({/* 选项 */})
```

> 一个 Vue 应用由**根 Vue 实例**，以及可选的嵌套的、可复用的组件树组成。所有的 Vue 组件都是 Vue 实例。

## 关于生命周期

vue生命周期和生命周期钩子函数：

- 生命周期： vue 实例从创建到销毁，也就是从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、卸载等一系列过程。
- 生命周期钩子：在生命周期这个过程中会运行一些叫做生命周期钩子的函数，主要是为了给用户提供在不同阶段添加自己的代码的机会。


### 创建阶段

| Vue3         | 描述 | Vue2         | 描述                      |
| ------------ | ---- | ------------ | ------------------------- |
| beforeCreate | 实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前    | beforeCreate | 实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前|
| created      | 实例创建完成后     | created      | 实例创建完成后                 |



### 挂载阶段

| Vue3 | 描述 | Vue2        | 描述   |
| ---- | ---- | ----------- | ------ |
|  beforeMount    |  挂载开始之前    | beforeMount | 挂载开始之前 |
|  mounted    |  挂载完成后    | mounted     |  挂载完成后 |



### 更新阶段

| Vue3 | 描述 | Vue2         | 描述             |
| ---- | ---- | ------------ | ---------------- |
|  beforeUpdate    |  数据发生改变后，DOM 被更新之前    | beforeUpdate | 数据发生改变后，DOM 被更新之前          |
| updated    |  数据发生改变后，DOM 被更新之后    | updated      | 数据发生改变后，DOM 被更新之后 |



### 销毁阶段

| Vue3 | 描述 | Vue2          | 描述     |
| ---- | ---- | ------------- | -------- |
|  beforeUnmount    |  卸载组件实例之前    | beforeDestroy | 实例销毁之前 |
|  unmounted    |   卸载组件实例后   | destroyed     |  实例销毁后 |



### 其他生命周期钩子

| Vue3 | 描述 | Vue2          | 描述     |
| ---- | ---- | ------------- | -------- |
|  activated    |  被 keep-alive 缓存的组件激活时调用    | activated | 被 keep-alive 缓存的组件激活时调用 |
|  deactivated    |   被 keep-alive 缓存的组件失活时调用。   | deactivated     | 被 keep-alive 缓存的组件失活时调用。 |
|  errorCaptured    |  捕获一个来自后代组件的错误时被调用    |     errorCaptured          |    捕获一个来自后代组件的错误时被调用      |
|  renderTracked    |   跟踪虚拟 DOM 重新渲染时调用   |               |          |
|  renderTriggered    |  当虚拟 DOM 重新渲染被触发时调用   |               |          |

### 总结

从上面的表格可以看出，vue3和vue2的生命钩子之间的区别是：

- 销毁阶段的名字改了

  ```
  beforeDestroy  👉 beforeUnmount
  destroyed  👉  unmounted
  ```

- 多了两个生命周期钩子

  ```
  新增👉renderTracked和renderTriggered
  ```

如果你使用的是Options API方式构建，则是以上这样，但是Vue3中新增了组合API（Composition API）的概念，使用上又会有所不同，下期在接着说。

​    

参考资料：

[Vue2生命周期图](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)

[Vue3生命周期图](https://v3.cn.vuejs.org/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)

[Vue2生命周期钩子](https://cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)

[Vue3生命周期钩子](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html)

















