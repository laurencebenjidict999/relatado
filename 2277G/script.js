// Get elements
const cartCountElement = document.getElementById('cart-count');
const searchInput = document.getElementById('search');
const menu = document.getElementById('menu');

// Retrieve cart from localStorage or initialize an empty cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

// Event listener for search input (debounced search)
let searchTimeout;
searchInput.addEventListener('input', function () {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(function () {
        filterProducts();
    }, 300); // Delay search by 300ms
});

// Add product to the cart
function addToCart(productName, productPrice) {
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex === -1) {
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    } else {
        cart[productIndex].quantity++;
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Save to localStorage
    updateCartCount(); // Update cart count
    alert(`${productName} added to cart!`);
}

// Update cart count in header
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.innerText = totalItems;
}

// Filter products by category
function filterCategory(category) {
    const allProducts = document.querySelectorAll('.product');
    allProducts.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        if (category === 'All' || productCategory === category) {
            product.style.display = 'block'; // Show the product
        } else {
            product.style.display = 'none'; // Hide the product
        }
    });
}

// Search products based on user input
function filterProducts() {
    const query = searchInput.value.toLowerCase();
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const productName = product.getAttribute('data-name').toLowerCase();
        if (productName.includes(query)) {
            product.style.display = 'block'; // Show matching products
        } else {
            product.style.display = 'none'; // Hide non-matching products
        }
    });
}

// Toggle dark mode on/off
const darkModeToggleButton = document.getElementById('dark-mode-toggle');
darkModeToggleButton.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    // Save user's theme preference
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
});

// Check for saved dark mode preference and apply it
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Slideshow functionality
let currentSlideIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide-image');
    const totalSlides = slides.length;

    if (index >= totalSlides) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = totalSlides - 1;
    } else {
        currentSlideIndex = index;
    }

    const slideContainer = document.querySelector('.slide-container');
    const offset = -currentSlideIndex * 100; // Move by 100% for each slide
    slideContainer.style.transition = 'transform 1s ease'; // Smooth transition with ease
    slideContainer.style.transform = `translateX(${offset}%)`;
}

// Auto change slide every 3 seconds
setInterval(() => {
    showSlide(currentSlideIndex + 1);
}, 3000);

// Initial slide show setup
document.addEventListener('DOMContentLoaded', function () {
    showSlide(currentSlideIndex); // Start with the first slide

    // Products with Drinks added
    const products = [
        { name: 'Classic Burger', price: 5.99, category: 'Burgers', image: 'burger.jpg' },
        { name: 'Cheese Pizza', price: 8.99, category: 'Pizzas', image: 'pizza.jpg' },
        { name: 'Veggie Salad', price: 4.99, category: 'Salads', image: 'salad.jpg' },
        { name: 'Coke', price: 1.99, category: 'Drinks', image: 'coke.jpg' },
        { name: 'Pepsi', price: 1.99, category: 'Drinks', image: 'pepsi.jpg' },
        { name: 'Lemonade', price: 2.49, category: 'Drinks', image: 'lemonade.jpg' },
    ];

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.setAttribute('data-name', product.name);
        productDiv.setAttribute('data-category', product.category);

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <h3>${product.name}</h3>
            <p>₱${product.price.toFixed(2)}</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
        `;

        menu.appendChild(productDiv);
    });
});

// Toggle mobile menu when hamburger icon is clicked
const hamburger = document.getElementById('hamburger');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
    navbar.classList.toggle('nav-active');
});

// Optional: Example debounce function for search (if you need one)
function debounceSearch() {
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
        console.log("Searching for:", document.getElementById('search').value);
    }, 300); // 300ms debounce
}