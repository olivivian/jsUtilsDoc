

# 校验类
## 判断对象指定属性是否存在

```js
let obj = {"id":1,"name":"1"};

hasProperty(obj,'id') //true
hasProperty(obj,'ids') //false
```



```js
  /**
   * @desc 判断一个对象是否包含某个/些属性
   * @param {Object} obj 目标对象
   * @param {String} propStr 属性表达式字符串，如"prop"、"prop1.prop2.prop3"
   * @returns {Boolean} 判断结果
   */
  function hasProperty(obj, propStr){
    if(!obj || typeof(propStr) !== 'string') return false;
    let res = false,
      tmpObj = obj;
    propStr.split(/\./g).forEach(p => {
      res = false;
      if(p in tmpObj){
        res = true;
        tmpObj = tmpObj[p];
      }
    });
    return res;
  }
```



## 比较两个数据类型是否相同

```js
sameType(6,'aaa') //false
sameType(6,8) //true
```



```js
  /**
   * 比较两个数据类型是否相同
   * @param {any} arg1 待比较的第一个参数
   * @param {any} arg2 待比较的第二个参数
   */
  function sameType(arg1, arg2){
    if(arg1 === null || arg1 === undefined){
      if(arg1 === arg2) return true;
      return false;
    };
    if(arg2 === null || arg2 === undefined) return false;
    return (arg1 === arg2) || (arg1.constructor === arg2.constructor);
  }
```





## 是否为空

```js
/**
 * @desc 是否为空判断
 * @param val
 * @returns {boolean}
 */
export function isNull(val) {
  if (val instanceof Array) {
    if (val.length === 0) return true
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true
  } else {
    if (val === 'null' || val === null || val === 'undefined' || val === undefined || val === '') return true
    return false
  }
  return false
}
```



## 是否是字符串

```js
/**
 * @desc 是否是字符串
 * @param str
 * @returns {boolean}
 */
export function isString(str) {
    return str instanceof String || Object.prototype.toString.call(str) === '[object String]';
}
```



## 是否是数组

```js
/**
 * @desc 是否是数组
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

```



## 是否是对象

```js
/**
 * @desc 是否是对象
 * @param input
 * @returns {boolean}
 */
export function isObject(input) {
    return Object.prototype.toString.call(input) === '[object Object]';
}
```



## 是否是时间类型

```js
/**
 * @desc 是否是时间类型
 * @param input
 * @returns {boolean}
 */
export function isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
}
```



## 是否是数字

```js
/**
 * @desc 是否是数字
 * @param input
 * @returns {boolean}
 */
export function isNumber(input) {
    return input instanceof Number || Object.prototype.toString.call(input) === '[object Number]';
}
```



## 是否是布尔值

```js
/**
 * 是否是布尔值
 * @param input
 * @returns {boolean}
 */
export function isBoolean(input) {
    return typeof input == 'boolean';
}
```



## 是否是方法

```js
/**
 * 是否是方法
 * @param input
 * @returns {boolean}
 */
export function isFunction(input) {
    return typeof input == 'function';
}
```



## 邮箱校验

```js
/**
 * @desc  检测字符串是否为邮箱地址
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}
```



## 手机号校验

```js
/**
 * @desc 校验字符串是否为手机号码
 * @param {String} str 待判断的字符串
 * @returns {Boolean} 判断结果
*/
export function isMobileNo (str) {
    if(!str || typeof(str) !== 'string') return false;
    return /^1[3-9]\d{9}$/.test(str);
}
```



## 校验字符串是否是url

```js
/**
 * @desc 校验字符串是否为url
 * @param {String} str 待判断的字符串
 * @returns {Boolean} 判断结果
*/
function isUrl (str) {
    if(!str || typeof(str) !== 'string') return false;
    return /^https?\:\/\/.+$/i.test(str);
}
```



## 检验输入框大于等于0

```js
/*
* @desc 输入框大于等于0
* @param {number} val
* @param {Boolean} flag  true-可以为0
* @returns {Boolean}
*/
export const checkInput = (val, flag) => {
  val = parseFloat(val)
  if (!val || val <= 0) {
    if (flag === true && val === 0) {
      return false
    } else {
      return true
    }
  }
  return false
}
```



## 检验输入框为正整数

```
/*
* @desc 输入框为正整数
* @param {number} val
* @returns {Boolean} true 是 false 否 
*/
export const isPositiveNumber = (val) => {
  val = val + ''
  return /^[1-9]\d*$/.test(val)
}
```

