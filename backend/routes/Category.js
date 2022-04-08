const express = require("express")
const categoryValidation = require("../validations/categoryValidation")
const Category = require("../controllers/Category")
const Authorisation = require("../services/Authorisation")

const router = express.Router();

router.post('/create-category' , [categoryValidation , Authorisation.authorised ] , Category.create)
router.get("/categories/:page",  Category.categories)
router.get('/fetch-category/:id' , Authorisation.authorised , Category.fetchCategory)
router.put('/update-category/:id' , [categoryValidation, Authorisation.authorised] , Category.updateCategory)
router.delete('/delete-category/:id' , Authorisation.authorised , Category.deleteCategory)
router.get('/allcategories' , Category.allCategories)


module.exports = router