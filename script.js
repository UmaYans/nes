// ПОДКЛЮЧЕНИЕ PDF файлов договоров (на странице agreement.html)

if (typeof pdfjsLib !== 'undefined') {
    const urlCommon = 'img/common-contract.pdf';
    const urlInformation = 'img/information-contract.pdf';

    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

    function renderPage(page, container) {
        const scale = 1.5;
        const viewport = page.getViewport({scale});
        const canvas = document.createElement('canvas');
        canvas.classList.add('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        container.appendChild(canvas);
        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        page.render(renderContext);
    }

    // общий договор
    pdfjsLib.getDocument(urlCommon).promise.then(pdfDoc => {
        const container = document.getElementById('pdfViewer');
        if (!container) return;
        for (let pageNum = 1; pageNum <= 7; pageNum++) {
            pdfDoc.getPage(pageNum).then(page => {
                renderPage(page, container);
            });
        }
    }).catch(err => {
        console.error('Ошибка загрузки PDF (основной договор):', err);
    });

    // Судебный договор
    pdfjsLib.getDocument(urlCommon).promise.then(pdfDoc => {
        const container = document.getElementById('pdfViewerJudicial');
        if (!container) return;
        for (let pageNum = 8; pageNum <= pdfDoc.numPages; pageNum++) {
            pdfDoc.getPage(pageNum).then(page => {
                renderPage(page, container);
            });
        }
    }).catch(err => {
        console.error('Ошибка загрузки PDF (судебная работа):', err);
    });

    // Информирование
    pdfjsLib.getDocument(urlInformation).promise.then(pdfDoc => {
        const container = document.getElementById('pdfViewerInformation');
        if (!container) return;
        for (let pageNum = 8; pageNum <= pdfDoc.numPages; pageNum++) {
            pdfDoc.getPage(pageNum).then(page => {
                renderPage(page, container);
            });
        }
    }).catch(err => {
        console.error('Ошибка загрузки PDF (информирование):', err);
    });
}


//для servicesPreview

//управление тултипом (подсказкой)
const tooltip = document.getElementById('global-tooltip');
const tooltipText = document.getElementById('tooltip-text');
const tooltipClose = document.getElementById('tooltip-close');

function positionTooltip(target) {
    const rect = target.getBoundingClientRect();
    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;

    const top = rect.top + window.scrollY - tooltipHeight - 10;
    const left = rect.left + window.scrollX + (rect.width / 2) - (tooltipWidth / 2);

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
}

// Если кнопка имеет класс "service-button-active" тултип не вылезает
document.addEventListener('click', (e) => {
    const button = e.target.closest('.tooltip-button');
    if (button && tooltip && tooltipText) {
        if (button.classList.contains('service-button-active')) return;
        e.stopPropagation();
        tooltipText.innerHTML = button.getAttribute('data-tooltip') || 'Подпишите договор';
        tooltip.style.display = 'block';
        positionTooltip(button);
    } else {
        if (tooltip && !tooltip.contains(e.target)) {
            tooltip.style.display = 'none';
        }
    }
});

if (tooltipClose) {
    tooltipClose.addEventListener('click', (e) => {
        e.stopPropagation();
        tooltip.style.display = 'none';
    });
}

window.addEventListener('scroll', () => {
    if (tooltip && tooltip.style.display === 'block') {
        const activeButton = document.querySelector('.tooltip-button[data-active="true"]');
        if (activeButton) positionTooltip(activeButton);
    }
});
window.addEventListener('resize', () => {
    if (tooltip && tooltip.style.display === 'block') {
        const activeButton = document.querySelector('.tooltip-button[data-active="true"]');
        if (activeButton) positionTooltip(activeButton);
    }
});

// модальное окно при нажатии на "Подробнее"
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const modalClose = document.querySelector(".modal-close");
    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body");

    if (!modal || !modalClose || !modalTitle || !modalBody) return;

    const templateMap = {
        robotDescription: "tmpl-robotDescription",
        smsDescription: "tmpl-smsDescription",
        orderDescription: "tmpl-orderDescription"
    };

    document.querySelectorAll(".service-description").forEach(item => {
        item.addEventListener("click", () => {
            const tplId = templateMap[item.id];
            if (!tplId) return;

            const tpl = document.getElementById(tplId);
            if (!tpl || !tpl.content) return;

            const clone = tpl.content.cloneNode(true);
            const newTitleElem = clone.querySelector("h3");
            const newListElem = clone.querySelector("ol");

            if (newTitleElem) {
                modalTitle.innerHTML = newTitleElem.innerHTML;
            }
            if (newListElem) {
                modalBody.innerHTML = "";
                modalBody.appendChild(newListElem.cloneNode(true));
            }

            modal.style.display = "block";
        });
    });

    modalClose.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});

