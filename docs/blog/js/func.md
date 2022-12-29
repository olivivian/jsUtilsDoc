
# 方法类

> 包含了数组、字符串、对象的操作方法

## 根据pid生成树形结构

```js
/**
 * 根据pid生成树形结构
 *  @param { object } items 后台获取的数据
 *  @param { * } id 数据中的id
 *  @param { * } link 生成树形结构的依据
 */
export const createTree = (items, id = null, link = 'pid') =>{
    items.filter(item => item[link] === id).map(item => ({ ...item, children: createTree(items, item.id) }));
};
```

## 根据时间生成树形结构

```js
// 原始数据
let data = [
  {
      created_at: '"2022-01-24 18:25:43',
      title: 'title'
  }
]

// 想要的结果
let newData = [
  {
      time: '2022',
      lists: [
        {
          created_at: '"2022-01-24 18:25:43',
          title: 'title'  
        }
      ]
  }
]
```

```js
/**
 * 列表用时间生成树
 * @param data
 * @returns {{lists: *, time: string}[]}
 */
export function timeTree(data) {
	const group = data.reduce((obj, item) => {
		const year = item.created_at.substring(0, 4) // 2021-01-24 18:25:43 变为 2021
		if (!obj[year]) obj[year] = []
		obj[year].push(item)
		return obj
	}, {})
	return Object.keys(group).map(key => ({ time: key, lists: group[key] }))
}
```

## 寻找所有子节点

```js
/**
 * 寻找所有子节点
 * @param id
 * @param data
 * @param pidName 父级键名
 * @param idName 子级自己的id
 * @param childrenName 包含子级的数组键名
 * @returns {[]}
 */
export function traceChildNode(id, data, pidName = 'parentId', idName = 'id', childrenName = 'children') {
    let arr = [];
    foreachTree(data, childrenName, (node) => {
        if (node[pidName] == id) {
            arr.push(node);
            arr = arr.concat(traceChildNode(node[idName], data, pidName, idName, childrenName));
        }
    });
    return arr;
}
```



## 修改数组里对象的key

别名：修改数组里对象的键名

```js
data:[{"label":"标签","value":"值"}]
// 使用后
newData: [{"name":"标签","code":"值"}]
```

```js
/**
 * 修改数组里对象的Key和值
 * @param arr
 * @returns {*}
 */
export function convertKey(arr) {
    return arr.map(item => ({
        label: item.name,
        value: item.code
    }))
}
```

## 加减乘除

> 解决精度丢失问题

```js
/**
 * @desc 加法函数（精度丢失问题）
 * @param { number } arg1
 * @param { number } arg2
 */
export function add(arg1, arg2) {
    let r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m
}
```

```js
/**
 * @desc 减法函数（精度丢失问题）
 * @param { number } arg1
 * @param { number } arg2
 */
export function sub(arg1, arg2) {
    let r1, r2, m, n;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
}
```

```js
/**
 * @desc 乘法函数（精度丢失问题）
 * @param { number } num1
 * @param { number } num2
 */
export function mcl(num1,num2){
    let m=0,s1=num1.toString(),s2=num2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
}
```

```js
/**
 * @desc 除法函数（精度丢失问题）
 * @param { number } num1
 * @param { number } num2
 */
export function division(num1,num2){
    let t1,t2,r1,r2;
    try{
        t1 = num1.toString().split('.')[1].length;
    }catch(e){
        t1 = 0;
    }
    try{
        t2=num2.toString().split(".")[1].length;
    }catch(e){
        t2=0;
    }
    r1=Number(num1.toString().replace(".",""));
    r2=Number(num2.toString().replace(".",""));
    return (r1/r2)*Math.pow(10,t2-t1);
}
```



## 根据对象里的属性 重构为数组

```

let chartData =  [{"day":"2022-11-17","num":0},{"day":"2022-11-18","num":0},{"day":"2022-11-19","num":0}]

objToArr(chartData, 'day') //['2022-11-17', '2022-11-18', '2022-11-19']
```



