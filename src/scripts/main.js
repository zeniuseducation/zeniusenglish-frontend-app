var divs = document.querySelectorAll('div');

function hello() {
  console.log('Hello World!');
}

for (var div in divs) {
  divs[div].addEventListener('click', hello);
}
