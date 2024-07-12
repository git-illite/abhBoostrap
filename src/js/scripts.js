function userScroll() {
  const navbar = document.querySelector(".navbar");
  const toTopBtn = document.querySelector("#to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-sticky");
      console.log("listener called");
      toTopBtn.classList.add("show");
    } else {
      navbar.classList.remove("navbar-sticky");
      toTopBtn.classList.remove("show");
    }
  });
}

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

async function fetchPrayerTimes() {
  try {
    const response = await fetch(
      "https://api.allorigins.win/raw?url=https://themasjidapp.org/50/prayers"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();

    // Parse the HTML and extract prayer times
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");

    const rows = doc.querySelectorAll("tr.whitespace-nowrap");

    let fajrTime, zuhrTime, asrTime, maghribTime, ishaTime;

    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      if (cells.length > 0) {
        const prayerName = cells[0].textContent.trim();
        const prayerTime = cells[1].textContent.trim();

        switch (prayerName) {
          case "Fajr":
            fajrTime = prayerTime;
            break;
          case "Dhuhr":
            zuhrTime = prayerTime;
            break;
          case "Asr":
            asrTime = prayerTime;
            break;
          case "Maghrib":
            maghribTime = prayerTime;
            break;
          case "Isha":
            ishaTime = prayerTime;
            break;
        }
      }
    });

    // Update the DOM with prayer times
    document.getElementById("fajrCounter").textContent = fajrTime || "N/A";
    document.getElementById("zuhrCounter").textContent = zuhrTime || "N/A";
    document.getElementById("asrCounter").textContent = asrTime || "N/A";
    document.getElementById("maghribCounter").textContent =
      maghribTime || "N/A";
    document.getElementById("ishaCounter").textContent = ishaTime || "N/A";
    document.getElementById("jumuahCounter").textContent =
      zuhrTime >= "12:45 pm" ? "1:30 pm" : "1:00 pm";
  } catch (error) {
    console.error("Error fetching prayer times:", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  fetchPrayerTimes();
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