document.querySelectorAll('.services-dropdown-item').forEach(item => {
    if (item.querySelector('.item-status-approved')) {
        item.classList.add('selected');
    } else {
        item.classList.remove('selected');
    }
});

//выбор значения в селекторе
document.querySelectorAll('.custom-dropdown').forEach((dropdown) => {
    const summary = dropdown.querySelector('summary');
    if (!summary) return;
    const arrow = summary.querySelector('.dropdown-arrow');
    const arrowHTML = arrow ? arrow.outerHTML : '';
    const items = dropdown.querySelectorAll('.services-dropdown-item');
    items.forEach((item) => {
        item.addEventListener('click', (e) => {

            if (e.target.closest('.item-status')) return;

            e.stopPropagation();
            let selectedText = '';
            const approvedName = item.querySelector('.item-name-approved');
            const normalName = item.querySelector('.item-name');
            const typeName = item.querySelector('.type-item-name');

            const button = e.target.closest('.tooltip-button');
            if (button && tooltip && tooltipText) {
                e.stopPropagation();
                tooltipText.innerHTML = button.getAttribute('data-tooltip') || 'Подпишите договор';
                tooltip.style.display = 'block';
                positionTooltip(button);
            } else {
                if (tooltip && !tooltip.contains(e.target)) {
                    tooltip.style.display = 'none';
                }
            }

            if (approvedName) {
                selectedText = approvedName.textContent.trim();
            } else if (normalName) {
                selectedText = normalName.textContent.trim();
            } else if (typeName) {
                selectedText = typeName.textContent.trim();
            } else {
                selectedText = item.textContent.trim();
            }
            if(approvedName) {
                summary.innerHTML = selectedText + arrowHTML;
                dropdown.removeAttribute('open');
    
                // Сбрасываем значение второго селектора при изменении первого
                if (dropdown.id === 'customDropdown') {
                    const secondDropdown = document.getElementById('secondDropdown');
                    if (!secondDropdown) return;
                    const secondSummary = secondDropdown.querySelector('summary');
                    const secondArrow = secondSummary?.querySelector('.dropdown-arrow');
                    const secondArrowHTML = secondArrow ? secondArrow.outerHTML : '';
                    if (secondSummary) {
                        secondSummary.innerHTML = 'Не выбрано' + secondArrowHTML;
                    }
                }
    
                updateServiceDescription?.();
                checkAllForms?.();
            }
        });
    });
});
document.addEventListener('click', (e) => {
    document.querySelectorAll('.custom-dropdown').forEach((dropdown) => {
        if (!dropdown.contains(e.target) && !e.target.closest('.tooltip-global')) {
            dropdown.removeAttribute('open');
        }
    });
});

// кастомный календарь
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
const dateArrow = document.getElementById('myDateArrow');
if (dateInput && dateArrow) {
    dateInput.addEventListener('input', () => {
        if (!dateInput.value.trim()) {
            fp.clear();
        }
    });

    const fp = flatpickr('#myDatepicker', {
        dateFormat: 'd.m.Y',
        locale: 'ru',
        position: 'above',
        minDate: (() => {
            let d = new Date();
            d.setDate(d.getDate() + 1);
            return d;
        })(),
        disable: [(date) => date.getDay() === 0 || date.getDay() === 6],
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
        onOpen: () => dateArrow.classList.add('open'),
        onClose: () => dateArrow.classList.remove('open'),
        onDayCreate: (_, __, fp, dayElem) => {
            const dateObj = dayElem.dateObj;
            if (!dateObj) return;
            if (fp.blueRange?.some(d => isSameDay(d, dateObj))) {
                dayElem.classList.add('blue-bg');
            } else if (fp.blueBorderRange?.some(d => isSameDay(d, dateObj))) {
                dayElem.classList.add('blue-border');
            }
        }
    });
}

