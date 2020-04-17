/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  var x = document.getElementById("myTopnav");
  var y = document.getElementById("navKont");
  if (x.className === "topnav") {
    x.className += " responsive";
    y.className += " responsive";
  } else {
    x.className = "topnav";
  }
}