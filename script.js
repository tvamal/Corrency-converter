// Define available currencies and elements
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const convertBtn = document.getElementById('convert-btn');
const amount = document.getElementById('amount');
const result = document.getElementById('result');

// API to get exchange rates
const API_URL = 'https://api.exchangerate-api.com/v4/latest/';

document.addEventListener('DOMContentLoaded', () => {
  populateCurrencyOptions();
});

// Function to populate currency options in dropdown
async function populateCurrencyOptions() {
  try {
    const response = await fetch(`${API_URL}USD`);
    const data = await response.json();
    const currencies = Object.keys(data.rates);

    currencies.forEach(currency => {
      const option1 = document.createElement('option');
      const option2 = document.createElement('option');
      option1.value = currency;
      option2.value = currency;
      option1.textContent = currency;
      option2.textContent = currency;

      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    });

    fromCurrency.value = 'USD'; // Set default values
    toCurrency.value = 'EUR';
  } catch (error) {
    result.textContent = 'Error loading currencies!';
  }
}

// Function to handle conversion
convertBtn.addEventListener('click', async () => {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amountVal = amount.value;

  if (amountVal === '' || isNaN(amountVal) || amountVal <= 0) {
    result.textContent = 'Please enter a valid amount!';
    return;
  }

  try {
    const response = await fetch(`${API_URL}${from}`);
    const data = await response.json();
    const rate = data.rates[to];
    const convertedAmount = (amountVal * rate).toFixed(2);
    
    result.textContent = `${amountVal} ${from} = ${convertedAmount} ${to}`;
  } catch (error) {
    result.textContent = 'Error fetching conversion rates!';
  }
});
