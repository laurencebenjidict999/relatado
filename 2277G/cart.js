document.addEventListener('DOMContentLoaded', function() {
    // Retrieve cart data from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-list');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    // Clear the cart list if it exists
    cartList.innerHTML = '';

    // If the cart is empty, display a message
    if (cart.length === 0) {
        cartList.innerHTML = '<li>Your cart is empty!</li>';
        totalPriceElement.textContent = '₱0.00';
        return;
    }

    // Display cart items with quantities and options to remove items
    cart.forEach((item, index) => {
        // Create list item for each cart item
        const li = document.createElement('li');
        li.classList.add('cart-item');
        
        // Create text content for item name, price, and quantity
        const itemInfo = document.createElement('span');
        itemInfo.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
        
        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', function() {
            removeItemFromCart(index);
        });

        // Append item info and remove button to list item
        li.appendChild(itemInfo);
        li.appendChild(removeButton);

        // Add the list item to the cart list
        cartList.appendChild(li);

        // Calculate total price (consider quantity)
        totalPrice += item.price * item.quantity;
    });

    // Update total price in the UI
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;

    // Update localStorage with the current cart state
    localStorage.setItem('cart', JSON.stringify(cart));

    // Function to remove an item from the cart
    function removeItemFromCart(index) {
        // Remove the item at the specified index
        cart.splice(index, 1);

        // Update the cart in localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Re-display the cart items after removal
        displayCartItems();
    }

    // Function to re-display the cart items (called after removing an item)
    function displayCartItems() {
        // Clear the cart list and total price display
        cartList.innerHTML = '';
        totalPrice = 0;

        // Display updated cart items and total price
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.classList.add('cart-item');
            
            const itemInfo = document.createElement('span');
            itemInfo.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
            
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-button');
            removeButton.addEventListener('click', function() {
                removeItemFromCart(index);
            });
            
            li.appendChild(itemInfo);
            li.appendChild(removeButton);
            cartList.appendChild(li);
            
            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
});