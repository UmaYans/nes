Изменения:
Файлы aside.html, footer.html, header.html подключаются скриптами. 

<div class="total-page"> - обертка, состоящая из aside в левой части и header-content-footer в правой. 
    <aside id="aside"></aside>
    <div class="header-content-footer"> 
    ...контент...
    </div>
</div>

agreement.html, servicesOffer.html, servicesPreview.html имеют одинаковую структуру aside + header-content-footer.
в файле agreement.html добавлен блок для мобильной версии, в т.ч. селектор <details id="customDropdown" class="custom-dropdown"> (<span class="status-link">Подписан</span>, <a href="#" class="status-link">Подписать</a> добавлены,
first child  <ul class="dropdown-list"> теперь div, а не li)

в блоке web-версии договора 
 <div class="services-container">
                <!--Селектор договора и текст договора-->
                <div class="services-left"> 
изменены классы: 
 <div class="services-container-agreement">
        <!--Селектор договора web версия и текст договора-->
        <div class="services-left-agreement">

переделана кнопка с id='contractSelectBtn':  <button class="agreement-open-button" id="contractSelectBtn"><span class="mobile-hide-text">Открыть</span><img src="img/dropdown-mobile-arrow.svg" alt="v" class="mobile-show-arrow"></button>

<!-- Правая колонка (интерактив) -->
        <div class="services-right-agreement"> - изменен класс (Был services-right)

serviceOffer.html: 
<ul class="dropdown-list">:  <span class="status-link">Подписан</span> и   <a href="#" class="status-link">Подписать</a> (вместо просто надписей Подписан/подписать)
аналогично для <button class="button-add-file" id="fileToggleBtn"> и  <button class="button-add-file" id="fileToggleBtnInfo"> (вместо Добавить реестр/Удалить реестр) 

Измененчия css и js файлов, добавление стилей/функций.
