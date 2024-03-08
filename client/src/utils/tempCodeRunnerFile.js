 return res.data.properties.map((hotel) => {
            return {
              lat: hotel.properties.lat,
              long: hotel.properties.lon,
              name: hotel.properties.name,
              contact: hotel.properties.contact,
              websiteURL: hotel.properties.website,
              street: hotel.properties.street,
              hotelId:hotel.properties.hotelId
            };
          });