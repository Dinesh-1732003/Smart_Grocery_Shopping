document.addEventListener('DOMContentLoaded', () => {
    const cartProducts = document.getElementById('cart-products');
    const totalPriceElement = document.getElementById('total-price');
    const itemCountElement = document.getElementById('item-count');
    const youSaveElement = document.getElementById('you-save');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCart() {
        cartProducts.innerHTML = '';
        let totalPrice = 0;
        let itemCount = 0;
        let totalSavings = 0;

        cart.forEach((item, index) => {
            const product = document.createElement('div');
            product.classList.add('product');

            const subtotal = item.quantity * item.price;
            totalPrice += subtotal;
            itemCount += item.quantity;

            product.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="product-info">
                    <h3 class="product-name">${item.name}</h3>
                    <h4 class="product-price">Rs. ${item.price}</h4>
                    <p class="product-quantity">
                        Qnt: <input type="number" value="${item.quantity}" min="1" data-index="${index}">
                    </p>
                    <p class="product-remove">
                        <i class="fas fa-trash-alt"></i>
                        <span class="remove" data-index="${index}">Remove</span>
                    </p>
                </div>
            `;
            cartProducts.appendChild(product);
        });

        totalPriceElement.textContent = `Rs. ${totalPrice}`;
        itemCountElement.textContent = `${itemCount}`;
        youSaveElement.textContent = `Rs. ${totalSavings}`;
    }

    cartProducts.addEventListener('click', event => {
        if (event.target.classList.contains('remove')) {
            const index = event.target.getAttribute('data-index');
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    });

    cartProducts.addEventListener('input', event => {
        if (event.target.type === 'number') {
            const index = event.target.getAttribute('data-index');
            const newQuantity = parseInt(event.target.value);
            if (newQuantity > 0) {
                cart[index].quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            }
        }
    });

    renderCart();
});
