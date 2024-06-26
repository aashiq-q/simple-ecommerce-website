document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Product 1', price: 10, image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Product 2', price: 20, image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Product 3', price: 30, image: 'https://via.placeholder.com/150' },
    ];

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productContainer = document.getElementById('products');
    const cartContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalAmount = document.getElementById('total-amount');
    const purchaseBtn = document.getElementById('purchase-btn');

    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    function updateTotalAmount() {
        const total = cart.reduce((sum, product) => sum + product.price, 0);
        if (totalAmount) {
            totalAmount.textContent = total.toFixed(2);
        }
    }

    function addToCart(productId) {
        const product = products.find(prod => prod.id === productId);
        if (product) {
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
        }
    }

    function createProductItem(product) {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        return productDiv;
    }

    function createCartItem(product) {
        const cartDiv = document.createElement('div');
        cartDiv.classList.add('cart-item');

        cartDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>$${product.price}</p>
        `;

        return cartDiv;
    }

    if (productContainer) {
        products.forEach(product => {
            const productItem = createProductItem(product);
            productContainer.appendChild(productItem);
        });
    }

    if (cartContainer) {
        cart.forEach(product => {
            const cartItem = createCartItem(product);
            cartContainer.appendChild(cartItem);
        });

        updateTotalAmount();

        if (purchaseBtn) {
            purchaseBtn.addEventListener('click', () => {
                alert('Purchase successful!');
                localStorage.removeItem('cart');
                window.location.reload();
            });
        }
    }

    window.addToCart = addToCart; // Expose addToCart function to the global scope
    updateCartCount();
});
