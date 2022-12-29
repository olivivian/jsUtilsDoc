
# 工具类

## PC端判断

```js
if (isPc) alert('这是PC端');
```

```js
/**
 * PC端判断
 * @returns {boolean}
 */
export function isPc() {
    let userAgentInfo = navigator.userAgent;
    let Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break
        }
    }
    return flag;
}
```



## 数字格式化（给数字加逗号）

```js
formatDecimal(12000000.11) //12,000,000.11
formatDecimal(12000000.11,false) //12,000,000
```



```js
  /**
   * @desc 数字格式化，如：1234567.89 -> 1,234,567.89
   * @param {Number} num 待格式化的数字，小数或整数
   * @param {?Boolean} fixed 是否保留小数，缺省值为true
   * @returns {String} 格式化后的字符串
   */
  function formatDecimal (num, fixed) {
    if(typeof(num) !== 'number'){
      throw Error('parameter "num" must be a number!');
    }
    fixed = fixed === undefined ? true : fixed;
    let numStr = fixed ? (Math.round(num * 100) / 100).toFixed(2) : Math.round(num).toString();
    return numStr.replace(/(\d{1,3})(?=(\d{3})+\b)/g, '$1,');
  }
```



## downFile文件下载

别名：前端下载图片

```js
let urlVal = "https://avuejs.com/images/logo-bg.jpg";
let data = {
    url: urlVal,
    width: 300,
    height: 300,
    urlName: '图片名字',
}
downLoadImgByUrl(data)
```

```js
/**
 * 下载图片到本地，可适用于移动端
 */
 const downLoadImgByUrl = ({ url, width, height, urlName }) => {
    let canvas = document.createElement('CANVAS')
    let ctx = canvas.getContext('2d')
    let img = new Image()
    img.crossOrigin = 'Anonymous'
    img.onload = function () {
        let ResWidth
        let ResHeight

        if (width && height) {
            ResWidth = width
            ResHeight = height
        } else if (width) {
            ResWidth = width
            ResHeight = img.height * (width / img.width)
        } else if (height) {
            ResHeight = height
            ResWidth = img.width * (height / img.height)
        } else {
            ResWidth = img.width
            ResHeight = img.height
        }
        canvas.width = ResWidth
        canvas.height = ResHeight
        console.log(ResWidth, ResHeight)
        ctx.drawImage(img, 0, 0, ResWidth, ResHeight)

        let saveA = document.createElement('a')
        document.body.appendChild(saveA)
        saveA.href = canvas.toDataURL('image/jpeg', 1)
        saveA.download = urlName?urlName:'mypic' + new Date().getTime()
        saveA.target = '_blank'
        saveA.click()
        canvas = null
    }
    img.src = url
}
```

## 生成随机数

```js
randomString(5) // ZsAl6
```

```js
/**
 * 生成随机数
 * @param len 生成的长度
 * @returns {string}
 */
export const randomString = (len) => {
        len = len || 32;
        let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        let maxPos = chars.length;
        let pwd = '';
        for (let i = 0; i < len; i++) {
            pwd += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }
```

## 复制

```js
copyToClip('复制文本')
```

```js
/**
 * 复制
 * @param content 内容
 * @param info 复制成功的文案
 */
export function copyToClip(content, info) {
    let aux = document.createElement('input');
    aux.setAttribute('value', content);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand('copy');
    document.body.removeChild(aux);
    if (info == null) {
        alert('复制成功');
    } else {
        alert(info);
    }
}
```

## loadScript

别名：加载脚本、加载js、加载css、加载资源

```js
loadScript('js', 'xxx.js').then(() => {
//执行后的方法
})
loadScript('css', 'xxx.css').then(() => {
//执行后的方法
})
```

```js
/**
 * loadScript
 * @param type 类型
 * @param url 资源地址
 * @returns {Promise<unknown>}
 */
export function loadScript(type = 'js', url) {
    let flag = false;
    return new Promise((resolve) => {
        const head = document.getElementsByTagName('head')[0];
        head.children.forEach(ele => {
            if ((ele.src || '').indexOf(url) !== -1) {
                flag = true;
                resolve();
            }
        });
        if (flag) return;
        let script;
        if (type === 'js') {
            script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
        } else if (type === 'css') {
            script = document.createElement('link');
            script.rel = 'stylesheet';
            script.type = 'text/css';
            script.href = url;
        }
        head.appendChild(script);
        script.onload = function () {
            resolve();
        };
    });
};
```

