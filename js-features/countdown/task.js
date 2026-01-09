document.addEventListener('DOMContentLoaded', function() {
    let timerElement = document.getElementById('timer');
    let totalSeconds = parseInt(timerElement.textContent);
    
    function formatTime(seconds) {
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds % 3600) / 60);
        let secs = seconds % 60;
        
        return [
            hours.toString().padStart(2, '0'),
            minutes.toString().padStart(2, '0'),
            secs.toString().padStart(2, '0')
        ].join(':');
    }

    function updateTimerDisplay() {
        timerElement.textContent = formatTime(totalSeconds);
    }

    updateTimerDisplay();

    const timerInterval = setInterval(function() {
        if (totalSeconds > 0) {
            totalSeconds--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            alert('Вы победили в конкурсе!');
            triggerFileDownloadWithLocation();
        }
    }, 1000);
    
    function triggerFileDownloadWithLocation() {
        // window.location.href = 'https://example.com/file.zip';
    }
});