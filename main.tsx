import './index.css';

// --- CONFIG & CONSTANTS ---
const COLORS = {
  plum: '#6B1A3A',
  pink: '#E91E8C',
  gold: '#C9A84C',
  white: '#FFFFFF'
};

// --- INITIALIZATION ---
window.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initParticles();
  initTypewriter();
  initCursor();
  initScrollAnimations();
  initTiltEffect();
  initTestimonials();
  initGallery();
  initNavigation();
  initParallax();
  initActiveNav();
  initSparkles();
});

// --- PARALLAX ---
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.getElementById('hero');
    if (hero) {
      const canvas = document.getElementById('hero-canvas');
      if (canvas) canvas.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  });
}

// --- ACTIVE NAV ---
function initActiveNav() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id') || '';
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-pink');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-pink');
      }
    });
  });
}

// --- SPARKLES ---
function initSparkles() {
  const container = document.querySelector('.sparkles-container');
  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'absolute w-1 h-1 bg-gold rounded-full animate-pulse';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.animationDelay = Math.random() * 5 + 's';
    container.appendChild(sparkle);
  }
}

// --- PRELOADER ---
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const progressBar = document.getElementById('progress-bar');
  const logoPath = document.getElementById('logo-path') as unknown as SVGPathElement;

  if (logoPath) {
    const length = logoPath.getTotalLength();
    logoPath.style.strokeDasharray = `${length}`;
    logoPath.style.strokeDashoffset = `${length}`;
    logoPath.style.transition = 'stroke-dashoffset 2s ease-in-out';
    
    setTimeout(() => {
      logoPath.style.strokeDashoffset = '0';
    }, 100);
  }

  if (progressBar) {
    setTimeout(() => {
      progressBar.style.width = '100%';
    }, 100);
  }

  setTimeout(() => {
    if (preloader) {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
        document.body.style.overflow = 'auto';
      }, 1000);
    }
  }, 3000);
}

// --- PARTICLES (CANVAS) ---
function initParticles() {
  const canvas = document.getElementById('hero-canvas') as HTMLCanvasElement;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let particles: Particle[] = [];
  const particleCount = 120;

  class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    type: 'petal' | 'dot';
    rotation: number;
    rotationSpeed: number;

    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.type = Math.random() > 0.5 ? 'petal' : 'dot';
      this.size = this.type === 'petal' ? Math.random() * 15 + 5 : Math.random() * 3 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 + 0.5;
      this.color = this.type === 'petal' ? COLORS.pink : COLORS.gold;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = Math.random() * 2 - 1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.rotation += this.rotationSpeed;

      if (this.y > canvas.height) {
        this.y = -20;
        this.x = Math.random() * canvas.width;
      }
      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
    }

    draw() {
      if (!ctx) return;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      
      if (this.type === 'petal') {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size, 0, 0, this.size);
        ctx.bezierCurveTo(-this.size, 0, -this.size / 2, -this.size / 2, 0, 0);
        ctx.fillStyle = this.color + '44'; // Semi-transparent
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function init() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  resize();
  init();
  animate();
}

// --- TYPEWRITER ---
function initTypewriter() {
  const element = document.getElementById('typewriter');
  if (!element) return;
  const words = ["Bridal Makeup", "Pro Artistry", "Beauty Academy", "Luxury Salon"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 150;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      element!.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      element!.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 150;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

// --- CURSOR ---
function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!cursor || !ring) return;

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let ringX = 0;
  let ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    // Smooth follow
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;

    cursor!.style.transform = `translate(${cursorX - 8}px, ${cursorY - 8}px)`;
    ring!.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;

    requestAnimationFrame(animate);
  }

  animate();

  // Hover effects
  const hoverables = document.querySelectorAll('a, button, .gallery-item, .service-card');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring!.style.width = '60px';
      ring!.style.height = '60px';
      ring!.style.borderColor = COLORS.pink;
      ring!.style.backgroundColor = 'rgba(233, 30, 140, 0.1)';
      // Magnetic effect
      if (el.classList.contains('btn-liquid')) {
        el.addEventListener('mousemove', (e: any) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          (el as HTMLElement).style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        el.addEventListener('mouseleave', () => {
          (el as HTMLElement).style.transform = `translate(0, 0)`;
        });
      }
    });
    el.addEventListener('mouseleave', () => {
      ring!.style.width = '40px';
      ring!.style.height = '40px';
      ring!.style.borderColor = COLORS.pink;
      ring!.style.backgroundColor = 'transparent';
    });
  });
}

