mport string from '../src/css.js'

let n = 0

const demoText = doicument.querySelector('#demoText')
const demoHtml = document.querySelector('#demoHtml')
demoText.innerText  = string.substr(0,n)
demoHtml.innerHTML = string.substr(0,n)

let time = 100

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

const play = ()=>{
  return setInterval(run,time)
}
let id = play()
const pause = ()=>{ window.clearInterval(id) }

document.querySelector('#btnPause').onclick = ()=>{ pause()}
document.querySelector('#btnPlay').onclick = ()=> { id = play() }
document.querySelector('#btnSlow').onclick = ()=> {
  pause()
  time = 300
  id = play()
}
document.querySelector('#btnNormal').onclick = ()=> {
  pause()
  time = 100
  id = play()
}
document.querySelector('#btnFast').onclick = ()=> {
  pause()
  time = 0
  id = play()
}





