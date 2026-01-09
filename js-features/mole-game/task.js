(() => {
    const holes = document.querySelectorAll('.hole');
    const deadCounter = document.getElementById('dead');
    const lostCounter = document.getElementById('lost');
    
    let dead = 0;
    let lost = 0;
    
    const checkGameStatus = () => {
        if (dead >= 10) {
            alert('Победа!');
            resetGame();
        } else if (lost >= 5) {
            alert('Вы проиграли!');
            resetGame();
        }
    };
    
    const resetGame = () => {
        dead = 0;
        lost = 0;
        deadCounter.textContent = dead;
        lostCounter.textContent = lost;
    };
    
    holes.forEach(hole => {
        hole.addEventListener('click', () => {
            if (hole.classList.contains('hole_has-mole')) {
                dead++;
                deadCounter.textContent = dead;
                hole.classList.remove('hole_has-mole');
                setTimeout(() => {
                    if (dead < 10 && lost < 5) {
                        hole.classList.add('hole_has-mole');
                    }
                }, 200);
            } else {
                lost++;
                lostCounter.textContent = lost;
            }
            
            checkGameStatus();
        });
    });
})();