
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, open);
  });
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, open);
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


  var cart={};
  $('document').ready(function(){
    loadGoods();
    checkCard();
    showMiniCart()
});


function loadGoods() {
    //загружаю товары на страницу
    $.getJSON('goods.json', function (data) {
        //console.log(data);
        var out = '';
        for (var key in data){
            out+='<div class="col m6 s12 l4">';
            out+='<div class="card">';
            out+='<div class="card-image">';
            out+='<img src="'+data[key].img+'">';
            out+='<a data-art="'+key+'" class="add-to-cart btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>';
            out+='</div>';
            out+='<div class="card-content">';
            out+='<span class="card-title">'+data[key]['name']+'</span>';
            out+='<p>Cost: '+data[key]['cost']+'</p>';
            out+='</div>';
            out+='</div>';
            out+='</div>';
        }
        $('#goods').html(out);
        $('a.add-to-cart').on('click', addToCart);
    })
}
function addToCart(){
  var articul = $(this).attr('data-art');
  if (cart[articul]!=undefined){
    cart[articul]++;
  }
  else{
    cart[articul] = 1;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  showMiniCart()
}
function checkCard(){
  if (localStorage.getItem('cart')!=null){
    cart = JSON.parse(localStorage.getItem('cart'));
  }
}
function showMiniCart(){
  var out='';
  for(var i in cart){
    out+='<p>'+i+cart[i]+'</p>';
  }
  $('#mini-cart').html(out)
}