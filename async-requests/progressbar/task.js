document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const progress = document.getElementById('progress');
    const fileInput = document.getElementById('file');
    const fileNameSpan = document.querySelector('.input__wrapper-desc');

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            fileNameSpan.textContent = fileInput.files[0].name;
        } else {
            fileNameSpan.textContent = 'Имя файла...';
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (fileInput.files.length === 0) {
            alert('Пожалуйста, выберите файл');
            return;
        }
        
        const formData = new FormData(form);
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
                const percentComplete = event.loaded / event.total;
                progress.value = percentComplete;
            }
        });

        xhr.addEventListener('load', () => {
            if (xhr.status === 201) {
                progress.value = 1.0;
                alert('Файл успешно загружен!');
                form.reset();
                fileNameSpan.textContent = 'Имя файла...';
                setTimeout(() => {
                    progress.value = 0.0;
                }, 1000);
            } else {
                alert('Ошибка при загрузке файла');
                progress.value = 0.0;
            }
        });

        xhr.addEventListener('error', () => {
            alert('Ошибка сети при загрузке файла');
            progress.value = 0.0;
        });

        xhr.open('POST', form.action);
        xhr.send(formData);
    });
});