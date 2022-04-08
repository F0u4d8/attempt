const {ValidationResult, validationResult} = require ("express-validator")
const CategoryModel = require ("../models/Category")

class Category {

async create (req,res){

const errors = validationResult(req)
const {name} = req.body

if(errors.isEmpty()){
const exist = await CategoryModel.findOne({name})
if (!exist) {
    await CategoryModel.create({name})
    return res.status(201).json({message:'Your category has been created successfully'})


} else {
    return res.status(400).json({errors: `${name} already exist `})
}


}else{


    return res.status(400).json({errors: errors.array()})
}



}

async categories (req,res) {

const page  = req.params.page
const perPage = 3;
const skip = (page - 1) * perPage

try {
    const count = await CategoryModel.find({}).countDocuments()
const response = await CategoryModel.find({}).skip(skip).limit(perPage).sort({updatedAt: -1})

return res.status(200).json({categories : response, perPage , count})


    
} catch (error) {
    console.log(error.message)
}

}

async fetchCategory (req,res){
const {id} = req.params
try {
    const response = await CategoryModel.findOne({_id:id})
    
    return res.status(200).json({category : response})


} catch (error) {
    console.log(error.message)
}
}

async updateCategory( req, res){

const {id} = req.params
const {name} = req.body
const errors = validationResult(req)

if(errors.isEmpty()){
const exist = await CategoryModel.findOne({name})
if (!exist) {
    
const response = await CategoryModel.updateOne({_id: id} , {$set: {name}})
return res.status(200).json({message: 'your category has been updated successfully'})

} else {
    return res.status(400).json({errors: [{msg: `${name} category already exist`}]})
}


}else{

    return res.status(400).json({errors: errors.array()})

}


}

async deleteCategory (req , res ){

const {id} = req.params

try {
    
await CategoryModel.deleteOne({_id:id})
return res.status(200).json({message: 'Category has deleted successfully'})

} catch (error) {
    

    return res.status(500).json('server internal error')
}


}


async allCategories(req, res){

try {
    
const categories = await CategoryModel.find({})
return res.status(200).json({categories})

} catch (error) {
    return res.status(500).json('server internal error')
}


}


}

module.exports = new Category