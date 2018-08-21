var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var imgs = document.getElementsByClassName("images");
  if (n > imgs.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = imgs.length}
  for (i = 0; i < imgs.length; i++) {
     imgs[i].style.display = "none";  
  }
  imgs[slideIndex-1].style.display = "block";  
}