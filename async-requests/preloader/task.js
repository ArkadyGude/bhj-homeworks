document.addEventListener('DOMContentLoaded', function() {
  const itemsContainer = document.getElementById('items');
  const loader = document.getElementById('loader');
  const url = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';
  const cachedData = localStorage.getItem('currencyData');
  const cacheTimestamp = localStorage.getItem('currencyTimestamp');
  const currentTime = new Date().getTime();
  const cacheExpiry = 5 * 60 * 1000;

  if (cachedData && cacheTimestamp && (currentTime - cacheTimestamp < cacheExpiry)) {
    const data = JSON.parse(cachedData);
    displayData(data);
    loader.classList.remove('loader_active');
  }

  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'json';
  
  xhr.onload = function() {
    if (xhr.status === 200) {
      const data = xhr.response;

      localStorage.setItem('currencyData', JSON.stringify(data));
      localStorage.setItem('currencyTimestamp', new Date().getTime());

      displayData(data);

      loader.classList.remove('loader_active');
    } else {
      console.error('Ошибка загрузки данных:', xhr.status);
      loader.classList.remove('loader_active');
    }
  };
  
  xhr.onerror = function() {
    console.error('Ошибка сети');
    if (cachedData) {
      const data = JSON.parse(cachedData);
      displayData(data);
    }
    loader.classList.remove('loader_active');
  };
  
  xhr.send();

  function displayData(data) {
    itemsContainer.innerHTML = '';
    const valutes = data.response.Valute;

    for (let key in valutes) {
      const valute = valutes[key];
      const itemDiv = document.createElement('div');
      itemDiv.className = 'item';
      const codeDiv = document.createElement('div');
      codeDiv.className = 'item__code';
      codeDiv.textContent = valute.CharCode;
      const valueDiv = document.createElement('div');
      valueDiv.className = 'item__value';
      valueDiv.textContent = valute.Value.toFixed(2);
      const currencyDiv = document.createElement('div');
      currencyDiv.className = 'item__currency';
      currencyDiv.textContent = 'руб.';
      itemDiv.appendChild(codeDiv);
      itemDiv.appendChild(valueDiv);
      itemDiv.appendChild(currencyDiv);
      itemsContainer.appendChild(itemDiv);
    }
  }
});