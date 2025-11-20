const express = require('express')
const recipeController = require('../controllers/recipeController')

const routes = express.Router()

//get all recipes
routes.get('/recipes/all',recipeController.getAllRecipesController)


module.exports = routes