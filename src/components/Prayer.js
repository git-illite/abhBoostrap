import React, { useState, useEffect } from "react";

const PrayerTimes = () => {
  const [prayerTimes, setPrayerTimes] = useState({
    fajr: "N/A",
    zuhr: "N/A",
    asr: "N/A",
    maghrib: "N/A",
    isha: "N/A",
    jumuah: "N/A",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrayerTimes = async () => {
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

        const times = {};
        rows.forEach((row) => {
          const cells = row.querySelectorAll("td");
          if (cells.length > 0) {
            const prayerName = cells[0].textContent.trim();
            const prayerTime = cells[1].textContent.trim();

            switch (prayerName) {
              case "Fajr":
                times.fajr = prayerTime;
                break;
              case "Dhuhr":
                times.zuhr = prayerTime;
                break;
              case "Asr":
                times.asr = prayerTime;
                break;
              case "Maghrib":
                times.maghrib = prayerTime;
                break;
              case "Isha":
                times.isha = prayerTime;
                break;
              default:
                console.log(`Sorry, something isn't working`);
            }
          }
        });

        // Assume a default time for Jumuah
        times.jumuah = times.zuhr >= "12:45 pm" ? "1:30 pm" : "1:00 pm";

        setPrayerTimes(times);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
        setError(error.message);
      }
    };

    fetchPrayerTimes();
  }, []);

  return (
    <section id="stats" className="stats container ">
      <div className="row my-6">
        {Object.entries(prayerTimes).map(([key, time]) => (
          <div key={key} className="col-lg-2 col-md-4 col-sm-6 text-center">
            <h2 className="counter xl-text-2">{time}</h2>
            <span className="text-secondary fw-bold">{key.toUpperCase()}</span>
          </div>
        ))}
        {error && <p>Error: {error}</p>}
      </div>
    </section>
  );
};

export default PrayerTimes;
