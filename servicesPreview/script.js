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

document.addEventListener('click', (e) => {
    const button = e.target.closest('.tooltip-button');
    if (button) {
        e.stopPropagation();
        tooltipText.innerHTML = button.getAttribute('data-tooltip') || 'Подпишите договор'
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
