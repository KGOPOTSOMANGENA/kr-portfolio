const weatherCodeMap = {
  0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️",
  45: "🌫️", 48: "🌫️",
  51: "🌦️", 53: "🌦️", 55: "🌧️",
  61: "🌧️", 63: "🌧️", 65: "🌧️",
  71: "🌨️", 73: "🌨️", 75: "❄️",
  80: "🌦️", 81: "🌧️", 82: "⛈️",
  95: "⛈️", 96: "⛈️", 99: "⛈️"
};

async function loadWeather() {
  const iconEl = document.getElementById("weather-icon");
  const tempEl = document.getElementById("weather-temp");

  if (!navigator.geolocation) {
    iconEl.textContent = "❓";
    return;
  }

  navigator.geolocation.getCurrentPosition(async (pos) => {
    const { latitude, longitude } = pos.coords;
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
      );
      const data = await res.json();
      const temp = Math.round(data.current.temperature_2m);
      const code = data.current.weather_code;

      iconEl.textContent = weatherCodeMap[code] || "🌡️";
      tempEl.textContent = `${temp}°C`;

      // store for weather.html to reuse
      localStorage.setItem("lastWeather", JSON.stringify({ temp, code, latitude, longitude }));
    } catch (err) {
      iconEl.textContent = "⚠️";
      console.error("Weather fetch failed:", err);
    }
  }, () => {
    // user denied location
    iconEl.textContent = "📍";
    tempEl.textContent = "N/A";
  });
}

document.addEventListener("DOMContentLoaded", loadWeather);