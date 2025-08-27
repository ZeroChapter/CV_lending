document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav__item a');
    const sections = document.querySelectorAll('article[id]');
    const header = document.querySelector('.nav');
    const headerHeight = header.offsetHeight;

   
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
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

   
    window.addEventListener('scroll', updateActiveNavItem);
    
    
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
});