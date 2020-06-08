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
    let out2='';
    let total = 0;
    out1+= `  
    <tr>
     <th></th>
      <th>Название</th>
      <th>Цена</th>
      <th>Количество</th>
      <th>Сумма</th>
    </tr>
`
    for(let i in cart){
        out+=`

 
          <tr>
            <td><a data-art="${[i]}"class="delete btn waves-effect waves-light"><i class="material-icons">delete</i></a></td>
            <td>${cart[i].name}</td>
            <td>${cart[i].price}</td>
            <td><a data-art="${[i]}"class="minus btn waves-effect waves-light"><i class="material-icons">-</i></a>${cart[i].count}<a data-art="${[i]}"class="plus btn waves-effect waves-light"><i class="material-icons">+</i></a></td>
            <td>${cart[i].price*cart[i].count}</td>
          </tr>

        `;
        total = total + (cart[i].price*cart[i].count)
  } 
    out2+=`
  
      <tr>
        <td>Сумма заказа</td>
        <td></td>
        <td></td>
        <td></td>
        <td style="padding: 18px; text-align: center">${total}</td>
      </tr>
  
    `
    $('#cartHead').html(out1);
    $('#cart').html(out);
    $('#carttotal').html(out2);
    $('.plus').on('click',plusGoods);
    $('.minus').on('click',minusGoods);
    $('.delete').on('click',deleteGoods);
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
  function deleteGoods(){
    let id = $(this).attr('data-art');
    delete cart[id];
    save()
    showCart();
    window.location.reload();
  }
  