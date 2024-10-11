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
                <img src="${item.image}" alt="${item.name}">
                <span>
                    <h2>${item.code}</h2>
                    <p>${item.name} - $${item.price} (Original: $${item.originalPrice})</p>
                    <p>Size: ${item.size} | Color: ${item.color}</p>
                    <div class="quantity-controls">
                        <button class="decrease-btn" onclick="updateQuantity(${index}, ${item.quantity} - 1)">-</button>
                        <input type="number" class="quantity" value="${item.quantity}" min="1" max="10" onchange="updateQuantity(${index}, this.value)">
                        <button class="increase-btn" onclick="updateQuantity(${index}, ${item.quantity} + 1)">+</button>
                    </div>
                </span>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);

            total += item.price * item.quantity;
        });

        totalElement.innerText = `Total: $${total.toFixed(2)}`;
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