let latitude, longitude, destination;

$(document).ready(function () {
    alert("Pls allow the device to know your location!")
    initGeolocation();
})

$(function () {
    $("#weatherCheck-button").click(function () {
        window.location.href = `ar_weather.html?source=${latitude};${longitude}&destination=${destination.lat};${destination.lng}`
    })
})

function initGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
    }
    else {
        alert("Sorry ya browser does not support geolocation services. 😢");
    }
}

function success(position) {
    longitude = position.coords.longitude;
    latitude = position.coords.latitude

    // Initializing Mapbox
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXBvb3J2ZWxvdXMiLCJhIjoiY2ttZnlyMDgzMzlwNTJ4a240cmEzcG0xNyJ9.-nSyL0Gy2nifDibXJg4fTA';

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        zoom: 16
    });

    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        })
    );

    const popup1 = new mapboxgl.Popup()
    .setLngLat([latitude, longitude])
    .setHTML('<img id="tower" class="image-marker" src="./tower.png"/>')
    .addTo(map);

    const popup2 = new mapboxgl.Popup()
    .setLngLat([latitude+0.001, longitude-0.002])
    .setHTML('<img id="bridge" class="image-marker" src="./bridge.png"/>')
    .addTo(map);

    map.addControl(
        new MapboxDirections({
            accessToken: mapboxgl.accessToken
        }),
        'top-left'
    );

    map.on('click', function (e) {
        destination = e.lngLat;
    });
}

