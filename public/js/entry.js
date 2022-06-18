var footer = document.getElementById("footerId");
footer.classList.add("classfooter2");

function resett() {
  let inputs = document.getElementsByClassName("inp");
  for (inp of inputs) {
    inp.value = "";
  }
}
