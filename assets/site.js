(function(){
var MENU='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu" aria-hidden="true" data-tsd-source="/src/components/site-chrome.tsx:80:46"><path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path></svg>', CLOSE='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x" aria-hidden="true" data-tsd-source="/src/components/site-chrome.tsx:80:19"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>';
var here=location.pathname.replace(/index\.html$/,'').replace(/\/+$/,'')||'/';
function norm(a){var p=new URL(a.getAttribute('href'),location.href).pathname.replace(/index\.html$/,'').replace(/\/+$/,'');return p||'/';}
// active nav links
var base=norm({getAttribute:function(){return document.querySelector('header a').getAttribute('href')}});
document.querySelectorAll('header nav a, footer nav[aria-label="Footer"] a').forEach(function(a){
  var p=norm(a), active=p===base?here===base:(here===p||here.indexOf(p+'/')===0);
  if(a.getAttribute('role')==='menuitem')return;
  if(active){a.classList.add('font-semibold');a.setAttribute('aria-current','page');}
});
// mobile menu
var btn=document.querySelector('[aria-controls="mobile-nav"]'),nav=document.getElementById('mobile-nav');
if(btn&&nav){btn.addEventListener('click',function(){var open=nav.hidden;nav.hidden=!open;btn.setAttribute('aria-expanded',open);btn.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');var s=btn.querySelector('svg');if(s)s.outerHTML=open?CLOSE:MENU;});}
// case studies dropdown
var t=document.getElementById('studies-trigger'),menu=document.getElementById('studies-menu');
if(t&&menu){var items=menu.querySelectorAll('a');
  function show(f){menu.hidden=false;t.setAttribute('aria-expanded','true');if(f)items[0].focus();}
  function hide(r){menu.hidden=true;t.setAttribute('aria-expanded','false');if(r)t.focus();}
  t.addEventListener('click',function(e){e.stopPropagation();menu.hidden?show(e.detail===0):hide();});
  t.addEventListener('keydown',function(e){if(e.key==='ArrowDown'){e.preventDefault();show(true);}});
  menu.addEventListener('keydown',function(e){var i=[].indexOf.call(items,document.activeElement);
    if(e.key==='Escape'){hide(true);}else if(e.key==='ArrowDown'){e.preventDefault();items[(i+1)%items.length].focus();}
    else if(e.key==='ArrowUp'){e.preventDefault();items[(i-1+items.length)%items.length].focus();}else if(e.key==='Tab'){hide();}});
  document.addEventListener('click',function(e){if(!menu.hidden&&!menu.contains(e.target))hide();});}
// footer year
document.querySelectorAll('footer p').forEach(function(p){p.innerHTML=p.innerHTML.replace(/© \d{4}/,'© '+new Date().getFullYear());});
// lightbox
var box=null,prev='';
function closeBox(){if(!box)return;box.remove();box=null;document.body.style.overflow=prev;}
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeBox();});
document.addEventListener('click',function(e){var tr=e.target.closest&&e.target.closest('[data-lightbox]');if(!tr||box)return;e.preventDefault();
  var src=tr.getAttribute('data-full')||tr.currentSrc||tr.src,alt=tr.alt||'';
  box=document.createElement('div');box.setAttribute('role','dialog');box.setAttribute('aria-modal','true');
  box.setAttribute('aria-label',alt?'Enlarged image: '+alt:'Enlarged image');
  box.className='fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 cursor-zoom-out';
  box.innerHTML='<button type="button" aria-label="Close image" class="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white text-2xl leading-none hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">×</button><img class="max-h-[92vh] max-w-[95vw] object-contain shadow-2xl">';
  var im=box.querySelector('img');im.src=src;im.alt=alt;im.addEventListener('click',function(ev){ev.stopPropagation();});
  box.addEventListener('click',closeBox);document.body.appendChild(box);prev=document.body.style.overflow;document.body.style.overflow='hidden';box.querySelector('button').focus();});
})();
