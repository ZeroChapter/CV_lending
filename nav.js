document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');
    const navItems = document.querySelectorAll('.nav__item a');
    const sections = document.querySelectorAll('article[id]');
    const header = document.querySelector('.nav');
    const headerHeight = header.offsetHeight;

    // Функция для переключения мобильного меню
    function toggleMobileMenu() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    // Закрытие мобильного меню
    function closeMobileMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Обработчик для бургер-кнопки
    navToggle.addEventListener('click', toggleMobileMenu);

    // Закрытие меню по клику на overlay
    navOverlay.addEventListener('click', closeMobileMenu);

    // Закрытие меню при клике на пункт (только на мобильных)
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (window.innerWidth <= 730) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    closeMobileMenu();
                    
                    // Небольшая задержка для анимации закрытия меню
                    setTimeout(() => {
                        const targetPosition = targetSection.offsetTop - headerHeight;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        setActiveNavItem(targetId);
                    }, 300);
                }
            } else {
                // Стандартное поведение для десктопа
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    setActiveNavItem(targetId);
                }
            }
        });
    });

    // Установка активного пункта меню
    function setActiveNavItem(id) {
        navItems.forEach(item => {
            item.parentElement.classList.remove('active');
            if (item.getAttribute('href') === `#${id}`) {
                item.parentElement.classList.add('active');
            }
        });
    }

    // Обновление активного пункта при скролле
    function updateActiveNavItem() {
        let currentSection = '';
        const scrollPosition = window.scrollY + headerHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        if (currentSection) {
            setActiveNavItem(currentSection);
        }
    }

    // Обработчик скролла
   // window.addEventListener('scroll', updateActiveNavItem);
    
    // Инициализация при загрузке
    updateActiveNavItem();

    // Обработчик хэша в URL
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            setTimeout(() => {
                const targetPosition = targetSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                setActiveNavItem(targetId);
            }, 100);
        }
    }

    // Закрытие меню при изменении размера окна
    window.addEventListener('resize', function() {
        if (window.innerWidth > 730) {
            closeMobileMenu();
        }
    });
});