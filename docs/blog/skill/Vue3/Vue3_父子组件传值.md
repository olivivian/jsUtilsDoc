# props/emit

先来说一下，在vue2中常用的传值方式props、emit在vue3中的写法。

## 父子传值

### 父组件给子组件传值

**父组件**

在父组件的子组件标签上通过 `:传递到子组件的数据名="需要传递的数据"`传递数据。

```
<Child :msg="msg"/>

<script setup>
  import {ref} from 'vue'
  import Child from './Child.vue'

  let msg = ref('父组件的数据');
</script>  

```

**子组件**

通过props来接受，并且在模板中使用。（注意，如果直接对props进行解构，会丢失响应）

```
<script setup>
  import { defineProps } from 'vue'
  const props = defineProps({
    msg:{
      type:String,
      default:""
    },
  })
  console.log('接收到的所有值：',props) 
  //{ msg:"父组件的数据" }

</script>
```

### 子组件给父组件传值

**子组件**

子组件触发事件，通过emit来实现给父组件传值。

```
<button @click="handleClick">按钮</button>

<script setup>
  import { defineEmits } from 'vue'
  const emit = defineEmits(["myClick"])
  const handleClick = ()=>{
    emit("myClick", "子组件给父组件传的数据")
  }
</script>
```

**父组件**

父组件通过事件的参数接受子组件传递过来的值。

```
<Child @myClick="onMyClick"/>

<script setup>
  const onMyClick = (msg) => {
    console.log(msg) //父组件接收到的数据
  }
</script>
```



## 父子方法调用



### 子组件调用父组件的方法

**子组件**

关键点：使用defineEmits 、emit，（其实和传值差不多，只不过如果只是单纯的调用父组件的方法，还可以这样写）

```
<button @click="emit('myClick')">按钮</button>

<script setup>
  import { defineEmits } from 'vue'
  const emit = defineEmits(["myClick"])
</script>  
```

**父组件**

```
 <Child @myClick="onMyClick"/>
 
 <script setup>
 	  const onMyClick = () => {
        console.log('被子组件调用了')
      }
 </script>  
```

### 父组件调用子组件的方法

关键点：使用【模板引用ref 】和 defineExpose

父组件

```
<Child ref="childCom"/>

<script setup>
  import {ref} from 'vue'
  import Child from './Child.vue'

  const childCom = ref(null)
  const handlerClick = () =>{
    // 获取子组件对外暴露的属性
    console.log(childCom.value.childName) 
    // 调用子组件对外暴露的方法
    childCom.value.childMethod() 
  }
</script>  
```

子组件

```
<script setup>
  import { defineExpose  } from 'vue'

  defineExpose({
    childName:'这是子组件的属性',
    childMethod(){
      console.log("子组件的方法被触发")
    }
  })

</script>
```



# provide/inject

## 父组件给子组件传值

父组件向子组件传递数据，通常会使用 props。但是可能会有这样的情况，有一些深度嵌套的组件，而深层的子组件只需要父组件的部分内容。在这种情况下，如果仍然将 prop 沿着组件链逐级传递下去，可能会很麻烦。

对于这种情况，我们可以使用 `provide` 和 `inject`来处理。

- 父级组件中使用 provide() 函数向下传递数据。

- 子级组件中使用 inject() 获取上层传递过来的数据，不管组件嵌套多深都可以。

父组件

provide('数据名称', 要传递的数据)

```
<script setup>
    import { provide } from "vue"
    provide("msg", "传给子级的数据")
</script>

```

子组件

调用 inject 函数，通过指定的数据名称，获取到父级共享的数据

```
<script setup>
    import { inject } from "vue"
    const msg = inject("msg")
    console.log('从父级接受到的数据',msg) 
</script>
```

> 父组件可以通过`ref`创建**响应式数据**通过`provide` 共享给子组件





参考资料：

[defineProps和defineEmits](https://v3.cn.vuejs.org/api/sfc-script-setup.html#defineprops-%E5%92%8C-defineemits)

[defineExpose](https://v3.cn.vuejs.org/api/sfc-script-setup.html#defineexpose)

[组合式的模板引用](https://v3.cn.vuejs.org/guide/composition-api-template-refs.html)

[provide和inject](provide/inject)