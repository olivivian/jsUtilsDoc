

# watch基本介绍

如果是**选项式**和vue2的写法一样

写法：`{ [key: string]: string | Function | Object | Array}`

watch是一个对象，它的键和值分别是

- 键：要侦听的响应式 property，包含了 data 或 computed的property。
- 值：对应的回调函数，也可以是方法名，或者包含额外选项的对象。

如果是**组合式**，则执行一个`watch`函数，它包含三个参数

> - `{string | Function} source`
> - `{Function | Object} callback`
> - `{Object} [options]`
>   - `{boolean} deep`
>   - `{boolean} immediate`
>   - `{string} flush`

如果对**选项式**和**组合式**不了解的可以看之前说过的这个👉 [组合API](https://juejin.cn/post/7059013029031051300)

# watch写法介绍

## 基础写法

监听`ref`创建的简单数据类型

```
watch(numA,(newValue,oldValue)=>{
    console.log(`新值：${newValue},旧值：${oldValue}`)
  })
```

示例：

![image-20220205192201269](https://gitee.com/Olivivian/PicGoImages/raw/master/img//Typora/typora-user-images/2022/02/05/image-20220205192201269.png)

## 监听整个对象

监听`reactive`创建的复杂数据，写法和前面的一样，但是有两点问题需注意

- 监听reactive所定义的一个响应式数据，无法正确的获得oldValue（你会发现，newValue与oldValue的值是一样的）
- 强制开启了深度监听，就算你配置deep也没用

![image-20220205194436838](https://gitee.com/Olivivian/PicGoImages/raw/master/img//Typora/typora-user-images/2022/02/05/image-20220205194436838.png)



## 监听单个属性

如果不想监听整个对象，监听单个属性也是可以的，但是请不要直接这样写

![image-20220205195558469](https://gitee.com/Olivivian/PicGoImages/raw/master/img//Typora/typora-user-images/2022/02/05/image-20220205195558469.png)

监听reactive所定义的一个响应式数据中的某个属性，需要使用函数

```
watch(()=>user.age,(newValue,oldValue)=>{
    console.log(`新值：`,newValue)
    console.log(`旧值：`,oldValue)
})
```

## 监听多个参数执行不同方法

在vue2中，watch可以监听多个源，并且执行不同的函数

![image-20220205203303680](https://gitee.com/Olivivian/PicGoImages/raw/master/img//Typora/typora-user-images/2022/02/05/image-20220205203303680.png)

vue3中可以通过多个watch来实现

```
 watch(num,()=>{
    console.log('数字num改变了');
  })

  watch(()=>user.age,()=>{
    console.log('年龄age改变了')
  })
```

示例：

![image-20220205203809014](https://gitee.com/Olivivian/PicGoImages/raw/master/img//Typora/typora-user-images/2022/02/05/image-20220205203809014.png)

## 监听多个参数执行相同方法

如果监听多个参数是为了执行同一个事件，你可以把需要监听的属性写到一个数组中

```
  watch([num,()=>user.age],(newValue,oldValue)=>{
    console.log('newValue',newValue);
    console.log('oldValue',oldValue);
  })
```

这个时候得到的`newValue`和`oldValue`同样是数组，数组中的第一个就是你监视的第一个参数。

![image-20220205204425869](https://gitee.com/Olivivian/PicGoImages/raw/master/img//Typora/typora-user-images/2022/02/05/image-20220205204425869.png)

如果你不想得到的结果是数组，可以这样写

```
 watch([num,()=>user.age],([numNew, ageNew], [numOld, ageOld])=>{
    console.log('numNew',numNew);
    console.log('numOld',numOld);
    console.log('ageNew',ageNew);
    console.log('ageOld',ageOld);
  })
```

打印结果：

![image-20220205210707133](https://gitee.com/Olivivian/PicGoImages/raw/master/img//Typora/typora-user-images/2022/02/05/image-20220205210707133.png)

## 深度监听

上面有说到，reactive强制开启了深度监听，deep配置了也没用。**但是**，如果监听的是深度嵌套对象或数组中的 property 变化时，仍然需要 `deep` 选项设置为 true。

```
 import {reactive, watch} from "vue"
 const state = reactive({
     id: 1,
     attributes: {
     	name: '',
     }
 })
  watch(
      () => state,
      (state, prevState) => {
     	 console.log('deep', state.attributes.name, prevState.attributes.name)
      },
      { deep: true }//开启深度监听
  )
   state.attributes.name = 'Axjy' // 日志: "deep" "Axjy" "Axjy" （如果没开启深度监听，控制台不会打印）
```

监听一个响应式对象或数组将始终返回该对象的当前值和上一个状态值的引用。为了完全侦听深度嵌套的对象和数组，可能需要对值进行深拷贝。这可以通过诸如 [lodash.cloneDeep](https://lodash.com/docs/4.17.15#cloneDeep) 这样的实用工具来实现。

![image-20220205211912782](https://gitee.com/Olivivian/PicGoImages/raw/master/img//Typora/typora-user-images/2022/02/05/image-20220205211912782.png)



参考资料：

[选项式watch](https://v3.cn.vuejs.org/api/options-data.html#watch)

[实例方法$watch](https://v3.cn.vuejs.org/api/instance-methods.html#watch)

[响应性 watch](https://v3.cn.vuejs.org/guide/reactivity-computed-watchers.html#watch)

