let cart = localStorage.getItem('cart');
cart = cart ? JSON.parse(cart) : [];

let cartItemsContainer = document.getElementById('cart-items');
let totalElement = document.getElementById('total');
let total = 0;

function renderCart() {
    cartItemsContainer.innerHTML = '';
    total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalElement.innerText = '';
    } else {
        cart.forEach((item, index) => {
            let cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-info">
                <img src="${item.image}" alt="${item.name}" >
                <span>
                    <h3>${item.code}</h3>
                    <p>${item.name}</p>
                    <p>Rs. ${item.price}</p>
                    <p class="original-price">Rs. ${item.originalPrice}</p>
                    <p>Size: ${item.size} | Color: ${item.color}</p>
                    <div class="quantity-controls">
                        <button class="decrease-btn" onclick="updateQuantity(${index}, ${item.quantity} - 1)">-</button>
                        <input type="number" class="quantity" value="${item.quantity}" min="1" max="10" onchange="updateQuantity(${index}, this.value)">
                        <button class="increase-btn" onclick="updateQuantity(${index}, ${item.quantity} + 1)">+</button>
                    </div>
                </span>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg></button>
            `;
            cartItemsContainer.appendChild(cartItem);

            total += item.price * item.quantity;
        });

        totalElement.innerText = `Total: Rs. ${total.toFixed(2)}`;
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function updateQuantity(index, quantity) {
    if (quantity < 1 || quantity > 10) {
        alert.innerHTML = 'Maximum Quantity Reached';
        return;
    }
    if (quantity > 0) {
        cart[index].quantity = parseInt(quantity);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
}

function clearCart() {
    localStorage.removeItem('cart');
    cart = [];
    renderCart();
}

renderCart();