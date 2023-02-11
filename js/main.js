let autoScrollAllowed = true;

window.addEventListener('load', event=>{

  // Mobile: hide nav when nav item is clicked
  document.querySelectorAll("nav a").forEach(el=>{
    el.addEventListener('click', event=>{
      document.getElementById('navButton').checked = false;
      // Pause auto scroll so it doesn't conflict with scrolling to anchor
      autoScrollAllowed = false;
      setTimeout(()=>{autoScrollAllowed=true},2000);
    });
  });

  // Highlight currently visible section(s) in nav
  const sectionScrollObserver = new IntersectionObserver(observers => {
    observers.forEach(observer => {
      const id = observer.target.getAttribute('id');
      const navItem = document.querySelector(`nav a[href="#${id}"]`).parentElement;
      if (observer.intersectionRatio > 0) {
        navItem.classList.add('active');
      } else {
        navItem.classList.remove('active');
      }
    });
  });
  document.querySelectorAll('section[id]').forEach(section => {
    sectionScrollObserver.observe(section);
  });

  // Scroll nav with page
  document.addEventListener('scroll', event => {
    if (autoScrollAllowed) {
      setScrollProgress(
        document.querySelector('nav'),
        getScrollProgress(document.documentElement)
      );
    }
  });

  // Open external links in a new tab
  document.querySelectorAll('a[href]').forEach(el=>{
    if (el.getAttribute('href').startsWith('https://')
      || el.getAttribute('href').startsWith('http://')
      || el.getAttribute('href').startsWith('mailto:')) {
      el.target = "_blank";
    }
  });

});

function getScrollProgress(el) {
  const progress = el.scrollTop/(el.scrollHeight-(el.clientHeight || el.offsetHeight));
  return progress;
}

function setScrollProgress(el, yProgress) {
  const yPos = yProgress*(el.scrollHeight-(el.clientHeight || el.offsetHeight));
  el.scroll(0, yPos);
}