## 历史记录

别名：搜索历史、最近浏览

```js
/**
 * 最近浏览
 * @param item 单个元素
 * item => {
 *   id: 40,
 *   name: '第五个元素'
 * }
 */
export function setHistoryList(item) {
    const newViewNum = 8; // 要显示几条
    let HistoryList = [];
    if (window.localStorage.getItem('HistoryList') && window.localStorage.getItem('HistoryList') !== '[""]') {
        let newHistoryList = JSON.parse(window.localStorage.getItem('HistoryList'));
        let newArr = HistoryList.concat(newHistoryList)
        if (newArr.length > 0) {
            newArr.map((vo, key) => {
                // 搜索记录单个id 和 当前点击的元素
                if (vo.id === item.id) {
                    newArr.splice(key, 1)
                }
            })
        }
        newArr.unshift(item)
        if (newArr.length > newViewNum) {
            newArr.pop();
        }
        window.localStorage.setItem('HistoryList', JSON.stringify(newArr))
    } else {
        HistoryList.push(item);
        window.localStorage.setItem('HistoryList', JSON.stringify(HistoryList))
    }
}
```

## 防抖

```js
methods: {
    toggle:debounce(() => {
        console.log('防抖')
    }, 1000)
}
```

```js
/**
 * 防抖
 * @param func 方法名
 * @param wait 等待时间
 * @param immediate
 * @returns {function(...[*]=): *}
 */
export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result

    const later = function () {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp

        // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args)
                if (!timeout) context = args = null
            }
        }
    }

    return function (...args) {
        context = this
        timestamp = +new Date()
        const callNow = immediate && !timeout
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait)
        if (callNow) {
            result = func.apply(context, args)
            context = args = null
        }

        return result
    }
}
```

## 获取地址栏参数

别名：获取问号后面的参数

```js
// http://localhost:8080/page?a=123
getQueryObject() // {a:123}
```

```js
/**
 * 获取地址栏的参数
 * @param url
 * @returns {{}}
 */
export function getQueryObject(url) {
    url = url == null ? window.location.href : url
    const search = url.substring(url.lastIndexOf('?') + 1)
    const obj = {}
    const reg = /([^?&=]+)=([^?&=]*)/g
    search.replace(reg, (rs, $1, $2) => {
        const name = decodeURIComponent($1)
        let val = decodeURIComponent($2)
        val = String(val)
        obj[name] = val
        return rs
    })
    return obj
}
```

## base64转换为文件

```js
/**
 * base64转换为文件
 * @param url
 * @param filename
 * @returns {File}
 */
export function dataURLtoFile(url, filename) {
    let arr = url.split(",")
    let mime = arr[0].match(/:(.*?);/)[1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, {type: mime})
}
```

## 图片转换为base64

```js
/**
 * 图片转换为base64
 * @param url
 * @param callback
 * @param outputFormat
 */
export function getImgToBase64(url, callback, outputFormat) {
    let canvas = document.createElement("canvas")
    let ctx = canvas.getContext("2d")
    let img = new Image()
    img.crossOrigin = "Anonymous"
    img.onload = function () {
        canvas.height = img.height
        canvas.width = img.width
        ctx.drawImage(img, 0, 0)
        let dataURL = canvas.toDataURL(outputFormat || "image/png")
        callback(dataURL)
        canvas = null
    }
    img.src = url
}
```

## uuid生成唯一值

```js
console.log(uuid()) // dec79cc2-ecf7-ec28-4b34-678b60ab37da
```

```js
/**
 * 生成唯一值
 * @returns {string}
 */
export function uuid() {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
```



## 生成一个hash字符串

```js
getHash(6) //8cQQ80
getHash(12) //5Ia85xP0b4E6
```



```js
  /**
   * 生成一个hash字符串
   * @param {Number} length 获取的hash字符串的长度（不小于5）
   */
  export function getHash(length){
    let tempStr = '0123456789abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let _mul = tempStr.length;
    length = (typeof(length) === 'number' && length > 5) ? length : 8;
    let str = Array(length).fill().map(v => tempStr[Math.floor(Math.random() * _mul)]);
    return str.join('');
  }
```





## 生成随机字符串

```js
console.log(createUniqueString()) // njb9967469s0
```



