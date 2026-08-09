document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('a,button').forEach(el=>el.addEventListener('click',()=>{if(!window.AudioContext)return;const c=new AudioContext(),o=c.createOscillator(),g=c.createGain();o.frequency.value=720;g.gain.setValueAtTime(.05,c.currentTime);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+.12);o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+.13)}))});
/* Shared return button for the Month 6 level selector. */
function addAllLevelsButton() {
  if (document.getElementById('all-levels-home')) return;
  const currentUrl = new URL(window.location.href);
  const folderMatch = currentUrl.pathname.match(/^(.*\/)Level[ABC]_Month6\//i);
  if (!folderMatch) return;
  currentUrl.pathname = folderMatch[1] + 'index.html';
  currentUrl.search = '';
  currentUrl.hash = '';
  const link = document.createElement('a');
  link.id = 'all-levels-home';
  link.href = currentUrl.href;
  link.setAttribute('aria-label', 'Return to all levels');
  link.innerHTML = '&#127968; All Levels';
  Object.assign(link.style, {
    position: 'fixed', top: '14px', right: '14px', zIndex: '10000',
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    padding: '10px 17px', border: '3px solid #fff', borderRadius: '999px',
    color: '#fff', background: 'linear-gradient(#7c6bd3,#5e4ab9)',
    boxShadow: '0 5px 0 #46348e,0 8px 18px rgba(45,35,92,.24)',
    fontFamily: 'inherit', fontWeight: '800', textDecoration: 'none'
  });
  document.body.appendChild(link);
}

document.addEventListener('DOMContentLoaded', addAllLevelsButton);
