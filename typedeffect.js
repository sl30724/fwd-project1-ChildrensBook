var typed = new Typed('.typed', {
  stringsElement: '#intro',
  typeSpeed: 60,
  showCursor: false
});
// var typed1 = new Typed('.typed-1', {
//   stringsElement: '#data1-exp',
//   typeSpeed: 60,
//   showCursor: false
// });
// var typed2 = new Typed('.typed-2', {
//   stringsElement: '#data2-exp',
//   typeSpeed: 60,
//   showCursor: false
// });
// var typed3 = new Typed('.typed-3', {
//   stringsElement: '#data3-exp',
//   typeSpeed: 60,
//   showCursor: false
// });


gsap.registerPlugin(ScrollTrigger);
gsap.from("#dataViz-1", {
  scrollTrigger: {
    trigger: "#dataViz-1",
    start: "top center",
    end: "bottom 100px",
    toggleActions: "restart none none none",
  },
  opacity: 0,
  duration: 3
});

gsap.from("#dataViz-2", {
  scrollTrigger: {
    trigger: "#dataViz-2",
    start: "top center",
    end: "bottom 100px",
    toggleActions: "restart none none none",
  },
  opacity: 0,
  duration: 5
});

gsap.from("#dataViz-3", {
  scrollTrigger: {
    trigger: "#dataViz-3",
    start: "top center",
    end: "bottom 100px",
    toggleActions: "restart none none none",
  },
  opacity: 0,
  duration: 5
});