(() => {
  'use strict';
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const active = new Set();
  function animate(el, frames, options) {
    if (!el || motion.matches || !el.animate) return;
    const a = el.animate(frames, options); active.add(a);
    a.onfinish = a.oncancel = () => active.delete(a);
  }
  motion.addEventListener('change', () => { if (motion.matches) active.forEach(a => a.cancel()); });
  const rise = [{opacity:.2,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}];
  const timing = {duration:750,easing:'cubic-bezier(.2,.75,.25,1)'};
  document.querySelectorAll('header .brand, main h1, main .eyebrow, .hero p, .hero .cta, .hero .secondary, .back-nav').forEach((el,i) => animate(el,rise,{...timing,delay:Math.min(i*65,350)}));
  animate(document.querySelector('.portrait'),[{opacity:.2,transform:'scale(.96)',filter:'brightness(.85)'},{opacity:1,transform:'scale(1)',filter:'brightness(1)'}],{...timing,duration:1100});
  const cards = document.querySelectorAll('.service, .inner > p, .social > a, form');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry,i) => { if(entry.isIntersecting) { animate(entry.target,rise,{...timing,delay:Math.min(i*100,300)}); observer.unobserve(entry.target); } });
    },{threshold:0.1});
    cards.forEach(el => observer.observe(el));
  } else { cards.forEach(el => animate(el,rise,timing)); }
  document.querySelectorAll('.cta, .back-link, button').forEach(el => {
    const glow = () => animate(el,[{boxShadow:'0 0 0 0 #efd1a000'},{boxShadow:'0 0 22px 3px #efd1a066'},{boxShadow:'0 0 0 0 #efd1a000'}],{duration:850,easing:'ease-out'});
    el.addEventListener('pointerenter',glow); el.addEventListener('focus',glow);
  });
})();
