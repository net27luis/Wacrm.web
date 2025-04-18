    // Typed.js
    const typed = new Typed('#typed-text', {
      strings: ['WACRM-Pro', 'WACRM', 'WASender', 'BotMaster'],
      typeSpeed: 100,
      backSpeed: 40,
      loop: true,
    });

    // Particles
    function createParticles() {
      const particlesContainer = document.getElementById('particles-js');
      const particleCount = 8;
      const colors = ['#00ddeb', '#ff00cc', '#39ff14', '#7b00ff'];
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 8 + 8;
        const delay = Math.random() * 10;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.background = color;
        particle.style.boxShadow = `0 0 10px ${color}`;
        particlesContainer.appendChild(particle);
      }
    }
    createParticles();

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navbarMenu = document.querySelector('.navbar-menu');
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navbarMenu.classList.toggle('active');
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
    });
    navbarMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navbarMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Modal Functions
    function openModal(modalId) {
      document.getElementById(modalId).style.display = 'block';
      document.body.style.overflow = 'hidden';
    }

    function closeModal(modalId) {
      document.getElementById(modalId).style.display = 'none';
      document.body.style.overflow = 'auto';
    }

    // Lightbox Functions
    function openLightbox(src, alt) {
      const lightbox = document.getElementById('lightbox');
      const lightboxImage = document.getElementById('lightbox-image');
      lightboxImage.src = src;
      lightboxImage.alt = alt;
      lightbox.style.display = 'flex';
    }

    function closeLightbox() {
      document.getElementById('lightbox').style.display = 'none';
    }

    // Contact Form Submission to WhatsApp
    document.getElementById('contact-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      const nameError = document.getElementById('name-error');
      const emailError = document.getElementById('email-error');
      const messageError = document.getElementById('message-error');
      const formError = document.getElementById('form-error');

      nameError.style.display = 'none';
      emailError.style.display = 'none';
      messageError.style.display = 'none';
      formError.style.display = 'none';

      let hasError = false;
      if (!name.value) {
        nameError.style.display = 'block';
        hasError = true;
      }
      if (!email.value || !email.value.includes('@')) {
        emailError.style.display = 'block';
        hasError = true;
      }
      if (!message.value) {
        messageError.style.display = 'block';
        hasError = true;
      }

      if (!hasError) {
        const whatsappMessage = `Hola, soy ${encodeURIComponent(name.value)}. Mi correo es ${encodeURIComponent(email.value)}. ${encodeURIComponent(message.value)}`;
        const whatsappUrl = `https://wa.me/+59178208309?text=${whatsappMessage}`;
        window.open(whatsappUrl, '_blank');
        e.target.reset();
      } else {
        formError.style.display = 'block';
      }
    });

    // Chatbot
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotSend = document.querySelector('.chatbot-input button');

    chatbotToggle.addEventListener('click', () => {
      chatbotWindow.classList.toggle('active');
      if (chatbotWindow.classList.contains('active')) {
        resetChatbot();
      }
    });

    function addMessage(text, sender) {
      const message = document.createElement('div');
      message.classList.add('chatbot-message', sender);
      message.innerHTML = text;
      chatbotMessages.appendChild(message);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function addOptions() {
      const options = `
        <div class="chatbot-options">
          <button class="chatbot-option" onclick="handleChatOption('wacrmpro')" aria-label="Información sobre WACRMPro">WACRM-Pro</button>
          <button class="chatbot-option" onclick="handleChatOption('wacrm')" aria-label="Información sobre WACRM">WACRM</button>
          <button class="chatbot-option" onclick="handleChatOption('wasender')" aria-label="Información sobre WASender">WASender</button>
          <button class="chatbot-option" onclick="handleChatOption('botmaster')" aria-label="Información sobre BotMaster">BotMaster</button>
          <button class="chatbot-option" onclick="handleChatOption('contact')" aria-label="Contactar soporte">Contacto</button>
        </div>
      `;
      chatbotMessages.innerHTML += options;
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function resetChatbot() {
      chatbotMessages.innerHTML = '';
      addMessage('¡Hola! ¿Sobre qué programa quieres saber más?', 'bot');
      addOptions();
    }

    function handleChatOption(option) {
      let response;
      switch (option) {
        case 'wacrmpro':
          addMessage('WACRMPro', 'user');
          response = 'WACRMPro es ideal para gestionar clientes y campañas masivas en WhatsApp. <a href="#" onclick="openModal(\'modal-wacrmpro\'); return false;" class="text-#1a1a1a underline">Mira los detalles</a>.';
          break;
        case 'wacrm':
          addMessage('WACRM', 'user');
          response = 'WACRM es un CRM intuitivo para WhatsApp con herramientas de marketing. <a href="#" onclick="openModal(\'modal-wacrm\'); return false;" class="text-#1a1a1a underline">Mira los detalles</a>.';
          break;
        case 'wasender':
          addMessage('WASender', 'user');
          response = 'WASender permite enviar mensajes masivos personalizados con alta entrega. <a href="#" onclick="openModal(\'modal-wasender\'); return false;" class="text-#1a1a1a underline">Mira los detalles</a>.';
          break;
        case 'botmaster':
          addMessage('BotMaster', 'user');
          response = 'BotMaster te permite crear bots personalizados para cualquier necesidad. <a href="#" onclick="openModal(\'modal-botmaster\'); return false;" class="text-#1a1a1a underline">Mira los detalles</a>.';
          break;
        case 'contact':
          addMessage('Contacto', 'user');
          response = '¡Contáctanos! Usa el formulario en la sección de <a href="#contact" class="text-#1a1a1a underline">Contacto</a> o escríbenos en WhatsApp.';
          break;
        default:
          response = 'Por favor, selecciona una opción o escribe sobre WACRMPro, WACRM, WASender, BotMaster o Contacto.';
      }
      setTimeout(() => {
        addMessage(response, 'bot');
        if (option !== 'contact') addOptions();
      }, 500);
    }

    function handleMessage() {
      const text = chatbotInput.value.trim().toLowerCase();
      if (!text) return;

      addMessage(text, 'user');
      chatbotInput.value = '';

      let response;
      if (text.includes('wacrmpro')) {
        response = 'WACRMPro es ideal para gestionar clientes y campañas masivas en WhatsApp. <a href="#" onclick="openModal(\'modal-wacrmpro\'); return false;" class="text-#1a1a1a underline">Mira los detalles</a>.';
      } else if (text.includes('wacrm')) {
        response = 'WACRM es un CRM intuitivo para WhatsApp con herramientas de marketing. <a href="#" onclick="openModal(\'modal-wacrm\'); return false;" class="text-#1a1a1a underline">Mira los detalles</a>.';
      } else if (text.includes('wasender')) {
        response = 'WASender permite enviar mensajes masivos personalizados con alta entrega. <a href="#" onclick="openModal(\'modal-wasender\'); return false;" class="text-#1a1a1a underline">Mira los detalles</a>.';
      } else if (text.includes('botmaster')) {
        response = 'BotMaster te permite crear bots personalizados para cualquier necesidad. <a href="#" onclick="openModal(\'modal-botmaster\'); return false;" class="text-#1a1a1a underline">Mira los detalles</a>.';
      } else if (text.includes('contacto') || text.includes('soporte')) {
        response = '¡Contáctanos! Usa el formulario en la sección de <a href="#contact" class="text-#1a1a1a underline">Contacto</a> o escríbenos en WhatsApp.';
      } else if (text.includes('precio') || text.includes('costo')) {
        response = 'Consulta los precios en la sección de <a href="#pricing" class="text-#1a1a1a underline">Precios</a>.';
      } else {
        response = 'Por favor, selecciona una opción o escribe sobre WACRMPro, WACRM, WASender, BotMaster o Contacto.';
      }

      setTimeout(() => {
        addMessage(response, 'bot');
        addOptions();
      }, 500);
    }

    chatbotSend.addEventListener('click', handleMessage);
    chatbotInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleMessage();
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
      document.querySelectorAll('.modal').forEach(modal => {
        if (e.target === modal) {
          modal.style.display = 'none';
          document.body.style.overflow = 'auto';
        }
      });
    });

    // Keyboard support for cards and chatbot options
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('chatbot-option')) {
        e.target.focus();
      }
    });