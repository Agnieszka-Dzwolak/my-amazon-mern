import Product from '../models/product.js';

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find();

            if (products.length === 0) {
                res.status(404).json({ message: 'No products found' });
            } else {
                res.status(200).json(products);
            }
        } catch (err) {
            res.status(500).json({ message: `Server error: ${err.message}` });
        }
    },
    getProduct: async (req, res) => {
        const { id } = req.params;
        try {
            const product = await Product.findOne({ _id: id });

            if (product) {
                res.status(200).json(product);
            } else {
                res.status(400).json({ message: 'Product not found' });
            }
        } catch (err) {
            res.status(500).json({ message: `Server error: ${err.message}` });
        }
    },
    createProduct: async (req, res) => {
        const { title, description, category, price, image } = req.body;
        try {
            if (title && description && category && price && image) {
                const newProduct = new Product({
                    title,
                    description,
                    category,
                    price,
                    image
                });
                await newProduct.save();
                res.status(201).json(newProduct);
            } else {
                res.status(400).json({ message: 'All fields are required' });
            }
        } catch (err) {
            res.status(500).json({ message: `Server error: ${err.message}` });
        }
    },
    updateProduct: async (req, res) => {
        const { id } = req.params;
        const { title, description, category, price, image } = req.body;
        try {
            if (title && description && category && price && image) {
                const updatedProduct = await Product.updateOne(
                    { _id: id },
                    { title, description, category, price, image }
                );

                if (updatedProduct.modifiedCount === 0) {
                    res.status(404).json({
                        message: 'Product not found'
                    });
                } else {
                    res.status(200).json({
                        message: 'Product updated successfully',
                        updatedProduct
                    });
                }
            } else {
                res.status(400).json({ message: 'All fields are required' });
            }
        } catch (err) {
            res.status(500).json({ message: `Server error: ${err.message}` });
        }
    },
    deleteProduct: async (req, res) => {
        const { id } = req.params;
        try {
            const deletedProduct = await Product.deleteOne({ _id: id });

            if (deletedProduct.deletedCount === 0) {
                res.status(404).json({ message: 'Product not found' });
            } else {
                res.status(200).json({
                    message: 'Product deleted successfully'
                });
            }
        } catch (err) {
            res.status(500).json({ message: `Server error: ${err.message}` });
        }
    }
};

export default productController;