//открытие модалки при отправлении ВСЕХ данных
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalOverlay = document.getElementById('modalOverlay');

if (openModalBtn && modalOverlay) {
    openModalBtn.addEventListener('click', () => {
        modalOverlay.classList.add('show');
    });
}
if (closeModalBtn && modalOverlay) {
    closeModalBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('show');
    });

    // закрытие при клике мимо модалки
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('show');
        }
    });
}

//кнопка загрузки и удаления реестров
const fileToggleBtn = document.getElementById('fileToggleBtn');
const fileStatusSpan = document.getElementById('fileStatus');
const fileToggleBtnInfo = document.getElementById('fileToggleBtnInfo');
const fileStatusSpanInfo = document.getElementById('fileStatusInfo');

//флаг выбран ли реестр
let fileSelected = false;
let fileSelectedInfo = false;

if (fileToggleBtn && fileStatusSpan) {
    fileToggleBtn.addEventListener('click', () => {
        const span = fileToggleBtn.querySelector('span');
        const img = fileToggleBtn.querySelector('img');
        if (!fileSelected) {
            span.textContent = 'Удалить реестр';
            img.src = 'img/delete-file.svg'
            fileToggleBtn.classList.remove('button-add-file');
            fileToggleBtn.classList.add('button-delete-file');
            fileStatusSpan.textContent = 'Реестр_должников_ЖКХ_Ромашка.xls';
            fileSelected = true;
        } else {
            span.textContent = 'Добавить реестр';
            img.src = 'img/add-file.svg'
            fileToggleBtn.classList.remove('button-delete-file');
            fileToggleBtn.classList.add('button-add-file');
            fileStatusSpan.textContent = 'Реестр не выбран';
            fileSelected = false;
        }
        checkAllForms?.();
    });
}

if (fileToggleBtnInfo && fileStatusSpanInfo) {
    fileToggleBtnInfo.addEventListener('click', () => {
        const span = fileToggleBtnInfo.querySelector('span');
        const img = fileToggleBtnInfo.querySelector('img');
        if (!fileSelectedInfo) {
            span.textContent = 'Удалить реестр';
            img.src = 'img/delete-file.svg'
            fileToggleBtnInfo.classList.remove('button-add-file');
            fileToggleBtnInfo.classList.add('button-delete-file');
            fileStatusSpanInfo.textContent = 'Реестр_контактов_ЖКХ_Ромашка.xls';
            fileSelectedInfo = true;
        } else {
            span.textContent = 'Добавить реестр';
            img.src = 'img/add-file.svg'
            fileToggleBtnInfo.classList.remove('button-delete-file');
            fileToggleBtnInfo.classList.add('button-add-file');
            fileStatusSpanInfo.textContent = 'Реестр не выбран';
            fileSelectedInfo = false;
        }
        checkAllForms?.();
    });
}

