
const switchElements = document.querySelectorAll('[data-lang]');

function loadLanguage(lang) {

  fetch(`./locales/${lang}.json`)
      .then((response) => response.json())
      .then((translations) => {
        translatePage(translations);
      })
      .catch((error) => console.error('Error loading language file:', error));
}

// Функция для замены текста на странице
function translatePage(translations) {

  for (const key in translations) {
    if (Object.hasOwn(translations, key)) {
      const elements = document.querySelectorAll(`[data-translate="${key}"]`);
      elements.forEach((element) => {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          // Обновление плейсхолдера для инпутов
          element.placeholder = translations[key];
        } else if (element.tagName === 'META' && element.getAttribute('name') === 'description') {
          // Обновление контента для meta description
          element.setAttribute('content', translations[key]);
        } else {
          // Обновление текста для других элементов
          element.textContent = translations[key];
        }
      });
    }
  }

  // Обработчики событий для кнопок выбора языка
  switchElements.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = el.getAttribute('data-lang');
      loadLanguage(lang);
      saveLanguage(lang);
      setButtonText(lang);
    });
  });
}

// Сохранение выбранного языка
function saveLanguage(lang) {
  localStorage.setItem('projectname-lang', lang);
}

function setButtonText(lang) {
  const currentLanguage = document.querySelectorAll('.current-language');
  currentLanguage.forEach((el) => {
    switch (lang) {
      case 'ru':
        el.textContent = 'RU';
        break;
      case 'en':
        el.textContent = 'EN';
        break;
      default:
        el.textContent = 'RU';
    }
  });
}

export {loadLanguage, setButtonText};
