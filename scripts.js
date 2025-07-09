function showScreen(id) {
  document.querySelectorAll('.screen').forEach(el => {
    el.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}


// Переход между экранами
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}


// === Логика ввода номера телефона ===
const phoneInput = document.querySelector('.phone-input');
const clearIcon = document.querySelector('.clear-icon');

const keypadKeys = document.querySelectorAll('.key');
let digits = ''; // только цифры, без маски

phoneInput.addEventListener('input', () => {
  clearIcon.style.display = phoneInput.value ? 'block' : 'none';
});

clearIcon.addEventListener('click', () => {
  phoneInput.value = '';
  clearIcon.style.display = 'none';
  phoneInput.focus();
});


function updatePhoneInput() {
  const format = '+7 (___) ___-__-__';
  let masked = '';
  let digitIndex = 0;

  for (let char of format) {
    if (char === '_') {
      masked += digits[digitIndex] ?? '_';
      digitIndex++;
    } else {
      masked += char;
    }
  }

  phoneInput.value = masked;
}

// Обработка клика по клавишам
keypadKeys.forEach(key => {
  key.addEventListener('click', () => {
    if (!key.classList.contains('empty')) {
      if (digits.length < 10) { // только 10 цифр после +7
        digits += key.textContent;
        updatePhoneInput();
      }
    }
  });
});

const screenHistory = [];

function showScreen(screenId) {
  const currentScreen = document.querySelector('.screen.active');
  if (currentScreen) {
    screenHistory.push(currentScreen.id);
    currentScreen.classList.remove('active');
  }
  document.getElementById(screenId)?.classList.add('active');
}

//со стеком кнопка нахад, чтоб по айди не возвращатсья
/*document.querySelector('.back-btn')?.addEventListener('click', () => {
  const prevScreenId = screenHistory.pop();
  if (prevScreenId) {
    document.querySelector('.screen.active')?.classList.remove('active');
    document.getElementById(prevScreenId)?.classList.add('active');
  }
});
*/


// Обработка кнопки "Назад"
document.querySelector('.back-btn')?.addEventListener('click', () => {
    showScreen('screen-welcome');
});

//обработка нопки вперед
document.querySelector('.next-btn')?.addEventListener('click', () => {
    showScreen('screen-checkphone');
});

function updatePhoneInput() {
  const format = '+7 (___) ___-__-__';
  let masked = '';
  let digitIndex = 0;

  for (let char of format) {
    if (char === '_') {
      masked += digits[digitIndex] ?? '_';
      digitIndex++;
    } else {
      masked += char;
    }
  }

  phoneInput.value = masked;

  // Показывать/скрывать иконку очистки
  clearIcon.style.display = digits.length > 0 ? 'block' : 'none';
}

// Удаление последней цифры
clearIcon.addEventListener('click', () => {
  if (digits.length > 0) {
    digits = digits.slice(0, -1);
    updatePhoneInput();
  }
});

// При нажатии кнопки "Далее" на экране ввода
document.querySelector('.next-btn').addEventListener('click', function() {
  // Получаем введенный номер
  const phoneNumber = document.getElementById('phone-input').value;
  
  // Устанавливаем номер в поле проверки
  document.getElementById('displayed-phone').textContent = phoneNumber;
  
  // Переходим на экран проверки
  showScreen('screen-checkphone');
});

// При возврате на экран ввода
document.querySelector('.back-btn').addEventListener('click', () => {
  document.getElementById('phone-input').value = 
    document.getElementById('displayed-phone').textContent;
  showScreen('screen-phone');
});