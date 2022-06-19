class cartItem{
    constructor(otherId, otherPrice, otherCategory, otherName, otherDescription, otherImage, otherAmount){
      this.id=otherId; 
      this.price=otherPrice;
      this.category=otherCategory; 
      this.name=otherName;
      this.description=otherDescription;
      this.image=otherImage;
      this.amount=otherAmount;
      this.totalPrice = this.price * this.amount;
    }
  }

  function addProductToCart(){
    var url = window.location.href;
    var ProductId = parseInt(url.substring(url.lastIndexOf('/') + 1));
    let amount = parseInt(prompt("Please enter amount", "1"));
    if(isNaN(amount) || amount < 1){
      alert("Please enter a valid amount");
      return;
    }
    var newcartItem = new cartItem(
      ProductId,
      parseInt(document.getElementById("price").innerHTML),
      document.getElementById("category").innerHTML,
      document.getElementById("name").innerHTML,
      document.getElementById("description").innerHTML,
      document.getElementById("image").src,
      amount
    );

    if(localStorage.getItem("cart") == null){
      var cart = [];
      cart.push(newcartItem);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    else{
      var cart = JSON.parse(localStorage.getItem("cart"));  
      for(var i = 0; i < cart.length; i++){
        if(cart[i].id == ProductId){
          cart[i].amount+=amount;
          cart[i].totalPrice = cart[i].price * cart[i].amount;
          localStorage.setItem("cart", JSON.stringify(cart));
          return;
        }
      }
      cart.push(newcartItem);
      localStorage.setItem("cart", JSON.stringify(cart));
    
    }
    
  }