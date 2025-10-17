<script>
(function () {
  function initCarousel(group) {
    const controls = group.querySelector('.carousel-controls');
    const trackId = controls?.getAttribute('data-for');
    const track = trackId ? document.getElementById(trackId) : group.querySelector('.news-track');
    if (!track) return;

    const prev = controls?.querySelector('.prev');
    const next = controls?.querySelector('.next');
    const dotsWrap = controls?.querySelector('.carousel-dots');

    const slides = Array.from(track.querySelectorAll('.news-card'));
    const slideW = () => slides[0]?.getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap || 0) || 320;

    // Dots
    if (dotsWrap) {
      dotsWrap.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.type = 'button';
        dot.addEventListener('click', () => track.scrollTo({ left: i * slideW(), behavior: 'smooth' }));
        dotsWrap.appendChild(dot);
      });
    }

    function update() {
      const idx = Math.round(track.scrollLeft / slideW());
      if (prev) prev.disabled = idx <= 0;
      if (next) next.disabled = idx >= slides.length - 1;
      if (dotsWrap) {
        dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
          d.setAttribute('aria-current', i === idx ? 'true' : 'false');
        });
      }
    }

    prev?.addEventListener('click', () => track.scrollBy({ left: -slideW(), behavior: 'smooth' }));
    next?.addEventListener('click', () => track.scrollBy({ left:  slideW(), behavior: 'smooth' }));
    track.addEventListener('scroll', () => { window.requestAnimationFrame(update); });
    window.addEventListener('resize', () => { window.requestAnimationFrame(update); });

    update(); // initial
  }

  document.querySelectorAll('.news-carousel').forEach(initCarousel);
})();
</script>