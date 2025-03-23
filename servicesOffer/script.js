
//выбор значения в селекторе
document.querySelectorAll('.custom-dropdown').forEach((dropdown) => {
    const summary = dropdown.querySelector('summary');
    const arrow = summary.querySelector('.dropdown-arrow');
    const arrowHTML = arrow ? arrow.outerHTML : '';
    const items = dropdown.querySelectorAll('.dropdown-item');
    items.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            let selectedText = '';
            const approvedName = item.querySelector('.item-name-approved');
            const normalName = item.querySelector('.item-name');
            const typeName = item.querySelector('.type-item-name');
            if (approvedName) {
                selectedText = approvedName.textContent.trim();
            } else if (normalName) {
                selectedText = normalName.textContent.trim();
            } else if (typeName) {
                selectedText = typeName.textContent.trim();
            } else {
                selectedText = item.textContent.trim();
            }
            summary.innerHTML = selectedText + arrowHTML;
            dropdown.removeAttribute('open');

            // Сбрасываем значение второго селектора при изменении первого
            if (dropdown.id === 'customDropdown') {
                const secondDropdown = document.getElementById('secondDropdown');
                const secondSummary = secondDropdown.querySelector('summary');
                const secondArrow = secondSummary.querySelector('.dropdown-arrow');
                const secondArrowHTML = secondArrow ? secondArrow.outerHTML : '';
                secondSummary.innerHTML = 'Не выбрано' + secondArrowHTML;
            }
            //проверяем заполнены ли все поля
            updateServiceDescription();
            checkAllForms();
        });
    });
});
document.addEventListener('click', (e) => {
    document.querySelectorAll('.custom-dropdown').forEach((dropdown) => {
        if (!dropdown.contains(e.target)) {
            dropdown.removeAttribute('open');
        }
    });
});

// кастомный календарь
//сравнение дат
function isSameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
}

function getNextWorkingDays(startDate, count) {
    let result = [];
    let current = new Date(startDate);
    while (result.length < count) {
        if (current.getDay() !== 0 && current.getDay() !== 6) {
            result.push(new Date(current));
        }
        current.setDate(current.getDate() + 1);
    }
    return result;
}

const dateInput = document.getElementById('myDatepicker');
dateInput.addEventListener('input', () =>{
    if (!dateInput.value.trim()) {
        fp.clear();
    }
})
const dateArrow = document.getElementById('myDateArrow');

const fp = flatpickr('#myDatepicker', {
    dateFormat: 'd.m.Y',
    locale: 'ru',
    position: 'above',
    minDate: (function () {
        let d = new Date();
        d.setDate(d.getDate() + 1);
        return d;
    })(),
    disable: [
        function (date) {
            return (date.getDay() === 0 || date.getDay() === 6);
        }
    ],
    onChange: function (selectedDates, dateStr, instance) {
        if (selectedDates.length > 0) {
            const start = selectedDates[0];
            const blueRange = getNextWorkingDays(start, 3);

            const nextDay = new Date(blueRange[blueRange.length - 1]);
            nextDay.setDate(nextDay.getDate() + 1);
            const blueBorderRange = getNextWorkingDays(nextDay, 4);

            instance.blueRange = blueRange;
            instance.blueBorderRange = blueBorderRange;

            instance.redraw();
        }
    },
    onOpen: function (selectedDates, dateStr, instance) {
        dateArrow.classList.add('open');
    },
    onClose: function () {
        dateArrow.classList.remove('open')
    },
    onDayCreate: function (_, __, fp, dayElem) {

        const dateObj = dayElem.dateObj;
        if (!dateObj) return;

        if (fp.blueRange && fp.blueRange.some(d => isSameDay(d, dateObj))) {
            dayElem.classList.add('blue-bg');
        } else if (fp.blueBorderRange && fp.blueBorderRange.some(d => isSameDay(d, dateObj))) {
            dayElem.classList.add('blue-border');
        }
    }
});


//открытие модалки при отправлении ВСЕХ данных

const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalOverlay = document.getElementById('modalOverlay');

openModalBtn.addEventListener('click', () => {
    modalOverlay.classList.add('show');
});

closeModalBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('show');
});

// закрытие при клике мимо модалки
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('show');
    }
});

//кнопка загрузки и удаления реестров
const fileToggleBtn = document.getElementById('fileToggleBtn');
const fileStatusSpan = document.getElementById('fileStatus');
const fileToggleBtnInfo = document.getElementById('fileToggleBtnInfo');
const fileStatusSpanInfo = document.getElementById('fileStatusInfo');


