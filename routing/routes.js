const express = require('express')
const recipeController = require('../controllers/recipeController')
const userController = require('../controllers/userController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const downloadController = require('../controllers/downloadController')
const saveController = require('../controllers/saveController')
const feedbackController = require('../controllers/feedbackController')
const adminJwtMiddleware = require('../middleware/adminJwtMiddleware')

const routes = express.Router()

// all users
//get all recipes
routes.get('/recipes/all',recipeController.getAllRecipesController)
//register
routes.post('/register',userController.registerController)
//login
routes.post('/login',userController.loginController)
//add feedback
routes.post('/user/feedback',feedbackController.addFeedbackController)
//get approve feedbacks
routes.get('/user/feedback/approve',feedbackController.getFeedbackApporveListController)

// login - user
//view recipes
routes.get('/recipes/:id/view',jwtMiddleware,recipeController.viewRecipesController)
//related recipe
routes.get('/related-recipes',jwtMiddleware,recipeController.getRelatedRecipesController)
//add to download
routes.put('/recipes/:id/download',jwtMiddleware,downloadController.addToDownloadController)
//save recipe
routes.post('/recipes/:id/save',jwtMiddleware,saveController.addToCollectionController)
//get save recipe
routes.get('/recipes/saved',jwtMiddleware,saveController.getSavedRecipesController)
//delete save recipe
routes.delete('/save-recipes/:id/remove',jwtMiddleware,saveController.deleteSaveRecipeController)
//get user download recipe
routes.get('/recipes/user/download',jwtMiddleware,downloadController.getUserDownloadListController)
//edit user profile
routes.post('/users/:id/edit',jwtMiddleware,userController.updateUserProfileController)

// login - admin
//get all user - admin
routes.get('/users',adminJwtMiddleware,userController.getAllUsersController)
//get all downloads - admin
routes.get('/downloads',adminJwtMiddleware,downloadController.getDownloadListController)
//get all feedback - admin
routes.get('/feedbacks',adminJwtMiddleware,feedbackController.getFeedbackListController)
//update feedback - admin
routes.put('/feedbacks/:id/edit',adminJwtMiddleware,feedbackController.updateFeedbackStatusController)

module.exports = routes