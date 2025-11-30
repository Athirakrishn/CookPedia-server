const feedbacks = require('../models/feedbackModel')

//add to feedback
exports.addFeedbackController= async(req,res)=>{
    console.log("Inisde addFeedbackController");
    const {name,email,message} = req.body

    try{
        const newFeedback = new feedbacks({
            name,email,message
        })
        await newFeedback.save()
        res.status(200).json("Thank you for your feedback!!! We appreciate your effort to improve us...")
    }catch(err){
        res.status(500).json(err)
    }
    
}
//get feedback list
exports.getFeedbackListController = async (req,res)=>{
    console.log("Inside getFeedbackListController ");
    try{
        const allfeedbacks = await feedbacks.find()
        res.status(200).json(allfeedbacks)
    }catch(err){
        res.status(500).json(err)
    }
}

//update feedback status
exports.updateFeedbackStatusController = async (req,res)=>{
    console.log("Inside updateFeedbackStatusController ");
    const {id} = req.params
    const status = req.query.status
    try{
        const existingFeedback = await feedbacks.findById({_id:id})
        existingFeedback.status = status
        await existingFeedback.save()
        res.status(200).json(existingFeedback)
    }catch(err){
        res.status(500).json(err)
    }
}

//get feedback approve list -
exports.getFeedbackApporveListController = async (req,res)=>{
    console.log("Inside getFeedbackApporveListController ");
    try{
        const allfeedbacks = await feedbacks.find({status:{$eq:"approve"}})
        res.status(200).json(allfeedbacks)
    }catch(err){
        res.status(500).json(err)
    }
}