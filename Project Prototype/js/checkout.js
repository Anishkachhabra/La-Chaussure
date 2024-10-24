let appliedCoupon = null;

        // List of valid coupons
        const coupons = {
            "LAFIRST10": { discount: 10 }
        };

        // Load cart items from localStorage
        function loadCart() {
            const cartContainer = document.getElementById('cartContainer');
            cartContainer.innerHTML = '';
            let cart = localStorage.getItem('cart');
            cart = cart ? JSON.parse(cart) : [];

            let totalPrice = 0;
            let discount = 0;

            cart.forEach((item, index) => {
                let itemPrice = item.price * item.quantity;
                totalPrice += itemPrice;

                // Check if the item has a discount applied via coupon
                if (appliedCoupon) {
                    discount += itemPrice * (appliedCoupon.discount / 100);
                }

                // Display cart item
                let cartItem = `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div>
                            <p>${item.name}</p>
                            <p>Size: ${item.size}, Color: ${item.color}</p>
                            <p>Quantity: 
                                <button onclick="updateQuantity(${index}, ${item.quantity - 1})">-</button>
                                <span>${item.quantity}</span>
                                <button onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
                            </p>
                            <p>Price: $${item.price.toFixed(2)}</p>
                            <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
                        </div>
                    </div>
                `;
                cartContainer.insertAdjacentHTML('beforeend', cartItem);
            });

            // Calculate the final price after discount
            let finalPrice = totalPrice - discount;

            // Update the UI with prices
            document.getElementById('totalPrice').innerText = `$${totalPrice.toFixed(2)}`;
            document.getElementById('discountAmount').innerText = `-$${discount.toFixed(2)}`;
            document.getElementById('finalPrice').innerText = `$${finalPrice.toFixed(2)}`;
        }

        // Function to update quantity
        function updateQuantity(index, quantity) {
            if (quantity < 1) return;
            let cart = JSON.parse(localStorage.getItem('cart'));
            cart[index].quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();
        }

        // Function to remove an item
        function removeItem(index) {
            let cart = JSON.parse(localStorage.getItem('cart'));
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();
        }

        // Apply coupon function
        function applyCoupon() {
            const couponCode = document.getElementById('couponCode').value.toUpperCase();
            if (coupons[couponCode]) {
                appliedCoupon = coupons[couponCode];
                alert('Coupon applied successfully!');
                document.getElementById('couponCode').value = '';  // Clear the coupon input field
            } else {
                appliedCoupon = null;
                alert('Invalid coupon code');
            }
            loadCart();
        }

        // Show modal on order placement
        function placeOrder() {
            const modal = document.getElementById('orderModal');
            modal.style.display = "block";  // Show modal
            localStorage.removeItem('cart');  // Clear cart
            loadCart();  // Reload cart
        }

        // Close the modal
        function closeModal() {
            const modal = document.getElementById('orderModal');
            modal.style.display = "none";
        }

        // Load cart when the page is loaded
        window.onload = loadCart;