```js
  /**
  * 生成随机字符串
   * @returns {string}
   */
   function createUniqueString() {
    const timestamp = +new Date() + ''
    const randomNum = parseInt((1 + Math.random()) * 65536) + ''
    return (+(randomNum + timestamp)).toString(32)
  }
```





## 大小写转换或首字母

```js
changeBigSmallCase('Hello', 5); // hello 
```

```js
/**
 * @param str
 * @param type 1:首字母大写  2:首页母小写  3:大小写转换  4:全部大写  5:全部小写
 * @returns {string|*}
 */
export function changeBigSmallCase(str, type) {
    type = type || 4
    switch (type) {
        case 1:
            return str.replace(/\b\w+\b/g, function (word) {
                return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();

            });
        case 2:
            return str.replace(/\b\w+\b/g, function (word) {
                return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
            });
        case 3:
            return str.split('').map(function (word) {
                if (/[a-z]/.test(word)) {
                    return word.toUpperCase();
                } else {
                    return word.toLowerCase()
                }
            }).join('')
        case 4:
            return str.toUpperCase();
        case 5:
            return str.toLowerCase();
        default:
            return str;
    }
}
```

## 将阿拉伯数字翻译成中文的大写数字

```js
numberToChinese('10') // 十
```

```js
/**
 * 将阿拉伯数字翻译成中文的大写数字
 * @param num
 * @returns {string}
 */
export function numberToChinese(num) {
    let AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
    let BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");
    let a = ("" + num).replace(/(^0*)/g, "").split("."),
        k = 0,
        re = "";
    for (let i = a[0].length - 1; i >= 0; i--) {
        switch (k) {
            case 0:
                re = BB[7] + re;
                break;
            case 4:
                if (!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$")
                    .test(a[0]))
                    re = BB[4] + re;
                break;
            case 8:
                re = BB[5] + re;
                BB[7] = BB[5];
                k = 0;
                break;
        }
        if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
            re = AA[0] + re;
        if (a[0].charAt(i) != 0)
            re = AA[a[0].charAt(i)] + BB[k % 4] + re;
        k++;
    }

    if (a.length > 1) // 加上小数部分(如果有小数部分)
    {
        re += BB[6];
        for (let i = 0; i < a[1].length; i++)
            re += AA[a[1].charAt(i)];
    }
    if (re == '一十')
        re = "十";
    if (re.match(/^一/) && re.length == 3)
        re = re.replace("一", "");
    return re;
}
```

## 将数字转换为大写金额

```js
console.log(changeToChinese('1000')) // 壹仟元整
```

