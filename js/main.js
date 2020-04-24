
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, open);
  });
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, 300);
  });
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems, 334);
  });
  'use strict';
  let head = document.head,
      link = document.createElement('link');
  link.rel = 'stylesheet';
  if (localStorage.getItem('themeStyle') === 'light') {
    link.href = 'css/light.css';
    document.getElementById("img").src="images/logo1.png";
    document.getElementById("imgPq").src="images/3l.png";
    document.getElementById("imgPt").src="images/4l.png";
    document.getElementById("imgPc").src="images/5l.png";
    document.getElementById("imgPq1").src="images/3l.png";
    document.getElementById("imgPt1").src="images/4l.png";
    document.getElementById("imgPc1").src="images/5l.png";
    document.getElementById('switch-1').setAttribute('checked', false);
  }
  else {
    link.href = 'css/dark.css'; 
    document.getElementById("img").src="images/logo2.png";
    document.getElementById("imgPq").src="images/3.png";
    document.getElementById("imgPt").src="images/4.png";
    document.getElementById("imgPc").src="images/5.png";
    document.getElementById("imgPq1").src="images/3.png";
    document.getElementById("imgPt1").src="images/4.png";
    document.getElementById("imgPc1").src="images/5.png";
  }
  head.appendChild(link);
  document.getElementById('switch-1').addEventListener('change', ev => {
    let btn = ev.target;
    if (btn.checked) {
      link.href = 'css/light.css'; 
      document.getElementById("img").src="images/logo1.png";
      document.getElementById("imgPq").src="images/3l.png";
      document.getElementById("imgPt").src="images/4l.png";
      document.getElementById("imgPc").src="images/5l.png";
      document.getElementById("imgPq1").src="images/3l.png";
      document.getElementById("imgPt1").src="images/4l.png";
      document.getElementById("imgPc1").src="images/5l.png";
      localStorage.setItem('themeStyle', 'light'); 
    }
    else {
      link.href = 'css/dark.css';
      document.getElementById("img").src="images/logo2.png";
      document.getElementById("imgPq").src="images/3.png";
      document.getElementById("imgPt").src="images/4.png";
      document.getElementById("imgPc").src="images/5.png";
      document.getElementById("imgPq1").src="images/3.png";
      document.getElementById("imgPt1").src="images/4.png";
      document.getElementById("imgPc1").src="images/5.png";
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
  