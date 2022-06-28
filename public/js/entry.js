/**
 * footer element
 */
var footer = document.getElementById("footerId");
/**
 * moves footer at the bottom of the screen.
 */
footer.classList.add("classfooter2");

/**
 * clears input fields.
 */
function resett() {
  let inputs = document.getElementsByClassName("inp");
  for (inp of inputs) {
    inp.value = "";
  }
}