//флаг выбран ли реестр
let fileSelected = false;
let fileSelectedInfo = false

fileToggleBtn.addEventListener('click', () => {
    if (!fileSelected) {
        fileToggleBtn.textContent = 'Удалить реестр';
        fileToggleBtn.classList.remove('button-add-file');
        fileToggleBtn.classList.add('button-delete-file');
        fileStatusSpan.textContent = 'Реестр_должников_ЖКХ_Ромашка.xls';
        fileSelected = true;
    } else {
        fileToggleBtn.textContent = 'Добавить реестр';
        fileToggleBtn.classList.remove('button-delete-file');
        fileToggleBtn.classList.add('button-add-file');
        fileStatusSpan.textContent = 'Реестр не выбран';
        fileSelected = false;
    }
    checkAllForms();
});

fileToggleBtnInfo.addEventListener('click', () => {
    if (!fileSelectedInfo) {
        fileToggleBtnInfo.textContent = 'Удалить реестр';
        fileToggleBtnInfo.classList.remove('button-add-file');
        fileToggleBtnInfo.classList.add('button-delete-file');
        fileStatusSpanInfo.textContent = 'Реестр_контактов_ЖКХ_Ромашка.xls';
        fileSelectedInfo = true;
    } else {
        fileToggleBtnInfo.textContent = 'Добавить реестр';
        fileToggleBtnInfo.classList.remove('button-delete-file');
        fileToggleBtnInfo.classList.add('button-add-file');
        fileStatusSpanInfo.textContent = 'Реестр не выбран';
        fileSelectedInfo = false;
    }
    checkAllForms();
});

//функция изменения цвета кнопки "отправить" в зависимости от выбранных полей

function checkAllForms() {

    const serviceSummary = document
        .getElementById('customDropdown')
        .querySelector('summary')
    const serviceText = serviceSummary.textContent.trim()


    const typeDetails = document.getElementById('secondDropdown');

    // Если в первом селекторе не выбрано значение, то второй неактивен
    //Если в имени константы не содержится Info - она отвечает за судебную работу
    if (serviceText === 'Не выбрано') {
        typeDetails.classList.add('disabled');
    } else {
        typeDetails.classList.remove('disabled');
    }

    const typeSummary = document
        .getElementById('secondDropdown')
        .querySelector('summary')
    const typeText = typeSummary.textContent.trim()

    const fileStatus = document.getElementById('fileStatus').textContent.trim()
    const fileStatusInfo = document.getElementById('fileStatusInfo').textContent.trim()

    const emailInput = document.getElementById('emailInput')
    const emailInputInfo = document.getElementById('emailInputInfo')

    emailInput.addEventListener('input', checkAllForms);
    emailInput.addEventListener('blur', checkAllForms);

    emailInputInfo.addEventListener('input', checkAllForms);
    emailInputInfo.addEventListener('blur', checkAllForms);

    const emailValue = emailInput.value.trim()
    const emailValueInfo = emailInputInfo.value.trim()
    const dateValue =dateInput.value.trim()

    const isServiceInfo = (serviceText === 'Информирование');
    const isServiceJudicial = (serviceText === 'Судебная работа');
    const informationDropdown = document.getElementById('informationDropdown');
    const judicialDropdown = document.getElementById('judicialDropdown');
    const preview = document.getElementById('preview')
    const information = document.getElementById('information')
    const judicialJob = document.getElementById('judicialJob')
    const descriptionInfo = document.getElementById('descriptionInfo')


    if (isServiceInfo) {
        informationDropdown.classList.remove('dropdown-list-hidden')
        informationDropdown.classList.add('dropdown-list');
        judicialDropdown.classList.remove('dropdown-list')
        judicialDropdown.classList.add('dropdown-list-hidden')
        preview.classList.remove('services-right-preview')
        preview.classList.add('services-right-preview-hidden')
        information.classList.remove('services-right-preview-hidden')
        information.classList.add('services-right-preview')
        judicialJob.classList.remove('services-right-preview')
        judicialJob.classList.add('services-right-preview-hidden')
        descriptionInfo.classList.remove('description-hidden')
        descriptionInfo.classList.add('description')
    } else if (isServiceJudicial){
        informationDropdown.classList.remove('dropdown-list')
        informationDropdown.classList.add('dropdown-list-hidden');
        judicialDropdown.classList.remove('dropdown-list-hidden')
        judicialDropdown.classList.add('dropdown-list')
        preview.classList.remove('services-right-preview')
        preview.classList.add('services-right-preview-hidden')
        information.classList.remove('services-right-preview')
        information.classList.add('services-right-preview-hidden')
        judicialJob.classList.remove('services-right-preview-hidden')
        judicialJob.classList.add('services-right-preview')
        descriptionInfo.classList.remove('description')
        descriptionInfo.classList.add('description-hidden')
    } else {
        descriptionInfo.classList.remove('description')
        descriptionInfo.classList.add('description-hidden')
    }

    const isTypeChosen = (typeText !== 'Не выбрано');
    const isFileChosen = (fileStatus !== 'Реестр не выбран');
    const isFileChosenInfo = (fileStatusInfo !== 'Реестр не выбран')
    const isEmailFilled = (emailValue !== '');
    const isEmailInfoFilled = (emailValueInfo !== '')
    const isDateFilled = (dateValue !== '')

    const sendButton = document.getElementById('openModalBtn');
    const judicialContainer = document.getElementById('judicialContainer')
    const informationContainer = document.getElementById('informationContainer')

    if (isTypeChosen) {
        if (isServiceJudicial) {
            judicialContainer.classList.add('interactive-elements-container')
            judicialContainer.classList.remove('interactive-elements-container-hidden')
            informationContainer.classList.add('interactive-elements-container-hidden')
            informationContainer.classList.remove('interactive-elements-container')
        } else {
            judicialContainer.classList.add('interactive-elements-container-hidden')
            judicialContainer.classList.remove('interactive-elements-container')
            informationContainer.classList.add('interactive-elements-container')
            informationContainer.classList.remove('interactive-elements-container-hidden')
        }
    } else {
        judicialContainer.classList.remove('interactive-elements-container')
        judicialContainer.classList.add('interactive-elements-container-hidden')
        informationContainer.classList.remove('interactive-elements-container')
        informationContainer.classList.add('interactive-elements-container-hidden')
    }

    if (
        (isEmailFilled && isFileChosen && isServiceJudicial && isTypeChosen) ||
        (isEmailInfoFilled && isFileChosenInfo && isServiceInfo && isTypeChosen && isDateFilled)
    ) {
        sendButton.classList.add('send-button-active');
        sendButton.classList.remove('send-button');
    } else {
        sendButton.classList.add('send-button');
        sendButton.classList.remove('send-button-active');
    }
}

