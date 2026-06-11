/**
 * Plumb5 Premium SaaS Landing Page - Interactive Mechanics
 */

document.addEventListener('DOMContentLoaded', () => {
  // Init Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Navbar Scroll Handler
  const navbar = document.querySelector('.navbar-p5');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once in case page loads scrolled
  }

  // Intersection Observer for Scroll Animations
  const animElements = document.querySelectorAll('.fade-up-init');
  const animObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-up-animated');
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animElements.forEach(el => animObserver.observe(el));

  // Count-Up Animations for Success Metrics (Outcome Section)
  const statsElements = document.querySelectorAll('.animate-stat-number');
  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetEl = entry.target;
        const targetValue = parseFloat(targetEl.getAttribute('data-target-val'));
        const duration = 1500; // ms
        const startTime = performance.now();
        const startValue = 0;
        const decimals = targetEl.getAttribute('data-decimals') === 'true';

        const updateCounter = (currentTime) => {
          const elapsedTime = currentTime - startTime;
          if (elapsedTime >= duration) {
            targetEl.textContent = decimals ? targetValue.toFixed(1) : Math.floor(targetValue);
            return;
          }
          const progress = elapsedTime / duration;
          const easeOutQuad = progress * (2 - progress); // Easing
          const currentValue = startValue + (targetValue - startValue) * easeOutQuad;
          targetEl.textContent = decimals ? currentValue.toFixed(1) : Math.floor(currentValue);
          requestAnimationFrame(updateCounter);
        };

        requestAnimationFrame(updateCounter);
        observer.unobserve(targetEl);
      }
    });
  }, { threshold: 0.5 });

  statsElements.forEach(el => statsObserver.observe(el));

  // Platform Differentiator flow pulse effects
  const steps = document.querySelectorAll('.workflow-step');
  steps.forEach((step, idx) => {
    step.addEventListener('mouseenter', () => {
      // Highlight connecting tracks as well if any
      step.style.borderColor = 'var(--primary-color)';
    });
    step.style.transitionDelay = `${idx * 100}ms`;
  });

  // Interactive High-fidelity Form Submission Handler
  const leadForm = document.getElementById('p5LeadForm');
  const formCardBody = document.getElementById('formDataLayout');
  const successMessage = document.getElementById('formSuccessState');
  const submitBtn = document.getElementById('submitLeadBtn');

  if (leadForm && formCardBody && successMessage) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Check validation
      if (!leadForm.checkValidity()) {
        e.stopPropagation();
        leadForm.classList.add('was-validated');
        return;
      }

      // Start submission loading states
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <div class="spinner-border spinner-border-sm text-light" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <span>Processing Consultation...</span>
      `;

      // Simulate API call to CRM
      setTimeout(() => {
        // Hide form inputs
        formCardBody.style.display = 'none';

        // Populate and show success verification layer
        const userName = document.getElementById('fullNameInput').value || 'Growth Partner';
        const userEmail = document.getElementById('businessEmailInput').value || '';

        const registeredNameSpan = document.getElementById('successRegisteredName');
        if (registeredNameSpan) {
          registeredNameSpan.textContent = userName;
        }

        successMessage.style.display = 'flex';
        successMessage.classList.add('fade-up-init', 'fade-up-animated');

        // Scroll form card slightly into center view if on mobile/small view ports
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 1500);
    });
  }

  // Smooth scroll anchors helper
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});
