const tabsContainers = document.querySelectorAll('.tabs');

tabsContainers.forEach(container => {
  const tabs = container.querySelectorAll('.tab');
  const contents = container.querySelectorAll('.tab__content');
  
  const switchTab = (tabIndex) => {
    tabs.forEach(tab => tab.classList.remove('tab_active'));
    contents.forEach(content => content.classList.remove('tab__content_active'));
    tabs[tabIndex].classList.add('tab_active');
    contents[tabIndex].classList.add('tab__content_active');
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      switchTab(index);
    });
  });
});