function updateServiceDescription() {
    // Получаем элемент summary второго селектора
    const secondSummary = document.getElementById('secondDropdown').querySelector('summary');
    const selectedType = secondSummary.textContent.trim();

    let descriptionHTML = '';

    // Обновляем содержимое в зависимости от выбранного варианта
    if (selectedType === 'Роботизированный звонок' || selectedType === 'СМС') {
        descriptionHTML = `
      <ul>Как будет происходить работа?</ul>
      <li>Специалисты проверят текст</li>
      <li>Отслеживайте статус заявки в личном кабинете</li>
      <li>Отчет о проделанной работе загрузим в личный кабинет и направим по почте</li>
      <li>Первичные документы направим по ЭДО по итогам расчетного периода</li>
    `;
    }
    else if (selectedType === 'Направление заявления') {
        descriptionHTML = `
      <ul>Как будет происходить работа?</ul>
      <li>Подпишите договор по ЭДО, а также направьте вместе с ним реестр должников</li>
      <li>С вами свяжется специалист для запроса дополнительной информации</li>
      <li>Далее работа происходит индивидуально</li>
      <li>Отчет о проделанной работе загрузим в личный кабинет и направим по почте</li>
      <li>Первичные документы направим по ЭДО по итогам расчетного периода</li>
    `;
    }
    else if (selectedType === 'Направление заявления в суд и получение судебного приказа') {
        descriptionHTML = `
      <ul>Как будет происходить работа?</ul>
      <li>Подпишите договор по ЭДО, а также направьте вместе с ним реестр должников</li>
      <li>С вами свяжется специалист для запроса дополнительной информации</li>
      <li>Далее работа происходит индивидуально</li>
      <li>Отчет о проделанной работе загрузим в личный кабинет и направим по почте</li>
      <li>Первичные документы направим по ЭДО по итогам расчетного периода</li>
      <li>Отчет о проделанной работе загрузим в личный кабинет и направим по почте</li>
      <li>Первичные документы направим по ЭДО по итогам расчетного периода</li>
    `;
    }
    else {
        descriptionHTML = '';
    }
    document.querySelectorAll('.service-description-container').forEach((container) => {
        container.innerHTML = descriptionHTML;
    });
}

window.addEventListener('load', checkAllForms);
