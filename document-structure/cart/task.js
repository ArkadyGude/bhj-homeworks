document.addEventListener('DOMContentLoaded', function() {
    let cart = loadCartFromStorage();
    updateCartDisplay();
    
    document.querySelectorAll('.product').forEach(product => {
        const productId = product.dataset.id;
        const decBtn = product.querySelector('.product__quantity-control_dec');
        const incBtn = product.querySelector('.product__quantity-control_inc');
        const quantityValue = product.querySelector('.product__quantity-value');
        const addBtn = product.querySelector('.product__add');
        const productImage = product.querySelector('.product__image');
        
        decBtn.addEventListener('click', () => {
            let value = parseInt(quantityValue.textContent);
            if (value > 1) quantityValue.textContent = --value;
        });
        
        incBtn.addEventListener('click', () => {
            let value = parseInt(quantityValue.textContent);
            quantityValue.textContent = ++value;
        });
        
        addBtn.addEventListener('click', () => {
            const quantity = parseInt(quantityValue.textContent);
            createProductAnimation(productImage, productId);
            addToCart(productId, productImage.src, quantity);
            updateCartDisplay();
        });
    });
    
    function createProductAnimation(productImage, productId) {
        const imageClone = productImage.cloneNode();
        imageClone.classList.add('product-shadow');
        const productRect = productImage.getBoundingClientRect();
        const cartRect = document.querySelector('.cart').getBoundingClientRect();
        
        Object.assign(imageClone.style, {
            position: 'fixed',
            left: `${productRect.left}px`,
            top: `${productRect.top}px`,
            width: `${productRect.width}px`,
            height: `${productRect.height}px`,
            zIndex: '1000',
            transition: 'all 0.5s ease-out'
        });
        
        document.body.appendChild(imageClone);
        
        setTimeout(() => {
            const targetLeft = cartRect.left + cartRect.width / 2 - productRect.width / 2;
            const targetTop = cartRect.top + cartRect.height / 2 - productRect.height / 2;
            
            Object.assign(imageClone.style, {
                left: `${targetLeft}px`,
                top: `${targetTop}px`,
                opacity: '0.5',
                transform: 'scale(0.3)'
            });
        }, 50);
        
        setTimeout(() => imageClone.remove(), 550);
    }
    
    function addToCart(productId, imageUrl, quantity) {
        cart[productId] = cart[productId] 
            ? {...cart[productId], count: cart[productId].count + quantity}
            : {id: productId, image: imageUrl, count: quantity};
        saveCartToStorage();
    }
    
    function removeFromCart(productId) {
        if (cart[productId]) {
            delete cart[productId];
            saveCartToStorage();
            updateCartDisplay();
        }
    }
    
    function updateCartDisplay() {
        const cartProductsContainer = document.querySelector('.cart__products');
        const cartTitle = document.querySelector('.cart');
        
        if (Object.keys(cart).length === 0) {
            cartTitle.style.display = 'none';
            cartProductsContainer.innerHTML = '';
            return;
        }
        
        cartTitle.style.display = 'block';
        
        cartProductsContainer.innerHTML = Object.values(cart).map(product => `
            <div class="cart__product" data-id="${product.id}">
                <img class="cart__product-image" src="${product.image}" alt="Товар в корзине">
                <div class="cart__product-count">${product.count}</div>
                <div class="cart__product-remove" style="
                    position: absolute; top: 0; left: 0; background: red; 
                    color: white; width: 20px; height: 20px; border-radius: 50%;
                    display: flex; justify-content: center; align-items: center;
                    cursor: pointer; z-index: 10; font-size: 16px; line-height: 1;
                ">×</div>
            </div>
        `).join('');
        
        cartProductsContainer.querySelectorAll('.cart__product-remove').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                removeFromCart(button.closest('.cart__product').dataset.id);
            });
        });
    }
    
    function saveCartToStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    function loadCartFromStorage() {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : {};
    }
});