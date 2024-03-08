const axios = require("axios")
const { getJson } = require("serpapi");

exports.getHotelInfo = async (req, res) => {
    try {
        console.error("aaa");
        const {arrAP,depAP,depTM} = req.body
        await getJson({
            engine: "google_flights",
            hl: "en",
            gl: "us",
            type:2,
            departure_id: depAP,
            arrival_id: arrAP,
            outbound_date: depTM,
            currency: "USD",
            api_key: "b6d282278cda6c559e0c1222985bcd1cf1ab749541ad43c3537a7bd8e5674406"
        }, (json) => {
            console.log(json.best_flights);
            res.send(json.best_flights)
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};