// main.js - scroll direction reveal + nav active + smooth anchors + cookies

document.addEventListener('DOMContentLoaded', function(){

  /* SMOOTH SCROLL for anchor links (header and buttons) */
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length > 1){
        const target = document.querySelector(href);
        if(target){
          e.preventDefault();
          // smooth scroll and small offset for fixed header
          const headerOffset = document.getElementById('main-header').offsetHeight || 100;
          const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerOffset - 12;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          history.replaceState(null, null, href);
        }
      }
    });
  });

  /* TRACK SCROLL DIRECTION */
  let lastScrollY = window.scrollY || 0;
  let scrollDir = 'down';
  window.addEventListener('scroll', function(){
    const y = window.scrollY || 0;
    scrollDir = (y > lastScrollY) ? 'down' : 'up';
    lastScrollY = y;
  }, {passive:true});

  /* REVEAL ELEMENTS with direction-sensitivity */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        // set initial direction class based on last scroll direction
        if(!entry.target.classList.contains('in-view')){
          entry.target.classList.add( scrollDir === 'down' ? 'from-bottom' : 'from-top' );
          // force reflow to ensure transition runs
          void entry.target.offsetWidth;
          entry.target.classList.add('in-view');
        }
        revealObserver.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.06 });

  revealEls.forEach(el => revealObserver.observe(el));

  // Ensure already-visible elements at load get revealed
  setTimeout(()=> {
    revealEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if(rect.top < window.innerHeight * 0.9){
        if(!el.classList.contains('in-view')){
          el.classList.add( (scrollDir === 'down') ? 'from-bottom' : 'from-top' );
          void el.offsetWidth;
          el.classList.add('in-view');
          revealObserver.unobserve(el);
        }
      }
    });
  }, 120);

  /* NAV ACTIVE - IntersectionObserver to underline current section */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = Array.from(navLinks).map(ln => document.getElementById(ln.dataset.target)).filter(Boolean);

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        navLinks.forEach(link => link.classList.toggle('active', link.dataset.target === entry.target.id));
      }
    });
  }, { root: null, rootMargin: '0px 0px -45% 0px', threshold: 0 });

  sections.forEach(sec => navObserver.observe(sec));

  /* COOKIES bar & modal */
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
