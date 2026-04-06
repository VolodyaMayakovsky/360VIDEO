(function() {
    // DOM элементы
    const ddnLink = document.getElementById('ddnLink');
    const videoTrigger = document.getElementById('videoTrigger');
    const videoDropdown = document.getElementById('videoDropdown');
    const instructionsLink = document.getElementById('instructionsLink');
    const contactsLink = document.getElementById('contactsLink');
    const logoHome = document.getElementById('logoHome');
    const infoPanel = document.getElementById('infoPanel');
    const dynamicTitle = document.querySelector('#dynamicContent h1');
    const dynamicDesc = document.querySelector('#dynamicContent p');

    // Функция обновления контента
    function updateMainContent(type, extraData = null) {
        if (infoPanel) {
            if (type === 'home') {
                infoPanel.innerHTML = `🏠 <strong>Главная страница:</strong> Вы нажали "DDn" или логотип. Выпадающее меню отсутствует, возврат на главную.`;
                if (dynamicTitle) dynamicTitle.innerText = 'Главная страница';
                if (dynamicDesc) dynamicDesc.innerText = 'Вы вернулись на главную через навигацию DDn / логотип.';
            } 
            else if (type === 'video_selection') {
                const videoName = extraData || 'видео';
                infoPanel.innerHTML = `🎞️ <strong>Вы выбрали видео:</strong> "${videoName}".<br>✨ (Демонстрация работы выпадающего меню)`;
                if (dynamicTitle) dynamicTitle.innerText = `Просмотр: ${videoName}`;
                if (dynamicDesc) dynamicDesc.innerText = `Вы открыли видео через выпадающее меню "Видео". Здесь может быть плеер или ссылка.`;
            }
            else if (type === 'instructions') {
                infoPanel.innerHTML = `📘 <strong>Инструкция:</strong> Как пользоваться меню:<br>
                • DDn / логотип → возврат на главную.<br>
                • Видео → нажмите, чтобы открыть список из 3 видео.<br>
                • Инструкция / Контакты → информационные разделы.<br>
                • Выпадающее меню закрывается при клике вне его области.`;
                if (dynamicTitle) dynamicTitle.innerText = 'Инструкция по навигации';
                if (dynamicDesc) dynamicDesc.innerText = 'Подробное описание работы хедера и выпадающего меню.';
            }
            else if (type === 'contacts') {
                infoPanel.innerHTML = `✉️ <strong>Контакты:</strong> Email: support@navdemo.com<br> Telegram: @nav_header_demo<br> GitHub: Пример меню с выпадающим списком.`;
                if (dynamicTitle) dynamicTitle.innerText = 'Контакты';
                if (dynamicDesc) dynamicDesc.innerText = 'Свяжитесь с нами для любых вопросов по навигации.';
            }
        }
    }

    // Закрытие выпадающего меню
    function closeVideoDropdown() {
        if (videoDropdown && videoTrigger) {
            videoDropdown.classList.remove('show');
            videoTrigger.classList.remove('open');
        }
    }

    // Обработчик клика вне дропдауна
    let outsideClickListener = null;
    
    function setupOutsideClickListener() {
        if (outsideClickListener) {
            document.removeEventListener('click', outsideClickListener);
        }
        outsideClickListener = function(e) {
            if (videoTrigger && videoDropdown) {
                if (!videoTrigger.contains(e.target) && !videoDropdown.contains(e.target)) {
                    closeVideoDropdown();
                    document.removeEventListener('click', outsideClickListener);
                    outsideClickListener = null;
                }
            }
        };
        document.addEventListener('click', outsideClickListener);
    }

    // Открытие/закрытие выпадающего меню
    function toggleVideoDropdown(e) {
        e.stopPropagation();
        if (!videoDropdown || !videoTrigger) return;
        
        const isOpen = videoDropdown.classList.contains('show');
        
        if (!isOpen) {
            closeVideoDropdown();
            videoDropdown.classList.add('show');
            videoTrigger.classList.add('open');
            setupOutsideClickListener();
        } else {
            closeVideoDropdown();
            if (outsideClickListener) {
                document.removeEventListener('click', outsideClickListener);
                outsideClickListener = null;
            }
        }
    }

    // Обработчик выбора видео из выпадающего меню
    function onVideoItemClick(e) {
        e.preventDefault();
        const videoTitle = e.currentTarget.innerText.trim();
        updateMainContent('video_selection', videoTitle);
        closeVideoDropdown();
        if (outsideClickListener) {
            document.removeEventListener('click', outsideClickListener);
            outsideClickListener = null;
        }
    }

    // Назначение обработчиков на пункты видео
    const videoItems = videoDropdown ? videoDropdown.querySelectorAll('li a') : [];
    videoItems.forEach(item => {
        item.addEventListener('click', onVideoItemClick);
    });

    // Возврат на главную (DDn и логотип)
    function goToHome(e) {
        if (e) e.preventDefault();
        closeVideoDropdown();
        if (outsideClickListener) {
            document.removeEventListener('click', outsideClickListener);
            outsideClickListener = null;
        }
        updateMainContent('home');
        if (videoTrigger) videoTrigger.classList.remove('open');
    }

    // Инструкция
    function goToInstructions(e) {
        if (e) e.preventDefault();
        closeVideoDropdown();
        if (outsideClickListener) {
            document.removeEventListener('click', outsideClickListener);
            outsideClickListener = null;
        }
        updateMainContent('instructions');
        if (videoTrigger) videoTrigger.classList.remove('open');
    }

    // Контакты
    function goToContacts(e) {
        if (e) e.preventDefault();
        closeVideoDropdown();
        if (outsideClickListener) {
            document.removeEventListener('click', outsideClickListener);
            outsideClickListener = null;
        }
        updateMainContent('contacts');
        if (videoTrigger) videoTrigger.classList.remove('open');
    }

    // Подключение обработчиков
    if (ddnLink) ddnLink.addEventListener('click', goToHome);
    if (logoHome) logoHome.addEventListener('click', goToHome);
    if (instructionsLink) instructionsLink.addEventListener('click', goToInstructions);
    if (contactsLink) contactsLink.addEventListener('click', goToContacts);
    if (videoTrigger) videoTrigger.addEventListener('click', toggleVideoDropdown);

    // Предотвращение закрытия дропдауна при клике внутри него
    if (videoDropdown) {
        videoDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Инициализация - главная страница
    updateMainContent('home');
})();