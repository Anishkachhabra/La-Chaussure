
var header = document.getElementById("selection-form");
var btns = header.getElementsByClassName("select-color");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}

var sizeHeader = document.getElementById("size-selection-form");
var sizeBtns = sizeHeader.getElementsByClassName("select-size");
var note = document.getElementById("Note");
for (var i = 0; i < sizeBtns.length; i++) {
    sizeBtns[i].addEventListener("click", function () {
        if (this.classList.contains("notactive") ||
            window.getComputedStyle(this).textDecoration.includes("line-through")) {
            note.innerHTML = "This size is currently out of stock";
            note.style.color = "red";
            note.style.fontStyle = "italic";
            return; // Do nothing if the button is not active
        }
        var currentSize = sizeHeader.getElementsByClassName("active");
        if (currentSize.length > 0) {
            currentSize[0].className = currentSize[0].className.replace(" active", "");
        }
        this.className += " active";
        note.innerHTML = "";
    });
}

// Get elements
const popup = document.getElementById("popup");
const openPopupButton = document.getElementById("openPopup");
const closePopupButton = document.getElementById("closePopup");

// Open popup and add blur to background
openPopupButton.addEventListener("click", function () {
    popup.style.display = "flex";
    document.body.classList.add("popup-active");
});

// Close popup and remove blur
closePopupButton.addEventListener("click", function () {
    popup.style.display = "none";
    document.body.classList.remove("popup-active");
});

// Optional: Close popup when clicking outside of the popup content
window.addEventListener("click", function (event) {
    if (event.target == popup) {
        popup.style.display = "none";
        document.body.classList.remove("popup-active");
    }
});

function clicked1() {
    var c = document.getElementById("root-review");
    if (c.style.display === "none" || c.style.display === "") {
        c.style.display = "block";
    }
    else {
        c.style.display = "none";

    }
}

function clicked2() {
    var b = document.getElementById("root-description")
    if (b.style.display === "none" || b.style.display === "") {
        b.style.display = "block";
    }
    else {
        b.style.display = "none";

    }
}

function clicked3() {
    var a = document.getElementById("root-details");
    if (a.style.display === "none" || a.style.display === "") {
        a.style.display = "block";
    }
    else {
        a.style.display = "none";

    }
}

const cartButtons = document.querySelectorAll('.cart-button');

cartButtons.forEach(button => {
    button.addEventListener('click', cartClick);
});

function cartClick() {
    let button = this;
    button.classList.add('clicked');
}

let heart = document.getElementById("wishlist");
let heartButton = document.getElementById("wishlist-button");

function clickedHeart() {
    heartButton.classList.add("rotate");

    if (heart.style.color === "red") {
        heart.style.color = "black";
    } else {
        heart.style.color = "red";
    }

    heartButton.style.animation = "rotate 1s";

    setTimeout(() => {
        heartButton.classList.remove("rotate");
        heartButton.style.animation = "";
    }, 500);
}

function addToCart(name, price, image) {
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];

    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Item added to cart!');
}

