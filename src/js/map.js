'use strict';

let map = L.map('map').setView([62.3935925, 17.2819301], 13);

// Funktion för att starta på användarens plats
function UserLocation(position) {
    let userPos = [position.coords.latitude, position.coords.longitude];
    map.setView(userPos, 13);
    L.marker(userPos).addTo(map);
}

// funktion för om man inte har platskännedom aktiverad 
function getLocationError(error) {
    console.error('Error getting user location:', error);

    // Standardposition om man inte har platskännedom aktiverad
    map.setView([62.3935925, 17.2819301], 13);
}

// Check if geolocation is supported by the browser
if (navigator.geolocation) {
    // Get the user's current position
    navigator.geolocation.getCurrentPosition(UserLocation, getLocationError);
} else {
    console.error('Geolocation is not supported by this browser.');
}

// Lägger till kartans utseende
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Lägger till sökruta
L.Control.geocoder().addTo(map);