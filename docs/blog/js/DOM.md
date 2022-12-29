
# DOM类

## 获取元素

```js
export function $(selector) {
    let type = selector.substring(0, 1);
    if (type === '#') {
        if (document.querySelecotor) return document.querySelector(selector)
        return document.getElementById(selector.substring(1))
    } else if (type === '.') {
        if (document.querySelecotorAll) return document.querySelectorAll(selector)
        return document.getElementsByClassName(selector.substring(1))
    } else {
        return document['querySelectorAll' ? 'querySelectorAll' : 'getElementsByTagName'](selector)
    }
}
```

## 跳转到某个元素

别名：滚动到某个div

```js
goTo()
{
    goToDom(document.querySelector('#contentTop'), 0);
}
```

```js
/**
 * 跳转到某个元素
 * @param toEl
 * @param n
 */
export function goToDom(toEl, n) {
    let bridge = toEl;
    let body = document.body;
    let height = 0;
    do {
        height += bridge.offsetTop;
        bridge = bridge.offsetParent;
    } while (bridge !== body)
    // 增加动画
    window.scrollTo({
        top: height - n,
        behavior: 'smooth'
    })
}
```

## 切换元素

别名：切换class

```js
toggle()
{
    toggleClass(document.body, 'dark')
}
```

```js
/**
 * 切换Class
 * @param element
 * @param className
 */
export function toggleClass(element, className) {
    if (!element || !className) {
        return
    }
    let classString = element.className
    const nameIndex = classString.indexOf(className)
    if (nameIndex === -1) {
        classString += '' + className
    } else {
        classString =
            classString.substr(0, nameIndex) +
            classString.substr(nameIndex + className.length)
    }
    element.className = classString
}
```

## 获取兄弟节点

```js
/**
 * 获取兄弟节点
 * @param ele
 * @returns {[]}
 */
export function siblings(ele) {
    let chid = ele.parentNode.children, eleMatch = [];
    for (let i = 0, len = chid.length; i < len; i++) {
        if (chid[i] != ele) {
            eleMatch.push(chid[i]);
        }
    }
    return eleMatch;
}
```

## 判断是否存在Class

别名：class是否存在

```js
/**
 * 判断是否存在某个Class
 * @param ele 元素
 * @param cls class名
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}
```

## 添加Class

```js
/**
 * 添加class
 * @param ele 元素
 * @param cls class名
 */
export function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += ' ' + cls
}
```

## 删除Class

```js
/**
 * 删除Class
 * @param ele 元素
 * @param cls class名
 */
export function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        ele.className = ele.className.replace(reg, ' ')
    }
}
```

## 创建a标签打开新页面

别名：window.open被浏览器拦截

```js
/**
 * window.open(url)打开链接被浏览器拦截解决方案
 * @param url
 */
export function addBlankPath(url) {
    const a = document.createElement('a')
    a.href = url  // 窗口的链接
    a.target = '_blank'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}
```
