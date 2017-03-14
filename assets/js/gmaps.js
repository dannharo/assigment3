//get user location
navigator.geolocation.getCurrentPosition(ok_position, error_position);
//sond for the click event
var audio = new Audio("assets/files/sound.wav");
// var for the img
var image = 'assets/img/atm-icon.png';
var youare = 'assets/img/you-are-here.png';
var comingSon = 'assets/img/coming-soon-tag.png';
//id for the new markers
var idpoint = 0;
//function is geolocation is O.K
function ok_position(CoordUser) {
    //var for the lat and lng on the user location
    var ulat = CoordUser.coords.latitude;
    var ulon = CoordUser.coords.longitude;
    //var for div map
    var divmap = document.getElementById('Map');
    // google var for the lat and lng
    var userLocation = new google.maps.LatLng(ulat, ulon);
    //google var for the initial markers
    var atm1 = new google.maps.LatLng(19.243114, -103.727413);
    var atm2 = new google.maps.LatLng(19.246730, -103.721689);
    var atm3 = new google.maps.LatLng(20.675492, -101.350357);
    //Creation of the Gmap
    var gmap = new google.maps.Map(divmap, {
        center: userLocation,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    //Marker for the user location
    var marker = new google.maps.Marker({
        position: userLocation,
        map: gmap,
        title: 'your location',
        icon: youare,
        animation: google.maps.Animation.DROP

    });
    //Maker for the atm and the line to the user----------------------------------------------------
    var m_Atm1 = new google.maps.Marker({
        position: atm1,
        map: gmap,
        title: 'ATM 1',
        icon: image,
        animation: google.maps.Animation.DROP
    });
    var amtline1 = new google.maps.Polyline({
        path: [
            userLocation,
            atm1
        ],
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 1,
        map: gmap
    });
    var kim = calcDistance(userLocation, atm1);
    var km = document.getElementById("table");
    km.innerHTML += "<th>You are " + kim + " km from the ATM 1 </th>";
    google.maps.event.addListener(m_Atm1, "click", function() {
        audio.play();
    });
    var m_Atm2 = new google.maps.Marker({
        position: atm2,
        map: gmap,
        title: 'ATM 2',
        icon: image,
        animation: google.maps.Animation.DROP
    });
    var atmline2 = new google.maps.Polyline({
        path: [
            userLocation,
            atm2
        ],
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 1,
        map: gmap
    });
    var kim = calcDistance(userLocation, atm2);
    var km = document.getElementById("table");
    km.innerHTML += "<th>You are " + kim + " km from the ATM 2 </th>";
    google.maps.event.addListener(m_Atm2, "click", function() {
        audio.play();
    });
    var m_Atm3 = new google.maps.Marker({
        position: atm3,
        map: gmap,
        title: 'ATM 3',
        icon: image,
        animation: google.maps.Animation.DROP
    });
    var atmline3 = new google.maps.Polyline({
        path: [
            userLocation,
            atm3
        ],
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 1,
        map: gmap
    });
    var kim = calcDistance(userLocation, atm3);
    var km = document.getElementById("table");
    km.innerHTML += "<th>You are " + kim + " km from the ATM 3 </th>";

    google.maps.event.addListener(m_Atm3, "click", function() {
        audio.play();
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Sond for the event click on Marker
    google.maps.event.addListener(marker, "click", function() {
        audio.play();
    });
    //Zoom out on click user Marker
    marker.addListener('click', function() {
        //gmap.setZoom(8);
        //  gmap.setCenter(marker.getPosition());


    });
    // listener for click on the map for set a new Marker
    gmap.addListener('click', function(e) {
        placeMarkerAndPanTo(e.latLng, gmap);
    });

    //Creation of a new Marker
    function placeMarkerAndPanTo(latLng, gmap) {
        var marker = new google.maps.Marker({
            position: latLng,
            map: gmap,
            icon: comingSon,
            animation: google.maps.Animation.DROP
        });
        gmap.panTo(latLng);
        //Sond for the event click on Marker
        google.maps.event.addListener(marker, "click", function() {
            audio.play();
        });

        audio.play();
        var kim = calcDistance(userLocation, latLng);
        idpoint = idpoint + 1;
        var km = document.getElementById("table");
        km.innerHTML += "<tr><th>You are " + kim + " km from the ponit you sugestd for a new ATM " + idpoint + "</th></tr>";
        var line = new google.maps.Polyline({
            path: [
                userLocation,
                latLng
            ],
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 1,
            map: gmap
        });
    }

    function calcDistance(p1, p2) {
        return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
    }

}

//Funciontion for some error in the geolocation
function error_position() {
    alert('Error en la geolocalización');
}
