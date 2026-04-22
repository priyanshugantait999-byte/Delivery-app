let cartCount = 0;

// Fetch products as soon as the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

async function fetchProducts() {
    try {
        // Calls the /api/products route in server.js
        const response = await fetch('/api/products');
        const products = await response.json();
        
        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; // Clear the "Loading..." text

        if(products.length === 0) {
            productList.innerHTML = '<p>No products found. Add some to MySQL!</p>';
            return;
        }

        // Loop through data and create HTML for each product
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button onclick="addToCart()">Add to Cart</button>
            `;
            productList.appendChild(card);
        });

    } catch (error) {
        console.error('Error fetching products:', error);
        document.getElementById('product-list').innerHTML = '<p>Error loading products from server.</p>';
    }
}

// Simple visual function to increase cart count
function addToCart() {
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
}