
(function(){
  var header = document.querySelector('header.site');
  var hero = document.querySelector('.hero');
  var backToTop = document.getElementById('backToTop');
  function updateHeader(){
    var threshold = Math.max(hero.offsetHeight - 90, 80);
    var past = window.scrollY > threshold;
    header.classList.toggle('scrolled', past);
    if(backToTop) backToTop.classList.toggle('hidden', !past);
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader, {passive:true});
  window.addEventListener('resize', updateHeader);
})();

(function(){
  var openBtn = document.getElementById('openNav');
  var closeBtn = document.getElementById('closeNav');
  var overlay = document.getElementById('navOverlay');
  var scrim = document.getElementById('navScrim');
  var links = overlay.querySelectorAll('.nav-link');

  function openNav(){
    overlay.classList.add('open');
    openBtn.setAttribute('aria-expanded','true');
  }
  function closeNav(){
    overlay.classList.remove('open');
    openBtn.setAttribute('aria-expanded','false');
  }
  openBtn.addEventListener('click', openNav);
  closeBtn.addEventListener('click', closeNav);
  scrim.addEventListener('click', closeNav);
  links.forEach(function(a){
    a.addEventListener('click', function(){ closeNav(); });
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeNav();
  });
})();
