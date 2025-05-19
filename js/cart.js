// cart.js

// Проверяем, есть ли корзина в локальном хранилище
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Функция для отображения корзины
function displayCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';
    
    // Отображаем товары в корзине
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = ${item.name} - ${item.price} <button onclick="removeFromCart(${index})">Удалить</button>;
        cartDiv.appendChild(cartItem);
    });
}

// Функция для добавления товара в корзину
function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Функция для удаления товара из корзины
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Функция для оформления заказа
function checkout() {
    // Создаём сообщение с товарами
    const orderDetails = cart.map(item => ${item.name} - ${item.price}).join('n');
    const email = 'owner@example.com'; // Здесь укажи почту владельца сайта

    // Отправляем данные на сервер для обработки
    fetch('send_order.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, orderDetails })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        cart = []; // Очищаем корзину после оформления заказа
        localStorage.removeItem('cart');
        displayCart();
    });
}

// Инициализация отображения корзины при загрузке страницы
document.addEventListener('DOMContentLoaded', displayCart);