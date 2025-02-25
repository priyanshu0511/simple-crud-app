const Product = require('../models/product.model');
const mongoose = require('mongoose');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.log("Error message :", error)
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

const createProduct = async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please enter all the fields" })
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct })
    } catch (error) {
        console.log("Error occured", error.message);
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

const deleteProduct = async (req, res) => {

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Product not found." })
    }
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product successfully deleted" })
    } catch (error) {
        console.log("Error",error)
        res.status(500).json({ success: false, message: "Server Error" })
    }

}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Product not found." })
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true })
        res.status(200).json({ success: true, updatedProduct: updatedProduct })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

module.exports = {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct
};
