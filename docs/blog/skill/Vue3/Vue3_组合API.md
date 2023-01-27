# 选项API（options API）

先来看一段代码

```
export default {
	name:'demo'
	computed: {}， //设置计算属性
	data() {return {} },//定义状态
	methods: {}，//定义事件方法
	watch:{} //设置监听属性
}
```

可以看到这是我们vue2中的写法，data中写数据，methods中写函数。

约定了指定的位置做指定的事情，一个功能的逻辑代码分散在各个地方。这种写法就叫`选项API写法`。



# 组合式API（Composition API）

vue3和vue2中有一个很大的区别就是新增了一种`组合式API`的写法。

在vue3 组合式 API写法 中，约定所有代码都组织在`setup`方法里面，通过组合api分离相同功能的逻辑代码，并切割成各种模块导入导出使用。

[图片源于网络]

![image-20220130220159175](https://imgstorage-1313684358.cos.ap-nanjing.myqcloud.com/Typora/typora-user-images/2022/01/30/image-20220130220159175.png)

## setup组件选项

`setup` 选项是一个接收 `props` 和 `context` 的函数，返回的所有内容都暴露给组件的其余部分 (计算属性、方法、生命周期钩子等等) 以及组件的模板。

vue3.0的setup写法：

![image-20220130222620977](https://imgstorage-1313684358.cos.ap-nanjing.myqcloud.com/Typora/typora-user-images/2022/01/30/image-20220130222620977.png)

> 变量必须 return 出来，template中才能使用

Vue3.2的setup语法糖：

![image-20220130223424900](https://imgstorage-1313684358.cos.ap-nanjing.myqcloud.com/Typora/typora-user-images/2022/01/30/image-20220130223424900.png)

> 只需要在 script 标签上加上setup属性，里面的代码会被编译成组件 `setup()` 函数的内容，无需return，template可直接使用。



### 组件自动注册

在 script setup 中，引入的组件可以直接使用，无需再通过`components`进行注册，并且它会自动以文件名为主，无法指定当前组件的名字。

![image-20220130223812936](https://imgstorage-1313684358.cos.ap-nanjing.myqcloud.com/Typora/typora-user-images/2022/01/30/image-20220130223812936.png)



### 可以和普通的 script 一起使用

![image-20220130224107485](https://imgstorage-1313684358.cos.ap-nanjing.myqcloud.com/Typora/typora-user-images/2022/01/30/image-20220130224107485.png)


### 生命周期钩子

在 [setup ()](https://v3.cn.vuejs.org/guide/composition-api-setup.html) 内部也可以调用生命周期钩子，但是写法上会有写不同，需要通过在选项式 API生命周期钩子前面加上 “on” 来访问组件的生命周期钩子。

| 选项式 API        | Hook inside `setup` |
| ----------------- | ------------------- |
| `beforeCreate`    | Not needed*         |
| `created`         | Not needed*         |
| `beforeMount`     | `onBeforeMount`     |
| `mounted`         | `onMounted`         |
| `beforeUpdate`    | `onBeforeUpdate`    |
| `updated`         | `onUpdated`         |
| `beforeUnmount`   | `onBeforeUnmount`   |
| `unmounted`       | `onUnmounted`       |
| `errorCaptured`   | `onErrorCaptured`   |
| `renderTracked`   | `onRenderTracked`   |
| `renderTriggered` | `onRenderTriggered` |
| `activated`       | `onActivated`       |
| `deactivated`     | `onDeactivated`     |

> 因为 `setup` 是围绕 `beforeCreate` 和 `created` 生命周期钩子运行的，所以不需要显式地定义它们。换句话说，`beforeCreate`和`created`（被`setup`方法本身代替）

### Vue2和Vue3生命周期钩子对比

![image-20220130232356937](https://imgstorage-1313684358.cos.ap-nanjing.myqcloud.com/Typora/typora-user-images/2022/01/30/image-20220130232356937.png)





参考资料：

[Setup函数](https://v3.cn.vuejs.org/guide/composition-api-setup.html#setup)

[script setup](https://v3.cn.vuejs.org/api/sfc-script-setup.html#%E5%9F%BA%E6%9C%AC%E8%AF%AD%E6%B3%95)

[生命周期钩子](https://v3.cn.vuejs.org/guide/composition-api-lifecycle-hooks.html)














