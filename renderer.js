document.addEventListener("DOMContentLoaded", function () {
  const titleInput = document.getElementById("title");
  // setButton.addEventListener("click", () => {
  //   const title = titleInput.value;
  //   window.electronAPI.setTitle(title);
  // });

  const { ipcRenderer } = require("electron");

  document.getElementById("close-btn").addEventListener("click", () => {
    ipcRenderer.send("close-app");
  });

  document.getElementById("minimize-btn").addEventListener("click", () => {
    ipcRenderer.send("minimize-app");
  });

  const today = new Date()
    .toLocaleDateString("en-US", { month: "short", day: "numeric" })
    .replace(" ", ".");
  document.getElementById("date").innerHTML = today;

  const time = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
  document.getElementById("time").innerHTML = time;

  const startButton = document.getElementById("start");
  const popup = document.querySelector(".window-popup");
  const closeButton = document.getElementById("close-popup-btn");

  // Function to open popup with animation
  startButton.addEventListener("click", function () {
    popup.style.display = "block"; // Show the popup
    popup.style.bottom = "220px";
    popup.style.left = "50px";
    setTimeout(() => {
      popup.classList.add("show"); // Trigger animation
    }, 10);
  });

  // Function to close popup with fade-out effect
  closeButton.addEventListener("click", function () {
    popup.classList.remove("show"); // Start fade-out
    setTimeout(() => {
      popup.style.display = "none"; // Hide after animation ends
    }, 300); // Matches CSS transition time
  });

  const wakeButton = document.getElementById("wake");
  const dreamButton = document.getElementById("dream");
  const wakePopup = document.getElementById("wake-popup");
  const dreamPopup = document.getElementById("dream-popup");
  const closeWakeButton = document.getElementById("close-wake-popup-btn");
  const closeDreamButton = document.getElementById("close-dream-popup-btn");

  wakeButton.addEventListener("click", function () {
    wakePopup.style.display = "block"; // Show the popup
    wakePopup.style.top = "220px";
    wakePopup.style.right = "50px";
    setTimeout(() => {
      wakePopup.classList.add("show"); // Trigger animation
    }, 10);
    dreamButton.disabled = true; // Disable dream button
  });

  // Function to close popup with fade-out effect
  closeWakeButton.addEventListener("click", function () {
    wakePopup.classList.remove("show"); // Start fade-out
    setTimeout(() => {
      wakePopup.style.display = "none"; // Hide after animation ends
    }, 300); // Matches CSS transition time
    dreamButton.disabled = false; // Enable dream button
  });

  dreamButton.addEventListener("click", function () {
    dreamPopup.style.display = "block"; // Show the popup
    dreamPopup.style.top = "220px";
    dreamPopup.style.right = "50px";
    setTimeout(() => {
      dreamPopup.classList.add("show"); // Trigger animation
    }, 10);
    wakeButton.disabled = true; // Disable dream button
  });

  // Function to close popup with fade-out effect
  closeDreamButton.addEventListener("click", function () {
    dreamPopup.classList.remove("show"); // Start fade-out
    setTimeout(() => {
      dreamPopup.style.display = "none"; // Hide after animation ends
    }, 300); // Matches CSS transition time
    wakeButton.disabled = false; // Enable dream button
  });

const API_KEY = "28b2915b0b8b4317b4c82528250902"; // Replace with your WeatherAPI key
const CITY = "Athens"; // Change to your city
const weatherButton = document.getElementById("weather");

// Function to fetch and update weather
function fetchWeather() {
  weatherButton.textContent = "Updating..."; // Show loading state

  fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY}`)
    .then((response) => response.json())
    .then((data) => {
      const temperature = Math.round(data.current.temp_c); // Get temperature in Celsius
      const description = data.current.condition.text; // Get weather description

      // Update button text with weather info
      weatherButton.textContent = `${temperature}°C • ${description}`;
    })
    .catch((error) => {
      console.error("Error fetching weather:", error);
      weatherButton.textContent = "loading..."; // Fallback text
    });
}

// Initial fetch when the page loads
fetchWeather();

// Add event listener to refresh weather when button is clicked
weatherButton.addEventListener("click", fetchWeather);

});
