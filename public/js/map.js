// Fetch coordinates using the Nominatim API
async function getCoordinates(location) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`
    );
    const data = await response.json();
    if (data.length === 0) {
      alert("Location not found.");
      return null;
    }
    return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
}

// Initialize the map
async function initMap() {
  const location = listingLocation; // Use the global variable from the server-side

  if (!location) {
    alert("Location is not defined.");
    return;
  }

  const coordinates = await getCoordinates(location);

  if (!coordinates) {
    return;
  }

  const map = L.map("map").setView([coordinates.lat, coordinates.lon], 13);

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Add marker
  L.marker([coordinates.lat, coordinates.lon])
    .addTo(map)
    .bindPopup(`<b>${location}</b>`)
    .openPopup();
}

// Load the map
initMap();
