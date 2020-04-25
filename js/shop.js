
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, open);
  });
  'use strict';
  let head = document.head,
      link = document.createElement('link');
  link.rel = 'stylesheet';
  if (localStorage.getItem('themeStyle') === 'light') {
    link.href = 'css/light.css';
    document.getElementById("img").src="images/logo1.png";
    document.getElementById('switch-1').setAttribute('checked', false);
  }
  else {
    link.href = 'css/dark.css'; 
    document.getElementById("img").src="images/logo2.png";
  }
  head.appendChild(link);
  document.getElementById('switch-1').addEventListener('change', ev => {
    let btn = ev.target;
    if (btn.checked) {
      link.href = 'css/light.css'; 
      document.getElementById("img").src="images/logo1.png";
      localStorage.setItem('themeStyle', 'light'); 
    }
    else {
      link.href = 'css/dark.css';
      document.getElementById("img").src="images/logo2.png";
      localStorage.setItem('themeStyle', 'dark'); 
    }
  });
  document.getElementById('stat').onclick = function() {
    if(document.getElementById('stat').checked) {
      localStorage.setItem('stat', "true");
    } else {
      localStorage.setItem('stat', "false");
    }
  }
  if (localStorage.getItem('stat') == "true") {
    document.getElementById("stat").setAttribute('checked','checked');
  }

  $('document').ready(function(){
    loadGoods();
});

function loadGoods() {
    //загружаю товары на страницу
    $.getJSON('goods.json', function (data) {
        //console.log(data);
        var out = '';
        for (var key in data){
            out+='<div class="single-goods">';
            out+='<h3>'+data[key]['name']+'</h3>';
            out+='<p>Цена: '+data[key]['cost']+'</p>';
            out+='<img src="'+data[key].image+'">';
            out+='<button>Купить</button>';
            out+='</div>';
        }
        $('#goods').html(out);
    })
}