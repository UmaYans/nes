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
            //проверяем заполнены ли все поля
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

//открытие модалки

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

//флаг выбран ли реестр
let fileSelected = false;

fileToggleBtn.addEventListener('click', () => {
    if (!fileSelected) {
        fileToggleBtn.textContent = 'Удалить реестр';
        fileToggleBtn.classList.remove('button-add-file');
        fileToggleBtn.classList.add('button-delete-file');
        fileStatusSpan.textContent = 'Реестр_контактов_ЖКХ_Ромашка.xls';
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

//изменение цвета кнопки "отправить" в зависимости от выбранных полей

const emailInput = document.getElementById('emailInput')
emailInput.addEventListener('input', checkAllForms);
emailInput.addEventListener('blur', checkAllForms);

//dateInput инициализирована выше
dateInput.addEventListener('input', checkAllForms)
dateInput.addEventListener('blur', checkAllForms)

function checkAllForms() {

    const serviceSummary = document
        .getElementById('customDropdown')
        .querySelector('summary')
    const serviceText = serviceSummary.textContent.trim()

    const typeDetails = document.getElementById('secondDropdown');

    // Если в первом селекторе не выбрано значение, то второй неактивен
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

    const emailValue = emailInput.value.trim()
    const dateValue =dateInput.value.trim()

    const isServiceChosen = (serviceText !== 'Не выбрано');
    const isTypeChosen = (typeText !== 'Не выбрано');
    const isFileChosen = (fileStatus !== 'Реестр не выбран');
    const isEmailFilled = (emailValue !== '');
    const isDateFilled = (dateValue !== '')

    const sendButton = document.getElementById('openModalBtn');

    if (isEmailFilled && isFileChosen && isServiceChosen && isTypeChosen && isDateFilled) {
        sendButton.classList.add('send-button-active')
        sendButton.classList.remove('send-button')
    } else {
        sendButton.classList.add('send-button')
        sendButton.classList.remove('send-button-active')
    }
}
window.addEventListener('load', checkAllForms);
