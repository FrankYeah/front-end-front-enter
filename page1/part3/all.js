//scroll TOP按鈕 減速上滑
var btn = document.getElementById('totop');

btn.addEventListener("click", function() {
  var i = 3000;
  var int = setInterval(function() {
    window.scrollTo(0, i);
    i -= i*0.04
    if (i <= 1) clearInterval(int)
    return false;
  }, 20);
});

//scroll 頁首透明度
window.addEventListener('scroll' , () => {
  var header = document.querySelector('.header');
  if( document.documentElement.scrollTop > 0){
  header.style.opacity = "0.8"
  }else{
  header.style.opacity = "1"
  }
});

//settimeout loading畫面 https://medium.com/@AntheaLee/js-%E8%A8%88%E7%AE%97%E7%A7%92%E6%95%B8%E9%9A%B1%E8%97%8F%E7%89%A9%E4%BB%B6-f7b24f7e1a0

setTimeout(function (){
  document.getElementById("loading1").style.display = "none";
},3000);
setTimeout(function (){
  document.getElementById("loading2").style.display = "none";
},3000);
setTimeout(function (){
  document.getElementById("frontlogo").style.display = "none";
},3000);


//search 按鈕
var search = document.getElementById('search');

search.addEventListener("click", function(){
  if(document.getElementById("hide").style.display == "none" && 
      document.getElementById("hide2").style.display == "none")
    document.getElementById("hide").style.display = "block" ,
    document.getElementById("hide2").style.display = "block";
    else
    document.getElementById("hide").style.display = "none" ,
    document.getElementById("hide2").style.display = "none";
})

var hide2 = document.getElementById('hide2');
hide2.addEventListener('click',function(){
    document.getElementById("hide").style.display = "none" ,
    document.getElementById("hide2").style.display = "none";
})