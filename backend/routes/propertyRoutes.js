const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertyController");


router.get("/", propertyController.getAllProperties);

router.post("/", propertyController.addProperty);

router.put("/update/:id", propertyController.updateProperty); // PUT method for updating

router.post("/book/:id", propertyController.bookProperty);


router.delete("/:id", propertyController.deleteProperty);

module.exports = router;