//функция изменения цвета кнопки "отправить" в зависимости от выбранных полей
function checkAllForms() {
    const serviceDropdown = document.getElementById('customDropdown');
    const typeDropdown = document.getElementById('secondDropdown');
    if (!serviceDropdown || !typeDropdown) return;

    const serviceSummary = serviceDropdown.querySelector('summary');
    const typeSummary = typeDropdown.querySelector('summary');
    if (!serviceSummary || !typeSummary) return;

    const serviceText = serviceSummary.textContent.trim();
    const typeText = typeSummary.textContent.trim();

    const fileStatus = document.getElementById('fileStatus')?.textContent.trim() || '';
    const fileStatusInfo = document.getElementById('fileStatusInfo')?.textContent.trim() || '';

    const emailInput = document.getElementById('emailInput');
    const emailInputInfo = document.getElementById('emailInputInfo');

    const dateInput = document.getElementById('myDatepicker');
    const dateValue = dateInput?.value.trim() || '';

    const isServiceInfo = serviceText === 'Информирование';
    const isServiceJudicial = serviceText === 'Судебная работа';

    const isTypeChosen = typeText !== 'Не выбрано';
    const isFileChosen = fileStatus !== 'Реестр не выбран';
    const isFileChosenInfo = fileStatusInfo !== 'Реестр не выбран';
    const isEmailFilled = emailInput && emailInput.value.trim() !== '';
    const isEmailInfoFilled = emailInputInfo && emailInputInfo.value.trim() !== '';
    const isDateFilled = dateValue !== '';

    const sendButton = document.getElementById('openModalBtn');
    const judicialContainer = document.getElementById('judicialContainer');
    const informationContainer = document.getElementById('informationContainer');
    const informationDropdown = document.getElementById('informationDropdown');
    const judicialDropdown = document.getElementById('judicialDropdown');
    const preview = document.getElementById('preview');
    const information = document.getElementById('information');
    const judicialJob = document.getElementById('judicialJob');
    const descriptionInfo = document.getElementById('descriptionInfo');

    const typeSelector = document.getElementById('secondDropdown');
    if (serviceText === 'Не выбрано') {
        typeSelector?.classList.add('disabled');
    } else {
        typeSelector?.classList.remove('disabled');
    }

    if (emailInput) {
        emailInput.addEventListener('input', checkAllForms);
        emailInput.addEventListener('blur', checkAllForms);
    }
    if (emailInputInfo) {
        emailInputInfo.addEventListener('input', checkAllForms);
        emailInputInfo.addEventListener('blur', checkAllForms);
    }

    if (isServiceInfo && informationDropdown && judicialDropdown && preview && information && judicialJob && descriptionInfo) {
        informationDropdown.classList.remove('dropdown-list-hidden');
        informationDropdown.classList.add('dropdown-list');
        judicialDropdown.classList.remove('dropdown-list');
        judicialDropdown.classList.add('dropdown-list-hidden');
        preview.classList.remove('services-right-preview');
        preview.classList.add('services-right-preview-hidden');
        information.classList.remove('services-right-preview-hidden');
        information.classList.add('services-right-preview');
        judicialJob.classList.remove('services-right-preview');
        judicialJob.classList.add('services-right-preview-hidden');
        descriptionInfo.classList.remove('description-hidden');
        descriptionInfo.classList.add('description');
    } else if (isServiceJudicial && informationDropdown && judicialDropdown && preview && information && judicialJob && descriptionInfo) {
        informationDropdown.classList.remove('dropdown-list');
        informationDropdown.classList.add('dropdown-list-hidden');
        judicialDropdown.classList.remove('dropdown-list-hidden');
        judicialDropdown.classList.add('dropdown-list');
        preview.classList.remove('services-right-preview');
        preview.classList.add('services-right-preview-hidden');
        information.classList.remove('services-right-preview');
        information.classList.add('services-right-preview-hidden');
        judicialJob.classList.remove('services-right-preview-hidden');
        judicialJob.classList.add('services-right-preview');
        descriptionInfo.classList.remove('description');
        descriptionInfo.classList.add('description-hidden');
    } else if (descriptionInfo) {
        descriptionInfo.classList.remove('description');
        descriptionInfo.classList.add('description-hidden');
    }

    if (isTypeChosen) {
        if (isServiceJudicial) {
            judicialContainer?.classList.add('interactive-elements-container');
            judicialContainer?.classList.remove('interactive-elements-container-hidden');
            informationContainer?.classList.add('interactive-elements-container-hidden');
            informationContainer?.classList.remove('interactive-elements-container');
        } else {
            judicialContainer?.classList.add('interactive-elements-container-hidden');
            judicialContainer?.classList.remove('interactive-elements-container');
            informationContainer?.classList.add('interactive-elements-container');
            informationContainer?.classList.remove('interactive-elements-container-hidden');
        }
    } else {
        judicialContainer?.classList.remove('interactive-elements-container');
        judicialContainer?.classList.add('interactive-elements-container-hidden');
        informationContainer?.classList.remove('interactive-elements-container');
        informationContainer?.classList.add('interactive-elements-container-hidden');
    }

    if (sendButton) {
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
}

// Логика описания предложенных услуг
function updateServiceDescription() {
    const secondDropdown = document.getElementById('secondDropdown');
    const summary = secondDropdown?.querySelector('summary');
    if (!summary) return;

    // текст выбранного типа услуги
    const typeText = summary.textContent.trim();

    const templateMap = {
        'Роботизированный звонок': 'tmpl-robotDescription',
        'СМС': 'tmpl-smsDescription',
        'Направление заявления': 'tmpl-orderDescription',
        'Направление заявления в суд и получение судебного приказа': 'tmpl-orderDescription'
    };

    const tplId = templateMap[typeText];

    // проставляем всем контейнерам описания
    document.querySelectorAll('.service-description-container').forEach(container => {
        if (tplId) {
            const tpl = document.getElementById(tplId);
            container.innerHTML = tpl ? tpl.innerHTML : '';
        } else {
            container.innerHTML = '';
        }
    });

    if (typeof checkAllForms === 'function') {
        checkAllForms();
    }
}


window.addEventListener('load', () => {
    if (typeof checkAllForms === 'function') checkAllForms();
});

// Логика для страницы agreement.html

//Выбор договора в селекторе
if (document.querySelectorAll('.custom-dropdown').length) {
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
            });
        });
    });

    document.addEventListener('click', (e) => {
        document.querySelectorAll('.custom-dropdown').forEach((dropdown) => {
            if (!dropdown.contains(e.target) && !e.target.closest('.tooltip-global')) {
                dropdown.removeAttribute('open');
            }
        });
    });
}

