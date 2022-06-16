if(localStorage.getItem("cart") == null){
    var cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
}
var cart = JSON.parse(localStorage.getItem("cart"));
for(var i = 0; i < cart.length; i++){
    var cartItemId = document.createElement("div");
    cartItemId.id = cart[i].id;
    cartItemId.innerHTML = cart[i].name+" "+cart[i].amount;
    document.getElementById("cartItemIds").appendChild(cartItemId);
}

function clearCart(){
localStorage.removeItem("cart");
}

function getTotal(){
if(localStorage.getItem("cart") == null){
return 0;
}
var cart = JSON.parse(localStorage.getItem("cart"));
return cart.reduce(function(total, cartItem){
return total + cartItem.totalPrice;
}, 0);
}

document.onkeydown = function(e) {
if (e.ctrlKey && e.keyCode == 90) {
clearCart();
window.location.reload();
}
if (e.ctrlKey && e.keyCode == 88) {
alert(getTotal());
}
}