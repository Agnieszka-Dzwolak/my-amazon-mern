import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            require: true
        },

        quantity: {
            type: Number,
            require: true
        },

        image: {
            type: String,
            required: true
        },

        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true
        }
    },
    { timestamps: true }
);

const Item = mongoose.model('Item', itemSchema);
export default Item;
