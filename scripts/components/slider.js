export function slider() {
  let current = 0;
  const totalSlides = 2;
  let timer;

  function autoSlide() {
    const slide =document.getElementById("slide" + current);
    if (!slide) return; 
    document.getElementById("slide" + current).checked = true;
    current++;
    if (current > totalSlides) {
      current = 0;
    }
    timer = setTimeout(autoSlide, 4000);
  }

  autoSlide();

  document.querySelectorAll(".navigation label").forEach((label, index) => {
    label.addEventListener("click", () => {
      clearTimeout(timer);
      current = index + 1;
      autoSlide();
    });
  });
}
