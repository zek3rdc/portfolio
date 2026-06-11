(() => {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = menuToggle.querySelectorAll('span');
    const isOpen = mobileMenu.classList.contains('open');
    spans[0].style.transform = isOpen ? 'translateY(7px) rotate(45deg)' : '';
    spans[1].style.opacity = isOpen ? '0' : '';
    spans[2].style.transform = isOpen ? 'translateY(-7px) rotate(-45deg)' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuToggle.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity = '';
      });
    });
  });

  const typedEl = document.getElementById('typed-text');
  const phrases = [
    'Full Stack Developer',
    'ETL Engineer',
    'Data Enthusiast',
    'Snowflake Specialist',
    'Problem Solver'
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let paused = false;

  function type() {
    if (paused) return;
    const current = phrases[phraseIdx];
    if (!deleting) {
      typedEl.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        paused = true;
        setTimeout(() => { paused = false; deleting = true; setTimeout(type, 80); }, 2200);
        return;
      }
      setTimeout(type, 75);
    } else {
      typedEl.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 40);
    }
  }
  setTimeout(type, 1000);

  const counters = document.querySelectorAll('.count');
  let countersStarted = false;

  function animateCounters() {
    if (countersStarted) return;
    countersStarted = true;
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target, 10);
      const duration = 1800;
      const start = performance.now();
      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(update);
        else counter.textContent = target;
      }
      requestAnimationFrame(update);
    });
  }

  const revealEls = document.querySelectorAll(
    '#about, #experience, #projects, #skills, #education, #contact, .timeline-item, .project-card, .skill-group, .edu-card, .contact-card, .stat-card'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.id === 'about') animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));

  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = ['about', 'experience', 'projects', 'skills', 'education', 'contact'];

  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(id => {
      const section = document.getElementById(id);
      if (!section) return;
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const navLink = document.getElementById('nav-' + id);
      if (navLink) {
        if (scrollPos >= top && scrollPos < bottom) {
          navLink.style.color = 'var(--text)';
        } else {
          navLink.style.color = '';
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      tag.style.transform = 'scale(1.06)';
    });
    tag.addEventListener('mouseleave', () => {
      tag.style.transform = '';
    });
  });
})();
