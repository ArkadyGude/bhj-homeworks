class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.timerElement = container.querySelector('.status__timer');
    
    this.reset();
    this.registerEvents();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents() {
    document.addEventListener('keydown', (event) => {
      if (event.key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey) {
        const currentSymbol = this.currentSymbol;
        
        if (!currentSymbol) {
          return;
        }

        const expectedChar = currentSymbol.textContent;
        const pressedChar = event.key;

        if (expectedChar.toLowerCase() === pressedChar.toLowerCase()) {
          this.success();
        } else {
          this.fail();
        }
      }
    });
  }

  success() {
    if(this.currentSymbol.classList.contains("symbol_current")) {
      this.currentSymbol.classList.remove("symbol_current");
    }
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
      return;
    }

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    } else {
      this.setNewWord();
    }
  }

  fail() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    if (++this.lossElement.textContent === 3) {
      alert('Вы проиграли!');
      this.reset();
    } else {
      this.setNewWord();
    }
  }

  setNewWord() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    const word = this.getWord();
    this.renderWord(word);
    this.startTimer(word.length*2);
  }

  startTimer(wordLength) {
    this.timeLeft = wordLength;

    if (this.timerElement) {
      this.timerElement.textContent = this.timeLeft;
    }

    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      
      if (this.timerElement) {
        this.timerElement.textContent = this.timeLeft;
      }
      
      if (this.timeLeft <= 0) {
        clearInterval(this.timerInterval);
        this.fail();
      }
    }, 1000);
  }

  getWord() {
    const words = [
        'bob',
        'awesome',
        'netology',
        'hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'));