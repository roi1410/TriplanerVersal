const axios = require("axios")

exports.getHotelInfo = async (req, res) => {
    try {
        console.error("aaa");
        const response = await axios.get('https://test.api.amadeus.com/v1/shopping/flight-destinations', {
            params: {
                'origin': 'PAR',
                'destination':'MAD',
                'maxPrice': '200'
            },
            headers: {
                'Authorization': 'Bearer GZNKxPcesN1jFKDK8ifNdYlsowXc'
            }
        });
        console.log(response.data);
        res.send(response.data)
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};

