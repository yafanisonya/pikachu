## 添加播放、暂停、变速按钮

### 添加按钮
```html
  <div id="buttons">
    <button id="btnPause">暂停</button>
    <button id="btnPlay">播放</button>
    <button id="btnSlow">慢速</button>
    <button id="btnNormal">中速</button>
    <button id="btnFast">快速</button>
  </div>
```
在`html`中添加按钮会存在不显示的情况，原因是 `#demoText`采用`fixed`定位，导致按钮被遮挡，解决办法：`fixed z-index`
```css
  #buttons { 
    position: fixed; 
    right: 0; 
    top: 0;
    z-index: 10;
    display: flex; 
    flex-direction: column;
    margin-right: 10px;
    margin-top: 10px;
  }
  #buttons > button { margin-bottom: 10px; padding: 4px 8px;}
```

在页面刷新时，会出现按钮先放大后变小的情况，原因是`css`样式相互影响，解决办法：控制`test.js`内`css`代码作用范围
```css
 .skin *{box-sizing: border-box;margin: 0;padding: 0;}
 .skin *::before, .skin *::after{box-sizing: border-box;}
 .skin {
    background: #ffe600;
    min-height: 50vh;
    position: relative;
  }
```

### 模块化
新建css.js文件，导出css代码，在test.js内导入
```js
const string = ` `
export default string

import string from './css'
```

### 实现播放暂停
```js
const run = () => {
  n += 1;
  if(n > string.length){
    window.clearInterval(id)
    return
  }
  console.log(n + "：" + string.substr(0,n))
  demoText.innerText = string.substr(0,n)
  demoHtml.innerHTML = string.substr(0,n)
  demoText.scrollTop = demoText.scrollHeight - demoText.clientHeight;
}

btnPause.onclick = ()=>{
  window.clearInterval(id)
}
btnPlay.onclick = ()=> {
  id = setInterval(()=>{ run() },0)
}
```

### 设置时间间隔
默认为100ms
```js
let time = 100 

btnPlay.onclick = ()=> {
  id = setInterval(()=>{ run() },time)
}
```

### 添加变速按钮
```js
btnSlow.onclick = ()=> {
  window.clearInterval(id)
  time = 300
  id = setInterval(()=>{ run()}, time)
}
btnNormal.onclick = ()=> {
  window.clearInterval(id)
  time = 100
  id = setInterval(()=>{ run()}, time)
}
btnFast.onclick = ()=> {
  window.clearInterval(id)
  time = 0
  id = setInterval(()=>{ run()}, time)
}
```
### 简化
```js
const x = ()=>{
  run()
}

run()
```
x执行效果与`run()`执行效果相同
```js
btnFast.onclick = ()=> {
  window.clearInterval(id)
  time = 0
  id = setInterval(()=>{ run()}, time)
}

btnFast.onclick = ()=> {
  window.clearInterval(id)
  
time = 0
  id = setInterval(run, time)
}
```
`setInterval( run, time)` 为什么是`run` 而不是`run()`：

>setInterval()以固定的时间间隔，重复运行一段代码。
`setInterval(func, delay)` 第一个参数为函数，若为`run()`则为函数返回值。

```js
let id = setInterval(run,time)
btnPlay.onclick = ()=> { id = setInterval(run,time) }
btnSlow.onclick = ()=> {
  window.clearInterval(id)
  time = 300
  id = setInterval(run, time)
}
btnNormal.onclick = ()=> {
  window.clearInterval(id)
  time = 100
  id = setInterval(run, time)
}
btnFast.onclick = ()=> {
  window.clearInterval(id)
  time = 0
  id = setInterval(run, time)
}
```

### 封装play、pause
```js
const play = ()=>{ return setInterval(run,time) }
let id = play()
const pause = ()=>{ window.clearInterval(id) }

btnPause.onclick = ()=>{ pause()}
btnPlay.onclick = ()=> { id = play() }
btnSlow.onclick = ()=> {
  pause()
  time = 300
  id = play()
}
btnNormal.onclick = ()=> {
  pause()
  time = 100
  id = play()
}
btnFast.onclick = ()=> {
  pause()
  time = 0
  id = play()
}
```