// task.js - Основной файл с логикой корзины

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация корзины из localStorage
    let cart = loadCartFromStorage();
    
    // Обновляем отображение корзины
    updateCartDisplay();
    
    // Находим все карточки товаров
    const products = document.querySelectorAll('.product');
    
    // Для каждой карточки товара добавляем обработчики событий
    products.forEach(product => {
        const productId = product.dataset.id;
        const decBtn = product.querySelector('.product__quantity-control_dec');
        const incBtn = product.querySelector('.product__quantity-control_inc');
        const quantityValue = product.querySelector('.product__quantity-value');
        const addBtn = product.querySelector('.product__add');
        const productImage = product.querySelector('.product__image');
        
        // Обработчик для уменьшения количества
        decBtn.addEventListener('click', () => {
            let value = parseInt(quantityValue.textContent);
            if (value > 1) {
                value--;
                quantityValue.textContent = value;
            }
        });
        
        // Обработчик для увеличения количества
        incBtn.addEventListener('click', () => {
            let value = parseInt(quantityValue.textContent);
            value++;
            quantityValue.textContent = value;
        });
        
        // Обработчик для добавления товара в корзину
        addBtn.addEventListener('click', () => {
            const quantity = parseInt(quantityValue.textContent);
            
            // Создаем анимацию перемещения товара
            createProductAnimation(productImage, productId);
            
            // Добавляем товар в корзину
            addToCart(productId, productImage.src, quantity);
            
            // Обновляем отображение корзины
            updateCartDisplay();
        });
    });
    
    // Функция для создания анимации перемещения товара
    function createProductAnimation(productImage, productId) {
        // Копируем изображение товара
        const imageClone = productImage.cloneNode();
        imageClone.classList.add('product-shadow');
        
        // Получаем координаты товара
        const productRect = productImage.getBoundingClientRect();
        
        // Находим корзину
        const cartElement = document.querySelector('.cart');
        const cartRect = cartElement.getBoundingClientRect();
        
        // Устанавливаем начальные стили
        imageClone.style.position = 'fixed';
        imageClone.style.left = productRect.left + 'px';
        imageClone.style.top = productRect.top + 'px';
        imageClone.style.width = productRect.width + 'px';
        imageClone.style.height = productRect.height + 'px';
        imageClone.style.zIndex = '1000';
        imageClone.style.transition = 'all 0.5s ease-out';
        
        // Добавляем клон на страницу
        document.body.appendChild(imageClone);
        
        // Запускаем анимацию после небольшой задержки
        setTimeout(() => {
            // Конечная позиция (центр корзины)
            const targetLeft = cartRect.left + cartRect.width / 2 - productRect.width / 2;
            const targetTop = cartRect.top + cartRect.height / 2 - productRect.height / 2;
            
            // Перемещаем изображение
            imageClone.style.left = targetLeft + 'px';
            imageClone.style.top = targetTop + 'px';
            imageClone.style.opacity = '0.5';
            imageClone.style.transform = 'scale(0.3)';
        }, 50);
        
        // Удаляем клон после завершения анимации
        setTimeout(() => {
            if (document.body.contains(imageClone)) {
                document.body.removeChild(imageClone);
            }
        }, 550);
    }
    
    // Функция добавления товара в корзину
    function addToCart(productId, imageUrl, quantity) {
        // Проверяем, есть ли уже такой товар в корзине
        if (cart[productId]) {
            // Если есть, увеличиваем количество
            cart[productId].count += quantity;
        } else {
            // Если нет, добавляем новый товар
            cart[productId] = {
                id: productId,
                image: imageUrl,
                count: quantity
            };
        }
        
        // Сохраняем корзину в localStorage
        saveCartToStorage();
    }
    
    // Функция удаления товара из корзины
    function removeFromCart(productId) {
        if (cart[productId]) {
            delete cart[productId];
            
            // Сохраняем корзину в localStorage
            saveCartToStorage();
            
            // Обновляем отображение корзины
            updateCartDisplay();
        }
    }
    
    // Функция обновления отображения корзины
    function updateCartDisplay() {
        const cartProductsContainer = document.querySelector('.cart__products');
        const cartTitle = document.querySelector('.cart');
        
        // Очищаем контейнер
        cartProductsContainer.innerHTML = '';
        
        // Если корзина пуста, скрываем ее
        if (Object.keys(cart).length === 0) {
            cartTitle.style.display = 'none';
            return;
        }
        
        // Показываем корзину
        cartTitle.style.display = 'block';
        
        // Добавляем каждый товар из корзины
        for (const productId in cart) {
            const product = cart[productId];
            
            // Создаем элемент товара в корзине
            const cartProduct = document.createElement('div');
            cartProduct.className = 'cart__product';
            cartProduct.dataset.id = productId;
            
            // Добавляем изображение
            const cartProductImage = document.createElement('img');
            cartProductImage.className = 'cart__product-image';
            cartProductImage.src = product.image;
            cartProductImage.alt = 'Товар в корзине';
            
            // Добавляем счетчик количества
            const cartProductCount = document.createElement('div');
            cartProductCount.className = 'cart__product-count';
            cartProductCount.textContent = product.count;
            
            // Добавляем кнопку удаления
            const removeButton = document.createElement('div');
            removeButton.className = 'cart__product-remove';
            removeButton.textContent = '×';
            removeButton.style.position = 'absolute';
            removeButton.style.top = '0';
            removeButton.style.left = '0';
            removeButton.style.background = 'red';
            removeButton.style.color = 'white';
            removeButton.style.width = '20px';
            removeButton.style.height = '20px';
            removeButton.style.borderRadius = '50%';
            removeButton.style.display = 'flex';
            removeButton.style.justifyContent = 'center';
            removeButton.style.alignItems = 'center';
            removeButton.style.cursor = 'pointer';
            removeButton.style.zIndex = '10';
            
            // Обработчик удаления товара
            removeButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Предотвращаем всплытие события
                removeFromCart(productId);
            });
            
            // Добавляем элементы в карточку товара
            cartProduct.appendChild(cartProductImage);
            cartProduct.appendChild(cartProductCount);
            cartProduct.appendChild(removeButton);
            
            // Добавляем карточку в контейнер корзины
            cartProductsContainer.appendChild(cartProduct);
        }
    }
    
    // Функция сохранения корзины в localStorage
    function saveCartToStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Функция загрузки корзины из localStorage
    function loadCartFromStorage() {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : {};
    }
});