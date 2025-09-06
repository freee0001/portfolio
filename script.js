// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100
  });
  
  // Typed.js initialization
  document.addEventListener('DOMContentLoaded', function() {
    new Typed('.typing-text', {
      strings: [
        'Anosike Chioma Peace',
        'Virtual Assistant Expert',
        'Business Growth Specialist',
        'Administrative Professional'
      ],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });
  });
  
  // Navigation functionality
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Mobile menu toggle
  navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
  
  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
  
  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Active navigation link highlighting
  window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
  
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
  
  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Skills animation
  function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = width;
    });
  }
  
  // Trigger skills animation when skills section is in view
  const skillsSection = document.getElementById('skills');
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkills();
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }
  
  // Portfolio filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filter portfolio items
      portfolioItems.forEach(item => {
        if (filter === 'all' || item.classList.contains(filter)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 100);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // Testimonials slider
  let currentTestimonial = 0;
  const testimonials = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');
  
  function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
  }
  
  function changeTestimonial(direction) {
    currentTestimonial += direction;
    
    if (currentTestimonial >= testimonials.length) {
      currentTestimonial = 0;
    } else if (currentTestimonial < 0) {
      currentTestimonial = testimonials.length - 1;
    }
    
    showTestimonial(currentTestimonial);
  }
  
  function currentTestimonialSlide(index) {
    currentTestimonial = index - 1;
    showTestimonial(currentTestimonial);
  }
  
  // Auto-play testimonials
  setInterval(() => {
    changeTestimonial(1);
  }, 5000);
  
  // Contact form handling
  const contactForm = document.getElementById('contact-form');
  const successModal = document.getElementById('success-modal');
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    
    // Validate form
    if (validateForm(formObject)) {
      // Simulate form submission
      setTimeout(() => {
        showSuccessModal();
        this.reset();
      }, 1000);
    }
  });
  
  function validateForm(data) {
    const requiredFields = ['firstName', 'lastName', 'email', 'service', 'message'];
    
    for (let field of requiredFields) {
      if (!data[field] || data[field].trim() === '') {
        alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
        return false;
      }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert('Please enter a valid email address.');
      return false;
    }
    
    return true;
  }
  
  function showSuccessModal() {
    successModal.classList.add('active');
  }
  
  function closeModal() {
    successModal.classList.remove('active');
  }
  
  // Portfolio modal functionality
  const portfolioModal = document.getElementById('portfolio-modal');
  const portfolioModalBody = document.getElementById('portfolio-modal-body');
  
  const portfolioData = {
    project1: {
      title: 'E-commerce Admin Support',
      description: 'Complete administrative overhaul for a growing online retailer, including inventory management, customer service optimization, and process automation.',
      image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800',
      results: [
        '40% reduction in order processing time',
        '95% customer satisfaction rate',
        'Streamlined inventory management system',
        'Automated customer communication workflows'
      ],
      technologies: ['Shopify', 'Zendesk', 'Google Sheets', 'Zapier'],
      duration: '6 months'
    },
    project2: {
      title: 'Social Media Campaign Success',
      description: 'Developed and executed a comprehensive social media strategy for a tech startup, resulting in significant engagement growth and brand awareness.',
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
      results: [
        '300% increase in engagement rate',
        '150% growth in follower count',
        '50+ high-quality leads generated',
        'Brand awareness increased by 200%'
      ],
      technologies: ['Hootsuite', 'Canva', 'Facebook Ads', 'Google Analytics'],
      duration: '4 months'
    },
    project3: {
      title: 'Content Strategy Overhaul',
      description: 'Redesigned content strategy for a wellness blog, focusing on SEO optimization and audience engagement to drive organic traffic growth.',
      image: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=800',
      results: [
        '250% increase in blog traffic',
        '80% improvement in search rankings',
        '45% increase in email subscribers',
        '60% boost in content engagement'
      ],
      technologies: ['WordPress', 'SEMrush', 'Mailchimp', 'Google Analytics'],
      duration: '6 months'
    },
    project4: {
      title: 'Business Process Optimization',
      description: 'Streamlined operations for a consulting firm by implementing efficient workflows and project management systems.',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
      results: [
        '35% reduction in project delivery time',
        '90% improvement in client communication',
        'Standardized project workflows',
        '25% increase in team productivity'
      ],
      technologies: ['Asana', 'Slack', 'Google Workspace', 'Calendly'],
      duration: '3 months'
    },
    project5: {
      title: 'Brand Development Project',
      description: 'Created complete brand identity and social media presence for a wellness coach, establishing strong online authority.',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
      results: [
        'Complete brand identity established',
        '200% increase in client inquiries',
        'Professional website launched',
        'Consistent brand presence across platforms'
      ],
      technologies: ['Canva', 'WordPress', 'Instagram', 'LinkedIn'],
      duration: '2 months'
    },
    project6: {
      title: 'Email Marketing Success',
      description: 'Developed and implemented email marketing campaigns for a SaaS company, significantly improving open rates and conversions.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      results: [
        '45% improvement in open rates',
        '30% increase in click-through rates',
        '20% boost in conversion rates',
        'Automated email sequences implemented'
      ],
      technologies: ['Mailchimp', 'ConvertKit', 'Canva', 'Google Analytics'],
      duration: '4 months'
    }
  };
  
  function openPortfolioModal(projectId) {
    const project = portfolioData[projectId];
    if (!project) return;
    
    portfolioModalBody.innerHTML = `
      <div class="portfolio-modal-header">
        <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 15px; margin-bottom: 2rem;">
        <h2 style="color: #333; margin-bottom: 1rem;">${project.title}</h2>
        <p style="color: #666; font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem;">${project.description}</p>
      </div>
      
      <div class="portfolio-modal-content-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
        <div>
          <h3 style="color: #333; margin-bottom: 1rem;">Key Results</h3>
          <ul style="list-style: none; padding: 0;">
            ${project.results.map(result => `
              <li style="padding: 0.5rem 0; color: #666; position: relative; padding-left: 1.5rem;">
                <i class="fas fa-check-circle" style="position: absolute; left: 0; color: #667eea; top: 0.7rem;"></i>
                ${result}
              </li>
            `).join('')}
          </ul>
        </div>
        
        <div>
          <h3 style="color: #333; margin-bottom: 1rem;">Technologies Used</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
            ${project.technologies.map(tech => `
              <span style="background: #f8f9fa; color: #667eea; padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.9rem; border: 1px solid #e9ecef;">${tech}</span>
            `).join('')}
          </div>
          
          <h3 style="color: #333; margin-bottom: 0.5rem;">Project Duration</h3>
          <p style="color: #666; font-weight: 600;">${project.duration}</p>
        </div>
      </div>
    `;
    
    portfolioModal.classList.add('active');
  }
  
  function closePortfolioModal() {
    portfolioModal.classList.remove('active');
  }
  
  // Close modals when clicking outside
  window.addEventListener('click', function(e) {
    if (e.target === successModal) {
      closeModal();
    }
    if (e.target === portfolioModal) {
      closePortfolioModal();
    }
  });
  
  // Back to top button
  const backToTopButton = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });
  
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Form input animations
  const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
  
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      if (this.value === '') {
        this.parentElement.classList.remove('focused');
      }
    });
    
    // Check if input has value on page load
    if (input.value !== '') {
      input.parentElement.classList.add('focused');
    }
  });
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  document.querySelectorAll('.service-card, .skill-category, .portfolio-item').forEach(el => {
    observer.observe(el);
  });
  
  // Loading animation
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });
  
  // Prevent form submission on demo
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success modal after a short delay to simulate processing
        setTimeout(() => {
          showSuccessModal();
          form.reset();
        }, 1000);
      });
    }
  });
  
  // Add smooth reveal animations
  function revealOnScroll() {
    const reveals = document.querySelectorAll('[data-aos]');
    
    reveals.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('aos-animate');
      }
    });
  }
  
  window.addEventListener('scroll', revealOnScroll);
  
  // Initialize everything when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Set initial states
    showTestimonial(0);
    
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Remove loading class after everything is loaded
    window.addEventListener('load', function() {
      document.body.classList.remove('loading');
      document.body.classList.add('loaded');
    });
  });
  
  // Performance optimization: Debounce scroll events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // Apply debouncing to scroll events
  const debouncedScrollHandler = debounce(() => {
    // Navbar scroll effect
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Back to top button
    if (window.scrollY > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
    
    // Active navigation highlighting
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
  
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, 10);
  
  window.addEventListener('scroll', debouncedScrollHandler);