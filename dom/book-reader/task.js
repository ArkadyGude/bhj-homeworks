function setActiveClass(elements, activeElement) {
    elements.forEach(el => el.classList.remove('font-size_active'));
    activeElement.classList.add('font-size_active');
}

function updateBookClass(book, size) {
    book.classList.remove('book_fs-big', 'book_fs-small');
    
    if (size === 'big') {
        book.classList.add('book_fs-big');
    } else if (size === 'small') {
        book.classList.add('book_fs-small');
    }
}

function setupFontSizeControls() {
    const book = document.getElementById('book');
    const fontSizeControls = document.querySelectorAll('.book__control_font-size .font-size');
    
    fontSizeControls.forEach(control => {
        control.addEventListener('click', function(event) {
            event.preventDefault();
            const size = this.dataset.size;
            setActiveClass(fontSizeControls, this);
            updateBookClass(book, size);
        });
    });
}

function setActiveColorClass(elements, activeElement) {
    elements.forEach(el => el.classList.remove('color_active'));
    activeElement.classList.add('color_active');
}

function updateTextColorClass(book, color) {
    book.classList.remove('book_color-black', 'book_color-gray', 'book_color-whitesmoke');

    if (color) {
        book.classList.add(`book_color-${color}`);
    }
}

function updateBackgroundColorClass(book, color) {
    book.classList.remove('book_bg-black', 'book_bg-gray', 'book_bg-white');

    if (color) {
        book.classList.add(`book_bg-${color}`);
    }
}

function setupTextColorControls() {
    const book = document.getElementById('book');
    const textColorControls = document.querySelectorAll('.book__control_color .color');
    
    if (textColorControls.length === 0) return;
    
    textColorControls.forEach(control => {
        control.addEventListener('click', function(event) {
            event.preventDefault();
            const color = this.dataset.textColor;
            setActiveColorClass(textColorControls, this);
            updateTextColorClass(book, color);
        });
    });
}

function setupBackgroundColorControls() {
    const book = document.getElementById('book');
    const bgColorControls = document.querySelectorAll('.book__control_background .color');
    
    if (bgColorControls.length === 0) return;
    
    bgColorControls.forEach(control => {
        control.addEventListener('click', function(event) {
            event.preventDefault();
            const color = this.dataset.bgColor;
            setActiveColorClass(bgColorControls, this);
            updateBackgroundColorClass(book, color);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setupFontSizeControls();
    setupTextColorControls();
    setupBackgroundColorControls();
});