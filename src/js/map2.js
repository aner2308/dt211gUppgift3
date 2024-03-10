'use strict';

// Skapa kartan
let map = L.map('map').setView([62.3935925, 17.2819301], 13);

// Lägg till OpenStreetMap-lager
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Skapa en marker för att visa platsen
let marker = L.marker([62.3935925, 17.2819301]).addTo(map);

// Funktion för att hämta platsinformation med Fetch API
function searchLocation(place) {
    // Gör ett Fetch-anrop till nominatim.openstreetmap.org för att hämta platsinformation, och lägger in ens platssökning i länken
    fetch(`https://nominatim.openstreetmap.org/search?q=${place}&format=json`)
    .then(response => response.json())
    .then(data => {
        // Om data finns, uppdatera kartans vy och markera platsen
        if (data.length > 0) {
            let lat = parseFloat(data[0].lat);
            let lon = parseFloat(data[0].lon);
            map.setView([lat, lon], 13); // Uppdatera kartans vy till den nya platsen
            marker.setLatLng([lat, lon]); // Flytta markören till den nya platsen
        } else {
            alert('Platsen kunde inte hittas...');
        }
    })
    .catch(error => {
        console.error('Det uppstod ett fel:', error);
    });
}

// Händelsehanterare för sökknappen
document.getElementById('searchBtn').addEventListener('click', function() {
    let place = document.getElementById('searchInput').value;
    if (place.trim() !== '') {
        searchLocation(place);
    } else {
        alert('Du verkar ha lämnat sökrutan tom. Vänligen skriv in en plats.');
    }
});

// Funktion för att hämta användarens position med Geolocation API
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let userLatLng = [position.coords.latitude, position.coords.longitude];
            map.setView(userLatLng, 13); // Uppdatera kartans vy till användarens position
            marker.setLatLng(userLatLng); // Flytta markören till användarens position
        }, function(error) {
            console.error('Fel vid hämtning av användarens plats:', error);
            alert('Kunde inte hämta användarens plats.');
        });
    } else {
        alert('Geolocation stöds inte i denna webbläsare.');
    }
}

// Händelsehanterare för knappen för att hämta användarens position
document.getElementById('userLocationBtn').addEventListener('click', function() {
    getUserLocation();
});

