document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.getElementById('signin__form');
    const signinBlock = document.getElementById('signin');
    const welcomeBlock = document.getElementById('welcome');
    const userIdSpan = document.getElementById('user_id');
    const logoutBtn = document.getElementById('logout__btn');
    const errorMessage = document.getElementById('error-message');
    const loginInput = signinForm.querySelector('input[name="login"]');
    const passwordInput = signinForm.querySelector('input[name="password"]');
    const savedUserId = localStorage.getItem('user_id');
    
    if (savedUserId) {
        showWelcomeBlock(savedUserId);
    }

    signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        hideErrorMessage();

        const formData = new FormData(signinForm);

        fetch('https://students.netoservices.ru/nestjs-backend/auth', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                localStorage.setItem('user_id', data.user_id);
                showWelcomeBlock(data.user_id);
                clearFormFields();
            } else {

                showErrorMessage('Неверный логин/пароль');
                passwordInput.value = '';
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            showErrorMessage('Произошла ошибка при авторизации. Попробуйте еще раз.');
        });
    });

    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('user_id');
        showSigninBlock();
        clearFormFields();
    });
    
    function showWelcomeBlock(userId) {
        userIdSpan.textContent = userId;
        signinBlock.classList.remove('signin_active');
        welcomeBlock.classList.add('welcome_active');
    }
    
    function showSigninBlock() {
        signinBlock.classList.add('signin_active');
        welcomeBlock.classList.remove('welcome_active');
    }
    
    function showErrorMessage(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('active');
    }
    
    function hideErrorMessage() {
        errorMessage.classList.remove('active');
    }
    
    function clearFormFields() {
        loginInput.value = '';
        passwordInput.value = '';
    }

    loginInput.addEventListener('input', hideErrorMessage);
    passwordInput.addEventListener('input', hideErrorMessage);
});