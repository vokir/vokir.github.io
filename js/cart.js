document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.sidenav');
    let instances = M.Sidenav.init(elems, open);
  });
  document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.modal');
    let instances = M.Modal.init(elems, open);
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


cart = {};

checkCart();

function checkCart(){
  let cartTitle = document.querySelector('#cart-title')
  let html = document.createElement('p')
  let b = document.querySelector('#b')
  let btn = document.createElement('a')
  cart = JSON.parse(localStorage.getItem('cart'));
  if(localStorage.getItem('cart') == "{}"){
    html.innerHTML = "Корзина товаров пуста"
    b.remove(btn)
  }
  else if(localStorage.getItem('cart') == null){
    html.innerHTML = "Корзина товаров пуста"
    b.remove(btn)
  }
  else{
    showCart()
    html.innerHTML = "Товары в заказе"
    btn.innerHTML = "Оформить заказ"
    btn.classList.add('btn')
    btn.classList.add('btn-info')
  }
  cartTitle.prepend(html)
  b.appendChild(btn)
}

function save(){
  localStorage.setItem('cart', JSON.stringify(cart));
}
function showCart(){
    let out='';
    let out1='';
    let total = 0;
    for(let i in cart){
      out+=`
      <div class="row margen2 cart-items">
        <div class="col l3 m3 s3 buscket-title">
          <p>${cart[i].name}</p>
        </div>
        <div class="col l3 m3 s3 price-item">
          <p>${cart[i].price}</p>
        </div>
          <div class="col l1 m1 s1 controlers">
            <a data-art="${[i]}" class="minus"><i class="material-icons">chevron_left</i></a>
          </div>
          <div class="col l1 m1 s1 buscket-product">          
            <p>${cart[i].count}</p>
          </div>
          <div class="col l1 m1 s1 controlers">
            <a data-art="${[i]}" class="plus"><i class="material-icons">chevron_right</i></a>
          </div>
          <div class="col l3 m3 s3 cost-item">
            <p>${cart[i].price*cart[i].count}</p>
          </div>
        </div>
      `;   
      total = total + (cart[i].price*cart[i].count)
  }
  out1+=`
      <p class="textb">Total: <span class="badge">${total}</span></p>
  `; 
    $('#cart').html(out);
    $('.carttotal').html(out1);
    $('.plus').on('click',plusGoods);
    $('.minus').on('click',minusGoods);
}

function plusGoods(){
    let id = $(this).attr('data-art')
    cart[id].count++;
    save()
    showCart();
  }
  function minusGoods(){
    let id = $(this).attr('data-art')
    if (cart[id].count>1){
      cart[id].count--;
    }
    else{
    delete cart[id]
    }
    save()
    showCart();
  }
  