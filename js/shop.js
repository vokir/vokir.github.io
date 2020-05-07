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
let goods = [];
let cart = {}; 
let count = 1;

pageSize = 9;

$('document').ready(function(){
  pageActive(items[1])
  show(items[1])
  checkCard();
  showMiniCart(); 
});
$.getJSON('goods.json', function(data){
  $.each(data, function(key, val) {
    goods.push(val);
    count++;
  });
});

pagination = document.querySelector('#pagination')

let countItems = Math.ceil(80/ pageSize);


let items = [];
let html = document.createElement('li')
  html.innerHTML = '<a href="#!"><i class="material-icons">chevron_left</i></a></li>';
  html.classList.add('disabled')
  html.classList.add('prev')
  $(html).attr("id", 1)
  pagination.appendChild(html)
  items.push(html)
for (let i = 1; i<= countItems; i++){
  html = document.createElement('li')
  html.innerHTML = '<a href="#!">'+i+'</a>';
  html.classList.add('waves-effect')
  html.classList.add('pages')
  $(html).attr("id", i)
  pagination.appendChild(html)
  items.push(html)
} 
  html = document.createElement('li')
  html.innerHTML = '<a href="#!"><i class="material-icons">chevron_right</i></a></li>';
  html.classList.add('waves-effect')
  html.classList.add('next')
  $(html).attr("id", countItems)
  pagination.appendChild(html)
  items.push(html)

  

function pageActive(item){
  let active = document.querySelector('#pagination li.active')
  if(active){
    active.classList.remove('active');
  }
  item.classList.add('active');
  whatBtn(item)
}
let btnN 
let btnP 
function whatBtn(item){
  btnN = $(item).next();
  btnN = btnN[0].id
  btnP = $(item).prev();
  btnP = btnP[0].id
}
function btnPrev(item){
      item = items[btnP]
      pageActive(item)
      show(item)
      checkBTN()
}
function checkBTN(){
  if(items[btnN].id <= 2){
    items[0].classList.add('disabled')
    items[0].classList.remove('waves-effect')
  }
  else{
    items[0].classList.remove('disabled')
    items[0].classList.add('waves-effect')
  }
  if(items[btnP].id > countItems-2){
    items[countItems+1].classList.add('disabled')
    items[countItems+1].classList.remove('waves-effect')
  }
  else{
    items[countItems+1].classList.remove('disabled')
    items[countItems+1].classList.add('waves-effect')
  }
}
function btnNext(item){
      item = items[btnN]
      pageActive(item)
      show(item)
      checkBTN()
}
for(let item of items){
  item.addEventListener('click', function(){
    if(item.classList.contains('prev')){
      btnPrev(item)
    }
    else if(item.classList.contains('next')){
      btnNext(item)
    }
    else{
    pageActive(item)
    show(item)
    checkBTN()
    }
})  

function show(item){ 
  let pageNum = +item.firstChild.innerHTML;
  let start = (pageNum - 1) * pageSize;

  let end = start + pageSize;

  let notes = goods.slice(start, end);
  
  out = '';
  for (let note of notes){
    out += 
    `<div class="col m6 s12 l4">
    <div class="card">
      <div class="card-image">
        <img src="${note.img}" alt=" ... ">
        <a onclick="M.toast({html: 'added to cart'})" data-art="${note.id}" data-name="${note.name}" data-price="${note.cost}" class="add-to-cart btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
      </div>
      <div class="card-content">
        <span class="card-title">${note.name}</span>
        <p>Цена: ${note.cost} ₽<p>
      </div>
    </div>
  </div>
  `;
  }
  $("#goods").html(out)
  $('.add-to-cart').on('click', addToCart);
}

function addToCart(){
    let name = $(this).attr('data-name');
    let price = $(this).attr('data-price');
    let id = $(this).attr('data-art');
    if (cart[id]!=undefined){
        cart[id].count++;
        cart[id] ={
        price: price,
        name: name,
        count:cart[id].count
        }
  
    }
    else{
        cart[id] ={
        price: price,
        name: name,
        count: 1
        }
    }
    save();
    showMiniCart()
}


  
function save(){
    localStorage.setItem('cart', JSON.stringify(cart));
}
  
  
function checkCard(){
    if (localStorage.getItem('cart')!=null){
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}
  
  
function showMiniCart(){
    let out='';
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
    }
    $('#mini-cart').html(out)
    $('.delete').on('click',deleteGoods);
    $('.plus').on('click',plusGoods);
    $('.minus').on('click',minusGoods);
  }
}

function plusGoods(){
  let id = $(this).attr('data-art')
  cart[id].count++;
  save()
  showMiniCart();
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
  showMiniCart();
}

function deleteGoods(){
  let id = $(this).attr('data-art');
  delete cart[id];
  save()
  showMiniCart();
}