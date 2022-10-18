var typed = new Typed('.typed', {
  stringsElement: '#intro',
  typeSpeed: 60,
  showCursor: false
});

gsap.registerPlugin(ScrollTrigger);
gsap.from("#data1", {
  scrollTrigger: {
    trigger: "#data1",
    start: "center center",
    end: "bottom 100px",
    toggleActions: "restart none none none",
  },
  opacity: 0,
  duration: 3
});

gsap.from("#data2", {
  scrollTrigger: {
    trigger: "#data2",
    start: "center center",
    end: "bottom 100px",
    toggleActions: "restart none none none",
  },
  opacity: 0,
  duration: 5
});

gsap.from("#data3", {
  scrollTrigger: {
    trigger: "#data3",
    start: "center center",
    end: "bottom 100px",
    toggleActions: "restart none none none",
  },
  opacity: 0,
  duration: 5
});