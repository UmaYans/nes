//Выбор договора в селекторе
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
        if (!dropdown.contains(e.target)) {
            dropdown.removeAttribute('open');
        }
    });
});

//замена в правом меню чекбокса без галочки на чекбокс с галочкой
//+ замена надписей "изучите договор" на "не подписан"

document.addEventListener("DOMContentLoaded", function () {

    const extraServiceContainer = document.getElementById('extraServiceContainer')
    const checkbox = document.getElementById('checkbox')
    const signButton = document.getElementById('signButton')
    const notificationCheckbox = document.getElementById('notificationsCheckbox')
    const notificationSignButton = document.getElementById('notificationSignButton')
    const judicialCheckbox = document.getElementById('judicialCheckbox')
    const judicialSignButton = document.getElementById('judicialSignButton')
    const readContract = document.getElementById('readContract')
    const notSignedContract = document.getElementById('notSignedContract')
    const signedContract = document.getElementById('signedContract')
    const signedEdoContract = document.getElementById('signedEdoContract')
    const commonContract = document.getElementById('pdfViewer')
    const informationContract = document.getElementById('pdfViewerInformation')
    const judicialContract = document.getElementById('pdfViewerJudicial')

    // Функция для проверки состояния чекбоксов (если хотя бы один выбран, отображать "Изучите договор"
    function updateContractImage() {
        if (notificationCheckbox.src.endsWith('unchecked.svg') && judicialCheckbox.src.endsWith('unchecked.svg')) {
            // Если оба чекбокса НЕ выбраны, показываем "Подписан в ЛК"
            readContract.classList.add('document-img-hidden');
            readContract.classList.remove('document-img');
            signedContract.classList.remove('document-img-hidden');
            signedContract.classList.add('document-img');
            notSignedContract.classList.add('document-img-hidden');
            notSignedContract.classList.remove('document-img');
        } else {
            // Если хотя бы один чекбокс выбран, показываем "Изучите договор"
            readContract.classList.remove('document-img-hidden');
            readContract.classList.add('document-img');
            signedContract.classList.add('document-img-hidden');
            signedContract.classList.remove('document-img');
            notSignedContract.classList.remove('document-img');
            notSignedContract.classList.add('document-img-hidden');
        }
    }

    checkbox.addEventListener("click", function () {
        if (checkbox.src.endsWith('unchecked.svg')) {
            checkbox.src = 'img/checked.svg'
            checkbox.alt = '[v]'
            signButton.classList.remove('sign-button')
            signButton.classList.add('sign-button-active')
            readContract.classList.remove('document-img')
            readContract.classList.add('document-img-hidden')
            notSignedContract.classList.remove('document-img-hidden')
            notSignedContract.classList.add('document-img')
        } else {
            checkbox.src = 'img/unchecked.svg'
            checkbox.alt = '[]'
            signButton.classList.remove('sign-button-active')
            signButton.classList.add('sign-button')
            readContract.classList.remove('document-img-hidden')
            readContract.classList.add('document-img')
            notSignedContract.classList.remove('document-img')
            notSignedContract.classList.add('document-img-hidden')
        }
    })

    // секция уведомлений
    // смена надписи "подписан в лк" на "подписан по эдо"
    notificationCheckbox.addEventListener('click', function () {
        if (notificationCheckbox.src.endsWith('unchecked.svg')) {
            notificationCheckbox.src = 'img/checked.svg'
            notificationCheckbox.alt = '[v]'
            notificationSignButton.classList.remove('sign-button')
            notificationSignButton.classList.add('sign-button-active')
            commonContract.classList.remove('pdf-viewer')
            commonContract.classList.add('pdf-viewer-hidden')
            informationContract.classList.remove('pdf-viewer-hidden')
            informationContract.classList.add('pdf-viewer')
            judicialContract.classList.remove('pdf-viewer')
            judicialContract.classList.add('pdf-viewer-hidden')
        } else {
            notificationCheckbox.src = 'img/unchecked.svg'
            notificationCheckbox.alt = '[]'
            notificationSignButton.classList.remove('sign-button-active')
            notificationSignButton.classList.add('sign-button')
            informationContract.classList.remove('pdf-viewer')
            informationContract.classList.add('pdf-viewer-hidden')
            commonContract.classList.remove('pdf-viewer-hidden')
            commonContract.classList.add('pdf-viewer')
        }
        updateContractImage()
    })

    // секция судебных работ для экспертов
    judicialCheckbox.addEventListener('click', function () {
        if (judicialCheckbox.src.endsWith('unchecked.svg')) {
            judicialCheckbox.src = 'img/checked.svg'
            judicialCheckbox.alt = '[v]'
            judicialSignButton.classList.remove('sign-button')
            judicialSignButton.classList.add('sign-button-active')
            commonContract.classList.remove('pdf-viewer')
            commonContract.classList.add('pdf-viewer-hidden')
            informationContract.classList.remove('pdf-viewer')
            informationContract.classList.add('pdf-viewer-hidden')
            judicialContract.classList.remove('pdf-viewer-hidden')
            judicialContract.classList.add('pdf-viewer')
        } else {
            judicialCheckbox.src = 'img/unchecked.svg'
            judicialCheckbox.alt = '[]'
            judicialSignButton.classList.remove('sign-button-active')
            judicialSignButton.classList.add('sign-button')
            judicialContract.classList.remove('pdf-viewer')
            judicialContract.classList.add('pdf-viewer-hidden')
            commonContract.classList.remove('pdf-viewer-hidden')
            commonContract.classList.add('pdf-viewer')
        }
        updateContractImage()
    })
    // сокрытие элементов при клике на кнопку "подписать"
    //смена "печати" "не подписан" на "подписан в лк"

    const signingTitle = document.getElementById('signing-title')
    const signingLine = document.getElementById('signingLine')
    const notificationSigningLine = document.getElementById('notificationSigningLine')
    const judicialSigningLine = document.getElementById('judicialSigningLine')
    const confirmation = document.getElementById('confirmation')
    const notificationConfirmation = document.getElementById('notificationConfirmation')
    const judicialConfirmation = document.getElementById('judicialConfirmation')
    const contractInfo = document.getElementById('contractInfo')
    const notificationContractInfo = document.getElementById('notificationsContractInfo')
    const judicialContractInfo = document.getElementById('judicialContractInfo')
    const notificationUncheckedTitle = document.getElementById('notificationUncheckedTitle')
    const notificationCheckedTitle = document.getElementById('notificationCheckedTitle')
    const judicialUncheckedTitle = document.getElementById('judicialUncheckedTitle')
    const judicialCheckedTitle = document.getElementById('judicialCheckedTitle')

    let isContractSigned = false
    let isNotificationContractSigned = false
    let isJudicialContractSigned = false

    //общая кнопка
    signButton.addEventListener("click", function () {
        if (!isContractSigned) {
            signingTitle.classList.remove('signing-title')
            signingTitle.classList.add('signing-title-hidden')
            signingLine.classList.remove('signing-line')
            signingLine.classList.add('signing-line-hidden')
            confirmation.classList.remove('confirmed')
            confirmation.classList.add('confirmed-display')
            checkbox.classList.add('checkbox-hidden')
            contractInfo.classList.remove('contract-name-and-data')
            contractInfo.classList.add('contract-name-and-data-signed')
            extraServiceContainer.classList.remove('extra-services-container-hidden')
            extraServiceContainer.classList.add('extra-services-container')
            notSignedContract.classList.remove('document-img')
            notSignedContract.classList.add('document-img-hidden')
            signedContract.classList.remove('document-img-hidden')
            signedContract.classList.add('document-img')
            isContractSigned = true
        } else {
            signingTitle.classList.remove('signing-title-hidden')
            signingTitle.classList.add('signing-title')
            signingLine.classList.remove('signing-line-hidden')
            signingLine.classList.add('signing-line')
            confirmation.classList.remove('confirmed-display')
            confirmation.classList.add('confirmed')
            checkbox.classList.remove('checkbox-hidden')
            contractInfo.classList.remove('contract-name-and-data-signed')
            contractInfo.classList.add('contract-name-and-data')
            extraServiceContainer.classList.remove('extra-services-container')
            extraServiceContainer.classList.add('extra-services-container-hidden')
            notSignedContract.classList.remove('document-img-hidden')
            notSignedContract.classList.add('document-img')
            signedContract.classList.remove('document-img')
            signedContract.classList.add('document-img-hidden')
            isContractSigned = false
        }
    })

    //кнопка в блоке информирования
    // При появлении договора информирования, смена надписи "изучите договор" на "подписан в лк" при нажатии кнопки
    notificationSignButton.addEventListener("click", function () {
        if (!isNotificationContractSigned) {
            notificationSigningLine.classList.remove('signing-line')
            notificationSigningLine.classList.add('signing-line-hidden')
            notificationConfirmation.classList.remove('confirmed')
            notificationConfirmation.classList.add('confirmed-display')
            notificationCheckbox.classList.add('checkbox-hidden')
            notificationContractInfo.classList.remove('contract-name-and-data')
            notificationContractInfo.classList.add('contract-name-and-data-signed')
            notificationUncheckedTitle.classList.remove('contract-name-title')
            notificationUncheckedTitle.classList.add('contract-name-title-hidden')
            notificationCheckedTitle.classList.remove('contract-name-title-hidden')
            notificationCheckedTitle.classList.add('contract-name-title')
            readContract.classList.remove('document-img')
            readContract.classList.add('document-img-hidden')
            signedContract.classList.remove('document-img-hidden')
            signedContract.classList.add('document-img')
            isNotificationContractSigned = true
        } else {
            notificationSigningLine.classList.remove('signing-line-hidden')
            notificationSigningLine.classList.add('signing-line')
            notificationConfirmation.classList.remove('confirmed-display')
            notificationConfirmation.classList.add('confirmed')
            notificationCheckbox.classList.remove('checkbox-hidden')
            notificationContractInfo.classList.remove('contract-name-and-data-signed')
            notificationContractInfo.classList.add('contract-name-and-data')
            notificationUncheckedTitle.classList.remove('contract-name-title-hidden')
            notificationUncheckedTitle.classList.add('contract-name-title')
            notificationCheckedTitle.classList.remove('contract-name-title')
            notificationCheckedTitle.classList.add('contract-name-title-hidden')
            readContract.classList.remove('document-img-hidden')
            readContract.classList.add('document-img')
            signedContract.classList.remove('document-img-hidden')
            signedContract.classList.add('document-img')
            isNotificationContractSigned = false
        }
    })

    //кнопка в блоке судебных работ для эксперта
    // При появлении договора судебных работ, смена надписи "изучите договор" на "подписан в лк" при нажатии кнопки
    judicialSignButton.addEventListener("click", function () {
        if (!isJudicialContractSigned) {
            judicialSigningLine.classList.remove('signing-line')
            judicialSigningLine.classList.add('signing-line-hidden')
            judicialConfirmation.classList.remove('confirmed')
            judicialConfirmation.classList.add('confirmed-display')
            judicialCheckbox.classList.add('checkbox-hidden')
            judicialContractInfo.classList.remove('contract-name-and-data')
            judicialContractInfo.classList.add('contract-name-and-data-signed')
            judicialUncheckedTitle.classList.remove('contract-name-title')
            judicialUncheckedTitle.classList.add('contract-name-title-hidden')
            judicialCheckedTitle.classList.remove('contract-name-title-hidden')
            judicialCheckedTitle.classList.add('contract-name-title')
            readContract.classList.remove('document-img')
            readContract.classList.add('document-img-hidden')
            signedContract.classList.remove('document-img-hidden')
            signedContract.classList.add('document-img')
            isJudicialContractSigned = true
        } else {
            judicialSigningLine.classList.remove('signing-line-hidden')
            judicialSigningLine.classList.add('signing-line')
            judicialConfirmation.classList.remove('confirmed-display')
            judicialConfirmation.classList.add('confirmed')
            judicialCheckbox.classList.remove('checkbox-hidden')
            judicialContractInfo.classList.remove('contract-name-and-data-signed')
            judicialContractInfo.classList.add('contract-name-and-data')
            judicialUncheckedTitle.classList.remove('contract-name-title-hidden')
            judicialUncheckedTitle.classList.add('contract-name-title')
            judicialCheckedTitle.classList.remove('contract-name-title')
            judicialCheckedTitle.classList.add('contract-name-title-hidden')
            readContract.classList.remove('document-img-hidden')
            readContract.classList.add('document-img')
            signedContract.classList.remove('document-img-hidden')
            signedContract.classList.add('document-img')
            isJudicialContractSigned = false
        }
    })
})

