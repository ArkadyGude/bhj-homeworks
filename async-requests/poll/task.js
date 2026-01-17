(function() {
    const pollTitle = document.getElementById('poll__title');
    const pollAnswers = document.getElementById('poll__answers');
    let pollData = null;

    function loadPoll() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');
        xhr.responseType = 'json';
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                pollData = xhr.response;
                displayPoll();
            } else {
                console.error('Ошибка загрузки опроса:', xhr.status);
            }
        };
        
        xhr.onerror = function() {
            console.error('Ошибка сети при загрузке опроса');
        };
        
        xhr.send();
    }

    function displayPoll() {
        pollTitle.textContent = pollData.data.title;
        pollAnswers.innerHTML = '';

        pollData.data.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'poll__answer';
            button.textContent = answer;

            button.addEventListener('click', function() {
                handleVote(index);
            });
            
            pollAnswers.appendChild(button);
        });
    }

    function handleVote(answerIndex) {
        alert('Спасибо, ваш голос засчитан!');

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
            console.log('Ответ сервера:', xhr.responseText);
            console.log('Статус:', xhr.status);
            
            if (xhr.status === 200 || xhr.status === 201) {
                try {
                    const results = JSON.parse(xhr.responseText);
                    displayResults(results);
                } catch (e) {
                    console.error('Ошибка парсинга JSON:', e);
                }
            } else {
                console.error('Ошибка при отправке голоса. Статус:', xhr.status);
            }
        };
        
        xhr.onerror = function() {
            console.error('Ошибка сети при отправке голоса');
        };

        const params = `vote=${pollData.id}&answer=${answerIndex}`;
        console.log('Отправляемые параметры:', params);

        xhr.send(params);
    }

    function displayResults(results) {
        pollAnswers.innerHTML = '';

        if (results && results.stat && Array.isArray(results.stat)) {
            results.stat.forEach(item => {
                const resultItem = document.createElement('div');
                resultItem.className = 'poll__answer';
                resultItem.textContent = `${item.answer}: ${item.votes}`;
                pollAnswers.appendChild(resultItem);
            });
        } else {
            console.error('Неверная структура данных результатов:', results);
        }
    }

    document.addEventListener('DOMContentLoaded', loadPoll);
})();