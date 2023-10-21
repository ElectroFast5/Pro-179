var coordinates = {}

$(document).ready(function(){
    getCoordinates()
})

function getCoordinates() {
    // sp means 'search parameters'
    var sp = new URLSearchParams(window.location.search)
    if(sp.has("source") && sp.has("destination")) {
        var source = sp.get("source")
        var destination = sp.get("destination")
        coordinates.source_lat = source.split(";")[0]
        coordinates.source_lon = source.split(';')[1]
        coordinates.destination_lat = destination.split(";")[0]
        coordinates.destination_lon = destination.split(';')[1]
    } else {
        alert("Select da coordinates pls")
        window.history.back()
    }
}