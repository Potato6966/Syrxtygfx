document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const addColorBtn = document.querySelector('.add-color-btn');
    const splashTitle = document.querySelector('.splash-title');
    const splashContent = document.querySelector('.splash-content');
    const overlay = document.querySelector('.color-splash-overlay');
    const navbar = document.querySelector('.navbar');
    const heroContent = document.querySelector('.hero-content');
    const achievements = document.querySelector('.achievements');
    const pricing = document.querySelector('.pricing');
    const processSection = document.querySelector('.process-section');
    const contact = document.querySelector('.contact');
    const portfolio = document.querySelector('.portfolio');
    const about = document.querySelector('.about');
    
    let buildUpActive = true;

    const backgroundImages = [
        '1401907185612755025_001.png',
        '1401907185612755025_002.png',
        '1401907185612755025_003.png',
        '1401907185612755025_004.png',
        '1401907185612755025_005.png',
        '1401907185612755025_006.png',
        '1401907185612755025_007.png',
        '1401907185612755025_008.png',
        '1401907185612755025_009.png',
        '1401907185612755025_010.png',
        '1401907185612755025_011.png',
        '1401907185612755025_012.png',
        '1401907185612755025_013.png',
        '1401907185612755025_014.png',
        '1401907185612755025_015.png',
        '1401907185612755025_016.png',
        '1401907185612755025_017.png',
        '1401907185612755025_018.png',
        '1401907185612755025_019.png',
        '1401907185612755025_020.png',
        '1401907185612755025_021.png',
        '1401907185612755025_022.png',
        '1401907185612755025_023.png',
        '1401907222027702423_001.png',
        '1401907222027702423_002.png',
        '1401907222027702423_003.png',
        '1401907222027702423_004.png',
        '1401907222027702423_005.png',
        '1401907222027702423_006.png',
        '1401907222027702423_007.png',
        '1401907222027702423_008.png',
        '1401907222027702423_009.png',
        '1401907222027702423_010.png',
        '1401907222027702423_011.png',
        '1401907222027702423_012.png',
        '1401907222027702423_013.png',
        '1401907222027702423_014.png',
        '1401907222027702423_015.png',
        '1401907222027702423_016.png',
        '1401907222027702423_017.png',
        '1401907222027702423_018.png',
        '1401907222027702423_019.png',
        '1401907222027702423_021.png',
        '1401907222027702423_022.png',
        '1401907222027702423_023.png',
        '1401907222027702423_024.png',
        '1401907222027702423_025.png',
        '1401907543638282320_001.png',
        '1401907543638282320_002.png',
        '1401907543638282320_003.png',
        '1401907543638282320_004.png',
        '1401909711879802932_001.png',
        '1401909711879802932_003.png'
    ];

    function setRandomBackground() {
        const randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
        const style = document.createElement('style');
        style.textContent = `
            body::after {
                background-image: url('backround/${randomImage}') !important;
            }
        `;
        document.head.appendChild(style);
    }

    setRandomBackground();

    const portfolioCategories = {
        'thumbnails': { folder: 'Thumbnails/', extensions: ['png', 'jpg', 'jpeg'] },
        'logos': { folder: 'Logos/', extensions: ['png', 'jpg', 'jpeg'] },
        'product-banners': { folder: 'Product banners/', extensions: ['png', 'jpg', 'jpeg'] },
        'product-boxes': { folder: 'Product boxes/', extensions: ['png', 'jpg', 'jpeg'] }
    };

    let portfolioData = {};
    let currentLightboxImages = [];
    let currentImageIndex = 0;

    function getImagesList(category) {
        const commonFilePatterns = [

            '001', '002', '003', '004', '005', '006', '007', '008', '009', '010',
            '011', '012', '013', '014', '015', '016', '017', '018', '019', '020',
            '021', '022', '023', '024', '025', '026', '027', '028', '029', '030',

            'image', 'banner', 'logo', 'thumbnail', 'design', 'product',

            '50skin', '150skin', '300skin', 'precise_bo6_internal', 'PRecise_fn_priv',
            'precise_perm_spf', 'precise_temp_woofer', 'Products_Banner',
            'Velocity_Fortnite_Private', 'Venza_Accounts', 'Venza_Fortnite_Private',
            'Venza_Fortnite_Slotted', 'Venza_Fortnite_Ultimate', 'Venza_Fortnite_Unreal',
            'Venza_Spoofer', 'Venza_Valorant_INt',

            'grow_a_garden_fa_account', 'neat_cod_priavte', 'neat_fn_private',
            'neat_temp_spf', 'primal_cod_unlock_all', 'primal_fn_slotted',
            'roblox_executors', 'roblox_replay', 'rubux_account_fa',
            'zylo_fn_external', 'zylo_fn_ultimate', 'zylo_perm_spoofer',
            'zylo_temp_spoofer', 'ZYRO_fn_og', 'ZYRO_fn_private',
            'ZYRO_fn_pro', 'ZYRO_fn_public', 'ZYRO_fn_ultimate',

            '1401907146664181951_001', '1401907146664181951_002', '1401907146664181951_003',
            '1401907146664181951_004', '1401907146664181951_005', '1401907146664181951_006'
        ];

        const categoryInfo = portfolioCategories[category];
        const images = [];
        
        commonFilePatterns.forEach(pattern => {
            categoryInfo.extensions.forEach(ext => {
                const imagePath = `${categoryInfo.folder}${pattern}.${ext}`;

                const img = new Image();
                img.onload = () => {
                    if (!images.find(item => item.path === imagePath)) {
                        images.push({
                            path: imagePath,
                            name: pattern,
                            category: category
                        });
                        updatePortfolioCount(category, images.length);
                    }
                };
                img.onerror = () => {
                };
                img.src = imagePath;
            });
        });

        return images;
    }

    function loadPortfolioImages() {
        Object.keys(portfolioCategories).forEach(category => {
            portfolioData[category] = getImagesList(category);
            

            if (category === 'thumbnails') {
                const thumbnailImages = [];

                backgroundImages.forEach(filename => {
                    const imagePath = `Thumbnails/${filename}`;
                    const img = new Image();
                    img.onload = () => {
                        if (!thumbnailImages.find(item => item.path === imagePath)) {
                            thumbnailImages.push({
                                path: imagePath,
                                name: filename.replace(/\.(png|jpg|jpeg)$/i, ''),
                                category: category
                            });
                            portfolioData[category] = thumbnailImages;
                            updatePortfolioCount(category, thumbnailImages.length);
                        }
                    };
                    img.src = imagePath;
                });
            }
        });
    }

    function updatePortfolioCount(category, count) {
        const card = document.querySelector(`[data-category="${category}"]`);
        if (card) {
            const countElement = card.querySelector('.portfolio-count');
            countElement.textContent = `${count} items`;
        }
    }

    function openPortfolioModal(category) {
        const modal = document.getElementById('portfolio-modal');
        const modalTitle = document.getElementById('modal-title');
        const galleryContainer = document.getElementById('gallery-container');
        
        const categoryNames = {
            'thumbnails': 'Thumbnails',
            'logos': 'Logos', 
            'product-banners': 'Product Banners',
            'product-boxes': 'Product Boxes'
        };
        
        modalTitle.textContent = categoryNames[category] || 'Portfolio';
        

        galleryContainer.innerHTML = '';
        

        const images = portfolioData[category] || [];
        
        if (images.length === 0) {
            galleryContainer.innerHTML = '<p style="text-align: center; color: #94a3b8; grid-column: 1 / -1;">No images found in this category yet.</p>';
        } else {
            images.forEach((image, index) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.innerHTML = `
                    <img src="${image.path}" alt="${image.name}" loading="lazy">
                    <div class="gallery-item-overlay">
                        <h4>${image.name}</h4>
                    </div>
                `;
                

                galleryItem.addEventListener('click', () => {
                    openLightbox(images, index);
                });
                
                galleryContainer.appendChild(galleryItem);
            });
        }
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closePortfolioModal() {
        const modal = document.getElementById('portfolio-modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function openLightbox(images, startIndex) {
        currentLightboxImages = images;
        currentImageIndex = startIndex;
        
        const lightboxModal = document.getElementById('lightbox-modal');
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxTitle = document.getElementById('lightbox-title');
        const lightboxCounter = document.getElementById('lightbox-counter');
        
        updateLightboxImage();
        lightboxModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        const lightboxModal = document.getElementById('lightbox-modal');
        lightboxModal.style.display = 'none';
        document.body.style.overflow = 'hidden';
    }

    function updateLightboxImage() {
        if (currentLightboxImages.length === 0) return;
        
        const currentImage = currentLightboxImages[currentImageIndex];
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxTitle = document.getElementById('lightbox-title');
        const lightboxCounter = document.getElementById('lightbox-counter');
        
        lightboxImage.src = currentImage.path;
        lightboxImage.alt = currentImage.name;
        lightboxTitle.textContent = currentImage.name;
        lightboxCounter.textContent = `${currentImageIndex + 1} / ${currentLightboxImages.length}`;
        

        const prevBtn = document.querySelector('.lightbox-prev');
        const nextBtn = document.querySelector('.lightbox-next');
        
        prevBtn.style.display = currentLightboxImages.length > 1 ? 'flex' : 'none';
        nextBtn.style.display = currentLightboxImages.length > 1 ? 'flex' : 'none';
    }

    function nextLightboxImage() {
        if (currentLightboxImages.length === 0) return;
        currentImageIndex = (currentImageIndex + 1) % currentLightboxImages.length;
        updateLightboxImage();
    }

    function prevLightboxImage() {
        if (currentLightboxImages.length === 0) return;
        currentImageIndex = (currentImageIndex - 1 + currentLightboxImages.length) % currentLightboxImages.length;
        updateLightboxImage();
    }


    document.querySelectorAll('.portfolio-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const category = btn.closest('.portfolio-card').getAttribute('data-category');
            openPortfolioModal(category);
        });
    });

    document.querySelector('.modal-close').addEventListener('click', closePortfolioModal);
    
    document.getElementById('portfolio-modal').addEventListener('click', (e) => {
        if (e.target.id === 'portfolio-modal') {
            closePortfolioModal();
        }
    });


    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    document.querySelector('.lightbox-prev').addEventListener('click', prevLightboxImage);
    document.querySelector('.lightbox-next').addEventListener('click', nextLightboxImage);
    
    document.getElementById('lightbox-modal').addEventListener('click', (e) => {
        if (e.target.id === 'lightbox-modal') {
            closeLightbox();
        }
    });


    document.addEventListener('keydown', (e) => {
        const lightboxModal = document.getElementById('lightbox-modal');
        if (lightboxModal.style.display === 'block') {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    prevLightboxImage();
                    break;
                case 'ArrowRight':
                    nextLightboxImage();
                    break;
            }
        }
    });


    loadPortfolioImages();



    function startBuildUpSequence() {
        setTimeout(() => {
            splashTitle.classList.add('disappearing');
            addColorBtn.classList.add('disappearing');
            overlay.classList.add('animate-grid');
        }, 100);

        setTimeout(() => {
            body.classList.remove('bw-mode');
        }, 1000);

        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 1800);

        setTimeout(() => {
            navbar.classList.add('slide-in');
        }, 1500);

        setTimeout(() => {
            heroContent.classList.add('fly-in-fast');
            setTimeout(() => {
                heroContent.classList.remove('fly-in-fast');
                heroContent.classList.add('fly-in-slow');
                

                setTimeout(() => {
                    body.classList.remove('build-up-mode');
                    buildUpActive = false;
                }, 400);
            }, 600);
        }, 2000);

        setTimeout(() => {
            portfolio.classList.add('reveal', 'fade-in');
            setTimeout(() => portfolio.classList.add('animate'), 50);
        }, 2800);

        setTimeout(() => {
            achievements.classList.add('reveal', 'fade-in');
            setTimeout(() => achievements.classList.add('animate'), 50);
        }, 3000);

        setTimeout(() => {
            about.classList.add('reveal', 'fade-in');
            setTimeout(() => about.classList.add('animate'), 50);
        }, 3200);

        setTimeout(() => {
            pricing.classList.add('reveal', 'fade-in');
            setTimeout(() => pricing.classList.add('animate'), 50);
        }, 3400);

        setTimeout(() => {
            processSection.classList.add('reveal', 'fade-in');
            setTimeout(() => processSection.classList.add('animate'), 50);
        }, 3600);

        setTimeout(() => {
            contact.classList.add('reveal', 'fade-in');
            setTimeout(() => contact.classList.add('animate'), 50);
        }, 4000);
    }

    addColorBtn.addEventListener('click', startBuildUpSequence);

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    function setActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        if (buildUpActive) return;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + '+';
        }, 16);
    }

    const observer2 = new IntersectionObserver((entries) => {
        if (buildUpActive) return;
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                if (entry.target.classList.contains('portfolio-card') || entry.target.classList.contains('pricing-card')) {
                    const cards = Array.from(entry.target.parentElement.children);
                    const index = cards.indexOf(entry.target);
                    const delay = entry.target.classList.contains('portfolio-card') ? index * 150 : index * 100;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                } else {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                

                if (entry.target.classList.contains('stat-card')) {
                    const counter = entry.target.querySelector('.counter');
                    if (counter && !counter.classList.contains('animated')) {
                        counter.classList.add('animated');
                        setTimeout(() => animateCounter(counter), 200);
                    }
                }
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.achievement-card, .portfolio-card, .pricing-card, .stat-card, .process-step, .showcase-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.6s ease';
        observer2.observe(el);
    });

    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.textContent.includes('View My Work')) {
                e.preventDefault();
                document.getElementById('portfolio').scrollIntoView({
                    behavior: 'smooth'
                });
            } else if (this.textContent.includes('Get In Touch')) {
                e.preventDefault();
                document.getElementById('contact').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    const orderButtons = document.querySelectorAll('.pricing-card .btn');
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'mailto:order@syrxty.com?subject=Order Request';
        });
    });

    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        if (buildUpActive) return;
        
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });

    navbar.style.transition = 'transform 0.3s ease';
});