// --- SCROLL ANIMATIONS ---
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Count up animation if it's a counter
        if (entry.target.classList.contains('counter')) {
          animateCounter(entry.target as HTMLElement);
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll, .counter').forEach(el => {
    observer.observe(el);
  });

  function animateCounter(el: HTMLElement) {
    const target = parseInt(el.getAttribute('data-target') || '0');
    let current = 0;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / target));
    
    const timer = setInterval(() => {
      current += 1;
      el.textContent = current.toString() + (target > 100 ? '+' : '');
      if (current >= target) {
        clearInterval(timer);
      }
    }, stepTime);
  }
}

// --- TILT EFFECT ---
function initTiltEffect() {
  const cards = document.querySelectorAll('.service-card');
  cards.forEach(card => {
    const inner = card.querySelector('.card-inner') as HTMLElement;
    card.addEventListener('mousemove', (e: any) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      inner.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });
  });
}

// --- TESTIMONIALS ---
function initTestimonials() {
  const slides = document.querySelectorAll('.testimonial-slide');
  let currentSlide = 0;

  function showSlide(index: number) {
    slides.forEach(s => s.classList.remove('active'));
    slides[index].classList.add('active');
    
    // Animate stars
    const stars = slides[index].querySelectorAll('.star');
    stars.forEach((star, i) => {
      (star as HTMLElement).style.opacity = '0';
      (star as HTMLElement).style.transform = 'scale(0)';
      setTimeout(() => {
        (star as HTMLElement).style.opacity = '1';
        (star as HTMLElement).style.transform = 'scale(1)';
        (star as HTMLElement).style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      }, i * 100);
    });
  }

  document.getElementById('next-testimonial')?.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });

  document.getElementById('prev-testimonial')?.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });

  // Auto rotate
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 8000);
}

// --- GALLERY & LIGHTBOX ---
function initGallery() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img') as HTMLImageElement;
  const closeBtn = document.getElementById('close-lightbox');
  const items = document.querySelectorAll('.gallery-item');
  let currentIndex = 0;

  items.forEach((item, index) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img && lightbox && lightboxImg) {
        currentIndex = index;
        lightboxImg.src = img.src;
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
        setTimeout(() => lightboxImg.style.transform = 'scale(1)', 10);
      }
    });
  });

  closeBtn?.addEventListener('click', () => {
    if (lightbox && lightboxImg) {
      lightboxImg.style.transform = 'scale(0.9)';
      setTimeout(() => {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
      }, 300);
    }
  });

  document.getElementById('next-img')?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % items.length;
    const nextImg = items[currentIndex].querySelector('img');
    if (nextImg && lightboxImg) lightboxImg.src = nextImg.src;
  });

  document.getElementById('prev-img')?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    const prevImg = items[currentIndex].querySelector('img');
    if (prevImg && lightboxImg) lightboxImg.src = prevImg.src;
  });
}

// --- NAVIGATION ---
function initNavigation() {
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header?.classList.add('bg-plum-dark/90', 'backdrop-blur-md', 'py-4');
      header?.classList.remove('py-6');
    } else {
      header?.classList.remove('bg-plum-dark/90', 'backdrop-blur-md', 'py-4');
      header?.classList.add('py-6');
    }
  });

  menuToggle?.addEventListener('click', () => {
    const spans = menuToggle.querySelectorAll('span');
    mobileMenu?.classList.toggle('translate-x-full');
    
    if (!mobileMenu?.classList.contains('translate-x-full')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      
      mobileLinks.forEach((link, i) => {
        setTimeout(() => {
          (link as HTMLElement).style.opacity = '1';
          (link as HTMLElement).style.transform = 'translateY(0)';
          (link as HTMLElement).style.transition = 'all 0.5s ease';
        }, 200 + i * 100);
      });
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.transform = 'none';
      mobileLinks.forEach(link => {
        (link as HTMLElement).style.opacity = '0';
        (link as HTMLElement).style.transform = 'translateY(20px)';
      });
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu?.classList.add('translate-x-full');
      const spans = menuToggle?.querySelectorAll('span');
      if (spans) {
        spans[0].style.transform = 'none';
        spans[1].style.transform = 'none';
      }
    });
  });
}
