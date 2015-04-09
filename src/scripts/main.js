'use strict';
var burger = document.getElementById('burger');
var search = document.getElementById('search');
var nav = document.getElementsByTagName('nav');
var searchInput = document.getElementById('search-input');

function toggleNav() {
  nav[0].style.display = nav[0].style.display === 'none'? 'block': 'none';
  if (searchInput.style.display === 'block') {
    searchInput.style.display = 'none';
  }
}

function toggleSearch() {
  searchInput.style.display = searchInput.style.display === 'none'? 'block': 'none';
  if (nav[0].style.display === 'block') {
    nav[0].style.display = 'none';
  }
}

burger.addEventListener('click', toggleNav);
search.addEventListener('click', toggleSearch);