// не раскрываем тип Услуги в обход point-events: none
document.querySelectorAll('#secondDropdown summary').forEach(summary => {
    summary.addEventListener('click', (e) => {
        const parent = summary.closest('.custom-dropdown');
        if (parent.classList.contains('disabled')) {
            e.preventDefault();
        }
    });
});

//скрытие aside при выборе какой-то кнопки из aside
function attachAsideHandlers() {
    const titles = document.querySelectorAll('.aside-select-title, .aside-select-option');
    const aside = document.getElementById('aside');
    const overlay = document.getElementById('asideOverlay');
    titles.forEach(title => {
        title.addEventListener('click', function () {
            titles.forEach(el => el.classList.remove('active'));
            this.classList.add('active');
            aside.classList.remove('active');
            overlay.classList.remove('active');
        });
    });
}

// скрипты для подключения документов aside.html, header.html и footer.html в документ
Promise.all([
    fetch('header.html').then(r => r.text()).then(data => {
        document.getElementById('header').innerHTML = data;
    }),
    fetch('aside.html').then(r => r.text()).then(data => {
        document.getElementById('aside').innerHTML = data;
    }),
    fetch('footer.html').then(r => r.text()).then(data => {
        document.getElementById('footer').innerHTML = data;
    })
]).then(() => {

    const menuButton = document.getElementById('menuButton');
    const aside = document.getElementById('aside');
    const overlay = document.getElementById('asideOverlay');

    menuButton.addEventListener('click', (e) => {
        aside.classList.add('active');
        overlay.classList.add('active');
        e.stopPropagation();
    });

    overlay.addEventListener('click', () => {
        aside.classList.remove('active');
        overlay.classList.remove('active');
    });

    document.addEventListener('click', (e) => {
        if (!aside.contains(e.target) && !menuButton.contains(e.target)) {
            aside.classList.remove('active');
            overlay.classList.remove('active');
        }
    });

    attachAsideHandlers();
});


