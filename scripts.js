// Глобальные переменные
const screenHistory = [];
let digits = ''; // Хранит только цифры номера (без маски)

// Основная функция переключения экранов
function showScreen(screenId, rememberHistory = true) {
  const currentScreen = document.querySelector('.screen.active');
  
  if (currentScreen && rememberHistory) {
    screenHistory.push(currentScreen.id);
  }
  
  document.querySelectorAll('.screen').forEach(el => {
    el.classList.remove('active');
  });
  document.getElementById(screenId)?.classList.add('active');
}

// Инициализация ввода телефона
function initPhoneInput() {
  const phoneInput = document.getElementById('phone-input');
  const clearIcon = document.getElementById('clear-icon');
  const keypadKeys = document.querySelectorAll('.key:not(.empty)');

  // Обновление поля с маской
  function updatePhoneInput() {
    const format = '+7 (___) ___-__-__';
    let masked = '';
    let digitIndex = 0;

    for (let char of format) {
      if (char === '_') {
        masked += digits[digitIndex] || '_';
        digitIndex++;
      } else {
        masked += char;
      }
    }
    phoneInput.value = masked;
    clearIcon.style.display = digits.length > 0 ? 'block' : 'none';
  }

  // Обработка цифровых клавиш
  keypadKeys.forEach(key => {
    key.addEventListener('click', () => {
      if (digits.length < 10) {
        digits += key.textContent;
        updatePhoneInput();
      }
    });
  });

  // Очистка одной цифры (крестик)
  clearIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    if (digits.length > 0) {
      digits = digits.slice(0, -1);
      updatePhoneInput();
    }
    phoneInput.focus();
  });
}

// Инициализация обработчиков
function initEventHandlers() {
  // Универсальная кнопка "Назад"
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', handleBackButton);

//переход по кнопке верно 3->4
    document.querySelector('.correct-btn')?.addEventListener('click', function() {
        // Можно добавить дополнительную логику перед переходом
        showScreen('screen-package');
});
  });

  // Кнопка "Далее"
  document.querySelector('.next-btn')?.addEventListener('click', () => {
    if (digits.length === 10) {
      document.getElementById('displayed-phone').textContent = 
        document.getElementById('phone-input').value;
      showScreen('screen-checkphone');
    } else {
      alert('Пожалуйста, введите полный номер телефона');
    }
  });

  // Кнопка "Ошибка в номере" - сохраняем номер при возврате
  document.querySelector('.mistake-btn')?.addEventListener('click', () => {
    // Не очищаем digits, чтобы номер сохранился
    showScreen('screen-phone');
  });
}

function handleBackButton() {
  if (screenHistory.length > 0) {
    showScreen(screenHistory.pop(), false);
  } else {
    showScreen('screen-welcome');
  }
}

// Запуск при загрузке
document.addEventListener('DOMContentLoaded', () => {
  initPhoneInput();
  initEventHandlers();
  showScreen('screen-welcome');
});