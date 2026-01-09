const clickerCounter = document.getElementById('clicker__counter');
const cookie = document.getElementById('cookie');
const clickerStatus = document.querySelector('.clicker__status');

const speedElement = document.createElement('div');
speedElement.className = 'clicker__speed';
speedElement.innerHTML = 'Скорость клика: <span id="clicker__speed">0</span> кликов в секунду';
clickerStatus.after(speedElement);

const clickerSpeed = document.getElementById('clicker__speed');

let clickCount = 0;
let lastClickTime = null;
let isCookieEnlarged = false;

function updateClickSpeed() {
    const now = new Date();
    
    if (lastClickTime !== null) {
        const timeDiff = (now - lastClickTime) / 1000; // Разница в секундах
        const clicksPerSecond = (1 / timeDiff).toFixed(2); // Кликов в секунду
        clickerSpeed.textContent = clicksPerSecond;
    }
    
    lastClickTime = now;
}

function toggleCookieSize() {
    if (isCookieEnlarged) {
        cookie.width = 200;
    } else {
        cookie.width = 220;
    }
    
    isCookieEnlarged = !isCookieEnlarged;
}

cookie.addEventListener('click', function() {
    clickCount++;
    clickerCounter.textContent = clickCount;
    updateClickSpeed();
    toggleCookieSize();
});

clickerCounter.textContent = clickCount;
clickerSpeed.textContent = '0';