
import hello from './hello.js'
import imgsrc from './assets/08.jpg'
import imgsrc2 from './assets/06.svg'
import txt from './assets/test.txt'
import imgsrc3 from './assets/07.png'
import './style.css'
import './style.less'


hello()

const img = document.createElement('img')
img.src = imgsrc
document.body.appendChild(img)

const img2 = document.createElement('img')
img2.src = imgsrc2
document.body.appendChild(img2)

const div = document.createElement('div')
div.style.cssText = 'width:200px;height:200px;background:yellow'
div.textContent = txt
div.classList.add('block-hello')
document.body.appendChild(div)

const img3 = document.createElement('img')
img3.src = imgsrc3
document.body.appendChild(img3)

document.body.classList.add('hello')