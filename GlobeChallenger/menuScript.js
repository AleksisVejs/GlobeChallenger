document.getElementById("about-button").addEventListener("click", function() {
    var aboutDiv = document.getElementById("about-div");
    if (aboutDiv.style.display === "none" || aboutDiv.style.display === "") {
        aboutDiv.style.display = "block"; // Show the element
        setTimeout(function() {
            aboutDiv.style.opacity = "1"; // Set opacity to 1 to fade in
        }, 10); // Adjust the time to match the transition duration
    } else {
        aboutDiv.style.opacity = "0"; // Set opacity to 0 to fade out
        setTimeout(function() {
            aboutDiv.style.display = "none"; // Hide the element after the fade-out
        }, 300); 
    }
});
