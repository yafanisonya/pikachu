## 面向对象

### 简化变速按钮
```js
const slow = ()=>{
  pause()
  time = 300
  id = play()
}
const normal = ()=>{
  pause()
  time = 100
  id = play()
}
const fast = ()=>{
  pause()
  time = 0
  id = play()
}

btnSlow.onclick = slow
btnNormal.onclick = normal
btnFast.onclick = fast
```

### 创建对象
```js
const player = {

}
```

### 封装属性
```js
const player = {
  run: () => {
    n += 1;
    if(n > string.length){
      window.clearInterval(id)
      return
    }
    console.log(n + "：" + string.substr(0,n))
    demoText.innerText = string.substr(0,n)
    demoHtml.innerHTML = string.substr(0,n)
    demoText.scrollTop = demoText.scrollHeight - demoText.clientHeight;
  },
  play: ()=>{ return setInterval(run,time)},
  pause: ()=>{ window.clearInterval(id) },
  slow: ()=>{
    pause()
    time = 300
    id = play()
  },
  normal: ()=>{
    pause()
    time = 100
    id = play()
  },
  fast: ()=>{
    pause()
    time = 0
    id = play()
  }
}
```

### 完善代码
`pause()  替换为 player.pause()`
```js
const demoText = document.querySelector('#demoText')
const demoHtml = document.querySelector('#demoHtml')

let n = 0
let time = 100
let id 
demoText.innerText  = string.substr(0,n)
demoHtml.innerHTML = string.substr(0,n)

const player = {
  run: () => {
    n += 1;
    if(n > string.length){
      window.clearInterval(id)
      return
    }
    console.log(n + "：" + string.substr(0,n))
    demoText.innerText = string.substr(0,n)
    demoHtml.innerHTML = string.substr(0,n)
    demoText.scrollTop = demoText.scrollHeight - demoText.clientHeight;
  },
  play: ()=>{ id = setInterval(player.run,time)},
  pause: ()=>{ window.clearInterval(id) },
  slow: ()=>{
    player.pause()
    time = 300
    player.play()
  },
  normal: ()=>{
    player.pause()
    time = 100
    player.play()
  },
  fast: ()=>{
    player.pause()
    time = 0
    player.play()
  }
}
player.play()

document.querySelector('#btnPause').onclick = player.pause
document.querySelector('#btnPlay').onclick = ()=> { id = player.play() }
document.querySelector('#btnSlow').onclick = player.slow
document.querySelector('#btnNormal').onclick = player.normal
document.querySelector('#btnFast').onclick = player.fast
```

### init、bindEvents
```js
const player = {
  init:()=>{
    demoText.innerText  = string.substr(0,n)
    demoHtml.innerHTML = string.substr(0,n)
    player.play()
    player.bindEvents()
  },
  bindEvents: ()=>{
    document.querySelector('#btnPause').onclick = player.pause
    document.querySelector('#btnPlay').onclick = player.play
    document.querySelector('#btnSlow').onclick = player.slow
    document.querySelector('#btnNormal').onclick = player.normal
    document.querySelector('#btnFast').onclick = player.fast
  }
}
player.init()
```

### 使用for循环简化`bindEvents`
```js
 bindEvents: ()=>{
    const events = {
      '#btnPause': player.pause,
      '#btnPlay': player.play,
      '#btnSlow': player.slow,
      '#btnNormal': player.normal,
      '#btnFast': player.fast
    }
    for(let key in events){
      document.querySelector(key).onclick = events[key]
    }
  }
```

### events属性
```js
const player = {
  events:{
    '#btnPause': player.pause,
    '#btnPlay': player.play,
    '#btnSlow': player.slow,
    '#btnNormal': player.normal,
    '#btnFast': player.fast
  },
  bindEvents: ()=>{
    for(let key in events){
      document.querySelector(key).onclick = events[key]
    }
  }
}
```
创建`events`属性时，若采用`'#btnPause': player.pause`,属于定义时使用，会报错；解决措施：
直接使用字符串,使用 `player[value]`调用对应的方法
```js
const player = {
  events:{
    '#btnPause': 'pause',
    '#btnPlay': 'play',
    '#btnSlow': 'slow',
    '#btnNormal': 'normal',
    '#btnFast': 'fast'
  },
 bindEvents: ()=>{
    for(let key in player.events){
      if(player.events.hasOwnProperty(key)){  //检查是否为自身属性
        const value = player.events[key]
        document.querySelector(key).onclick = player[value]
      }
    }
  }
}
```

### 封装其他属性
```js
const player = {
  n:0,
  time:100,
  id: undefined,
  ui:{
    demoText: document.querySelector('#demoText'),
    demoHtml: document.querySelector('#demoHtml')
  }
}
```

### 最后
```js
import string from './css'

const player = {
  n:0,
  time:100,
  id: undefined,
  ui:{...},
  events:{...},
  init:()=>{...},
  bindEvents: ()=>{...},
  run: () => {...},
  play: ()=>{...},
  pause: ()=>{...},
  slow: ()=>{...},
  normal: ()=>{...},
  fast: ()=>{...}
}

player.init()
```