// // ------------------------------------------------------------------------

// function initMap() {
//   // Create the map.
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 4,
//     center: { lat: 37.090, lng: -95.712 },
//     mapTypeId: 'terrain'
//   });

//   // Construct the circle for each value in cities.
//   // Note: We scale the area of the circle based on the population.
//   for (var city in cities) {
//     // Add the circle for this city to the map.
//     var cityCircle = new google.maps.Circle({
//       strokeColor: '#FF0000',
//       strokeOpacity: 0.8,
//       strokeWeight: 2,
//       fillColor: '#FF0000',
//       fillOpacity: 0.35,
//       map: map,
//       center: cities[city].center,
//       radius: Math.sqrt(cities[city].population) * 100
//     });

//     console.log(cityCircle);
//   }
// }

// ------------------------------------------------------------------------
$(document).ready(function () {
  initialize();
});

// const cities = [
//   { lat: 41.878, lng: -87.629 },
//   { lat: 40.714, lng: -74.005 },
//   { lat: 34.052, lng: -118.243 },
//   { lat: 49.25, lng: -123.1 }
// ];

// still need:

console.log(cities);

function initialize() {
  var map;

  var mapOptions = {
    zoom: 4.5,
    mapTypeControl: false,
    center: new google.maps.LatLng(39.0997, -94.5786)
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // image from external URL
  var myIcon = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/cheshire1-icon.png';

  //preparing the image so it can be used as a marker
  //https://developers.google.com/maps/documentation/javascript/reference#Icon
  //includes hacky fix "size" to allow for wobble
  var catIcon = {
    url: myIcon,
    size: new google.maps.Size(100, 60),
    scaledSize: new google.maps.Size(70, 60),
    origin: new google.maps.Point(-15, 0)
  }

  var markersArr = [];
  var lastInIndex = 0;
  var ms = 4000
  var seconds = ms / 1000;
  var citiesLength = cities.length - 1;
  /*
    - every random(0 < x < 4) sec choose a random number between 0 and cities.length - 1
    - pass random number (index) with coords to showMarker

  */

  // setInterval that calls generateRandomSecond, which passes its Second to a setTimeout as time,
  // as callback to setTimeout, generate random index of cities, and get cities[i].coords, and pass to showMarker

  var intervalID = window.setInterval(generateRandomSecond, 250);

  function generateRandomSecond() {
    var sec = Math.floor(Math.random() * (seconds + 1));

    setTimeout(getCity, sec * 1000);
  }

  function getCity() {
    var randomIndex = Math.floor(Math.random() * (citiesLength + 1));

    var cityCoords = {
      lat: cities[randomIndex].latitude,
      lng: cities[randomIndex].longitude
    };

    showMarker(cityCoords);
  }

  function showMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
    markersArr.push(marker);

    var lastMarkerIndex = lastInIndex;
    lastInIndex++;

    function removeLastMarker(lastMarkerIndex) {
      window.setTimeout(function () {
        remove(lastMarkerIndex);
      }, 2000);

      function remove(i) {
        markersArr[i].setMap(null);
      }
    }

    removeLastMarker(lastMarkerIndex);
  }

  // for (var i = 0; i < cities.length; i++) {
  //   var cityCoord = {
  //     lat: cities[i].latitude,
  //     lng: cities[i].longitude
  //   };
  //   showMarker(cityCoord);
  // }

  /*
  //If you want to do this without wobble animation no need for hacky fix
  var catIcon = {
    url: myIcon,
    size: new google.maps.Size(70, 60),
    scaledSize: new google.maps.Size(70, 60),
    origin: new google.maps.Point(0,0)
  }*/

  // //gets GeoJSON from external file
  // $.getJSON("https://codepen.io/kevinkononenko/pen/dMKzgG.js", function (data) {
  //   var length = data.features.length

  //   for (var i = 0; i < length; i++) {
  //     var eachData = data.features[i].properties
  //     var latLng = new google.maps.LatLng(eachData.Latitude, eachData.Longitude);
  //     var marker = new google.maps.Marker({
  //       position: latLng,
  //       map: map,
  //       // set the icon as catIcon declared above
  //       icon: catIcon,
  //       // must use optimized false for CSS
  //       optimized: false,
  //       title: markerArr.length.toString()
  //     });

  //     // markerArr.push(marker);

  //     //add a click handler that does nothing at the moment
  //     // google.maps.event.addListener(marker, 'click', function () {
  //     //   var thisTitle = Number(this.title);
  //     //   //$('#markerLayer img').eq(thisTitle)
  //     // })
  //   }
  // });

  // Overlay view allows you to organize your markers in the DOM
  // https://developers.google.com/maps/documentation/javascript/reference#OverlayView
  // var myoverlay = new google.maps.OverlayView();
  // myoverlay.draw = function () {
  //   // add an id to the layer that includes all the markers so you can use it in CSS
  //   this.getPanes().markerLayer.id = 'markerLayer';
  // };
  // myoverlay.setMap(map);
}

// use jQuery to change the markers animation based on toggle button
// $('.btn').click(function () {
//   var type = $(this).data('anim');
//   $('#markerLayer img').css('animation', type + ' 1s infinite alternate');
//   $('#markerLayer img').css('-webkit-animation', type + ' 1s infinite alternate')
// })

// -------------------------------