//pdf файл подключается (договор)
const urlCommon = 'contract/common-contract.pdf';
const urlInformation = 'contract/information-contract.pdf';

// путь к рабочему скрипту PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

function renderPage(page, container) {
    // Множитель масштабирования
    const scale = 1.5;
    const viewport = page.getViewport({ scale: scale });

    // Создаем элемент canvas
    const canvas = document.createElement('canvas');
    canvas.classList.add('canvas')
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    container.appendChild(canvas);

    //параметры рендеринга
    const renderContext = {
        canvasContext: context,
        viewport: viewport
    };

    // Рендер страницы
    page.render(renderContext).promise.then(() => {
    });
}

// Загружаем PDF документ
// сначала общий, потом для судебной работы, потом для информирования
pdfjsLib.getDocument(urlCommon).promise.then(pdfDoc => {
    console.log('PDF документ загружен');
    const container = document.getElementById('pdfViewer');
    for (let pageNum = 1; pageNum <= 7; pageNum++) {
        pdfDoc.getPage(pageNum).then(page => {
            renderPage(page, container);
        });
    }
}).catch(err => {
    console.error('Ошибка загрузки PDF: ' + err);
});


pdfjsLib.getDocument(urlCommon).promise.then(pdfDoc => {
    console.log('PDF документ загружен');
    const container = document.getElementById('pdfViewerJudicial');
    for (let pageNum = 8; pageNum <= pdfDoc.numPages; pageNum++) {
        pdfDoc.getPage(pageNum).then(page => {
            renderPage(page, container);
        });
    }
}).catch(err => {
    console.error('Ошибка загрузки PDF: ' + err);
});

