const Restaurant = require('../models/Restaurant');

module.exports = {
    addRestaurant: async (req, res) => {
        const newRestaurant = new Restaurant(req.body)

        try {
            await newRestaurant.save()
            res.status(201).json({ status: true, message: "Restaurant Created Successfully" })
        } catch (error) {
            res.status(500).json({ status: false, message: "Error Creating Restaurant", error: error.message })
        }
    },

    serviceAvailability: async (req, res) => {
        const restaurantId = req.params.id;

        try {
            const restaurant = await Restaurant.findById(restaurantId)

            if (!restaurant) {
                return res.status(403).json({ status: false, message: "Restaurant not found" })
            }

            restaurant.isAvailable = !restaurant.isAvailable
            await restaurant.save()
            res.status(200).json({ status: true, message: "Availability Successfully Toggled", isAvailable: restaurant.isAvailable })
        } catch (error) {
            res.status(500).json({ status: false, message: "Error Toggling Restaurant" })
        }
    },

    deleteRestaurant: async (req, res) => {
        const restaurantId = req.params.id;

        try {
            const restaurant = await Restaurant.findById(restaurantId)

            if (!restaurant) {
                return res.status(403).json({ status: false, message: "Restaurant not found" })
            }

            await Restaurant.findByIdAndDelete(restaurantId)
            res.status(200).json({ status: true, message: "Restaurant Successfully Deleted" })
        } catch (error) {
            res.status(500).json({ status: false, message: "Error Deleting Restaurant" })
        }
    },

    getRestaurant: async (req, res) => {
        const restaurantId = req.params.id

        try {
            const restaurant = await Restaurant.findById(restaurantId)

            if (!restaurant) {
                return res.status(404).json({ status: false, message: "Restaurant not found" })
            }

            res.status(200).json(restaurant)
        } catch (error) {
            res.status(500).json({ status: false, message: "Error Retrieving Restaurant" })
        }
    },

    getRandomRestaurants: async (req, res) => {
        try {
            let randomRestaurant = [];

            if (req.params.code) {
                randomRestaurant = await Restaurant.aggregate([
                    { $match: { code: req.params.code } },
                    { $sample: { size: 5 } },
                    { $project: { _v: 0 } }
                ])
            }

            if (!randomRestaurant.length) {
                randomRestaurant = await Restaurant.aggregate([
                    { $sample: { size: 5 } },
                    { $project: { _v: 0 } }
                ])
            }

            if (randomRestaurant.length) {
                res.status(200).json(randomRestaurant)
            }

        } catch (error) {
            res.status(500).json({ status: false, message: "Error Finding Restaurants" })
        }
    }
}