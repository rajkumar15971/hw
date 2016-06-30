
var location1;
var location2;
$(document).ready(function() {
  console.log('test');
  initialize();
  
  //Grab the address values from the form on submit, and then run the maps code
  $('#map-form').submit(function(event) {
      //Also, stop the form from actually submitting
      event.preventDefault();
      address1 = $('#address1').val();
      address2 = $('#address2').val();
      //Run it, baby!
      showLocation();
  });
});
var geocoder, location1, location2;
function initialize() {
  //Create new object of the google maps api
  geocoder = new GClientGeocoder();
}
function showLocation() {
  geocoder.getLocations(address1, function (response) {
    if (!response || response.Status.code != 200)
    {
      alert("Sorry, we were unable to geocode address 1");
    }
    else
    {
      location1 = {lat: response.Placemark[0].Point.coordinates[1], lon: response.Placemark[0].Point.coordinates[0], address: response.Placemark[0].address};
      geocoder.getLocations(address2, function (response) {
        if (!response || response.Status.code != 200)
        {
          alert("Sorry, we were unable to geocode address 2");
        }
        else
        {
          location2 = {lat: response.Placemark[0].Point.coordinates[1], lon: response.Placemark[0].Point.coordinates[0], address: response.Placemark[0].address};
          calculateDistance();
        }
      });
    }
  });
}
function calculateDistance()
{
  try
  {
    var glatlng1 = new GLatLng(location1.lat, location1.lon);
    var glatlng2 = new GLatLng(location2.lat, location2.lon);
    var miledistance = glatlng1.distanceFrom(glatlng2, 3959).toFixed(1);
    var kmdistance = (miledistance * 1.609344).toFixed(1);
    //Write the value wherever you want!
    $('#mile_distance').html(miledistance);
  }
  catch (error)
  {
    alert(error);
  }
}
