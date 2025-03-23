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
    if (button) {
        if (button.classList.contains('service-button-active')) {
            return;
        }
        e.stopPropagation();
        tooltipText.innerHTML = button.getAttribute('data-tooltip') || 'Подпишите договор';
        tooltip.style.display = 'block';
        positionTooltip(button);
    } else {
        if (!tooltip.contains(e.target)) {
            tooltip.style.display = 'none';
        }
    }
});

tooltipClose.addEventListener('click', (e) => {
    e.stopPropagation();
    tooltip.style.display = 'none';
});

window.addEventListener('scroll', () => {
    if (tooltip.style.display === 'block') {
        const activeButton = document.querySelector('.tooltip-button[data-active="true"]');
        if (activeButton) {
            positionTooltip(activeButton);
        }
    }
});
window.addEventListener('resize', () => {
    if (tooltip.style.display === 'block') {
        const activeButton = document.querySelector('.tooltip-button[data-active="true"]');
        if (activeButton) {
            positionTooltip(activeButton);
        }
    }
});

// модальное окно при нажатии на "подробнее"
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const modalClose = document.querySelector(".modal-close");
    const modalContent = document.querySelector(".modal-content");

    // Хранилище текстов для модального окна
    const modalTexts = {
        robotDescription: {
            title: "Оповещение потребителя о задолженности звонком с помощью голосового робота",
            content: `
        <ol class="modal-list">
          <li>Ознакомьтесь с договором</li>
          <li>Заполните заявку</li>
          <li>Прикрепите реестр должников</li>
          <li>Специалисты проверят текст</li>
          <li>Отслеживайте статус заявки в личном кабинете</li>
          <li>Отчет о проделанной работе загрузим в личный кабинет и направим по почте</li>
          <li>Первичные документы направим по ЭДО по итогам расчетного периода</li>
        </ol>
      `
        },
        smsDescription: {
            title: "Оповещение потребителя о задолженности по СМС",
            content: `
        <ol class="modal-list">
          <li>Ознакомьтесь с договором</li>
          <li>Заполните заявку</li>
          <li>Прикрепите реестр</li>
          <li>Специалисты проверят текст</li>
          <li>Отслеживайте статус заявки в личном кабинете</li>
          <li>Отчет о проделанной работе загрузим в личный кабинет и направим по почте</li>
          <li>Первичные документы направим по ЭДО по итогам расчетного периода</li>
        </ol>
      `
        },
        orderDescription: {
            title: "Направление заявления в суд на получение судебного приказа",
            content: `
        <ol class="modal-list">
          <li>Ознакомьтесь с договором</li>
          <li>Заполните заявку</li>
          <li>Прикрепите реестр должников</li>
          <li>Подпишите договор по ЭДО, а также направьте вместе с ним реестр должников</li>
          <li>С вами свяжется специалист для запроса дополнительной информации</li>
          <li>Далее работа происходит индивидуально</li>
          <li>Передаем вам судебные приказы с реестром полученных приказов по должникам</li>
          <li>Отчет о проделанной работе загрузим в личный кабинет и направим по почте</li>
          <li>Первичные документы направим по ЭДО по итогам расчетного периода</li>
        </ol>
      `
        }
    };

    // Обработчик кликов по "Подробнее"
    document.querySelectorAll(".service-description").forEach(item => {
        item.addEventListener("click", () => {
            const id = item.id; // Берем ID элемента, по которому кликнули
            if (modalTexts[id]) {
                modalContent.querySelector("h3").innerHTML = modalTexts[id].title;
                modalContent.querySelector("ol").innerHTML = modalTexts[id].content;
                modal.style.display = "block";
            }
        });
    });

    // Закрытие модального окна
    modalClose.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Закрытие при клике вне окна
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
