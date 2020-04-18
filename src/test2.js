import string from '/src/css'

const player = {
  n:0,
  time:100,
  id: undefined,
  ui:{
    demoText: document.querySelector('#demoText'),
    demoHtml: document.querySelector('#demoHtml')
  },
  events:{
    '#btnPause': 'pause',
    '#btnPlay': 'play',
    '#btnSlow': 'slow',
    '#btnNormal': 'normal',
    '#btnFast': 'fast'
  },
  init:()=>{
    player.ui.demoText.innerText  = string.substr(0,player.n)
    player.ui.demoHtml.innerHTML = string.substr(0,player.n)
    player.bindEvents()
    player.play()
  },
  bindEvents: ()=>{
    for(let key in player.events){
      if(player.events.hasOwnProperty(key)){
        const value = player.events[key]
        document.querySelector(key).onclick = player[value]
      }
    }
  },
  run: () => {
    player.n += 1;
    if(player.n > string.length){
      window.clearInterval(player.id)
      return
    }
    player.ui.demoText.innerText = string.substr(0,player.n)
    player.ui.demoHtml.innerHTML = string.substr(0,player.n)
    player.ui.demoText.scrollTop = player.ui.demoText.scrollHeight - player.ui.demoText.clientHeight;
  },
  play: ()=>{ player.id = setInterval(player.run,player.time)},
  pause: ()=>{ window.clearInterval(player.id) },
  slow: ()=>{
    player.pause()
    player.time = 300
    player.play()
  },
  normal: ()=>{
    player.pause()
    player.time = 100
    player.play()
  },
  fast: ()=>{
    player.pause()
    player.time = 0
    player.play()
  }
}
player.init()

