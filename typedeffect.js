var typed = new Typed('.typed', {
  stringsElement: '#typed-intro',
  typeSpeed: 60,
  showCursor: false
});


gsap.registerPlugin(ScrollTrigger);
gsap.from("#dataViz-1", {
  scrollTrigger: {
    trigger: "#dataViz-1",
    start: "top center",
    end: "bottom 100px",
    toggleActions: "restart none none none"
  },
  opacity: 0,
  duration: 3
});
gsap.from("#typed-intro", {
  scrollTrigger: {
    trigger: "#dataViz-1",
    start: "top center",
    end: "bottom 100px",
    toggleActions: "restart none none none"
  },
  opacity: 0,
  duration: 3
});