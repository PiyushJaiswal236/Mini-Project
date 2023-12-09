//cart
let cartButton = document.querySelector(".ctn");
let cart = document.querySelector(".cart");
let close = document.querySelector(".cart-close");
var g1 = "A", g2 = "A", g3 = "A", g4="A";
var isCartClicked = false
var pre1
var pre2
var pre3
var pre4
var isFirstRun=true;

cartButton.onclick = () => {
    cart.classList.add("active");
};

close.onclick = () => {
    cart.classList.remove("active");
};

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready();
}


function ready() {

    loadCartItems()

    var removeButtons = document.getElementsByClassName("cart-remove")
    for (var i = 0; i < removeButtons.length; i++) {
        var button = removeButtons[i];
        button.addEventListener('click', removeCartItem)
    }

    var products = document.getElementsByClassName('p-cont')
    for (var i = 0; i < products.length; i++) {
        var product = products[i]
        product.addEventListener('click', goToProduct)
        // console.log(product)
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged)
    }

    var addCart = document.getElementsByClassName('cart-icon')
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i]
        button.addEventListener('click', addCartClicked)
    }

    var custOpts = document.getElementsByClassName('opt')
    for (var i = 0; i < custOpts.length; i++) {
        var opt = custOpts[i]
        opt.addEventListener('click', getGroupAndChangeIMG)
    }

    if (localStorage.getItem("isPrClicked") == "Yes") {
        console.log("works")
        loadProductPage()
        document.getElementsByClassName("Add-Btn")[0].addEventListener("click", addBtnClicked)
        localStorage.setItem("isPrClicked", "No");
    }
    var loc =document.location.pathname
    if(loc.slice(-18)=="/womenscustom.html"||loc.slice(-16)=="/menscustom.html"){


        console.log(loc.split(-18))
            if(loc.slice(-18)=="/womenscustom.html"){
                console.log(loc.slice(-18))
                pre1 =document.getElementById("wg1o1")
                pre2 =document.getElementById("wg2o1")
                pre3 =document.getElementById("wg3o1")
                pre4 =document.getElementById("wg4o1")
                pre1.classList.add("cactive")
                pre2.classList.add("cactive")
                pre3.classList.add("cactive")
                pre4.classList.add("cactive")
            }
            if(loc.slice(-16)=="/menscustom.html"){
                pre1 =document.getElementById("g1o1")
                pre2 =document.getElementById("g2o1")
                pre3 =document.getElementById("g3o1")
                pre1.classList.add("cactive")
                pre2.classList.add("cactive")
                pre3.classList.add("cactive")
            }

    }
    document.getElementsByClassName("buy-btn")[0].addEventListener("click", buyButtonClicked)
    document.getElementsByClassName("C-Add-Btn")[0].addEventListener("click", customsAddBtnClicked)

}

function loadCartItems(){
    var cartItems = document.getElementsByClassName("cart-container")[0]
    cartItems.innerHTML=localStorage.getItem("cart-items");
    // console.log(localStorage.getItem("cart-items"))

    var removeButtons = document.getElementsByClassName("cart-remove")
    for (var i = 0; i < removeButtons.length; i++) {
        var button = removeButtons[i];
        button.addEventListener('click', removeCartItem)
    }
    updateTotal();
}

function getGroupAndChangeIMG(event) {

    var opt=event.target;
    var optSecondClassName = opt.classList[1]
    var group = opt.parentElement.parentElement.classList[0]
    opt.classList.add("cactive")
    if (group == "group1") {
        g1 = optSecondClassName
        if(pre1!=opt){
            pre1.classList.remove("cactive")
        }
        pre1=opt
    }
    else if (group == "group2") {
        g2 = optSecondClassName
        if(pre2!=opt){
            pre2.classList.remove("cactive")
        }
        pre2=opt

    }
    else if (group == "group3") {
        g3 = optSecondClassName
        if(pre3!=opt){
            pre3.classList.remove("cactive")
        }
        pre3=opt
    }
    else if (group == "group4") {
        g4 = optSecondClassName
        if(pre4!=opt){
            pre4.classList.remove("cactive")
        }        pre4=opt
    }
    var loc =document.location.pathname
    //console.log(loc.slice(-18))
    if(loc.slice(-18)=="/womenscustom.html"){
        var NewIMG = "LIB/Women/" + g1 + g2 + g3 +g4+ ".png"
    }  
    else{
        var NewIMG = "LIB/Men/" + g1 + g2 + g3 + ".png"
    } 
    IMG = document.getElementsByClassName('img-preview');
    IMG[0].src = NewIMG

}

