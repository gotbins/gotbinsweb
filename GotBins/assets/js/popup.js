// Get the modal element
var modal = document.getElementById("myModal");

// Get the button that opens the modal

var btn = document.getElementById("mylink");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Open the modal when the button is clicked
btn.onclick = function() {
  modal.style.display = "block";
}

// Close the modal when the <span> (close) element is clicked
span.onclick = function() {
  modal.style.display = "none";
}

// Close the modal when the user clicks outside the modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
