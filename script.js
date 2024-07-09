const products = [
    { id: 1, name: 'Black chair', price: 650, image: 'black-chair.jpeg' },
    { id: 2, name: 'White chair', price: 650, image: 'white-chair.jpeg' },
    { id: 3, name: 'Brown chair', price: 650, image: 'brown-chair.jpeg' },
    { id: 4, name: 'Black chair', price: 650, image: 'black-chair.jpeg' },
    { id: 5, name: 'White chair', price: 650, image: 'white-chair.jpeg' },
    { id: 6, name: 'Brown chair', price: 650, image: 'brown-chair.jpeg' },
];

let cart = [];

function addToCart(productId) {
    const product = products.find(prod => prod.id === productId);
    cart.push(product);
    updateCart();
    alert(`Added ${product.name} to the cart!`);
}

function updateCart() {
    const cartIcon = document.getElementById('cart-icon');
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const subtotal = document.getElementById('subtotal');

    cartCount.textContent = cart.length;

    if (cartItems) {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name}</p>
                <p>$${item.price}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItems.appendChild(cartItem);
            total += item.price;
        });
        subtotal.textContent = total;
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

document.getElementById('cart-icon').addEventListener('click', () => {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = 'block';
});

function closeCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = 'none';
}

document.getElementById('checkout').addEventListener('click', () => {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = 'none';
    const paymentModal = document.getElementById('payment-modal');
    paymentModal.style.display = 'block';

    const subtotalElement = document.getElementById('sub-total');
    const totalElement = document.getElementById('total');

    const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
    const discount = 0;
    const total = subtotal - discount;

    subtotalElement.textContent = `$${subtotal}`;
    totalElement.textContent = `$${total}`;
});

function closePayment() {
    const paymentModal = document.getElementById('payment-modal');
    paymentModal.style.display = 'none';
}

document.getElementById('payment-form').addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Payment successful!');
    cart = [];
    updateCart();
    closePayment();
});

document.getElementById('cart').addEventListener('click', () => {
    displayCart();
});

document.getElementById('back-to-home').addEventListener('click', () => {
    document.getElementById('cart-modal').style.display = 'none';
});
