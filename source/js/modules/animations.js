function startAnimation(el) {
  const animName = el.getAttribute('data-anim-name');

  if (animName === 'fade-in-up') {
    el.style.transform = 'translateY(0)';
    el.style.opacity = '1';
  } else if (animName === 'fade-in-right' || animName === 'fade-in-left') {
    el.style.transform = 'translateX(0)';
    el.style.opacity = '1';
  } else if (animName === 'fade-in') {
    el.style.opacity = '1';
  }
}

function initAnimations() {
  const animatedElements = document.querySelectorAll('[data-anim]');
  const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startAnimation(entry.target);
      }
    });
  });

  animatedElements.forEach((el) => {
    observer.observe(el);
  });
}

export {initAnimations};
