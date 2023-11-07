function toggleDarkMode() {
    var element = document.body;
    element.classList.toggle("dark_mode");
  }
  document.getElementById("darkModeButton").addEventListener("click", toggleDarkMode);
  
  
  // Get the modal
  var signInModal = document.getElementById('signInModal');
  var registerModal = document.getElementById('registerModal');
  var infoModal = document.getElementById('infoModal');
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == signInModal) {
      signInModal.style.display = "none";
    }
  // When the user clicks anywhere outside of the modal, close it
    if (event.target == registerModal) {
      registerModal.style.display = "none";
    }
    if (event.target == infoModal) {
      infoModal.style.display = "none";
    }
  }