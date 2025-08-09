const mongoose = require('mongoose');

const storeItemsInfoSchema = new mongoose.Schema({
    item_name: { type: String, required: true, unique: true },
    quantity: {type: String, required: true },
    store_type: { type: String, required: true },
    unit_price: { type: Number, required: true },
    discount: [{
        minQuantity: { type: Number, required: true },
        discountPercent: { type: Number, required: true }
    }],
    login_date: { type: Date, default: Date.now },
    seller_name: { type: String, required: true  },
    seller_email: { type: String, required: true }
});

module.exports = mongoose.model('storeItemsInfo', storeItemsInfoSchema);