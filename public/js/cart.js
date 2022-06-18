var cart = JSON.parse(localStorage.getItem("cart"));
if(cart==null){
    cart=[];
}
for (var i =0; i<cart.length; i++){
    document.getElementsByClassName("shopping-cart-item")[0].appendChild(addelement(cart[i].name, cart[i].price, cart[i].amount, cart[i].image));
    
}
var element = document.getElementById("footerId");
var main = document.getElementById("mainbody");
if(main.scrollHeight>main.clientHeight ){
    element.classList.remove("classfooter");
}
else{
    element.classList.add("classfooter");
}
function addelement(name, price, quantity, image){

document.getElementsByClassName("lighter-text")[0].innerHTML="Total: "+getTotal()+"$";
var ls = document.createElement("li");
ls.className="clearfix";
var im = document.createElement("img");
im.alt="item";
im.src=image;
ls.appendChild(im);
var sp1 = document.createElement("span");
sp1.className="item-name";
ls.appendChild(sp1);
sp1.appendChild(document.createTextNode(name));
var sp2 = document.createElement("span");
sp2.className="item-price";
ls.appendChild(sp2);
sp2.appendChild(document.createTextNode(price+" $"));
var sp3 = document.createElement("span");
sp3.className="item-quantity";
ls.appendChild(sp3);
sp3.appendChild(document.createTextNode("Quantity: "+quantity));
return ls;
}

function clearCart(){
localStorage.removeItem("cart");
window.location.reload();
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