```
/*
* @desc 获取对象里的属性 重构为数组
* @param {Array} objArr
* @param {string} field
* @returns {Array}
*/
export const objToArr = (objArr, field) => {
  const newArr = []
  objArr.forEach((item) => {
    newArr.push(item[field])
  })
  return newArr
}
```



## 根据对象的某个属性，找到数组里的对象

```js
  let objArr = [{"id":1,"name":"a"},{"id":2,"name":"b"}]
  getListObj(objArr,1,'id') //{id: 1, name: 'a'}
```



````js
  /*
  * @desc  列表根据属性值找对象
  * @param {Array} list
  * @param {string|number} val
  * @param {string} fieldName
  * @returns {Object}
  */
  export function getListObj (list, val, fieldName) {
    let result = {}

    list.forEach((item) => {
      if (item[fieldName] === val) {
        result = item
      }
    })

    return result
  }
````



## 树结构 根据id获取name

```js
let objArr = [{"child":[{"child":[{"id":80,"name":"三级分类"}],"id":12,"name":"二级分类"}],"id":13,"name":"一级分类"},{"child":[{"child":[{"child":[{"id":72,"name":"奶茶分类"}],"id":24,"name":"咖啡分类"},{"id":2,"name":"甜品分类"}],"id":20,"name":"吃货分类"}],"id":4,"name":"甜点饮品"}]

   console.log(getTreeName(objArr,72,'id','name')) //奶茶分类
```



```js
/*
* @desc  树结构根据id找name
* @param {Array} list
* @param  val
* @param {string} valField
* @param {string} resultField
* @returns 值
*/
  export function getTreeName(list, val,valField,resultField) {
    for (let i = 0; i < list.length; i++) {
      const a = list[i]
      if (a[valField] === val) {
        return a[resultField]
      } else {
        if (a.child && a.child.length > 0) {
          const res = getTreeName(a.child, val,valField,resultField)
          if (res) {
            return res
          }
        }
      }
    }
  }
```



## 字符串转对象

```
  let Str = '规格A;规格B;规格C'
  
  stringToOptionObject(Str,'label','value') 
  //[{"label":"规格A","value":"规格A"},{"label":"规格B","value":"规格B"},{"label":"规格C","value":"规格C"}]
```



```js
  /*
    * @desc  字符串转对象
    * @param {string} string
    * @param {string} labelName
    * @param {string} valueName
    * @returns {Array}
    */
  export function stringToOptionObject(str,labelName,valueName) {
    const arr = str.split(';')
    const arrObjArr = []
    arr.forEach((item) => {
      const obj = {}
      obj[labelName] = item
      obj[valueName] = item
      arrObjArr.push(obj)
    })
    return arrObjArr
  }
```



## 数组对象值转对象

```js
let arr = [{"id":0,"status":"a"},{"id":155,"status":"b"},{"id":283,"status":"c"},{"id":88,"status":"d"}]

arrOptionToObject(arr,'status','id')//{"a":0,"b":155,"c":283,"d":88}
```



```js
/*
    * @desc  数组对象值转对象
    * @param {Array} arr
    * @param {string} key  新对象到的key
    * @param {string} val  新对象到的值
    * @returns {Object}
    */
  export function arrOptionToObject(arr, key, val) {
    const obj = {}
    arr.forEach((item) => {
      obj[item[key]] = item[val]
    })
    return obj
  }
```



## 二维数组全排列组合转一维数组

```js
  let arr2D = [["规格:大号-U"],["颜色:红色","颜色:黄色"]]
  
  doCombination(arr2D)//["规格:大号-U,颜色:红色","规格:大号-U,颜色:黄色"]
```



```js
 /*
    * @desc  数组全排列组合
    * @param {Array} dArray:二维数组
    * @returns {Array} 一维数组
    */
   function doCombination(dArray) {
    if (dArray.length > 0) {
      return dArray.reduce((last, el) => {
        const arr = []
        // last：上次运算结果
        // el：数组中的当前元素
        last.forEach(e1 => {
          el.forEach(e2 => {
            arr.push(e1 + ',' + e2)
          })
        })
        return arr
      })
    }
    return []
  }
```



