document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.sidenav');
    let instances = M.Sidenav.init(elems, open);
  });
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, {
      fullWidth: true,
      indicators: true
    });
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
    } 
    else {
      localStorage.setItem('stat', "false");
    }
  }
  if (localStorage.getItem('stat') == "true") {
    document.getElementById("stat").setAttribute('checked','checked');
  }




  function asd() {
	"use strict";
	var i=1;

	if(i==1){
	function count($this){
	var current = parseInt($this.html(), 10);
	current = current + 78; /* Where 50 is increment */	
	$this.html(++current);
		if(current > $this.data('count')){
			$this.html($this.data('count'));
		} else {    
			setTimeout(function(){count($this)}, 50);
		}
	}        	
	$(".stat-count").each(function() {
	  $(this).data('count', parseInt($(this).html(), 10));
	  $(this).html('0');
	  count($(this));
	});}
  };

$(document).ready(function(){
	var tester = document.getElementById('counter');
	
	var p;
	var n = 0;

	window.onscroll = function() {
		p = checkVisible(tester);

		if(p == true && n == 0){

			asd();
			n = 1;
		}
	};
});

function checkVisible(elm) {
  var rect = elm.getBoundingClientRect();
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
};
