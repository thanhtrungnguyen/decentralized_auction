import Category from "../models/Category.js";
import Property from "../models/Property.js";

//create property
export const createProperty = async (req, res, next) => {
    const newPro = new Property(req.body);

    try {
        const savedProperty = await newPro.save();
        res.status(200).json(savedProperty);

    } catch (error) {
        next(error);
    }
}

//update property
export const updateProperty = async (req, res, next) => {
    

    try {
        const updateProperty = await Property.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true });
        res.status(200).json(updateProperty);

    } catch (error) {
        next(error);
    }
}
//find property by id
export const findPropertyByID = async (req, res, next) => {
    

    try {
        const updateProperty = await Property.findById(req.params.id);
        res.status(200).json(updateProperty);

    } catch (error) {
        next(error);
    }
}



// create category
export const createCate = async (req, res, next) => {
    const newCate = new Category(req.body);

    try {
        const savedCate = await newCate.save();
        res.status(200).json(savedCate);

    } catch (error) {
        next(error);
    }
}

// get all category
export const getAllCate = async (req, res, next) => {
    

    try {
        const categories = await Category.find();
        res.status(200).json(categories);

    } catch (error) {
        next(error);
    }
}
