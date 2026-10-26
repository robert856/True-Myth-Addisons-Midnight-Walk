
(function(){
  var strip=document.querySelector('.strip'); if(!strip) return;
  var prev=document.querySelector('.strip-btn.prev'), next=document.querySelector('.strip-btn.next');
  function step(){var c=strip.querySelector('.img-slot');return c?c.getBoundingClientRect().width+1:300;}
  function update(){prev.disabled=strip.scrollLeft<4;next.disabled=strip.scrollLeft+strip.clientWidth>=strip.scrollWidth-4;}
  prev.addEventListener('click',function(){strip.scrollBy({left:-step(),behavior:'smooth'});});
  next.addEventListener('click',function(){strip.scrollBy({left:step(),behavior:'smooth'});});
  strip.addEventListener('scroll',update,{passive:true});
  window.addEventListener('resize',update);
  strip.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();next.click();}if(e.key==='ArrowLeft'){e.preventDefault();prev.click();}});
  update();
})();
