const router = require('express').Router();
const restaurantController = require('../controllers/restaurantController')
const upload = require('../utils/multer');
const { verifyAndAuthorization, verifyVendor } = require('../middleware/verifyToken')

router.post('/', verifyAndAuthorization, restaurantController.addRestaurant)
router.get("/list", restaurantController.getAllRestaurants)
router.get('/byId/:id', restaurantController.getRestaurant)
router.get('/:code', restaurantController.getRandomRestaurants)
router.delete('/:id', verifyVendor, restaurantController.deleteRestaurant)
router.patch('/:id', verifyVendor, restaurantController.serviceAvailability)
router.get('/owner/:ownerId', verifyVendor, restaurantController.getRestaurantsByOwner);

module.exports = router;