pdfjsLib.getDocument(urlInformation).promise.then(pdfDoc => {
    console.log('PDF документ загружен');
    const container = document.getElementById('pdfViewerInformation');
    for (let pageNum = 8; pageNum <= pdfDoc.numPages; pageNum++) {
        pdfDoc.getPage(pageNum).then(page => {
            renderPage(page, container);
        });
    }
}).catch(err => {
    console.error('Ошибка загрузки PDF: ' + err);
});

// отображение разных типов договора при смене значения в селекторе

document.getElementById('contractSelectBtn').addEventListener('click', updatePdfDisplay);

function updatePdfDisplay() {
    // Получаем выбранный текст из первого селектора
    const contractSelect = document.querySelector('.custom-dropdown summary');
    const selectedText = contractSelect.textContent.trim();

    const commonPdf = document.getElementById('pdfViewer');
    const judicialPdf = document.getElementById('pdfViewerJudicial');
    const infoPdf = document.getElementById('pdfViewerInformation');

    commonPdf.classList.add('pdf-viewer-hidden');
    judicialPdf.classList.add('pdf-viewer-hidden');
    infoPdf.classList.add('pdf-viewer-hidden');

    if (selectedText === 'Договор') {
        commonPdf.classList.remove('pdf-viewer-hidden');
        commonPdf.classList.add('pdf-viewer');
        judicialPdf.classList.remove('pdf-viewer');
        judicialPdf.classList.add('pdf-viewer-hidden');
        infoPdf.classList.remove('pdf-viewer');
        infoPdf.classList.add('pdf-viewer-hidden');
    } else if (selectedText === 'Судебная работа') {
        commonPdf.classList.remove('pdf-viewer');
        commonPdf.classList.add('pdf-viewer-hidden');
        judicialPdf.classList.remove('pdf-viewer-hidden');
        judicialPdf.classList.add('pdf-viewer');
        infoPdf.classList.remove('pdf-viewer');
        infoPdf.classList.add('pdf-viewer-hidden');
    } else if (selectedText === 'Информирование') {
        commonPdf.classList.remove('pdf-viewer');
        commonPdf.classList.add('pdf-viewer-hidden');
        judicialPdf.classList.remove('pdf-viewer');
        judicialPdf.classList.add('pdf-viewer-hidden');
        infoPdf.classList.remove('pdf-viewer-hidden');
        infoPdf.classList.add('pdf-viewer');
    }
}