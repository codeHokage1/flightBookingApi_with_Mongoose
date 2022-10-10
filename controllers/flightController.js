// #########################    USING IN-BUILT JSON FILES AS DB    ##################################
// ##################################################################################################

// const fsPromises = require('fs').promises;
// const path = require('path');
// const { format } = require('date-fns')

// // Import data of all flights from json file
// const flightsData = require('../models/flights.json')


// // logic to get all flights
// exports.getAllFlights = (req, res) => {
//     if (!flightsData.length) {
//         return res.status(404).json({
//             "message": "No flight data available",
//             flights: flightsData
//         })
//     }
//     res.json({
//         "flights": flightsData
//     })
// }

// // logic to get a single flight by id
// exports.getSingleFlight = (req, res) => {
//     if (!flightsData.length) {
//         return res.status(404).json({
//             "message": "No flight data available"
//         })
//     }
//     const id = Number(req.params.id);
//     const foundFlight = flightsData.find(flight => flight.id === id);

//     if (!foundFlight) {
//         return res.status(404).json({
//             "message": `Flight with id ${id} not found`
//         })
//     }
//     res.json({
//         "flight": foundFlight
//     })
// }

// // logic to book (/add) a new flight
// exports.bookFlight = async (req, res) => {
//     const flightDetails = req.body;
//     if (!flightDetails.title || !flightDetails.time || !flightDetails.price) {
//         return res.status(400).json({
//             "message": "Flight must include title, time and price"
//         })
//     }

//     const newFlight = {
//         id: flightsData.length ? flightsData[flightsData.length - 1].id + 1 : 1,
//         ...flightDetails,
//         dateBooked: format(new Date(), 'dd-MM-yyyy')
//     }
//     const newFlightsData = [...flightsData, newFlight]
//     await fsPromises.writeFile(
//         path.join(__dirname, "..", "models", "flights.json"),
//         JSON.stringify(newFlightsData)
//     )

//     res.status(201).json({
//         "message": "Flight booked successfully",
//         flightDetails: newFlight
//     })
// }


// // logic to update a flight by id
// exports.updateFlight = async (req, res) => {
//     if (!flightsData.length) {
//         return res.status(404).json({
//             "message": "No flight data available"
//         })
//     }

//     const id = Number(req.params.id);
//     const flightUpdates = req.body;
//     const foundFlight = flightsData.find(flight => flight.id === id);

//     if (!flightUpdates) {
//         return res.status(400).json({
//             "message": "Data for updates not found in body"
//         })
//     }

//     if (!foundFlight) {
//         return res.status(404).json({
//             "message": `Flight with id ${id} not found`
//         })
//     }
    
//     const detailsToChange = Object.keys(flightUpdates);
//     const updatedFlight = { ...foundFlight };
//     detailsToChange.forEach(key => {
//         updatedFlight[key] = flightUpdates[key];
//     });

//     const updatedFlightsData = flightsData.map(flight => flight.id === updatedFlight.id ? updatedFlight : flight)
//     await fsPromises.writeFile(
//         path.join(__dirname, "..", "models", "flights.json"),
//         JSON.stringify(updatedFlightsData)
//     )

//     res.status(201).json({
//         "message": "Flight updated successfully",
//         flightDetails: updatedFlight
//     })
// }


// // logic to delete a flight by id
// exports.deleteFlight = async (req, res) => {
//     if (!flightsData.length) {
//         return res.status(404).json({
//             "message": "No flight data available"
//         })
//     }

//     const id = Number(req.params.id);
//     const foundFlight = flightsData.find(flight => flight.id === id);

//     if (!foundFlight) {
//         return res.status(404).json({
//             "message": `Flight with id ${id} not found`
//         })
//     }
//     const newFlightsData = flightsData.filter(flight => flight.id !== id);
//     await fsPromises.writeFile(
//         path.join(__dirname, "..", "models", "flights.json"),
//         JSON.stringify(newFlightsData)
//     )

//     res.status(204).json({
//         "message": "Flight deleted successfully",

//     })
// }





// #####################################################################################
// #####################################################################################
// #####################################################################################
// #####################################################################################


// #########################    USING MONGODB AS DB    ##################################
// ##################################################################################################


const Flight = require('../models/Flight')
const { format } = require('date-fns')


// logic to get all flights
exports.getAllFlights = async (req, res) => {
    const flightsData = await Flight.find({});
    console.log(flightsData);
    
    res.json({
        "flights": flightsData
    })
}

// logic to get a single flight by id
exports.getSingleFlight = async (req, res) => {
    const id = req.params.id;
    const foundFlight = await Flight.findById(id);

    if (!foundFlight) {
        return res.status(404).json({
            "message": `Flight with id ${id} not found`
        })
    }
    res.json({
        "flight": foundFlight
    })
}

// logic to book (/add) a new flight
exports.bookFlight = async (req, res) => {
    const flightDetails = req.body;
    if (!flightDetails.title || !flightDetails.time || !flightDetails.price || !flightDetails.date) {
        return res.status(400).json({
            "message": "Flight must include title, time and price"
        })
    }

    const newFlight = {
        ...flightDetails,
        dateBooked: format(new Date(), 'dd-MM-yyyy')
    }
    const result = await Flight.create(newFlight)
    console.log(result)
    res.status(201).json({
        "message": "Flight booked successfully",
        flightDetails: newFlight
    })
}


// logic to update a flight by id
exports.updateFlight = async (req, res) => {
    const id = req.params.id;
    const flightUpdates = req.body;
    const foundFlight = await Flight.findById(id)

    if (!flightUpdates) {
        return res.status(400).json({
            "message": "Data for updates not found in body"
        })
    }

    if (!foundFlight) {
        return res.status(404).json({
            "message": `Flight with id ${id} not found`
        })
    }
    
    await Flight.findByIdAndUpdate(
        id,
        { ...flightUpdates },
        (err, result) => {
            if (err) {
                console.log(err.message);
            }
            res.status(201).json({
                "message": "Flight updated successfully",
                updatedFlight: result
            })
        }
    ).clone()
}


// logic to delete a flight by id
exports.deleteFlight = async (req, res) => {
    const id = req.params.id;
    const foundFlight = await Flight.findById(id);

    if (!foundFlight) {
        return res.status(404).json({
            "message": `Flight with id ${id} not found`
        })
    }
    const response = await Flight.findByIdAndDelete(id);
    res.status(204).json({
        "message": "Flight deleted successfully",
        response
    })
}

