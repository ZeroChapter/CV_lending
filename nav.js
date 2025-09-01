document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');
    const navItems = document.querySelectorAll('.nav__item a');
    const sections = document.querySelectorAll('article[id]');
    const header = document.querySelector('.nav');
    const headerHeight = header.offsetHeight;


    function toggleMobileMenu() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

   
    function closeMobileMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

 
    navToggle.addEventListener('click', toggleMobileMenu);

   
    navOverlay.addEventListener('click', closeMobileMenu);

    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (window.innerWidth <= 730) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    closeMobileMenu();
                    
                    
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

  
    function setActiveNavItem(id) {
        navItems.forEach(item => {
            item.parentElement.classList.remove('active');
            if (item.getAttribute('href') === `#${id}`) {
                item.parentElement.classList.add('active');
            }
        });
    }

   
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

 
    updateActiveNavItem();

 
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

   
    window.addEventListener('resize', function() {
        if (window.innerWidth > 730) {
            closeMobileMenu();
        }
    });
});