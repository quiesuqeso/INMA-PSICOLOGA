// main.js - interacciones cookie + scroll suave (básico)

// cookie bar behaviour
document.addEventListener('DOMContentLoaded', function(){
  const cookieBar = document.getElementById('cookieBar');
  const acceptBtn = document.getElementById('acceptBtn');
  const settingsBtn = document.getElementById('settingsBtn');
  const cookieModal = document.getElementById('cookieModal');
  const closeModal = document.getElementById('closeModal');
  const activateAll = document.getElementById('activateAll');
  const saveSettings = document.getElementById('saveSettings');

  // show bar only if not accepted
  if(!localStorage.getItem('inma_cookies_accepted')) {
    cookieBar.style.display = 'flex';
  } else {
    cookieBar.style.display = 'none';
  }

  acceptBtn && acceptBtn.addEventListener('click', function(){
    localStorage.setItem('inma_cookies_accepted','1');
    cookieBar.style.display = 'none';
    alert('Cookies aceptadas');
  });

  settingsBtn && settingsBtn.addEventListener('click', function(){
    cookieModal.style.display = 'flex';
  });

  closeModal && closeModal.addEventListener('click', function(){
    cookieModal.style.display = 'none';
  });

  activateAll && activateAll.addEventListener('click', function(){
    localStorage.setItem('inma_cookies_accepted','1');
    cookieModal.style.display = 'none';
    cookieBar.style.display = 'none';
    alert('Todas las cookies activadas');
  });

  saveSettings && saveSettings.addEventListener('click', function(){
    // aquí podrías guardar opciones individuales
    localStorage.setItem('inma_cookies_accepted','1');
    cookieModal.style.display = 'none';
    cookieBar.style.display = 'none';
    alert('Ajustes guardados');
  });

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if(target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});

// === HEADER SCROLL COLOR ===
window.addEventListener('scroll', function () {
    const header = document.getElementById('main-header');

    if (window.scrollY > 120) {
        header.classList.add('header-scroll');
    } else {
        header.classList.remove('header-scroll');
    }
});
