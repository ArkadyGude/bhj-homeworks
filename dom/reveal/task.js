function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

function handleScrollAnimation() {
  const reveals = document.querySelectorAll('.reveal');
  
  reveals.forEach(reveal => {
    if (isElementInViewport(reveal) && !reveal.classList.contains('reveal_active')) {
      reveal.classList.add('reveal_active');
    }
  });
}

function throttle(func, wait) {
  let timeout = null;
  return function() {
    const context = this;
    const args = arguments;
    if (!timeout) {
      timeout = setTimeout(() => {
        func.apply(context, args);
        timeout = null;
      }, wait);
    }
  };
}

document.addEventListener('DOMContentLoaded', () => {
  handleScrollAnimation();
  
  const throttledHandleScrollAnimation = throttle(handleScrollAnimation, 100);
  window.addEventListener('scroll', throttledHandleScrollAnimation);
  window.addEventListener('resize', throttledHandleScrollAnimation);
});