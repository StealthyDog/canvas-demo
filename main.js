var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var lineWidth = 3

autoSetCanvasSize(canvas)

//特性检测，判断设备
if(document.body.ontouchstart !== undefined){
  listenToFinger()
}
else{
  listenToMouse()
}


var useEraser = false;
eraser.onclick = function(){
  useEraser = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}
pen.onclick = function(){

  useEraser = false
  eraser.classList.remove('active')
  pen.classList.add('active')
}
//选择颜色
black.onclick = function(){
  ctx.strokeStyle = 'black'
  ctx.fillStyle = 'black'
  black.classList.add('on')
  red.classList.remove('on')
  green.classList.remove('on')
  yellow.classList.remove('on')
}
red.onclick = function(){
  ctx.strokeStyle = 'red'
  ctx.fillStyle = 'red'
  black.classList.remove('on')
  red.classList.add('on')
  green.classList.remove('on')
  yellow.classList.remove('on')
}
green.onclick = function(){
  ctx.strokeStyle = 'green'
  ctx.fillStyle = 'green'
  black.classList.remove('on')
  red.classList.remove('on')
  green.classList.add('on')
  yellow.classList.remove('on')
}
yellow.onclick = function(){
  ctx.strokeStyle = 'yellow'
  ctx.fillStyle = 'yellow'
  black.classList.remove('on')
  red.classList.remove('on')
  green.classList.remove('on')
  yellow.classList.add('on')
}
//画笔粗细
thin.onclick = function(){
  lineWidth = 3
}
thick.onclick = function(){
  lineWidth = 6
}
//清空画板
clear.onclick = function (){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
//保存图片
download.onclick = function(){
  var url = canvas.toDataURL('image/png')
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = '我的画'
  a.click()
}

//函数
//设置画板自适应尺寸
function autoSetCanvasSize(canvas){
  setSize()
  window.onresize = function(){setSize()}
  function setSize(){
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}
//监听鼠标事件
function listenToMouse(){
  var down = false
var lastPoint = {'x':undefined,'y':undefined}

canvas.onmousedown = function(aaa){
  down = true;
  var x = aaa.clientX
  var y = aaa.clientY
  if(useEraser){
    ctx.clearRect(x,y,10,10)
  }else{
    drawCircle(x,y,1)
    lastPoint = {'x':x,'y':y}
  }
  
}
canvas.onmousemove = function(bbb){
    var x = bbb.clientX
    var y = bbb.clientY
    var newPoint = {'x':x,'y':y}
  if(down){
    if(useEraser){
      ctx.clearRect(x,y,10,10)
    }else{
      drawLine(lastPoint.x, lastPoint.y, newPoint.x,newPoint.y)
      lastPoint = newPoint
    }
  }
  
}
canvas.onmouseup = function(){
  down = false
}
}

//移动端监听触摸事件
function listenToFinger(){
  var down = false
var lastPoint = {'x':undefined,'y':undefined}

canvas.ontouchstart = function(aaa){
  down = true;
  var x = aaa.targetTouches[0].clientX
  var y = aaa.targetTouches[0].clientY
  if(useEraser){
    ctx.clearRect(x,y,10,10)
  }else{
    drawCircle(x,y,1)
    lastPoint = {'x':x,'y':y}
  }
  
}
canvas.ontouchmove = function(bbb){
    var x = bbb.targetTouches[0].clientX
    var y = bbb.targetTouches[0].clientY
    var newPoint = {'x':x,'y':y}
  if(down){
    if(useEraser){
      ctx.clearRect(x,y,10,10)
    }else{
      drawLine(lastPoint.x, lastPoint.y, newPoint.x,newPoint.y)
      lastPoint = newPoint
    }
  }
  
}
canvas.ontouchend = function(){
  down = false
}
}

function drawCircle(x, y, radius){
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI*2)
  ctx.fill()
}
function drawLine(x1, y1, x2,y2){
  ctx.beginPath()
  ctx.lineWidth = lineWidth
  ctx.moveTo(x1,y1)
  ctx.lineTo(x2,y2)
  ctx.stroke()
}
var xStart,xEnd,yStart,yEnd;
document.addEventListener('touchmove',function(evt){
    xEnd=evt.touches[0].pageX;
    yEnd=evt.touches[0].pageY;
    Math.abs(xStart-xEnd)> Math.abs(yStart-yEnd)&&
    evt.preventDefault();
},false);

document.addEventListener("touchstart",function(evt){
    xStart=evt.touches[0].pageX;
    yStart=evt.touches[0].pageY;
},false);