function goToProduct(event) {
  

    if (!isCartClicked) {

        var product = event.target
        var productParent = product.parentElement
        if (productParent.classList[0] == "card") {
            productParent = productParent.parentElement
        }
        if (productParent.classList[0] == "pr") { return }

        var title = productParent.getElementsByClassName("product-title")[0].innerText;
        var price = productParent.getElementsByClassName("product-price")[0].innerText;
        var productImg = productParent.getElementsByClassName("product-img")[0].src;

        localStorage.setItem("title", title)
        localStorage.setItem("price", price)
        localStorage.setItem("productImg", productImg)
        localStorage.setItem("isPrClicked", "Yes")

        window.location = "product.html"
    }
    else
        isCartClicked = false
}
function loadProductPage() {

    var product_div = document.createElement("div")
    product_div.classList.add('product-container')
    var productPgHTML = `
    <div class="img">
    <img src="${localStorage.getItem("productImg")}" alt="" srcset="" class="product-d-img">
    </div>
    
    <div class="detail-box">
    <div class="product-d-title">${localStorage.getItem("title")}</div>
    <div class="product-des">Analog Dial Watch for Men </div>
    <div class="product-rating">4.2/5 Rating </div>
    <div class="product-d-price">${localStorage.getItem("price")}</div>
    <div class="Add-Btn">Add To Cart</div>
    </div>`;
    console.log(product_div)
    product_div.innerHTML = productPgHTML
    document.querySelector(".product-page-container").append(product_div)
}

function addBtnClicked() {
    var title = document.getElementsByClassName("product-d-title")[0].innerText;
    var price = document.getElementsByClassName("product-d-price")[0].innerText;
    var productImg = document.getElementsByClassName("product-d-img")[0].src;
    addProductToCart(title, price, productImg)
    var cartItems = document.getElementsByClassName("cart-container")[0].innerHTML
    localStorage.setItem("cart-items",cartItems)
    updateTotal()
}
function customsAddBtnClicked() {
    console.log("Custom-add-works")
    var title = document.getElementsByClassName("title-c")[0].innerText;
    var price = document.getElementsByClassName("price")[0].innerText;
    var productImg = document.getElementsByClassName("img-preview")[0].src;
    addProductToCart(title, price, productImg)
    updateTotal()
}

function buyButtonClicked() {
    var cartContant = document.getElementsByClassName('cart-container')[0]
    //console.log(cartContant.children.length==0)
    if(cartContant.children.length==0){
        alert("Your Cart is empty")
        return
    }
    while (cartContant.hasChildNodes()) {
        cartContant.removeChild(cartContant.firstChild)
    }
    localStorage.setItem("cart-items","")
    updateTotal();
    alert("your order is placed !!")
}
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    var cartItems = document.getElementsByClassName("cart-container")[0].innerHTML
    localStorage.setItem("cart-items",cartItems)
    console.log(localStorage.getItem("cart-items"))
    updateTotal()
}

function addCartClicked(event) {
    isCartClicked=true
    var button = event.target;
    var shopProduct = button.parentElement;
    var title = shopProduct.getElementsByClassName("product-title")[0].innerText;
    var price = shopProduct.getElementsByClassName("product-price")[0].innerText;
    var productImg = shopProduct.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg)
    updateTotal()


    var cartItems = document.getElementsByClassName("cart-container")[0].innerHTML
    localStorage.setItem("cart-items",cartItems)
    console.log(localStorage.getItem("cart-items"))
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div")
    cartShopBox.classList.add('item-box')
    var cartItems = document.getElementsByClassName("cart-container")[0]
    var ItemsName = cartItems.getElementsByClassName('cart-product-title')

    for (var i = 0; i < ItemsName.length; i++) {
        console.log(ItemsName[i].innerText, title)
        if (ItemsName[i].innerText == title) {
            alert("You have already added this item to your cart");
            return;
        }
    }


    var cartBoxContainer = `
    <img src="${productImg}" alt="" class="item-img">
    <div class="item-detail">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number" value="1" class="cart-quantity">
    </div>
    <img src="img/trash.png" class="cart-remove">`;

    cartShopBox.innerHTML = cartBoxContainer
    cartItems.append(cartShopBox)

    //localStorage.setItem("cart-items",cartItems)
    console.log(localStorage.getItem("cart-items"))
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem)
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)
    alert("Product added to cart !!")

}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTotal();
}

function updateTotal() {
    var cartContant = document.getElementsByClassName('cart-container')[0]
    var cartItems = cartContant.getElementsByClassName('item-box');
    var total = 0;
    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i];
        var priceElement = cartItem.getElementsByClassName('cart-price')[0]
        var quantityElement = cartItem.getElementsByClassName('cart-quantity')[0]
        var price = parseFloat(priceElement.innerText.replace("Rs", ""))

        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    document.getElementsByClassName('total-price')[0].innerText = "Rs" + total;
}