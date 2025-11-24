// main.js
document.addEventListener('DOMContentLoaded', function(){

  /* SMOOTH SCROLL for anchor links (works with header links & small Inicio) */
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length > 1){
        const target = document.querySelector(href);
        if(target){
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth', block:'start'});
          history.replaceState(null,null,href);
        }
      }
    });
  });

  /* SECTION ACTIVE (IntersectionObserver) - nav underline */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = Array.from(navLinks).map(ln => document.getElementById(ln.dataset.target)).filter(Boolean);

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -45% 0px',
    threshold: 0
  };

  const setActive = (id) => {
    navLinks.forEach(link => link.classList.toggle('active', link.dataset.target === id));
  };

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        setActive(entry.target.id);
      }
    });
  }, observerOptions);

  sections.forEach(s => io.observe(s));


  /* REVEAL ANIMATIONS with direction (up/down) */
  let lastScrollY = window.scrollY || 0;
  let scrollDir = 'down';

  window.addEventListener('scroll', function(){
    const y = window.scrollY || 0;
    scrollDir = (y > lastScrollY) ? 'down' : 'up';
    lastScrollY = y;
  }, {passive:true});

  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        // apply class depending on scroll direction
        const dir = scrollDir === 'down' ? 'down' : 'up';
        entry.target.classList.add('in-view', dir);
        // once revealed keep it visible (remove observer)
        revealObserver.unobserve(entry.target);
      }
    });
  }, {root:null, rootMargin:'0px 0px -10% 0px', threshold: 0.08});

  revealEls.forEach(el => revealObserver.observe(el));

  // Also trigger reveal for elements already visible on load
  window.setTimeout(()=> {
    revealEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if(rect.top < window.innerHeight * 0.9){
        el.classList.add('in-view', (scrollDir==='down'?'down':'up'));
        revealObserver.unobserve(el);
      }
    });
  }, 120);

  /* COOKIE BAR & MODAL */
  const cookieBar = document.getElementById('cookieBar');
  const acceptCookies = document.getElementById('acceptCookies');
  const openCookies = document.getElementById('openCookies');
  const cookieModal = document.getElementById('cookieModal');
  const closeCookieModal = document.getElementById('closeCookieModal');
  const activateAll = document.getElementById('activateAll');
  const saveCookies = document.getElementById('saveCookies');

  if(!localStorage.getItem('inma_cookies')){
    cookieBar.style.display = 'flex';
  } else {
    cookieBar.style.display = 'none';
  }

  acceptCookies && acceptCookies.addEventListener('click', function(){
    localStorage.setItem('inma_cookies','accepted');
    cookieBar.style.display = 'none';
  });

  openCookies && openCookies.addEventListener('click', function(){
    cookieModal.style.display = 'flex';
    cookieModal.setAttribute('aria-hidden','false');
  });

  closeCookieModal && closeCookieModal.addEventListener('click', function(){
    cookieModal.style.display = 'none';
    cookieModal.setAttribute('aria-hidden','true');
  });

  activateAll && activateAll.addEventListener('click', function(){
    localStorage.setItem('inma_cookies','accepted');
    cookieModal.style.display = 'none';
    cookieBar.style.display = 'none';
  });

  saveCookies && saveCookies.addEventListener('click', function(){
    localStorage.setItem('inma_cookies','accepted');
    cookieModal.style.display = 'none';
    cookieBar.style.display = 'none';
  });

});
