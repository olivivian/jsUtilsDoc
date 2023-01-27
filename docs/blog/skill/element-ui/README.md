> Element UI  👉 [文档地址](https://element.eleme.cn/#/zh-CN/component/installation)


## DatePicker日期选择器

```js
 <el-date-picker
     ....
     type="daterange"
     :picker-options="pickerOptions"
     ...
/>
```

### 禁止选择今天以前的日期

```js
pickerOptions: {
        disabledDate(time) {
          return time.getTime() < new Date().getTime() - 86400000
        }
},
```

![image-20230106172256087](https://imgstorage-1313684358.cos.ap-nanjing.myqcloud.com/img/image-20230106172256087.png)

### 禁止选择今天及今天之前的时间

```js
    pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
```

![image-20230106172335884](https://imgstorage-1313684358.cos.ap-nanjing.myqcloud.com/img/image-20230106172335884.png)

### 禁止选择今天之后的日期

```js
  pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
```

![image-20230106172359974](https://imgstorage-1313684358.cos.ap-nanjing.myqcloud.com/img/image-20230106172359974.png)











