## Структура проекта

### Основные изменения в верстке

Файлы `aside.html`, `footer.html`, `header.html` подключаются скриптами.  
Общая структура страниц:
```html
<div class="total-page">
    <aside id="aside"></aside>
    <div class="header-content-footer">
        ...контент...
    </div>
</div>
```

Страницы `agreement.html`, `servicesOffer.html` и `servicesPreview.html` имеют одинаковую структуру с aside-меню слева и основным контентом (header + content + footer) справа.

---

### Изменения в `agreement.html`

Добавлен блок для мобильной версии с селектором:
```html
<details id="customDropdown" class="custom-dropdown">
    <span class="status-link">Подписан</span>
    <a href="#" class="status-link">Подписать</a>
</details>
<!-- Первый элемент списка теперь <div> вместо <li> -->
```

В web-версии договора изменены классы:

Было:
```html
<div class="services-container">
    <div class="services-left">
```

Стало:
```html
<div class="services-container-agreement">
    <div class="services-left-agreement">
```

Кнопка выбора договора переработана:
```html
<button class="agreement-open-button" id="contractSelectBtn">
    <span class="mobile-hide-text">Открыть</span>
    <img src="img/dropdown-mobile-arrow.svg" alt="v" class="mobile-show-arrow">
</button>
```

Правая колонка (интерактивная часть) теперь использует класс:
```html
<div class="services-right-agreement"> <!-- раньше был services-right -->
```

---

### Изменения в `serviceOffer.html`

Обновлены элементы интерфейса:

В выпадающем списке:
```html
<span class="status-link">Подписан</span>
<a href="#" class="status-link">Подписать</a>
<!-- Вместо просто текста -->
```

Кнопки для загрузки/удаления реестра:
```html
<button class="button-add-file" id="fileToggleBtn">
<button class="button-add-file" id="fileToggleBtnInfo">
<!-- Вместо текста "Добавить реестр"/"Удалить реестр" -->
```

---

### Дополнительные изменения

Обновлены CSS и JavaScript файлы — добавлены новые стили и функции для поддержки изменений в верстке.