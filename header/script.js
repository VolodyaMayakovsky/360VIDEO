(function() {
    const ddnLink = document.getElementById('ddnLink');
    const videoTrigger = document.getElementById('videoTrigger');
    const videoDropdown = document.getElementById('videoDropdown');
    const instructionsLink = document.getElementById('instructionsLink');
    const logoHome = document.getElementById('logoHome');
    const videoPlaceholder = document.getElementById('videoPlaceholder');
    const instructionsContent = document.getElementById('instructionsContent');

    const videos = {
        'Видео один': 'Введение в проект. Рассказываем о структуре меню и навигации.',
        'Видео два': 'Как работает навигация. Разбор кликов и выпадающих меню.',
        'Видео три': 'JavaScript для начинающих. Основы работы с DOM.'
    };

    function showVideo(videoName) {
        videoPlaceholder.innerHTML = `<strong>${videoName}</strong><br><br>${videos[videoName]}`;
        videoPlaceholder.style.background = '#1e293b';
    }

    function showInstructions() {
        instructionsContent.innerHTML = `
            <p><strong>Как пользоваться меню:</strong></p>
            <p>• DDn / логотип — возврат на главную</p>
            <p>• Видео — выпадающий список с 3 видео</p>
            <p>• Инструкция — подробное руководство</p>
            <p>• Контакты — внизу страницы</p>
        `;
    }

    function goToHome() {
        videoPlaceholder.innerHTML = 'Выберите видео из выпадающего меню "Видео"';
        videoPlaceholder.style.background = '#0a0f1a';
        instructionsContent.innerHTML = `
            <p>Нажмите <strong>"Инструкция"</strong> для руководства.</p>
            <p>Выберите <strong>"Видео"</strong> для просмотра.</p>
        `;
    }

    function closeDropdown() {
        videoDropdown.classList.remove('show');
        videoTrigger.classList.remove('open');
    }

    videoTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        videoDropdown.classList.toggle('show');
        videoTrigger.classList.toggle('open');
    });

    document.addEventListener('click', function(e) {
        if (!videoTrigger.contains(e.target) && !videoDropdown.contains(e.target)) {
            closeDropdown();
        }
    });

    const videoItems = videoDropdown.querySelectorAll('li a');
    videoItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            showVideo(this.innerText.trim());
            closeDropdown();
        });
    });

    ddnLink.addEventListener('click', goToHome);
    logoHome.addEventListener('click', goToHome);
    instructionsLink.addEventListener('click', function(e) {
        e.preventDefault();
        showInstructions();
        closeDropdown();
    });

    goToHome();
})();