```js
/**
 * 将数字转换为大写金额
 * @param Num
 * @returns {string}
 */
export function changeToChinese(Num) {
    //判断如果传递进来的不是字符的话转换为字符
    if (typeof Num == "number") {
        Num = new String(Num);
    }
    ;
    Num = Num.replace(/,/g, "") //替换tomoney()中的“,”
    Num = Num.replace(/ /g, "") //替换tomoney()中的空格
    Num = Num.replace(/￥/g, "") //替换掉可能出现的￥字符
    if (isNaN(Num)) { //验证输入的字符是否为数字
        //alert("请检查小写金额是否正确");
        return "";
    }
    ;
    //字符处理完毕后开始转换，采用前后两部分分别转换
    let part = String(Num).split(".");
    let newchar = "";
    //小数点前进行转化
    for (let i = part[0].length - 1; i >= 0; i--) {
        if (part[0].length > 10) {
            return "";
            //若数量超过拾亿单位，提示
        }
        let tmpnewchar = ""
        let perchar = part[0].charAt(i);
        switch (perchar) {
            case "0":
                tmpnewchar = "零" + tmpnewchar;
                break;
            case "1":
                tmpnewchar = "壹" + tmpnewchar;
                break;
            case "2":
                tmpnewchar = "贰" + tmpnewchar;
                break;
            case "3":
                tmpnewchar = "叁" + tmpnewchar;
                break;
            case "4":
                tmpnewchar = "肆" + tmpnewchar;
                break;
            case "5":
                tmpnewchar = "伍" + tmpnewchar;
                break;
            case "6":
                tmpnewchar = "陆" + tmpnewchar;
                break;
            case "7":
                tmpnewchar = "柒" + tmpnewchar;
                break;
            case "8":
                tmpnewchar = "捌" + tmpnewchar;
                break;
            case "9":
                tmpnewchar = "玖" + tmpnewchar;
                break;
        }
        switch (part[0].length - i - 1) {
            case 0:
                tmpnewchar = tmpnewchar + "元";
                break;
            case 1:
                if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
                break;
            case 2:
                if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
                break;
            case 3:
                if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
                break;
            case 4:
                tmpnewchar = tmpnewchar + "万";
                break;
            case 5:
                if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
                break;
            case 6:
                if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
                break;
            case 7:
                if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
                break;
            case 8:
                tmpnewchar = tmpnewchar + "亿";
                break;
            case 9:
                tmpnewchar = tmpnewchar + "拾";
                break;
        }
        let newchar = tmpnewchar + newchar;
    }
    //小数点之后进行转化
    if (Num.indexOf(".") != -1) {
        if (part[1].length > 2) {
            // alert("小数点之后只能保留两位,系统将自动截断");
            part[1] = part[1].substr(0, 2)
        }
        for (i = 0; i < part[1].length; i++) {
            tmpnewchar = ""
            perchar = part[1].charAt(i)
            switch (perchar) {
                case "0":
                    tmpnewchar = "零" + tmpnewchar;
                    break;
                case "1":
                    tmpnewchar = "壹" + tmpnewchar;
                    break;
                case "2":
                    tmpnewchar = "贰" + tmpnewchar;
                    break;
                case "3":
                    tmpnewchar = "叁" + tmpnewchar;
                    break;
                case "4":
                    tmpnewchar = "肆" + tmpnewchar;
                    break;
                case "5":
                    tmpnewchar = "伍" + tmpnewchar;
                    break;
                case "6":
                    tmpnewchar = "陆" + tmpnewchar;
                    break;
                case "7":
                    tmpnewchar = "柒" + tmpnewchar;
                    break;
                case "8":
                    tmpnewchar = "捌" + tmpnewchar;
                    break;
                case "9":
                    tmpnewchar = "玖" + tmpnewchar;
                    break;
            }
            if (i == 0) tmpnewchar = tmpnewchar + "角";
            if (i == 1) tmpnewchar = tmpnewchar + "分";
            newchar = newchar + tmpnewchar;
        }
    }
    //替换所有无用汉字
    while (newchar.search("零零") != -1)
        newchar = newchar.replace("零零", "零");
    newchar = newchar.replace("零亿", "亿");
    newchar = newchar.replace("亿万", "亿");
    newchar = newchar.replace("零万", "万");
    newchar = newchar.replace("零元", "元");
    newchar = newchar.replace("零角", "");
    newchar = newchar.replace("零分", "");
    if (newchar.charAt(newchar.length - 1) == "元") {
        newchar = newchar + "整"
    }
    return newchar;
}
```

## 富文本代码块右上角显示复制按钮

```js
onMounted(() => {
    codeCopy() // 代码块复制
})
```

```js
const COPY = 'copy'
const COPIED = 'copied'
function codeCopy() {
    if (typeof document === 'undefined') return; // 解决 document is not defined 的bug
    const preCode = document.querySelectorAll('pre code');
    if(!preCode) return
    Array.prototype.forEach.call(preCode, function(item) {
        const spanEl = document.createElement("span");
        spanEl.className = 'code-copy';
        spanEl.innerText = COPY;
        item.parentNode.setAttribute('class','copy-box');
        item.parentNode.appendChild(spanEl)
    })
    //markdown 代码存放在pre code 标签对中
    const codeCopyHandler = document.querySelectorAll('pre.copy-box .code-copy')
    Array.prototype.forEach.call(codeCopyHandler, function(itemCopyBox) {
        itemCopyBox.onclick = function (el) {
            if(el.target.innerText === COPIED) return;
            let text = el.target.previousSibling.textContent || el.target.previousSibling.value;
            const textareaEl = document.createElement("textarea");
            textareaEl.textContent = text;
            document.body.appendChild(textareaEl)
            textareaEl.select();
            document.execCommand('Copy',true)
            textareaEl.remove()
            el.target.innerText = COPIED
            setTimeout(() => {
                el.target.innerText = COPY
            },1000)
        }
    })
}

export default codeCopy;
```

## 图片懒加载

```js
import lazyLoad from "@/plugins/lazy-load-img"

onMounted(() => {
    lazyLoad() // 图片懒加载
    window.addEventListener('scroll',handleScroll,false)
})
onUnmounted(() => {
    window.removeEventListener('scroll',handleScroll,false)
})
function handleScroll() {
    lazyLoad()
}
```