document.addEventListener('DOMContentLoaded', () => {
    // 1 константы
    const extraServicesBlock = document.getElementById('extraServiceContainer');
    const checkbox = document.getElementById('checkbox');
    const signButton = document.getElementById('signButton');
    const readContract = document.getElementById('readContract');
    const notSignedContract = document.getElementById('notSignedContract');
    const signedContract = document.getElementById('signedContract');
    const signingTitle = document.getElementById('signing-title');
    const signingLine = document.getElementById('signingLine');
    const confirmation = document.getElementById('confirmation');
    const contractInfo = document.getElementById('contractInfo');

    // 2 PDF и функц их отображения
    const pdfCommon = document.getElementById('pdfViewer');
    const pdfInfo = document.getElementById('pdfViewerInformation');
    const pdfJudicial = document.getElementById('pdfViewerJudicial');

    function showPdf(viewer) {
        [pdfCommon, pdfInfo, pdfJudicial].forEach(view => {
            view.classList.add('pdf-viewer-hidden');
            view.classList.remove('pdf-viewer');
        });
        viewer.classList.remove('pdf-viewer-hidden');
        viewer.classList.add('pdf-viewer');
    }

    // 3 Обработчики "Открыть" для дропдаунов
    ['contractSelectBtn', 'contractSelectBtnMobile'].forEach(id => {
        const btn = document.getElementById(id);
        if (!btn) return;
        btn.addEventListener('click', () => {
            const dropdown = btn.closest('.agreement-section, .agreement-section-mobile')
                .querySelector('.custom-dropdown');
            const sel = dropdown.querySelector('summary').textContent.trim();
            if (sel === 'Информирование') showPdf(pdfInfo);
            else if (sel === 'Судебная работа') showPdf(pdfJudicial);
            else showPdf(pdfCommon);
        });
    });

    // 4 Основной чекбокс "Подписать договор"
    if (checkbox) {
        checkbox.addEventListener('click', () => {
            const isChecked = checkbox.src.endsWith('unchecked.svg');
            checkbox.src = isChecked ? 'img/checked.svg' : 'img/unchecked.svg';
            checkbox.alt = isChecked ? '[v]' : '[]';
            signButton.classList.toggle('sign-button-active', isChecked);
            signButton.classList.toggle('sign-button', !isChecked);
            readContract.classList.toggle('document-img-hidden', isChecked);
            readContract.classList.toggle('document-img', !isChecked);
            notSignedContract.classList.toggle('document-img-hidden', !isChecked);
            notSignedContract.classList.toggle('document-img', isChecked);
        });
    }

    // 5 биндинг событий доп услуг
    function bindExtraServiceEvents() {
        document.querySelectorAll('.extra-service-section').forEach(section => {
            const svcCheckbox = section.querySelector('.service-checkbox');
            const svcSignBtn = section.querySelector('.sign-button');
            const pdfTarget = document.getElementById(section.dataset.pdfTarget) || pdfCommon;

            // удаляем старые слушатели
            const newChk = svcCheckbox.cloneNode(true);
            svcCheckbox.replaceWith(newChk);
            const newBtn = svcSignBtn.cloneNode(true);
            svcSignBtn.replaceWith(newBtn);

            // клик по чекбоксу доп услуги
            newChk.addEventListener('click', () => {
                const now = newChk.src.endsWith('unchecked.svg');
                newChk.src = now ? 'img/checked.svg' : 'img/unchecked.svg';
                newChk.alt = now ? '[v]' : '[]';
                showPdf(now ? pdfTarget : pdfCommon);
                newBtn.classList.toggle('sign-button-active', now);
                newBtn.classList.toggle('sign-button', !now);
            });

            // клик "Подключить" внутри доп услуги
            newBtn.addEventListener('click', (e) => {
                e.preventDefault()
                e.stopPropagation()
                if (!newBtn.classList.contains('sign-button-active')) return;
                newChk.classList.add('checkbox-hidden');
                section.querySelector('.extra-services-signing-line')
                    .classList.add('signing-line-hidden');
                section.querySelector('.confirmed')
                    .classList.add('confirmed-display');
                section.classList.add('active');
                showPdf(pdfCommon);
                signedContract.classList.replace('document-img-hidden', 'document-img');
            });
        });
    }

    // 6 Показываем и биндим при загрузке
    extraServicesBlock.classList.add('extra-services--hidden');
    bindExtraServiceEvents();

    // 7 После нажатия "Подписать" показываем доп услуги и биндим заново
    if (signButton) {
        signButton.addEventListener('click', () => {
            extraServicesBlock.classList.remove('extra-services--hidden');
            readContract.classList.replace('document-img', 'document-img-hidden');
            signedContract.classList.replace('document-img-hidden', 'document-img');
            signingTitle.classList.replace('signing-title', 'signing-title-hidden');
            signingLine.classList.replace('signing-line', 'signing-line-hidden');
            confirmation.classList.replace('confirmed', 'confirmed-display');
            checkbox.classList.add('checkbox-hidden');
            contractInfo.classList.replace('contract-name-and-data', 'contract-name-and-data-signed');

            bindExtraServiceEvents();
        });
    }
});
