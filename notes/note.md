## 动态展示皮卡丘

### 逐个显示字符

```html
<div class="demo"></div>
<script src="test.js"></script>
```
```js
const string = `睁大眼睛看好了，接下来我就要挨个显示出来这些字`
let n = 0
demo.innerHTML = string.substr(0,n)
setInterval(()=>{
  n += 1;
  console.log(n + "：" + string.substr(0,n))
  demo.innerHTML = string.substr(0,n)
},300)
```

在输出完毕后会存在持续输出的情况，需要使用`clearInterval`取消`setInterval`设置的重复执行动作

```js
let id = setInterval(()=>{
  n += 1;
  if(n > string.length){
    window.clearInterval(id)
    return
  }
  console.log(n + "：" + string.substr(0,n))
  demo.innerHTML = string.substr(0,n)
},0)
```

### CSS样式

将 `string`内容替换为 css样式, 通过设置`scrollTop = scrollHeight - clientHeight`设置滚动条的垂直位置

判定元素是否滚动到底:

`element.scrollHeight - element.scrollTop === element.clientHeight`

```js
const string = ``

let id = setInterval(()=>{
  n += 1;
  if(n > string.length){
    window.clearInterval(id)
    return
  }
  console.log(n + "：" + string.substr(0,n))
  demo.innerHTML = string.substr(0,n)
  demo.scrollTop = demo.scrollHeight - demo.clientHeight;
},0)
```

### Html样式

`div#demoText` 通过 `js` 控制逐个显示css代码， `div#html`里面放置html代码布局，`demoHtml`通过`js`渲染css代码
```html
<div id="demoText"></div> 
<style id="demoHtml"></style>

<div id="html"></div>
```
```js
let n = 0
demoText.innerText  = string.substr(0,n)
demoHtml.innerHTML = string.substr(0,n)

let id = setInterval(()=>{
  n += 1;
  if(n > string.length){
    window.clearInterval(id)
    return
  }
  demoText.innerText = string.substr(0,n)
  demoHtml.innerHTML = string.substr(0,n)
  demoText.scrollTop = demoText.scrollHeight - demoText.clientHeight;
},0)
```
### 上下布局

`fixed`定位，将页面分为上下两部分，上面展示代码，下面显示样式

```css
#html{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50vh;
}
#demoText{
  position:fixed;
  height: 50vh;
  width: 100%;
  top: 0;
  left: 0;
  border: 1px solid red;
  overflow-y: auto;
}
#demoText::-webkit-scrollbar{  
  display: none;
}
#demoHtml{ display: none}

```

##### 代码显示滚动条：

    设置 `overflow: scroll;`，会导致下方右方都有滚动条；
    通过`overflow-y: auto;` 只显示右侧滚动条；
    #demoText::-webkit-scrollbar{ display: none; } 隐藏滚动条，用鼠标滚动


