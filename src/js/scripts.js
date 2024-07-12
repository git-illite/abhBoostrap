function userScroll() {
  const navbar = document.querySelector(".navbar");
  const toTopBtn = document.querySelector("#to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-sticky");
     
     // toTopBtn.classList.add("show");
    } else {
      navbar.classList.remove("navbar-sticky");
    //  toTopBtn.classList.remove("show");
    }
  });
}

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

document.addEventListener("DOMContentLoaded", function () {
  userScroll();
});

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
  fetch("/js/testimonials.json")
    .then((response) => response.json())
    .then((data) => {
      const testimonialsContainer = document.querySelector(".carousel-inner");
      let testimonialsHTML = "";
      const itemsPerSlide = 3; // Number of testimonials per slide

      for (let i = 0; i < data.length; i += itemsPerSlide) {
        const activeClass = i === 0 ? "active" : "";
        testimonialsHTML += `
                <div class="carousel-item ${activeClass}">
                    <div class="d-flex justify-content-around">
                        ${data
                          .slice(i, i + itemsPerSlide)
                          .map(
                            (testimonial) => `
                            <div class="testimonial-card p-4 bg-white shadow-sm rounded mx-2">
                                <img src="${testimonial.image}" alt="${testimonial.name}" class="img-fluid mb-3 rounded-circle" width="100">
                                <h5 class="fw-bold text-center">${testimonial.name}</h5>
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                </div>
            `;
      }

      testimonialsContainer.innerHTML = testimonialsHTML;
    })
    .catch((error) => console.error("Error fetching testimonials:", error));
});
document.querySelector("#to-top").addEventListener("click", scrollToTop);
