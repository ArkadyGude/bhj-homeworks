document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('subscribe-modal');
    const closeBtn = document.querySelector('.modal__close');

    function getCookie(name) {
        const cookies = document.cookie.split('; ');
        const cookie = cookies.find(c => c.startsWith(name + '='));
        return cookie ? cookie.split('=')[1] : null;
    }

    const isClosed = getCookie('modalClosed');

    if (!isClosed) {
        modal.classList.add('modal_active');
    }

    closeBtn.addEventListener('click', function() {
        modal.classList.remove('modal_active');
        const date = new Date();
        date.setDate(date.getDate() + 365);
        document.cookie = `modalClosed=true; expires=${date.toUTCString()}; path=/`;
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('modal_active');
            const date = new Date();
            date.setDate(date.getDate() + 365);
            document.cookie = `modalClosed=true; expires=${date.toUTCString()}; path=/`;
        }
    });
});