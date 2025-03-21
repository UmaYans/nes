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

//изменение цвета кнопки "отправить" в зависимости от выбранных полей

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

    const emailInput = document.getElementById('emailInput')
    emailInput.addEventListener('input', checkAllForms);
    emailInput.addEventListener('blur', checkAllForms);
    const emailValue = emailInput.value.trim()

    const isServiceChosen = (serviceText !== 'Не выбрано');
    const isTypeChosen = (typeText !== 'Не выбрано');
    const isFileChosen = (fileStatus !== 'Реестр не выбран');
    const isEmailFilled = (emailValue !== '');

    const sendButton = document.getElementById('openModalBtn');

    if (isEmailFilled && isFileChosen && isServiceChosen && isTypeChosen) {
        sendButton.classList.add('send-button-active')
        sendButton.classList.remove('send-button')
    } else {
        sendButton.classList.add('send-button')
        sendButton.classList.remove('send-button-active')
    }
}

window.addEventListener('load', checkAllForms);
