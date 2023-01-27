



# 计算属性computed

## 为什么需要使用计算属性？

一些时候在模板内直接使用表达式会比较方便，但是如果在模板中放入太多的逻辑会让模板过重且难以维护。例如：

![image-20220204160643995](https://imgstorage-1313684358.cos.ap-nanjing.myqcloud.com/Typora/typora-user-images/2022/02/04/image-20220204160643995.png)

如果要在多个地方都用到全名，一直这样写会麻烦。所以对于比较复杂的逻辑或者需要频繁使用相同计算结果的，都应当使用计算属性。

## 改写成计算属性

![image-20220204161821168](https://imgstorage-1313684358.cos.ap-nanjing.myqcloud.com/Typora/typora-user-images/2022/02/04/image-20220204161821168.png)

## 修改计算属性的结果

这个时候，你如果对计算出来的结果`fullName`进行修改，将会得到一个警告，提示你计算出来的东西是一个只读属性。

![image-20220204154422447](https://imgstorage-1313684358.cos.ap-nanjing.myqcloud.com/Typora/typora-user-images/2022/02/04/image-20220204154422447.png)

所以想要修改的话还需要提供一个setter。

![image-20220204161904431](https://imgstorage-1313684358.cos.ap-nanjing.myqcloud.com/Typora/typora-user-images/2022/02/04/image-20220204161904431.png)

# Vue3的计算属性写法

vue2都是上面那样写，vue3同样兼容，只不过vue还可以写成组合式的。

## 基础写法

```
<p>结果：{{sum}}</p>
  
<script setup>
  import { ref, computed } from "vue"

  const a = ref(1)
  const b = ref(2)
  let sum = computed(()=>{
    return a.value + b.value
  })

</script>
```



## 计算多个

```
  let sum = computed(()=>{
    return a.value + b.value
  })

  let mul = computed(()=>{
    return a.value * b.value
  })
```



## 改成可修改

```
let mul = computed({
    get:()=>{
      return a.value *10
    },
    set:(value)=>{
      return a.value = value/10
    }
})
```



## 代替filters过滤器

在 2.x 中，开发者可以使用过滤器来处理通用文本格式。从 Vue 3.0 开始，过滤器已移除，且不再支持。官方给的建议是用方法调用或计算属性来替换它们。

例如：

![image-20220204183410419](https://imgstorage-1313684358.cos.ap-nanjing.myqcloud.com/Typora/typora-user-images/2022/02/04/image-20220204183410419.png)

## computed计算属性传参

其实写法上差不多，但是可以看到computed我们用的不是直接传参，如果直接传参，你会发现报错了

![image-20220204184032953](https://imgstorage-1313684358.cos.ap-nanjing.myqcloud.com/Typora/typora-user-images/2022/02/04/image-20220204184032953.png)

**原因**：

computed 计算属性并没有给定返回值，我们调用的是一个函数，而 computed 内部返回的并不是一个函数，所以就会报错：xxx is not a function。

**解决办法**：

需要在计算属性 内部返回一个函数。修改代码如下：

![image-20220204184805461](https://imgstorage-1313684358.cos.ap-nanjing.myqcloud.com/Typora/typora-user-images/2022/02/04/image-20220204184805461.png)

### **完整的vue3的写法**

```
	<p>{{ accountInUSD(accountBalance) }}</p>
	 
	<script setup>
      import {ref, computed } from "vue"
      const accountBalance = ref(100);
      const accountInUSD = computed(()=>{
         return function(value){
           return '$' + value
         }
       })
   </script>
```





参考资料：

[computed属性](https://v3.cn.vuejs.org/api/computed-watch-api.html#computed)

[过滤器移除](https://v3.cn.vuejs.org/guide/migration/filters.html)











































