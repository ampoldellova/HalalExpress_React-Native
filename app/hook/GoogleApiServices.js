import axios from "axios"


const calculateDistanceAndTime = async (startLat, startLng, destinationLat, destinationLng, mode = 'bicycle') => {

  const data = JSON.stringify({
    "mode": mode,
    "sources": [{ "location": [startLng, startLat] }],
    "targets": [{ "location": [destinationLng, destinationLat] }]
  });

  const config = {
    method: 'post',
    url: 'https://api.geoapify.com/v1/routematrix?apiKey=7540990e27fa4d198afeb6d69d3c048e',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  try {
    const response = await axios(config);
    const distance = response.data.sources_to_targets[0][0].distance;
    const duration = response.data.sources_to_targets[0][0].time / 60;
    const ratePerKm = 0.0058;
    const price = distance * ratePerKm;
    const finalPrice = `₱ ${price.toFixed(2)}`
    return {
      distance,
      duration,
      finalPrice
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

const extractNumbers = (inputStr) => {
  if (typeof inputStr !== 'string') {
    return [];
  }
  const matched = inputStr.match(/\d+/g);
  return matched ? matched.map(num => parseInt(num, 10)) : [];
}

const fetchDirections = async (startLat, startLng, destinationLat, destinationLng) => {
  try {

    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLat},${startLng}&destination=${destinationLat},${destinationLng}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json().then((data) => {
      setDirections(data);
      const encodedPolyline = data.routes[0].overview_polyline.points;
      const coordinates = decode(encodedPolyline);

      setCoordinates(coordinates);
    });
    
  } catch (error) {
    console.error(error);
  }
};

export default {
  calculateDistanceAndTime,
  extractNumbers
}

// const apiKey = "AIzaSyBbjMFF4rny4jtAUTnjz69dAiBEIx6nlJs";
// const baseUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?";
// const ratePerKm = 1;

// const requestUrl = `${baseUrl}origins=${startLat},${startLng}&destinations=${destinationLat},${destinationLng}&mode=${mode}&key=${apiKey}`;

// try {
//     const response = await fetch(requestUrl);
//     const data = await response.json();

//     // Ensure the request was successful and there are results
//     if (data.status === "OK" && data.rows[0].elements[0].status === "OK") {
//         const distance = data.rows[0].elements[0].distance.text;
//         const duration = data.rows[0].elements[0].duration.text;

//         const distanceInKm = parseFloat(distance.replace(' km', ''));
//         const price = distanceInKm * ratePerKm;
//         const finalPrice = `$${price.toFixed(2)}`

//         return {
//             distance,
//             duration,
//             finalPrice
//         };
//     } else {
//         console.error("Error calculating distance and duration:", data.status);
//         return null;
//     }
// } catch (error) {
//     console.error("Failed to calculate distance and duration:", error);
//     return null;
// }