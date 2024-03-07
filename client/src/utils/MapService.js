import axios from "axios";

axios.defaults.withCredentials = true;

export async function fetchPlaceLanLon(place) {
  try {
    const res = await axios.get(
      `https://hotels-com-provider.p.rapidapi.com/v2/regions?rapidapi-key=${import.meta.env.VITE_RAPID_API_KEY}&query=${place}&domain=AE&locale=en_GB`
    );
    return res.data.data[1].coordinates;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchNearHotels({ lat, long }) {
  try {
    const res = await axios.get(
      `https://api.geoapify.com/v2/places?filter=circle:${long},${lat},10000&limit=20&categories=accommodation&apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}`
    );
    return res.data.features.map((hotel) => {
      return {
        lat: hotel.properties.lat,
        long: hotel.properties.lon,
        name: hotel.properties.name,
        contact: hotel.properties.contact,
        websiteURL: hotel.properties.website,
        street: hotel.properties.street,
      };
    });
  } catch (error) {
    console.log(error);
  }
}
// https://api.geoapify.com/v2/places?categories=catering,entertainment,leisure,tourism&filter=rect:34.8418732933046,32.14042138465463,34.9339267066958,32.066151771350775&limit=4&apiKey=e0dd094f7d4b4e26b4993f998c3b7e48
export async function fetchPlace({ lat, long }) {
    const types="catering,entertainment,leisure,tourism"
  try {
    const res = await axios.get(
      `https://api.geoapify.com/v2/places?categories=${types}&filter=circle:${long},${lat},30000&limit=10&apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}`
    );
    console.log(res);
    const path = res.data.features;
    console.log(path);
    return res.data.features.map((place) => {
      const kindPath = place.properties.categories[0];
      switch (kindPath) {
        case "natural":
          return {
            type: kindPath,
            lat: place.properties.lat,
            long: place.properties.lon,
            name: place.properties.name,
            openingHours: place.properties.opening_hours,
            image: place.properties.wiki_and_media.image,
            address:place.properties.formatted,
          };

        case "catering":
          return {
            type: kindPath,
            lat: place.properties.lat,
            long: place.properties.lon,
            name: place.properties.name,
            openingHours: place.properties.opening_hours,
            website: place.properties.website,
            address:place.properties.formatted,
          };

        case "entertainment":
          return {
            type: kindPath,
            lat: place.properties.lat,
            long: place.properties.lon,
            name: place.properties.name,
            openingHours: place.properties.opening_hours,
            address:place.properties.formatted,
            website: place.properties.website,
          };
        case "leisure":
          return {
            type: kindPath,
            lat: place.properties.lat,
            long: place.properties.lon,
            name: place.properties.name,
            openingHours: place.properties.opening_hours,
            address:place.properties.formatted,
            image:place.properties.wiki_and_media.image
          };

        case "tourism":
          return {
            type: kindPath,
            lat: place.properties.lat,
            long: place.properties.lon,
            name: place.properties.name,
            image: place.properties.wiki_and_media.image,
            address:place.properties.formatted,
          };

        default:
          break;
      }
    });
  } catch (error) {
    console.log(error);
  }
}
const cores = { lat: "41.213", long: "-87.3232" };