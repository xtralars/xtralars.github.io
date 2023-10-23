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


// JavaScript code to fetch leaderboard data
const leaderboardContainer = document.getElementById("leaderboard-container");

fetch("http://84.208.214.85/xtralars/music-quiz-leaderboard")
    .then((response) => response.json())
    .then((data) => {
        // Process the data and update the leaderboard container
        // You can create and append HTML elements to display the leaderboard data
    })
    .catch((error) => {
        console.error("Error fetching leaderboard data:", error);
        leaderboardContainer.innerHTML = "Error loading leaderboard data.";
    });
