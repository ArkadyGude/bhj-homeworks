class Rotator {
  constructor(element) {
    this.rotator = element;
    this.cases = Array.from(this.rotator.querySelectorAll('.rotator__case'));
    this.currentIndex = 0;
    this.timeoutId = null;
    this.init();
  }

  init() {
    const activeCase = this.rotator.querySelector('.rotator__case_active');
    this.currentIndex = this.cases.findIndex(c => c === activeCase);

    if (this.currentIndex === -1) {
      this.currentIndex = 0;
      this.cases[0].classList.add('rotator__case_active');
    }
    
    this.applySettings(this.cases[this.currentIndex]);
    this.scheduleNext();
  }

  applySettings(caseElement) {
    const color = caseElement.dataset.color;
    if (color) {
      caseElement.style.color = color;
    } else {
      caseElement.style.color = '';
    }
  }

  rotate() {
    this.cases[this.currentIndex].classList.remove('rotator__case_active');
    this.currentIndex = (this.currentIndex + 1) % this.cases.length;

    const nextCase = this.cases[this.currentIndex];
    nextCase.classList.add('rotator__case_active');

    this.applySettings(nextCase);
    this.scheduleNext();
  }

  scheduleNext() {
    const currentCase = this.cases[this.currentIndex];
    const speed = parseInt(currentCase.dataset.speed) || 1000;
    
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.rotate();
    }, speed);
  }

  destroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const rotators = document.querySelectorAll('.rotator');
  const rotatorInstances = [];
  
  rotators.forEach(rotator => {
    rotatorInstances.push(new Rotator(rotator));
  });
  
  window.addEventListener('beforeunload', () => {
    rotatorInstances.forEach(rotator => rotator.destroy());
  });
});