```js
/**
 * 图片懒加载
 */
const lazyLoadImg = () => {
    let viewHeight = document.documentElement.clientHeight
    let limg = document.querySelectorAll("img[data-src]")
    console.log(`limg===>`, limg)
    Array.prototype.forEach.call(limg, function (item, index) {
        let rect;
        if (item.getAttribute("data-src") === "") return
        //getBoundingClientRect
        rect = item.getBoundingClientRect();
        if (rect.bottom >= 0 && rect.top < viewHeight) {
            (function () {
                let img = new Image()
                img.src = item.getAttribute("data-src")
                item.src = img.src
                item.removeAttribute('data-src')
                item.setAttribute("class","loaded")
            })()
        }
    })
}
// 定义一个防抖函数
const debounce = (fn, delay = 500) => {
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}
const lazyLoad = debounce(lazyLoadImg)
export default lazyLoad
```



## 计算字符串长度（中英文）

```js
/*
* 计算字符串长度(英文占1个字符，中文汉字占2个字符)
*/
export const strlen  = (str)  => {
  var len = 0;
  for (var i=0; i<str.length; i++) {
    var c = str.charCodeAt(i);
    //单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
      len++;
    }
    else {
      len+=2;
    }
  }
  return len;
}
```



## 判断链接是否为本地

```js
export const isLocal = () => {
  const localURL = /^(192\.168\.\d{1,3}\.\d{1,3})|(localhost)|(172\.16\.\d{1,3}\.\d{1,3})$/;
  let hostname = window.location.hostname;
  return localURL.test(hostname)
}
```



##  获取当前url上的参数

```js
/**
 *@desc 获取当前url上的参数
 **/
export const getRequest = () => {
  var wholeUrl = window.location.href // 获取url中"?"符后的字串
  var wholeUrlArr = wholeUrl.split('?')
  var url = wholeUrlArr[1]
  if (url) {
    var theRequest = {}
    var strs = url.split('&')
    for (var i = 0; i < strs.length; i++) {
      const value = unescape(strs[i].split('=')[1])
      const valArr = value.split('#')
      theRequest[strs[i].split('=')[0]] = valArr[0]
    }
    return theRequest
  }
  return null
}
```



## 处理二进制流文件

````js
  /**
   * 二进制流处理
   * @param  { Object } res  axios返回的response
   */
  function blobDataHandle(res) {
    const blobType = res.data.type || ''

    // excel文档下载
    // if (blobType.indexOf("application/vnd.ms-excel") >= 0) {
    if (blobType.indexOf('application/vnd') >= 0) {
      const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' }) // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
      let filename = 'excel.xls'
      if (res.config.exportName) {
        filename = res.config.exportName
      }
      if ('download' in document.createElement('a')) {
        const downloadElement = document.createElement('a')
        let href = ''
        if (window.URL) href = window.URL.createObjectURL(blob)
        else href = window.webkitURL.createObjectURL(blob)
        downloadElement.href = href
        downloadElement.download = filename
        document.body.appendChild(downloadElement)
        downloadElement.click()
        if (window.URL) window.URL.revokeObjectURL(href)
        else window.webkitURL.revokeObjectURL(href)
        document.body.removeChild(downloadElement)
      } else {
        navigator.msSaveBlob(blob, filename)
      }
      return
    } else if (blobType.indexOf('multipart/form-data') >= 0) {
      var blob = new Blob([res.data], { type: 'application/x-tar' })
      const linkNode = document.createElement('a')
      let filename = 'excel.xls'
      if (res.headers.filename) {
        filename = decodeURIComponent(res.headers.filename)
      }
      // linkNode.download = new Date().Format('yyyy-MM-dd hhmmss')
      // linkNode.download = fileName + '.tar'
      linkNode.download = filename + '.zip'
      linkNode.style.display = 'none'
      linkNode.href = URL.createObjectURL(blob)
      document.body.appendChild(linkNode)
      linkNode.click()
      URL.revokeObjectURL(linkNode.href)
      document.body.removeChild(linkNode)
    } else if (blobType.indexOf('application/json') >= 0) {
      throw res
    }

    const errorMessage = {
      message: '未处理的二进制：' + blobType
    }
    throw errorMessage
  }
````
