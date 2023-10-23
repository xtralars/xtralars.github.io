//Dark Mode config//
function toggleDarkMode() {
    var body = document.body;
    var header = document.querySelector('header');
    var footer = document.querySelector('footer');
    
    
    body.classList.toggle("dark-mode");
    header.classList.toggle("dark-mode");
    footer.classList.toggle("dark-mode");
  
  };
  document.getElementById("darkModeButton").addEventListener("click", toggleDarkMode);
  //

  var cards = $(".flipcard_fasit");
for(var i = 0; i < cards.length; i++){
    var target = Math.floor(Math.random() * cards.length -1) + 1;
    var target2 = Math.floor(Math.random() * cards.length -1) +1;
    cards.eq(target).before(cards.eq(target2));
}