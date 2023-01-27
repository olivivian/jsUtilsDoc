

在 vue2.x 中， 定义数据都是在`data`中，但是在Vue3中，我们可以在setup 里面直接定义。比如：

````
<template>
  <div>{{num}}</div>
</template>

<script setup>
  let num = 0;
</script>
````

但是这个时候会有个问题，这个num是非响应式的。即num动态改变之后，界面上还是一直显示的初始值0。可以做一个简单的测试

![image-20220131203308448](https://imgstorage-1313684358.cos.ap-nanjing.myqcloud.com/img/image-20220131203308448.png)

效果：

可以看到，当num值改变时，视图并没有跟着更新。

![](https://imgstorage-1313684358.cos.ap-nanjing.myqcloud.com/Gif/220122%E6%96%B0%E5%B9%B4%E6%B4%BB%E5%8A%A8/2022/01/31/demo1.gif)

# ref

在 Vue 3.0 中，为了解决这个问题，我们可以通过使用 `ref` 函数来处理。

```
<template>
  <button @click="count">按钮</button>
  <div>num值显示为：{{num}}</div>
</template>

<script setup>
  import { ref } from 'vue'  
  let num = ref(0)   
  function count() {
    num.value++
    console.log('当前结果',num.value)
  }
</script
```

使用之后的效果：

![](https://imgstorage-1313684358.cos.ap-nanjing.myqcloud.com/Gif/220122%E6%96%B0%E5%B9%B4%E6%B4%BB%E5%8A%A8/2022/01/31/demo2.gif)



注意：

上面的示例中我们可以看到

- 值被ref包裹之后，我们改变num，使用的是`num.value`。

`这是因为，ref 接收参数并将其包裹在一个带有 value property 的对象中返回，然后使用该 property 访问或更改响应式变量的值。`

扩展：

我们上面通过`ref`为基础类型的数据创建了响应式，那么如果是一个对象或者数组呢？ref同样适用，可以通过示例来看下

![image-20220131215651536](https://imgstorage-1313684358.cos.ap-nanjing.myqcloud.com/img/image-20220131215651536.png)

​	结果展示：

![](https://imgstorage-1313684358.cos.ap-nanjing.myqcloud.com/Gif/220122%E6%96%B0%E5%B9%B4%E6%B4%BB%E5%8A%A8/2022/01/31/demo3.gif)

结果对比：

![image-20220131220018323](https://imgstorage-1313684358.cos.ap-nanjing.myqcloud.com/img/image-20220131220018323.png)

# reactive

虽然不论是基础类型`string,number`，还是复杂引用类型`array，object`都可以用`ref`来定义，但是定义对象的话，通常会使用`reactive`来实现。

![image-20220131220725540](https://imgstorage-1313684358.cos.ap-nanjing.myqcloud.com/Typora/typora-user-images/2022/01/31/image-20220131220725540.png)

# ref与reactive的区别与联系

- 一般来说，`ref`用来定义简单的字符串或者数值，而`reactive`用来定义对象数组等。

- ref定义数据时，会对里面的数据类型进行一层判断，当遇到复杂的引用类型时,还是会使用`reactive`来处理。
- 可以用ref定义对象数组等，但是如果用`reactive`来定义基本类型会被警告。

![image-20220131221203422](https://imgstorage-1313684358.cos.ap-nanjing.myqcloud.com/Typora/typora-user-images/2022/01/31/image-20220131221203422.png)



参考资料：

[Vue ref](https://v3.cn.vuejs.org/api/refs-api.html#ref)

[Vue reactive](https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive)

















