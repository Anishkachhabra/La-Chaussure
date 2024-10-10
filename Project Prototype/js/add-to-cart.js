let cart = localStorage.getItem('cart');
        cart = cart ? JSON.parse(cart) : [];

        let cartItemsContainer = document.getElementById('cart-items');
        let totalElement = document.getElementById('total');
        let total = 0;

        // Function to render cart items
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
                        <img src="${item.image}" alt="${item.name}">
                        <p>${item.name} - $${item.price}</p>
                        <input type="number" class="quantity" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                        <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                    `;
                    cartItemsContainer.appendChild(cartItem);

                    total += item.price * item.quantity;
                });

                totalElement.innerText = `Total: $${total.toFixed(2)}`;
            }
        }

        // Function to remove an item from the cart
        function removeFromCart(index) {
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }

        // Function to update quantity
        function updateQuantity(index, quantity) {
            if (quantity > 0) {
                cart[index].quantity = parseInt(quantity);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            }
        }

        // Function to clear the cart
        function clearCart() {
            localStorage.removeItem('cart');
            cart = [];
            renderCart();
        }

        // Initial rendering of the cart
        renderCart();