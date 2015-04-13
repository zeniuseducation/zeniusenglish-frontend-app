'use strict';
var burger = document.getElementById('burger');
var search = document.getElementById('search');
var nav = document.getElementsByTagName('nav');
var searchInput = document.getElementById('search-input');
var searchDoc = document.querySelectorAll('[type="search"]');
var filterDoc = document.querySelectorAll('[type="filter"]');
var searchDocInput = document.getElementById('searchDoc');
var filterDocSelect = document.getElementById('filterDoc');

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

function toggleInputFilter() {
  searchDocInput.style.display = searchDocInput.style.display === 'none'? 'block' : 'none';
  if(filterDocSelect.style.display === 'block') {
    filterDocSelect.style.display = 'none';
  }
}

function toggleSelectFilter() {
  filterDocSelect.style.display = filterDocSelect.style.display === 'none'? 'block' : 'none';
  if(searchDocInput.style.display === 'block') {
    searchDocInput.style.display = 'none';
  }
}

burger.addEventListener('click', toggleNav);
search.addEventListener('click', toggleSearch);
searchDoc[1].addEventListener('click', toggleInputFilter);
filterDoc[0].addEventListener('click', toggleSelectFilter);

window.onscroll = function() {
  document.getElementById('back-top').style.display = window.pageYOffset >= 50? 'inline-block' : 'none';
};
