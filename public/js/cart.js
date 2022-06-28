/**
 * gets the cart items from local storage.
 */
var cart = JSON.parse(localStorage.getItem("cart"));
/**
 * sets car to empty list if local storage is empty.
 */
if (cart == null) {
  cart = [];
}
/**
 * adds every cart item on the page.
 */
cart.forEach(function (cartItem) {
  document
    .getElementsByClassName("shopping-cart-item")[0]
    .appendChild(
      addelement(cartItem.name, cartItem.price, cartItem.amount, cartItem.image)
    );
});
var element = document.getElementById("footerId");
var main = document.getElementById("mainbody");
if (main.scrollHeight > main.clientHeight) {
  element.classList.remove("classfooter");
} else {
  element.classList.add("classfooter");
}
/**
 * assembles the cart item
 * @param {string} name - name of the item
 * @param {int} price - price of the item
 * @param {int} quantity - amount of the item 
 * @param {string} image - image of the item 
 * @returns - returns a div element with the item information.
 */
function addelement(name, price, quantity, image) {
  document.getElementsByClassName("lighter-text")[0].innerHTML =
    "Total: " + getTotal() + "$";
  var ls = document.createElement("li");
  ls.className = "clearfix";
  var im = document.createElement("img");
  im.alt = "item";
  im.src = image;
  ls.appendChild(im);
  var sp1 = document.createElement("span");
  sp1.className = "item-name";
  ls.appendChild(sp1);
  sp1.appendChild(document.createTextNode(name));
  var sp2 = document.createElement("span");
  sp2.className = "item-price";
  ls.appendChild(sp2);
  sp2.appendChild(document.createTextNode(price + " $"));
  var sp3 = document.createElement("span");
  sp3.className = "item-quantity";
  ls.appendChild(sp3);
  sp3.appendChild(document.createTextNode("Quantity: " + quantity));
  return ls;
}
/**
 * clears the cart.
 */
function clearCart() {
  localStorage.removeItem("cart");
  window.location.reload();
}
/**
 * iterates over every cart Item and sums up the price.
 * @returns {number} - total price of the cart.
 */
function getTotal() {
  if (localStorage.getItem("cart") == null) {
    return 0;
  }
  var cart = JSON.parse(localStorage.getItem("cart"));
  return cart.reduce(function (total, cartItem) {
    return total + cartItem.totalPrice;
  }, 0);
}
