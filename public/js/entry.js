var element = document.getElementById("footerId");
var main = document.getElementById("signupbody");
element.classList.add("classfooter2");

function resett() {
  let inputs = document.getElementsByClassName("inp");
  for (inp of inputs) {
    inp.value = "";
  }
}
