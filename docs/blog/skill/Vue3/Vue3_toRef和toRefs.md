

# 前言

首先我们先来回顾一下上期说到的`ref和reactive`，一般来说，

- ref用来定义简单的**字符串或者数值**的响应式，
- reactive用来定义**对象数组**的响应式。

# toRef的定义

这期我们先从`toRef`开始看起，官网上它的定义是这样的：

toRef

> 可以用来为源**响应式对象**上的某个 property 新创建一个 ref。然后，ref 可以被传递，它会保持对其源 property 的响应式连接。

光看这句话是不是有点不知道是什么意思，下面我们就来分析一下这句话。

首先从定义中可以看出，**toRef针对的是一个响应式对象的prop**。那我们先来创建一个响应式的对象。（前面说过，创建对象的响应式，我们应该使用reactive。）

```
 let obj = reactive({count: 3});
```

那这有什么问题呢？我们先来测一个很普通的写法

![image-20220201205124987](https://gitee.com/Olivivian/PicGoImages/raw/master/img//Typora/typora-user-images/2022/02/01/image-20220201205124987.png)

我们对对象的属性值进行动态的改变，从效果图可以看到，一切看起来都很**正常**。（不论是视图上还是控制台里值都正常更新）

![](D:\00-2020-2019\Gif\220122新年活动\demo4.gif)

![](https://gitee.com/Olivivian/PicGoImages/raw/master/img//Gif/220122%E6%96%B0%E5%B9%B4%E6%B4%BB%E5%8A%A8/2022/02/01/demo4.gif)

那现在我们来对以上的代码做一点点的改动，把对象属性的值先赋给一个变量，在进行操作。

![image-20220201212509251](https://gitee.com/Olivivian/PicGoImages/raw/master/img//Typora/typora-user-images/2022/02/01/image-20220201212509251.png)

这个时候，再来看运行效果会发现，**问题出现了**，除了我们新赋值的变量值有改变之外，视图和原值都没有更新。

![](https://gitee.com/Olivivian/PicGoImages/raw/master/img//Gif/220122%E6%96%B0%E5%B9%B4%E6%B4%BB%E5%8A%A8/2022/02/01/demo5.gif)

# toRef的作用

而toRef就是来解决以上的问题，上面的问题很明显是我们的响应断了，而从开头toRef的定义中可以看到，toRef**会保持对其源 property 的响应式连接**。

现在我们就加上toRef来看看

```
<script setup>
   import {reactive,toRef} from 'vue'
   let obj = reactive({count: 3});
   let currentCountRef = toRef(obj,'count') //第一个参数是对象，第二个参数是属性名
   function add1() {
     currentCountRef.value++
     console.log('obj的值：', obj);
     console.log('currentCountRef的值：', currentCountRef);
   }
</script>
```

这个时候，不论是视图，原值，还是赋值的变量值都保持实时更新了。

![](https://gitee.com/Olivivian/PicGoImages/raw/master/img//Gif/220122%E6%96%B0%E5%B9%B4%E6%B4%BB%E5%8A%A8/2022/02/01/demo6.gif)

# ref和toRef

toRef的定义中说：`可以用来为源响应式对象上的某个 property 新创建一个 ref`。那我们直接用`ref`行不行，可以来试试

![image-20220201214108417](https://gitee.com/Olivivian/PicGoImages/raw/master/img//Typora/typora-user-images/2022/02/01/image-20220201214108417.png)

运行效果：可以看到，如果使用ref，只是让赋值的变量自己保持了响应，但是原来的对象值不会改变。

![](https://gitee.com/Olivivian/PicGoImages/raw/master/img//Gif/220122%E6%96%B0%E5%B9%B4%E6%B4%BB%E5%8A%A8/2022/02/01/demo7.gif)

**ref和toRef的区别**

| ref                                        | toRef                                        |
| ------------------------------------------ | -------------------------------------------- |
| ref接收一个参数：ref(原始值)               | toRef接收两个参数：toRef(Proxy, 'xxprop')    |
| 本质是拷贝，修改响应式数据不会影响原始数据 | 本质是引用关系，修改响应式数据会影响原始数据 |

# toRefs

官网上的定义

> 将响应式对象转换为普通对象，其中结果对象的每个 property 都是指向原始对象相应 property 的 [`ref`](https://v3.cn.vuejs.org/api/refs-api.html#ref)。

可以看到toRefs和toRef很像，从名字上他们长的差不多，从作用看他们确实也是差不多。只不过一个是对对象属性单个处理，一个是进行批量处理。

```
<script setup>
  import {reactive,toRefs} from 'vue'
  let obj = reactive({
    name: '张三',
    age:18
  });
  let name = toRef(obj,'name')
  let age = toRef(obj,'age')
  //等价于
  let {name,age} = toRefs(obj)
</script>
```

**其他：**

toRefs的一大用途就是变相解构Proxy，首先了解一个常识，Proxy如果解构，基本数据会丢失响应式。

```
import { reactive } from 'vue'

let obj = reactive({
    name: '张三',
    age:18
  });

let { name, age } = obj;
/*如果直接这样写，这两个 property 的响应性都会丢失。对于这种情况，我们需要将我们的响应式对象转换为一组 ref。这些 ref 将保留与源对象的响应式关联*/
```

所以如果，既想要解构Proxy，又不想丢失响应式，就可以使用toRefs。





参考资料：

[响应性API toRef](https://v3.cn.vuejs.org/api/refs-api.html#toref)

[响应性API toRefs](https://v3.cn.vuejs.org/api/refs-api.html#torefs)

[响应性基础](https://v3.cn.vuejs.org/guide/reactivity-fundamentals.html)

