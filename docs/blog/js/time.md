# 时间类

## 获取当前周几

别名：今天星期几

```js
getDayText() //五
```

```js
/**
 * 获取当前日期
 * @param date
 * @returns {string}
 */
export const getDayText = (date = new Date()) => {
        if (typeof (date) === 'number') {
            date = new Date(date);
        } else if (typeof (date) === 'string') {
            date = new Date(date.replace(/-/g, '/').replace(/\./g, '/'));
        }
        return '日一二三四五六'.charAt(date.getDay());
    };
```

## 时间问候语

别名：good morning

```js
/**
 * 时间问候语
 * @returns {string}
 */
export const greetTime = () => {
        const time = new Date();
        const hour = time.getHours();
        return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
    }
```

## Date时间转数字

别名：时间转数字格式、时间戳

```js
parseTime(new Date(), '{y}{m}{d}') // 20211221
```

```js
/**
 * 时间转数字
 * @param time new Date()
 * @param cFormat 显示的格式
 * @returns {string|null}
 */
export function parseTime(time, cFormat) {
    if (arguments.length === 0 || !time) {
        return null;
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date;
    if (typeof time === 'object') {
        date = time;
    } else {
        if (typeof time === 'string') {
            if (/^[0-9]+$/.test(time)) {
                time = parseInt(time);
            } else {
                // support safari
                // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
                time = time.replace(new RegExp(/-/gm), '/');
            }
        }

        if (typeof time === 'number' && time.toString().length === 10) {
            time = time * 1000;
        }
        date = new Date(time);
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay(),
    };
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key];
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value];
        }
        return value.toString().padStart(2, '0');
    });
    return time_str;
}
```

## Date时间转汉字

别名：时间转汉字、时间戳

```js
formatTime(new Date()) // 刚刚
```

```js
/**
 * 时间转汉字
 * @param  {number} time
 * @param  {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
    if (('' + time).length === 10) {
        time = parseInt(time) * 1000
    } else {
        time = +time
    }
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        // 必须使用 [ parseTime ] 这个函数
        // return parseTime(time, option)
    } else {
        return (
            d.getMonth() +
            1 +
            '月' +
            d.getDate() +
            '日' +
            d.getHours() +
            '时' +
            d.getMinutes() +
            '分'
        )
    }
}
```

## 获取某月有多少天

```js
console.log(getMonthOfDay('2021-2')) // 28
console.log(getMonthOfDay()) // 当前为2021-12月，即得到的是30
```

```js
/**
 * 获取某月有多少天
 * @param time
 * @returns {number}
 */
export function getMonthOfDay(time) {
    let date = new Date(time);
    let year = date.getFullYear();
    let mouth = date.getMonth() + 1;
    let days;

    let timeArr = [1, 3, 5, 7, 8, 9, 10, 12]
    //当月份为二月时，根据闰年还是非闰年判断天数
    if (mouth === 2) {
        days = year % 4 === 0 ? 29 : 28
    } else if (timeArr.includes(mouth)) {
        //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
        days = 31
    } else {
        //其他月份，天数为：30.
        days = 30
    }
    return days
}
```

## 获取某年的第一天

```js
console.log(getFirstDayOfYear('2021')) // 2021-01-01 00:00:00
```

```js
/**
 * 获取某年的第一天
 * @param time
 * @returns {string}
 */
export function getFirstDayOfYear(time) {
    let year = new Date(time).getFullYear();
    return year + "-01-01 00:00:00";
}
```

## 获取某年最后一天

```js
console.log(getLastDayOfYear('2021')) // 2021-12-31 23:59:59
```

```js
/**
 * 获取某年最后一天
 * @param time
 * @returns {string}
 */
export function getLastDayOfYear(time) {
    let year = new Date(time).getFullYear();
    let dateString = year + "-12-01 00:00:00";
    // 要配合 [ getMonthOfDay ] 这个方法使用
    let endDay = getMonthOfDay(dateString);
    return year + "-12-" + endDay + " 23:59:59";
}
```

## 获取某个日期是当年中的第几天

```js
console.log(getDayOfYear('2021-12-13')) // 347
```

```js
/**
 * 获取某个日期是当年中的第几天
 * @param time
 * @returns {number}
 */
export function getDayOfYear(time) {
    // 要配合 [ getFirstDayOfYear ] 这个方法使用
    let firstDayYear = getFirstDayOfYear(time);
    let numSecond = (new Date(time).getTime() - new Date(firstDayYear).getTime()) / 1000;
    return Math.ceil(numSecond / (24 * 3600));
}
```

## 获取某个日期在这一年的第几周

```js
console.log(getDayOfYearWeek('2021-12-31')) // 53
```

```js
/**
 * 获取某个日期在这一年的第几周
 * @param time
 * @returns {number}
 */
export function getDayOfYearWeek(time) {
    // 要配合 [ getDayOfYear ] 这个方法使用
    let numDays = getDayOfYear(time);
    return Math.ceil(numDays / 7);
}
```

## 把秒转化为天小时分钟秒

```js
sToHs(60) // 1分钟0秒
```

```js
/**
 * 把秒转化为天小时分钟秒
 * @param seconds
 * @returns {string}
 */
export function sToHs(seconds){
  let daySec = 24 *  60 * 60;
  let hourSec=  60 * 60;
  let minuteSec = 60;
  let dd = Math.floor(seconds / daySec);
  let hh = Math.floor((seconds % daySec) / hourSec);
  let mm = Math.floor((seconds % hourSec) / minuteSec);
  let ss = seconds%minuteSec;
  if(dd > 0) {
    return dd + "天" + hh + "小时" + mm + "分钟"+ss+"秒";
  } else if (hh > 0) {
    return hh + "小时" + mm + "分钟"+ss+"秒";
  } else if (mm > 0) {
    return mm + "分钟"+ss+"秒";
  } else {
    return ss+"秒";
  }
}
```

