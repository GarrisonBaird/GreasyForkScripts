// ==UserScript==
// @name        Wikipedia Category Table Auto Expand
// @description Automatically expand all the collapsed category tables
// @icon        https://en.wikipedia.org/static/favicon/wikipedia.ico
// @namespace   https://greasyfork.org/users/113252-garrison-baird
// @include     *://*.wiki*.org/*
// @version     1.0
// @grant       none
// ==/UserScript==

function expand(){
  Array.prototype.slice.call(window.document.querySelectorAll("table[id^='collapsibleTable']"), 0).forEach(function(el){
  	Array.prototype.slice.call(el.querySelectorAll("tr[style*='display: none;']"), 0).forEach(function(el){
  		el.style.display = "table-row";
  	});
  });
}

window.addEventListener("load", function(){
  setTimeout(expand, 500); 
});
