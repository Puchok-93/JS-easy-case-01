// ---------------------- Оптимальный вариант реализации -----------------------------------



// Находим все родительские элементы, где есть кнопки 
const containers = document.querySelectorAll('.js-buttons-container');
//  Находим все управляющие кнопки
const settingButtons = document.querySelectorAll('[data-setting-name]');
// Перечисление типов настроек
const SettingType = {
    ATTRIBUTE: 'attribute',
    CLASS: 'class',
  };

// Функция установки дата-атрибута
const setDataAttribute = ({settingTarget}, params) => {
    const element = document.querySelector(settingTarget);

    // Object.entries — метод возвращает массив собственных перечисляемых свойств указанного объекта в формате [key, value]
    // и перебираем его в цикле
    for(const [key, value] of Object.entries(params)) {
        element.dataset[key] = value;
    }
};

// Функция установки класса

const setClass = ({settingTarget}, params) => {
    const element = document.querySelector(settingTarget);
    for(const [key, value] of Object.entries(params)) {
        // ОТбираем те, которые управляют нужной настройкой key
        const elements = Array.from(settingButtons).filter(element => element.dataset['settingName'] === key);
        // Перебираем офильтрованные элементы и удаляем у целевого элемента классы
        elements.forEach(item => element.classList.remove(item.dataset.settingValue))
        element.classList.add(value);
    }
}

//  Функция применить настройку
const applySetting = (setting, params) => {
    if(setting.settingType === SettingType.CLASS) {
        setClass(setting, params)
    } else if(setting.settingType === SettingType.ATTRIBUTE) {
        setDataAttribute(setting, params);
    }

    setActiveButton(params);
}

// Функция активности кнопки

const setActiveButton = (params) => {
    for (const [key, value] of Object.entries(params)) {
        // Находим активную кнопку
        const activeBtn = Array.from(settingButtons)
        .find(element => element.dataset['settingName'] === key && element.classList.contains('active'));

        // находим кнопку, которую устанавливаем для настройки
        const setBtn = Array.from(settingButtons).find(element => element.dataset['settingName'] === key && element.dataset['settingValue'] === value);

          // снимаем класс active с кнопки, которая ранее была активной
          activeBtn.classList.remove('active');
        
        // добавляем класс active с кнопки, которую устанавливаем
        setBtn.classList.add('active');
    }
}

// ОБработчик события
const settingButtonClickHandler = (e, setting) => {
    const button = e.target.closest('button');

    if(!button) {
        return
    }

    // Создаем служебный объект, где будем хранить настройки страницы
    const params = {};
    const settingName = button.dataset.settingName;
    const settingValue = button.dataset.settingValue;

    // params[ключ_с_названием_настроки] = значение_настройки
    params[settingName] = settingValue;

    console.log(button.dataset); 
    console.log(params);

    applySetting(setting, params);
};

const init = () => {
    containers.forEach(container => {
        const setting = container.dataset;

        container.addEventListener('click', (e) => {
            settingButtonClickHandler(e, setting);
        })
    })
}

init();

// ---------------------- Неоптимальный вариант реализации -----------------------------------

// const themeButtons = document.querySelectorAll('.theme-button');
// const viewButtons = document.querySelectorAll('.card-view-button');
// const cardList = document.querySelector('.cards');

// function removeActiveClass(array) {
//     array.forEach(item => {
//         item.classList.remove('active');
//     });
//  }

//  function removeViewClass() {
//     if(cardList.classList.contains('tile') || cardList.classList.contains('standard') || cardList.classList.contains('compact')) {
//         cardList.classList.remove('tile', 'standard', 'compact')
//         cardList.classList.add('cards');
//     }
//  }

// themeButtons.forEach(btn => {
//     btn.addEventListener('click', (e) => {
//         const target = e.target;
//         if (target.closest('img')) {
//             removeActiveClass(themeButtons);
//             btn.classList.add('active');
//             let theme = btn.getAttribute('data-theme-name');
//             document.documentElement.setAttribute('data-theme-name', theme)
//         }
//     })
// })

// viewButtons.forEach(btn => {
//     btn.addEventListener('click', (e) => {
//         const target = e.target;
//         if (target.closest(`button`)) {
//             removeActiveClass(viewButtons);
//             btn.classList.add('active');
//             let view = btn.getAttribute('data-view-name');
//             removeViewClass();
//             cardList.classList.add(view);
//         }
//     })
// })