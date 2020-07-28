const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        wallet : {
            type: Number,
            default: 0
        },
        stocksSold : {
            type: Number,
            default: 0
        },
        stocks: [
            {
                symbol: String,
                price: Number,
                shares: Number,
                volume: Number,
                asset_value: Number,
                date: {type: Date, default: Date.now}
            }
        ]
    }
);

const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;

