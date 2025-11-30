const downloads = require('../models/downloadModel')

//add to download
exports.addToDownloadController = async (req,res)=>{
    console.log("Inside addToDownloadController");
    //recipe id,mail,recipe name,cuisine,image
    const {id} = req.params
    const userMail = req.payload
    const {name,cuisine,image} = req.body
    // console.log(id,userMail,name,cuisine,image);    
    try{
        const existingRecipe = await downloads.findOne({recipeId:id})
        if(existingRecipe){
            //update count
            existingRecipe.count+=1
            await existingRecipe.save()
            res.status(200).json(existingRecipe)
        }else{
            // add recipe to download list
            const newDownload = new downloads({
                recipeId:id,recipeName:name,recipeImage:image,recipeCuisine:cuisine,count:1,userMail
            })
            await newDownload.save()
            res.status(200).json(newDownload)
        }
    }catch(err){
        res.status(500).json(err)
    }
}

//get user download list
exports.getUserDownloadListController = async (req,res)=>{
    console.log("Inside getUserDownloadListController");
    const userMail = req.payload
    try{
        const allUserDownloadList = await downloads.find({userMail})
        res.status(200).json(allUserDownloadList)
    }catch(err){
        res.status(500).json(err)
    }
}

//get download list
exports.getDownloadListController = async (req,res)=>{
    console.log("Inside getDownloadListController ");
    try{
        const allDownload = await downloads.find()
        res.status(200).json(allDownload)
    }catch(err){
        res.status(500).json(err)
    }
}