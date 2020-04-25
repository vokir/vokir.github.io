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
 
$.getJSON('goods.json',function(data){
  var goods=data;
  checkCard();
  showCart();

  function showCart(){
    var out='';
    if($.isEmptyObject(cart)){
      out+='<p>Cart is Empty</p>';
      $('#myCart').html(out);
    }
    else{
      for(var key in cart){
        out+='<a data-art="'+key+'"class="delete btn waves-effect waves-light"><i class="material-icons">delete</i></a>'
        out+=goods[key].name;
        out+='<a data-art="'+key+'"class="minus btn waves-effect waves-light"><i class="material-icons">-</i></a>'
        out+=cart[key];
        out+='<a data-art="'+key+'"class="plus btn waves-effect waves-light"><i class="material-icons">add</i></a>'
        out+=cart[key]*goods[key].cost;
        out+='<br>'
      }
    $('#myCart').html(out);
    $('.plus').on('click',plusGoods);
    $('.minus').on('click',minusGoods);
    $('.delete').on('click',deleteGoods);
  }
}
  function plusGoods(){
    var articale =$(this).attr('data-art');
    cart[articale]++;
    Save();
    showCart();
  }
  function minusGoods(){
    var articale =$(this).attr('data-art');
    if(cart[articale]>1){
      cart[articale]--;
    }
    else {
      delete cart[articale];
    }
    Save();
    showCart();
  }
  function deleteGoods(){
    var articale =$(this).attr('data-art');
    delete cart[articale];
    Save();
    showCart();
  }
})

function checkCard(){
  if (localStorage.getItem('cart')!=null){
    cart = JSON.parse(localStorage.getItem('cart'));
  }
}
function Save(){
  localStorage.setItem('cart', JSON.stringify(cart));
}