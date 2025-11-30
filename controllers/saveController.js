const saveRecipes = require('../models/saveRecipesModel');
const users = require('../models/userModel');

//addd to collection
exports.addToCollectionController = async (req,res)=>{
    console.log("Inside addToCollectionController");
    //get id,mail,name,image
    const {name,image} = req.body
    const {id} = req.params
    const userMail = req.payload
    try{
        const existingRecipe = await saveRecipes.findOne({recipeId:id,userMail})
        if(existingRecipe){
            res.status(409).json("Recipe already in your collection!!! Please add another...")
        }else{
            const newRecipe = new saveRecipes({
                recipeId:id,recipeName:name,recipeImage:image,userMail
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    }catch(err){
        res.status(500).json(err)
    }
}

//get all  saved recipe of a user
exports.getSavedRecipesController = async (req,res)=>{
    console.log("Inside getSavedRecipesController");
    const userMail = req.payload
    try{
        const allSavedRecipes = await saveRecipes.find({userMail})
        res.status(200).json(allSavedRecipes)
    }catch(err){
        res.status(500).json(err)
    }
}

//remove save recipe
exports.deleteSaveRecipeController = async (req,res)=>{
    console.log("Inside deleteSaveRecipeController");
    const {id} = req.params
    try{
        const deleteRecipe = await saveRecipes.findByIdAndDelete({_id:id})
        res.status(200).json(deleteRecipe)
    }
    catch(err){
        res.status(500).json(err)
    }
}