## 数组|对象深拷贝

```js
/**
 * 深拷贝的简单版本，在一些边缘性情况会有bug，如果想要完美的深拷贝可以引入lodash的  _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}
```



## 数组对象去重

```js
/*数组对象去重*/
uniqueObjArr(arr,Field) {
    const res = new Map();
    return arr.filter((a) => !res.has(a[Field]) && res.set(a[Field], 1))
}
```





## 替换指定位置的字符串

```js
let str = '1300011'
changeStr(str,str.length-2,'00') //1300000  把字符串后两位替换掉
```



```js
    /*
    * 替换指定位置的字符串
    * @param {string} str 原始字符串
    * @param {number} index 开始位置
    * @param {string} changeStr 改变后的字
    * @returns {string} 
    */
    export function changeStr(str,index,changeStr){
      return str.substr(0, index) + changeStr+ str.substr(index + changeStr.length);
    }
```



## 数量排序



## 函数节流

```js
   demoFun:throttle(function (e) {
    //...业务逻辑
    }, 1000)
```



```js
/*
* @desc 节流器函数，避免函数在小于规定时间范围内多次执行, 减少函数的触发频率
* @param {Function} fn 目标函数
* @param {?Number} interval 规定限制时间，单位为ms，缺省值为300
* @returns {Function} 经节流器处理过的函数
*/
export const  throttle = function (fn, interval) {
  var enterTime = 0;//触发的时间
  var gapTime = interval || 300 ;//间隔时间，如果interval不传，则默认300ms
  return function() {
    var context = this;
    var backTime = new Date();//第一次函数return即触发的时间
    if (backTime - enterTime > gapTime) {
      fn.call(context,...arguments);
      enterTime = backTime;//赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  };
}
```



## 函数防抖

```js
gotoUnlock: debounce(function() {
      //...业务逻辑
}),
```



```js
/*
* @desc 防抖函数，规定函数延迟指定时间执行，如果在这段时间内再次调用。则以函数执行时间往后顺延(不管触发多少次都只执行最后一次,防止按钮重复点击)
* @param {Function} fn 目标函数
* @param {?Number} interval 规定限制时间，单位为ms，缺省值为500
* @returns {Function} 经处理过的函数
*/
export const  debounce = function debounce(fn, interval) {
  var timer;
  var gapTime = interval || 300;//间隔时间，如果interval不传，则默认1000ms
  return function() {
    clearTimeout(timer);
    var context = this;
    var args = arguments;//保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
    timer = setTimeout(function() {
      fn.call(context,...args);
    }, gapTime);
  };
}
```



## 对象字符串的值转字符串

```js
ObjStringDeal('{"颜色":"红色","规格":"大号-U"}') //红色,大号-U
```



```js
    /*
   * 对象字符串值转字符串
   * @param {string} ObjString
   * @returns {string}
   */
     const ObjStringDeal = (ObjString) =>{
      let ObjStringJson = JSON.parse(ObjString);
      let ObjValues = Object.values(ObjStringJson);
      let ObjStringSting = '';

       ObjValues.forEach((item)=>{
        ObjStringSting = ObjStringSting + item + ',';
      })
      //去掉最后的逗号
      ObjStringSting = ObjStringSting.substring(0, ObjStringSting.lastIndexOf(','));

      return ObjStringSting
    }
```



## 去掉字符串最后的逗号

```js
strRemoveDot('abcd,') //abcd
```



```js
  /**
   * 去掉字符串最后的逗号
   * @param {string} str 带逗号的字符串
   * @returns {string}
   */
  function strRemoveDot (str){
    return  str.substring(0, str.lastIndexOf(','));
  }
```

## 获取数字随机数

```js
 // 随机数 min最小值，max最大值
randomRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
},
```

