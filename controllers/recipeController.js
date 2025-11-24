const recipes = require('../models/recipeModel')

//get all recipes
exports.getAllRecipesController = async (req,res)=>{
    console.log("Inside getAllRecipesController");
    try{
        const allRecipes = await recipes.find()
        res.status(200).json(allRecipes)
    }catch(error){
        res.status(500).json(error)
    }
}

//view recipe controller
exports.viewRecipesController = async (req,res)=>{
    console.log("Inside viewRecipesController");
    const {id}=req.params
    try{
        const viewDetails = await recipes.findById({_id:id})
        res.status(200).json(viewDetails)
    }catch(error){
        res.status(500).json(error)
    }
}

exports.getRelatedRecipesController = async (req,res)=>{
    console.log("Inside getRelatedRecipesController");
    const cuisine =req.query.cuisine
    try{a
        
        const allRecipeDetails = await recipes.findById({cuisine})
        res.status(200).json(allRecipeDetails)
    }catch(error){
        res.status(500).json(error)
    }
}