var cities = [
  {
    "city": "New York",
    "growth_from_2000_to_2013": "4.8%",
    "latitude": 40.7127837,
    "longitude": -74.0059413,
    "population": "8405837",
    "rank": "1",
    "state": "New York"
  },
  {
    "city": "Los Angeles",
    "growth_from_2000_to_2013": "4.8%",
    "latitude": 34.0522342,
    "longitude": -118.2436849,
    "population": "3884307",
    "rank": "2",
    "state": "California"
  },
  {
    "city": "Chicago",
    "growth_from_2000_to_2013": "-6.1%",
    "latitude": 41.8781136,
    "longitude": -87.6297982,
    "population": "2718782",
    "rank": "3",
    "state": "Illinois"
  },
  {
    "city": "Houston",
    "growth_from_2000_to_2013": "11.0%",
    "latitude": 29.7604267,
    "longitude": -95.3698028,
    "population": "2195914",
    "rank": "4",
    "state": "Texas"
  },
  {
    "city": "Philadelphia",
    "growth_from_2000_to_2013": "2.6%",
    "latitude": 39.9525839,
    "longitude": -75.1652215,
    "population": "1553165",
    "rank": "5",
    "state": "Pennsylvania"
  },
  {
    "city": "Phoenix",
    "growth_from_2000_to_2013": "14.0%",
    "latitude": 33.4483771,
    "longitude": -112.0740373,
    "population": "1513367",
    "rank": "6",
    "state": "Arizona"
  },
  {
    "city": "San Antonio",
    "growth_from_2000_to_2013": "21.0%",
    "latitude": 29.4241219,
    "longitude": -98.49362819999999,
    "population": "1409019",
    "rank": "7",
    "state": "Texas"
  },
  {
    "city": "San Diego",
    "growth_from_2000_to_2013": "10.5%",
    "latitude": 32.715738,
    "longitude": -117.1610838,
    "population": "1355896",
    "rank": "8",
    "state": "California"
  },
  {
    "city": "Dallas",
    "growth_from_2000_to_2013": "5.6%",
    "latitude": 32.7766642,
    "longitude": -96.79698789999999,
    "population": "1257676",
    "rank": "9",
    "state": "Texas"
  },
  {
    "city": "San Jose",
    "growth_from_2000_to_2013": "10.5%",
    "latitude": 37.3382082,
    "longitude": -121.8863286,
    "population": "998537",
    "rank": "10",
    "state": "California"
  },
  {
    "city": "Austin",
    "growth_from_2000_to_2013": "31.7%",
    "latitude": 30.267153,
    "longitude": -97.7430608,
    "population": "885400",
    "rank": "11",
    "state": "Texas"
  },
  {
    "city": "Indianapolis",
    "growth_from_2000_to_2013": "7.8%",
    "latitude": 39.768403,
    "longitude": -86.158068,
    "population": "843393",
    "rank": "12",
    "state": "Indiana"
  },
  {
    "city": "Jacksonville",
    "growth_from_2000_to_2013": "14.3%",
    "latitude": 30.3321838,
    "longitude": -81.65565099999999,
    "population": "842583",
    "rank": "13",
    "state": "Florida"
  },
  {
    "city": "San Francisco",
    "growth_from_2000_to_2013": "7.7%",
    "latitude": 37.7749295,
    "longitude": -122.4194155,
    "population": "837442",
    "rank": "14",
    "state": "California"
  },
  {
    "city": "Columbus",
    "growth_from_2000_to_2013": "14.8%",
    "latitude": 39.9611755,
    "longitude": -82.99879419999999,
    "population": "822553",
    "rank": "15",
    "state": "Ohio"
  },
  {
    "city": "Charlotte",
    "growth_from_2000_to_2013": "39.1%",
    "latitude": 35.2270869,
    "longitude": -80.8431267,
    "population": "792862",
    "rank": "16",
    "state": "North Carolina"
  },
  {
    "city": "Fort Worth",
    "growth_from_2000_to_2013": "45.1%",
    "latitude": 32.7554883,
    "longitude": -97.3307658,
    "population": "792727",
    "rank": "17",
    "state": "Texas"
  },
  {
    "city": "Detroit",
    "growth_from_2000_to_2013": "-27.1%",
    "latitude": 42.331427,
    "longitude": -83.0457538,
    "population": "688701",
    "rank": "18",
    "state": "Michigan"
  },
  {
    "city": "El Paso",
    "growth_from_2000_to_2013": "19.4%",
    "latitude": 31.7775757,
    "longitude": -106.4424559,
    "population": "674433",
    "rank": "19",
    "state": "Texas"
  },
  {
    "city": "Memphis",
    "growth_from_2000_to_2013": "-5.3%",
    "latitude": 35.1495343,
    "longitude": -90.0489801,
    "population": "653450",
    "rank": "20",
    "state": "Tennessee"
  },
  {
    "city": "Seattle",
    "growth_from_2000_to_2013": "15.6%",
    "latitude": 47.6062095,
    "longitude": -122.3320708,
    "population": "652405",
    "rank": "21",
    "state": "Washington"
  },
  {
    "city": "Denver",
    "growth_from_2000_to_2013": "16.7%",
    "latitude": 39.7392358,
    "longitude": -104.990251,
    "population": "649495",
    "rank": "22",
    "state": "Colorado"
  },
  {
    "city": "Washington",
    "growth_from_2000_to_2013": "13.0%",
    "latitude": 38.9071923,
    "longitude": -77.0368707,
    "population": "646449",
    "rank": "23",
    "state": "District of Columbia"
  },
  {
    "city": "Boston",
    "growth_from_2000_to_2013": "9.4%",
    "latitude": 42.3600825,
    "longitude": -71.0588801,
    "population": "645966",
    "rank": "24",
    "state": "Massachusetts"
  },
  {
    "city": "Nashville-Davidson",
    "growth_from_2000_to_2013": "16.2%",
    "latitude": 36.1626638,
    "longitude": -86.7816016,
    "population": "634464",
    "rank": "25",
    "state": "Tennessee"
  },
  {
    "city": "Baltimore",
    "growth_from_2000_to_2013": "-4.0%",
    "latitude": 39.2903848,
    "longitude": -76.6121893,
    "population": "622104",
    "rank": "26",
    "state": "Maryland"
  },
  {
    "city": "Oklahoma City",
    "growth_from_2000_to_2013": "20.2%",
    "latitude": 35.4675602,
    "longitude": -97.5164276,
    "population": "610613",
    "rank": "27",
    "state": "Oklahoma"
  },
  {
    "city": "Louisville/Jefferson County",
    "growth_from_2000_to_2013": "10.0%",
    "latitude": 38.2526647,
    "longitude": -85.7584557,
    "population": "609893",
    "rank": "28",
    "state": "Kentucky"
  },
  {
    "city": "Portland",
    "growth_from_2000_to_2013": "15.0%",
    "latitude": 45.5230622,
    "longitude": -122.6764816,
    "population": "609456",
    "rank": "29",
    "state": "Oregon"
  },
  {
    "city": "Las Vegas",
    "growth_from_2000_to_2013": "24.5%",
    "latitude": 36.1699412,
    "longitude": -115.1398296,
    "population": "603488",
    "rank": "30",
    "state": "Nevada"
  },
  {
    "city": "Milwaukee",
    "growth_from_2000_to_2013": "0.3%",
    "latitude": 43.0389025,
    "longitude": -87.9064736,
    "population": "599164",
    "rank": "31",
    "state": "Wisconsin"
  },
  {
    "city": "Albuquerque",
    "growth_from_2000_to_2013": "23.5%",
    "latitude": 35.0853336,
    "longitude": -106.6055534,
    "population": "556495",
    "rank": "32",
    "state": "New Mexico"
  },
  {
    "city": "Tucson",
    "growth_from_2000_to_2013": "7.5%",
    "latitude": 32.2217429,
    "longitude": -110.926479,
    "population": "526116",
    "rank": "33",
    "state": "Arizona"
  },
  {
    "city": "Fresno",
    "growth_from_2000_to_2013": "18.3%",
    "latitude": 36.7468422,
    "longitude": -119.7725868,
    "population": "509924",
    "rank": "34",
    "state": "California"
  },
  {
    "city": "Sacramento",
    "growth_from_2000_to_2013": "17.2%",
    "latitude": 38.5815719,
    "longitude": -121.4943996,
    "population": "479686",
    "rank": "35",
    "state": "California"
  },
  {
    "city": "Long Beach",
    "growth_from_2000_to_2013": "1.5%",
    "latitude": 33.7700504,
    "longitude": -118.1937395,
    "population": "469428",
    "rank": "36",
    "state": "California"
  },
  {
    "city": "Kansas City",
    "growth_from_2000_to_2013": "5.5%",
    "latitude": 39.0997265,
    "longitude": -94.5785667,
    "population": "467007",
    "rank": "37",
    "state": "Missouri"
  },
  {
    "city": "Mesa",
    "growth_from_2000_to_2013": "13.5%",
    "latitude": 33.4151843,
    "longitude": -111.8314724,
    "population": "457587",
    "rank": "38",
    "state": "Arizona"
  },
  {
    "city": "Virginia Beach",
    "growth_from_2000_to_2013": "5.1%",
    "latitude": 36.8529263,
    "longitude": -75.97798499999999,
    "population": "448479",
    "rank": "39",
    "state": "Virginia"
  },
  {
    "city": "Atlanta",
    "growth_from_2000_to_2013": "6.2%",
    "latitude": 33.7489954,
    "longitude": -84.3879824,
    "population": "447841",
    "rank": "40",
    "state": "Georgia"
  },
  {
    "city": "Colorado Springs",
    "growth_from_2000_to_2013": "21.4%",
    "latitude": 38.8338816,
    "longitude": -104.8213634,
    "population": "439886",
    "rank": "41",
    "state": "Colorado"
  },
  {
    "city": "Omaha",
    "growth_from_2000_to_2013": "5.9%",
    "latitude": 41.2523634,
    "longitude": -95.99798829999999,
    "population": "434353",
    "rank": "42",
    "state": "Nebraska"
  },
  {
    "city": "Raleigh",
    "growth_from_2000_to_2013": "48.7%",
    "latitude": 35.7795897,
    "longitude": -78.6381787,
    "population": "431746",
    "rank": "43",
    "state": "North Carolina"
  },
  {
    "city": "Miami",
    "growth_from_2000_to_2013": "14.9%",
    "latitude": 25.7616798,
    "longitude": -80.1917902,
    "population": "417650",
    "rank": "44",
    "state": "Florida"
  },
  {
    "city": "Oakland",
    "growth_from_2000_to_2013": "1.3%",
    "latitude": 37.8043637,
    "longitude": -122.2711137,
    "population": "406253",
    "rank": "45",
    "state": "California"
  },
  {
    "city": "Minneapolis",
    "growth_from_2000_to_2013": "4.5%",
    "latitude": 44.977753,
    "longitude": -93.2650108,
    "population": "400070",
    "rank": "46",
    "state": "Minnesota"
  },
  {
    "city": "Tulsa",
    "growth_from_2000_to_2013": "1.3%",
    "latitude": 36.1539816,
    "longitude": -95.99277500000001,
    "population": "398121",
    "rank": "47",
    "state": "Oklahoma"
  },
  {
    "city": "Cleveland",
    "growth_from_2000_to_2013": "-18.1%",
    "latitude": 41.49932,
    "longitude": -81.6943605,
    "population": "390113",
    "rank": "48",
    "state": "Ohio"
  },
  {
    "city": "Wichita",
    "growth_from_2000_to_2013": "9.7%",
    "latitude": 37.688889,
    "longitude": -97.336111,
    "population": "386552",
    "rank": "49",
    "state": "Kansas"
  },
  {
    "city": "Arlington",
    "growth_from_2000_to_2013": "13.3%",
    "latitude": 32.735687,
    "longitude": -97.10806559999999,
    "population": "379577",
    "rank": "50",
    "state": "Texas"
  },
  {
    "city": "New Orleans",
    "growth_from_2000_to_2013": "-21.6%",
    "latitude": 29.95106579999999,
    "longitude": -90.0715323,
    "population": "378715",
    "rank": "51",
    "state": "Louisiana"
  },
  {
    "city": "Bakersfield",
    "growth_from_2000_to_2013": "48.4%",
    "latitude": 35.3732921,
    "longitude": -119.0187125,
    "population": "363630",
    "rank": "52",
    "state": "California"
  },
  {
    "city": "Tampa",
    "growth_from_2000_to_2013": "16.0%",
    "latitude": 27.950575,
    "longitude": -82.4571776,
    "population": "352957",
    "rank": "53",
    "state": "Florida"
  },
  {
    "city": "Honolulu",
    "growth_from_2000_to_2013": "-6.2%",
    "latitude": 21.3069444,
    "longitude": -157.8583333,
    "population": "347884",
    "rank": "54",
    "state": "Hawaii"
  },
  {
    "city": "Aurora",
    "growth_from_2000_to_2013": "24.4%",
    "latitude": 39.7294319,
    "longitude": -104.8319195,
    "population": "345803",
    "rank": "55",
    "state": "Colorado"
  },
  {
    "city": "Anaheim",
    "growth_from_2000_to_2013": "4.7%",
    "latitude": 33.8352932,
    "longitude": -117.9145036,
    "population": "345012",
    "rank": "56",
    "state": "California"
  },
  {
    "city": "Santa Ana",
    "growth_from_2000_to_2013": "-1.2%",
    "latitude": 33.7455731,
    "longitude": -117.8678338,
    "population": "334227",
    "rank": "57",
    "state": "California"
  },
  {
    "city": "St. Louis",
    "growth_from_2000_to_2013": "-8.2%",
    "latitude": 38.6270025,
    "longitude": -90.19940419999999,
    "population": "318416",
    "rank": "58",
    "state": "Missouri"
  },
  {
    "city": "Riverside",
    "growth_from_2000_to_2013": "22.5%",
    "latitude": 33.9533487,
    "longitude": -117.3961564,
    "population": "316619",
    "rank": "59",
    "state": "California"
  },
  {
    "city": "Corpus Christi",
    "growth_from_2000_to_2013": "14.1%",
    "latitude": 27.8005828,
    "longitude": -97.39638099999999,
    "population": "316381",
    "rank": "60",
    "state": "Texas"
  },
  {
    "city": "Lexington-Fayette",
    "growth_from_2000_to_2013": "18.0%",
    "latitude": 38.0405837,
    "longitude": -84.5037164,
    "population": "308428",
    "rank": "61",
    "state": "Kentucky"
  },
  {
    "city": "Pittsburgh",
    "growth_from_2000_to_2013": "-8.3%",
    "latitude": 40.44062479999999,
    "longitude": -79.9958864,
    "population": "305841",
    "rank": "62",
    "state": "Pennsylvania"
  },
  {
    "city": "Anchorage",
    "growth_from_2000_to_2013": "15.4%",
    "latitude": 61.2180556,
    "longitude": -149.9002778,
    "population": "300950",
    "rank": "63",
    "state": "Alaska"
  },
  {
    "city": "Stockton",
    "growth_from_2000_to_2013": "21.8%",
    "latitude": 37.9577016,
    "longitude": -121.2907796,
    "population": "298118",
    "rank": "64",
    "state": "California"
  },
  {
    "city": "Cincinnati",
    "growth_from_2000_to_2013": "-10.1%",
    "latitude": 39.1031182,
    "longitude": -84.5120196,
    "population": "297517",
    "rank": "65",
    "state": "Ohio"
  },
  {
    "city": "St. Paul",
    "growth_from_2000_to_2013": "2.8%",
    "latitude": 44.9537029,
    "longitude": -93.0899578,
    "population": "294873",
    "rank": "66",
    "state": "Minnesota"
  },
  {
    "city": "Toledo",
    "growth_from_2000_to_2013": "-10.0%",
    "latitude": 41.6639383,
    "longitude": -83.55521200000001,
    "population": "282313",
    "rank": "67",
    "state": "Ohio"
  },
  {
    "city": "Greensboro",
    "growth_from_2000_to_2013": "22.3%",
    "latitude": 36.0726354,
    "longitude": -79.7919754,
    "population": "279639",
    "rank": "68",
    "state": "North Carolina"
  },
  {
    "city": "Newark",
    "growth_from_2000_to_2013": "2.1%",
    "latitude": 40.735657,
    "longitude": -74.1723667,
    "population": "278427",
    "rank": "69",
    "state": "New Jersey"
  },
  {
    "city": "Plano",
    "growth_from_2000_to_2013": "22.4%",
    "latitude": 33.0198431,
    "longitude": -96.6988856,
    "population": "274409",
    "rank": "70",
    "state": "Texas"
  },
  {
    "city": "Henderson",
    "growth_from_2000_to_2013": "51.0%",
    "latitude": 36.0395247,
    "longitude": -114.9817213,
    "population": "270811",
    "rank": "71",
    "state": "Nevada"
  },
  {
    "city": "Lincoln",
    "growth_from_2000_to_2013": "18.0%",
    "latitude": 40.8257625,
    "longitude": -96.6851982,
    "population": "268738",
    "rank": "72",
    "state": "Nebraska"
  },
  {
    "city": "Buffalo",
    "growth_from_2000_to_2013": "-11.3%",
    "latitude": 42.88644679999999,
    "longitude": -78.8783689,
    "population": "258959",
    "rank": "73",
    "state": "New York"
  },
  {
    "city": "Jersey City",
    "growth_from_2000_to_2013": "7.2%",
    "latitude": 40.72815749999999,
    "longitude": -74.0776417,
    "population": "257342",
    "rank": "74",
    "state": "New Jersey"
  },
  {
    "city": "Chula Vista",
    "growth_from_2000_to_2013": "46.2%",
    "latitude": 32.6400541,
    "longitude": -117.0841955,
    "population": "256780",
    "rank": "75",
    "state": "California"
  },
  {
    "city": "Fort Wayne",
    "growth_from_2000_to_2013": "1.0%",
    "latitude": 41.079273,
    "longitude": -85.1393513,
    "population": "256496",
    "rank": "76",
    "state": "Indiana"
  },
  {
    "city": "Orlando",
    "growth_from_2000_to_2013": "31.2%",
    "latitude": 28.5383355,
    "longitude": -81.3792365,
    "population": "255483",
    "rank": "77",
    "state": "Florida"
  },
  {
    "city": "St. Petersburg",
    "growth_from_2000_to_2013": "0.3%",
    "latitude": 27.773056,
    "longitude": -82.64,
    "population": "249688",
    "rank": "78",
    "state": "Florida"
  },
  {
    "city": "Chandler",
    "growth_from_2000_to_2013": "38.7%",
    "latitude": 33.3061605,
    "longitude": -111.8412502,
    "population": "249146",
    "rank": "79",
    "state": "Arizona"
  },
  {
    "city": "Laredo",
    "growth_from_2000_to_2013": "38.2%",
    "latitude": 27.5305671,
    "longitude": -99.48032409999999,
    "population": "248142",
    "rank": "80",
    "state": "Texas"
  },
  {
    "city": "Norfolk",
    "growth_from_2000_to_2013": "5.0%",
    "latitude": 36.8507689,
    "longitude": -76.28587259999999,
    "population": "246139",
    "rank": "81",
    "state": "Virginia"
  },
  {
    "city": "Durham",
    "growth_from_2000_to_2013": "29.9%",
    "latitude": 35.9940329,
    "longitude": -78.898619,
    "population": "245475",
    "rank": "82",
    "state": "North Carolina"
  },
  {
    "city": "Madison",
    "growth_from_2000_to_2013": "15.8%",
    "latitude": 43.0730517,
    "longitude": -89.4012302,
    "population": "243344",
    "rank": "83",
    "state": "Wisconsin"
  },
  {
    "city": "Lubbock",
    "growth_from_2000_to_2013": "19.6%",
    "latitude": 33.5778631,
    "longitude": -101.8551665,
    "population": "239538",
    "rank": "84",
    "state": "Texas"
  },
  {
    "city": "Irvine",
    "growth_from_2000_to_2013": "61.3%",
    "latitude": 33.6839473,
    "longitude": -117.7946942,
    "population": "236716",
    "rank": "85",
    "state": "California"
  },
  {
    "city": "Winston-Salem",
    "growth_from_2000_to_2013": "16.9%",
    "latitude": 36.09985959999999,
    "longitude": -80.244216,
    "population": "236441",
    "rank": "86",
    "state": "North Carolina"
  },
  {
    "city": "Glendale",
    "growth_from_2000_to_2013": "5.7%",
    "latitude": 33.5386523,
    "longitude": -112.1859866,
    "population": "234632",
    "rank": "87",
    "state": "Arizona"
  },
  {
    "city": "Garland",
    "growth_from_2000_to_2013": "8.5%",
    "latitude": 32.912624,
    "longitude": -96.63888329999999,
    "population": "234566",
    "rank": "88",
    "state": "Texas"
  },
  {
    "city": "Hialeah",
    "growth_from_2000_to_2013": "3.2%",
    "latitude": 25.8575963,
    "longitude": -80.2781057,
    "population": "233394",
    "rank": "89",
    "state": "Florida"
  },
  {
    "city": "Reno",
    "growth_from_2000_to_2013": "26.8%",
    "latitude": 39.5296329,
    "longitude": -119.8138027,
    "population": "233294",
    "rank": "90",
    "state": "Nevada"
  },
  {
    "city": "Chesapeake",
    "growth_from_2000_to_2013": "15.1%",
    "latitude": 36.7682088,
    "longitude": -76.2874927,
    "population": "230571",
    "rank": "91",
    "state": "Virginia"
  },
  {
    "city": "Gilbert",
    "growth_from_2000_to_2013": "96.0%",
    "latitude": 33.3528264,
    "longitude": -111.789027,
    "population": "229972",
    "rank": "92",
    "state": "Arizona"
  },
  {
    "city": "Baton Rouge",
    "growth_from_2000_to_2013": "0.4%",
    "latitude": 30.4582829,
    "longitude": -91.1403196,
    "population": "229426",
    "rank": "93",
    "state": "Louisiana"
  },
  {
    "city": "Irving",
    "growth_from_2000_to_2013": "19.1%",
    "latitude": 32.8140177,
    "longitude": -96.9488945,
    "population": "228653",
    "rank": "94",
    "state": "Texas"
  },
  {
    "city": "Scottsdale",
    "growth_from_2000_to_2013": "11.0%",
    "latitude": 33.4941704,
    "longitude": -111.9260519,
    "population": "226918",
    "rank": "95",
    "state": "Arizona"
  },
  {
    "city": "North Las Vegas",
    "growth_from_2000_to_2013": "92.2%",
    "latitude": 36.1988592,
    "longitude": -115.1175013,
    "population": "226877",
    "rank": "96",
    "state": "Nevada"
  },
  {
    "city": "Fremont",
    "growth_from_2000_to_2013": "10.0%",
    "latitude": 37.5482697,
    "longitude": -121.9885719,
    "population": "224922",
    "rank": "97",
    "state": "California"
  },
  {
    "city": "Boise City",
    "growth_from_2000_to_2013": "9.5%",
    "latitude": 43.6187102,
    "longitude": -116.2146068,
    "population": "214237",
    "rank": "98",
    "state": "Idaho"
  },
  {
    "city": "Richmond",
    "growth_from_2000_to_2013": "8.2%",
    "latitude": 37.5407246,
    "longitude": -77.4360481,
    "population": "214114",
    "rank": "99",
    "state": "Virginia"
  },
  {
    "city": "San Bernardino",
    "growth_from_2000_to_2013": "13.0%",
    "latitude": 34.1083449,
    "longitude": -117.2897652,
    "population": "213708",
    "rank": "100",
    "state": "California"
  },
  {
    "city": "Birmingham",
    "growth_from_2000_to_2013": "-12.3%",
    "latitude": 33.5206608,
    "longitude": -86.80248999999999,
    "population": "212113",
    "rank": "101",
    "state": "Alabama"
  },
  {
    "city": "Spokane",
    "growth_from_2000_to_2013": "7.0%",
    "latitude": 47.6587802,
    "longitude": -117.4260466,
    "population": "210721",
    "rank": "102",
    "state": "Washington"
  },
  {
    "city": "Rochester",
    "growth_from_2000_to_2013": "-4.1%",
    "latitude": 43.16103,
    "longitude": -77.6109219,
    "population": "210358",
    "rank": "103",
    "state": "New York"
  },
  {
    "city": "Des Moines",
    "growth_from_2000_to_2013": "3.9%",
    "latitude": 41.6005448,
    "longitude": -93.6091064,
    "population": "207510",
    "rank": "104",
    "state": "Iowa"
  },
  {
    "city": "Modesto",
    "growth_from_2000_to_2013": "7.7%",
    "latitude": 37.63909719999999,
    "longitude": -120.9968782,
    "population": "204933",
    "rank": "105",
    "state": "California"
  },
  {
    "city": "Fayetteville",
    "growth_from_2000_to_2013": "2.4%",
    "latitude": 35.0526641,
    "longitude": -78.87835849999999,
    "population": "204408",
    "rank": "106",
    "state": "North Carolina"
  },
  {
    "city": "Tacoma",
    "growth_from_2000_to_2013": "4.9%",
    "latitude": 47.2528768,
    "longitude": -122.4442906,
    "population": "203446",
    "rank": "107",
    "state": "Washington"
  },
  {
    "city": "Oxnard",
    "growth_from_2000_to_2013": "18.2%",
    "latitude": 34.1975048,
    "longitude": -119.1770516,
    "population": "203007",
    "rank": "108",
    "state": "California"
  },
  {
    "city": "Fontana",
    "growth_from_2000_to_2013": "38.3%",
    "latitude": 34.0922335,
    "longitude": -117.435048,
    "population": "203003",
    "rank": "109",
    "state": "California"
  },
  {
    "city": "Columbus",
    "growth_from_2000_to_2013": "8.7%",
    "latitude": 32.4609764,
    "longitude": -84.9877094,
    "population": "202824",
    "rank": "110",
    "state": "Georgia"
  },
  {
    "city": "Montgomery",
    "growth_from_2000_to_2013": "-0.1%",
    "latitude": 32.3668052,
    "longitude": -86.2999689,
    "population": "201332",
    "rank": "111",
    "state": "Alabama"
  },
  {
    "city": "Moreno Valley",
    "growth_from_2000_to_2013": "40.4%",
    "latitude": 33.9424658,
    "longitude": -117.2296717,
    "population": "201175",
    "rank": "112",
    "state": "California"
  },
  {
    "city": "Shreveport",
    "growth_from_2000_to_2013": "-0.1%",
    "latitude": 32.5251516,
    "longitude": -93.7501789,
    "population": "200327",
    "rank": "113",
    "state": "Louisiana"
  },
  {
    "city": "Aurora",
    "growth_from_2000_to_2013": "38.4%",
    "latitude": 41.7605849,
    "longitude": -88.32007150000001,
    "population": "199963",
    "rank": "114",
    "state": "Illinois"
  },
  {
    "city": "Yonkers",
    "growth_from_2000_to_2013": "1.8%",
    "latitude": 40.9312099,
    "longitude": -73.89874689999999,
    "population": "199766",
    "rank": "115",
    "state": "New York"
  },
  {
    "city": "Akron",
    "growth_from_2000_to_2013": "-8.6%",
    "latitude": 41.0814447,
    "longitude": -81.51900529999999,
    "population": "198100",
    "rank": "116",
    "state": "Ohio"
  },
  {
    "city": "Huntington Beach",
    "growth_from_2000_to_2013": "3.9%",
    "latitude": 33.660297,
    "longitude": -117.9992265,
    "population": "197575",
    "rank": "117",
    "state": "California"
  },
  {
    "city": "Little Rock",
    "growth_from_2000_to_2013": "7.6%",
    "latitude": 34.7464809,
    "longitude": -92.28959479999999,
    "population": "197357",
    "rank": "118",
    "state": "Arkansas"
  },
  {
    "city": "Augusta-Richmond County",
    "growth_from_2000_to_2013": "1.1%",
    "latitude": 33.4734978,
    "longitude": -82.0105148,
    "population": "197350",
    "rank": "119",
    "state": "Georgia"
  },
  {
    "city": "Amarillo",
    "growth_from_2000_to_2013": "12.8%",
    "latitude": 35.2219971,
    "longitude": -101.8312969,
    "population": "196429",
    "rank": "120",
    "state": "Texas"
  },
  {
    "city": "Glendale",
    "growth_from_2000_to_2013": "0.3%",
    "latitude": 34.1425078,
    "longitude": -118.255075,
    "population": "196021",
    "rank": "121",
    "state": "California"
  },
  {
    "city": "Mobile",
    "growth_from_2000_to_2013": "-1.9%",
    "latitude": 30.6953657,
    "longitude": -88.0398912,
    "population": "194899",
    "rank": "122",
    "state": "Alabama"
  },
  {
    "city": "Grand Rapids",
    "growth_from_2000_to_2013": "-2.8%",
    "latitude": 42.9633599,
    "longitude": -85.6680863,
    "population": "192294",
    "rank": "123",
    "state": "Michigan"
  },
  {
    "city": "Salt Lake City",
    "growth_from_2000_to_2013": "5.1%",
    "latitude": 40.7607793,
    "longitude": -111.8910474,
    "population": "191180",
    "rank": "124",
    "state": "Utah"
  },
  {
    "city": "Tallahassee",
    "growth_from_2000_to_2013": "21.8%",
    "latitude": 30.4382559,
    "longitude": -84.28073289999999,
    "population": "186411",
    "rank": "125",
    "state": "Florida"
  },
  {
    "city": "Huntsville",
    "growth_from_2000_to_2013": "16.3%",
    "latitude": 34.7303688,
    "longitude": -86.5861037,
    "population": "186254",
    "rank": "126",
    "state": "Alabama"
  },
  {
    "city": "Grand Prairie",
    "growth_from_2000_to_2013": "43.1%",
    "latitude": 32.7459645,
    "longitude": -96.99778459999999,
    "population": "183372",
    "rank": "127",
    "state": "Texas"
  },
  {
    "city": "Knoxville",
    "growth_from_2000_to_2013": "3.9%",
    "latitude": 35.9606384,
    "longitude": -83.9207392,
    "population": "183270",
    "rank": "128",
    "state": "Tennessee"
  },
  {
    "city": "Worcester",
    "growth_from_2000_to_2013": "5.8%",
    "latitude": 42.2625932,
    "longitude": -71.8022934,
    "population": "182544",
    "rank": "129",
    "state": "Massachusetts"
  },
  {
    "city": "Newport News",
    "growth_from_2000_to_2013": "0.9%",
    "latitude": 37.0870821,
    "longitude": -76.4730122,
    "population": "182020",
    "rank": "130",
    "state": "Virginia"
  },
  {
    "city": "Brownsville",
    "growth_from_2000_to_2013": "26.8%",
    "latitude": 25.9017472,
    "longitude": -97.4974838,
    "population": "181860",
    "rank": "131",
    "state": "Texas"
  },
  {
    "city": "Overland Park",
    "growth_from_2000_to_2013": "19.4%",
    "latitude": 38.9822282,
    "longitude": -94.6707917,
    "population": "181260",
    "rank": "132",
    "state": "Kansas"
  },
  {
    "city": "Santa Clarita",
    "growth_from_2000_to_2013": "15.3%",
    "latitude": 34.3916641,
    "longitude": -118.542586,
    "population": "179590",
    "rank": "133",
    "state": "California"
  },
  {
    "city": "Providence",
    "growth_from_2000_to_2013": "2.3%",
    "latitude": 41.8239891,
    "longitude": -71.4128343,
    "population": "177994",
    "rank": "134",
    "state": "Rhode Island"
  },
  {
    "city": "Garden Grove",
    "growth_from_2000_to_2013": "5.8%",
    "latitude": 33.7739053,
    "longitude": -117.9414477,
    "population": "175140",
    "rank": "135",
    "state": "California"
  },
  {
    "city": "Chattanooga",
    "growth_from_2000_to_2013": "10.5%",
    "latitude": 35.0456297,
    "longitude": -85.3096801,
    "population": "173366",
    "rank": "136",
    "state": "Tennessee"
  },
  {
    "city": "Oceanside",
    "growth_from_2000_to_2013": "6.6%",
    "latitude": 33.1958696,
    "longitude": -117.3794834,
    "population": "172794",
    "rank": "137",
    "state": "California"
  },
  {
    "city": "Jackson",
    "growth_from_2000_to_2013": "-6.8%",
    "latitude": 32.2987573,
    "longitude": -90.1848103,
    "population": "172638",
    "rank": "138",
    "state": "Mississippi"
  },
  {
    "city": "Fort Lauderdale",
    "growth_from_2000_to_2013": "0.7%",
    "latitude": 26.1224386,
    "longitude": -80.13731740000001,
    "population": "172389",
    "rank": "139",
    "state": "Florida"
  },
  {
    "city": "Santa Rosa",
    "growth_from_2000_to_2013": "15.2%",
    "latitude": 38.440429,
    "longitude": -122.7140548,
    "population": "171990",
    "rank": "140",
    "state": "California"
  },
  {
    "city": "Rancho Cucamonga",
    "growth_from_2000_to_2013": "32.7%",
    "latitude": 34.10639889999999,
    "longitude": -117.5931084,
    "population": "171386",
    "rank": "141",
    "state": "California"
  },
  {
    "city": "Port St. Lucie",
    "growth_from_2000_to_2013": "91.7%",
    "latitude": 27.2730492,
    "longitude": -80.3582261,
    "population": "171016",
    "rank": "142",
    "state": "Florida"
  },
  {
    "city": "Tempe",
    "growth_from_2000_to_2013": "5.8%",
    "latitude": 33.4255104,
    "longitude": -111.9400054,
    "population": "168228",
    "rank": "143",
    "state": "Arizona"
  },
  {
    "city": "Ontario",
    "growth_from_2000_to_2013": "5.5%",
    "latitude": 34.0633443,
    "longitude": -117.6508876,
    "population": "167500",
    "rank": "144",
    "state": "California"
  },
  {
    "city": "Vancouver",
    "growth_from_2000_to_2013": "14.2%",
    "latitude": 45.6387281,
    "longitude": -122.6614861,
    "population": "167405",
    "rank": "145",
    "state": "Washington"
  },
  {
    "city": "Cape Coral",
    "growth_from_2000_to_2013": "60.4%",
    "latitude": 26.5628537,
    "longitude": -81.9495331,
    "population": "165831",
    "rank": "146",
    "state": "Florida"
  },
  {
    "city": "Sioux Falls",
    "growth_from_2000_to_2013": "31.1%",
    "latitude": 43.5445959,
    "longitude": -96.73110340000001,
    "population": "164676",
    "rank": "147",
    "state": "South Dakota"
  },
  {
    "city": "Springfield",
    "growth_from_2000_to_2013": "7.8%",
    "latitude": 37.2089572,
    "longitude": -93.29229889999999,
    "population": "164122",
    "rank": "148",
    "state": "Missouri"
  },
  {
    "city": "Peoria",
    "growth_from_2000_to_2013": "46.5%",
    "latitude": 33.5805955,
    "longitude": -112.2373779,
    "population": "162592",
    "rank": "149",
    "state": "Arizona"
  },
  {
    "city": "Pembroke Pines",
    "growth_from_2000_to_2013": "17.4%",
    "latitude": 26.007765,
    "longitude": -80.2962555,
    "population": "162329",
    "rank": "150",
    "state": "Florida"
  },
  {
    "city": "Elk Grove",
    "growth_from_2000_to_2013": "97.1%",
    "latitude": 38.4087993,
    "longitude": -121.3716178,
    "population": "161007",
    "rank": "151",
    "state": "California"
  },
  {
    "city": "Salem",
    "growth_from_2000_to_2013": "16.4%",
    "latitude": 44.9428975,
    "longitude": -123.0350963,
    "population": "160614",
    "rank": "152",
    "state": "Oregon"
  },
  {
    "city": "Lancaster",
    "growth_from_2000_to_2013": "33.8%",
    "latitude": 34.6867846,
    "longitude": -118.1541632,
    "population": "159523",
    "rank": "153",
    "state": "California"
  },
  {
    "city": "Corona",
    "growth_from_2000_to_2013": "23.6%",
    "latitude": 33.8752935,
    "longitude": -117.5664384,
    "population": "159503",
    "rank": "154",
    "state": "California"
  },
  {
    "city": "Eugene",
    "growth_from_2000_to_2013": "14.4%",
    "latitude": 44.0520691,
    "longitude": -123.0867536,
    "population": "159190",
    "rank": "155",
    "state": "Oregon"
  },
  {
    "city": "Palmdale",
    "growth_from_2000_to_2013": "33.7%",
    "latitude": 34.5794343,
    "longitude": -118.1164613,
    "population": "157161",
    "rank": "156",
    "state": "California"
  },
  {
    "city": "Salinas",
    "growth_from_2000_to_2013": "8.4%",
    "latitude": 36.6777372,
    "longitude": -121.6555013,
    "population": "155662",
    "rank": "157",
    "state": "California"
  },
  {
    "city": "Springfield",
    "growth_from_2000_to_2013": "1.1%",
    "latitude": 42.1014831,
    "longitude": -72.589811,
    "population": "153703",
    "rank": "158",
    "state": "Massachusetts"
  },
  {
    "city": "Pasadena",
    "growth_from_2000_to_2013": "7.5%",
    "latitude": 29.6910625,
    "longitude": -95.2091006,
    "population": "152735",
    "rank": "159",
    "state": "Texas"
  },
  {
    "city": "Fort Collins",
    "growth_from_2000_to_2013": "26.6%",
    "latitude": 40.5852602,
    "longitude": -105.084423,
    "population": "152061",
    "rank": "160",
    "state": "Colorado"
  },
  {
    "city": "Hayward",
    "growth_from_2000_to_2013": "7.5%",
    "latitude": 37.6688205,
    "longitude": -122.0807964,
    "population": "151574",
    "rank": "161",
    "state": "California"
  },
  {
    "city": "Pomona",
    "growth_from_2000_to_2013": "2.1%",
    "latitude": 34.055103,
    "longitude": -117.7499909,
    "population": "151348",
    "rank": "162",
    "state": "California"
  },
  {
    "city": "Cary",
    "growth_from_2000_to_2013": "55.1%",
    "latitude": 35.79154,
    "longitude": -78.7811169,
    "population": "151088",
    "rank": "163",
    "state": "North Carolina"
  },
  {
    "city": "Rockford",
    "growth_from_2000_to_2013": "-1.0%",
    "latitude": 42.2711311,
    "longitude": -89.0939952,
    "population": "150251",
    "rank": "164",
    "state": "Illinois"
  },
  {
    "city": "Alexandria",
    "growth_from_2000_to_2013": "15.0%",
    "latitude": 38.8048355,
    "longitude": -77.0469214,
    "population": "148892",
    "rank": "165",
    "state": "Virginia"
  },
  {
    "city": "Escondido",
    "growth_from_2000_to_2013": "10.7%",
    "latitude": 33.1192068,
    "longitude": -117.086421,
    "population": "148738",
    "rank": "166",
    "state": "California"
  },
  {
    "city": "McKinney",
    "growth_from_2000_to_2013": "165.3%",
    "latitude": 33.1972465,
    "longitude": -96.6397822,
    "population": "148559",
    "rank": "167",
    "state": "Texas"
  },
  {
    "city": "Kansas City",
    "growth_from_2000_to_2013": "1.1%",
    "latitude": 39.114053,
    "longitude": -94.6274636,
    "population": "148483",
    "rank": "168",
    "state": "Kansas"
  },
  {
    "city": "Joliet",
    "growth_from_2000_to_2013": "36.5%",
    "latitude": 41.525031,
    "longitude": -88.0817251,
    "population": "147806",
    "rank": "169",
    "state": "Illinois"
  },
  {
    "city": "Sunnyvale",
    "growth_from_2000_to_2013": "11.9%",
    "latitude": 37.36883,
    "longitude": -122.0363496,
    "population": "147559",
    "rank": "170",
    "state": "California"
  },
  {
    "city": "Torrance",
    "growth_from_2000_to_2013": "6.6%",
    "latitude": 33.8358492,
    "longitude": -118.3406288,
    "population": "147478",
    "rank": "171",
    "state": "California"
  },
  {
    "city": "Bridgeport",
    "growth_from_2000_to_2013": "5.4%",
    "latitude": 41.1865478,
    "longitude": -73.19517669999999,
    "population": "147216",
    "rank": "172",
    "state": "Connecticut"
  },
  {
    "city": "Lakewood",
    "growth_from_2000_to_2013": "1.9%",
    "latitude": 39.7047095,
    "longitude": -105.0813734,
    "population": "147214",
    "rank": "173",
    "state": "Colorado"
  },
  {
    "city": "Hollywood",
    "growth_from_2000_to_2013": "4.8%",
    "latitude": 26.0112014,
    "longitude": -80.1494901,
    "population": "146526",
    "rank": "174",
    "state": "Florida"
  },
  {
    "city": "Paterson",
    "growth_from_2000_to_2013": "-2.2%",
    "latitude": 40.9167654,
    "longitude": -74.17181099999999,
    "population": "145948",
    "rank": "175",
    "state": "New Jersey"
  },
  {
    "city": "Naperville",
    "growth_from_2000_to_2013": "12.0%",
    "latitude": 41.7508391,
    "longitude": -88.1535352,
    "population": "144864",
    "rank": "176",
    "state": "Illinois"
  },
  {
    "city": "Syracuse",
    "growth_from_2000_to_2013": "-0.9%",
    "latitude": 43.0481221,
    "longitude": -76.14742439999999,
    "population": "144669",
    "rank": "177",
    "state": "New York"
  },
  {
    "city": "Mesquite",
    "growth_from_2000_to_2013": "14.7%",
    "latitude": 32.76679550000001,
    "longitude": -96.5991593,
    "population": "143484",
    "rank": "178",
    "state": "Texas"
  },
  {
    "city": "Dayton",
    "growth_from_2000_to_2013": "-13.5%",
    "latitude": 39.7589478,
    "longitude": -84.1916069,
    "population": "143355",
    "rank": "179",
    "state": "Ohio"
  },
  {
    "city": "Savannah",
    "growth_from_2000_to_2013": "7.5%",
    "latitude": 32.0835407,
    "longitude": -81.09983419999999,
    "population": "142772",
    "rank": "180",
    "state": "Georgia"
  },
  {
    "city": "Clarksville",
    "growth_from_2000_to_2013": "36.9%",
    "latitude": 36.5297706,
    "longitude": -87.3594528,
    "population": "142357",
    "rank": "181",
    "state": "Tennessee"
  },
  {
    "city": "Orange",
    "growth_from_2000_to_2013": "7.7%",
    "latitude": 33.7877944,
    "longitude": -117.8531119,
    "population": "139969",
    "rank": "182",
    "state": "California"
  },
  {
    "city": "Pasadena",
    "growth_from_2000_to_2013": "3.8%",
    "latitude": 34.1477849,
    "longitude": -118.1445155,
    "population": "139731",
    "rank": "183",
    "state": "California"
  },
  {
    "city": "Fullerton",
    "growth_from_2000_to_2013": "9.8%",
    "latitude": 33.8703596,
    "longitude": -117.9242966,
    "population": "138981",
    "rank": "184",
    "state": "California"
  },
  {
    "city": "Killeen",
    "growth_from_2000_to_2013": "52.1%",
    "latitude": 31.1171194,
    "longitude": -97.72779589999999,
    "population": "137147",
    "rank": "185",
    "state": "Texas"
  },
  {
    "city": "Frisco",
    "growth_from_2000_to_2013": "287.7%",
    "latitude": 33.1506744,
    "longitude": -96.82361159999999,
    "population": "136791",
    "rank": "186",
    "state": "Texas"
  },
  {
    "city": "Hampton",
    "growth_from_2000_to_2013": "-6.6%",
    "latitude": 37.0298687,
    "longitude": -76.34522179999999,
    "population": "136699",
    "rank": "187",
    "state": "Virginia"
  },
  {
    "city": "McAllen",
    "growth_from_2000_to_2013": "27.6%",
    "latitude": 26.2034071,
    "longitude": -98.23001239999999,
    "population": "136639",
    "rank": "188",
    "state": "Texas"
  },
  {
    "city": "Warren",
    "growth_from_2000_to_2013": "-2.3%",
    "latitude": 42.5144566,
    "longitude": -83.01465259999999,
    "population": "134873",
    "rank": "189",
    "state": "Michigan"
  },
  {
    "city": "Bellevue",
    "growth_from_2000_to_2013": "19.1%",
    "latitude": 47.610377,
    "longitude": -122.2006786,
    "population": "133992",
    "rank": "190",
    "state": "Washington"
  },
  {
    "city": "West Valley City",
    "growth_from_2000_to_2013": "22.2%",
    "latitude": 40.6916132,
    "longitude": -112.0010501,
    "population": "133579",
    "rank": "191",
    "state": "Utah"
  },
  {
    "city": "Columbia",
    "growth_from_2000_to_2013": "11.7%",
    "latitude": 34.0007104,
    "longitude": -81.0348144,
    "population": "133358",
    "rank": "192",
    "state": "South Carolina"
  },
  {
    "city": "Olathe",
    "growth_from_2000_to_2013": "40.4%",
    "latitude": 38.8813958,
    "longitude": -94.81912849999999,
    "population": "131885",
    "rank": "193",
    "state": "Kansas"
  },
  {
    "city": "Sterling Heights",
    "growth_from_2000_to_2013": "5.2%",
    "latitude": 42.5803122,
    "longitude": -83.0302033,
    "population": "131224",
    "rank": "194",
    "state": "Michigan"
  },
  {
    "city": "New Haven",
    "growth_from_2000_to_2013": "5.5%",
    "latitude": 41.308274,
    "longitude": -72.9278835,
    "population": "130660",
    "rank": "195",
    "state": "Connecticut"
  },
  {
    "city": "Miramar",
    "growth_from_2000_to_2013": "74.7%",
    "latitude": 25.9860762,
    "longitude": -80.30356019999999,
    "population": "130288",
    "rank": "196",
    "state": "Florida"
  },
  {
    "city": "Waco",
    "growth_from_2000_to_2013": "12.5%",
    "latitude": 31.549333,
    "longitude": -97.1466695,
    "population": "129030",
    "rank": "197",
    "state": "Texas"
  },
  {
    "city": "Thousand Oaks",
    "growth_from_2000_to_2013": "9.5%",
    "latitude": 34.1705609,
    "longitude": -118.8375937,
    "population": "128731",
    "rank": "198",
    "state": "California"
  },
  {
    "city": "Cedar Rapids",
    "growth_from_2000_to_2013": "5.4%",
    "latitude": 41.9778795,
    "longitude": -91.6656232,
    "population": "128429",
    "rank": "199",
    "state": "Iowa"
  },
  {
    "city": "Charleston",
    "growth_from_2000_to_2013": "29.2%",
    "latitude": 32.7764749,
    "longitude": -79.93105120000001,
    "population": "127999",
    "rank": "200",
    "state": "South Carolina"
  }
]