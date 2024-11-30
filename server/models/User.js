const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    amount: Number,
    date: Date,
    comment: String,
    amountType: String
});

const MonthSchema = new mongoose.Schema({
    expenses: [ExpenseSchema]
});


const UserSchema = new mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, required: true, unique: true},
    months: {
        January:MonthSchema,
        February:MonthSchema,
        March:MonthSchema,
        April:MonthSchema,
        May:MonthSchema,
        June:MonthSchema,
        July:MonthSchema,
        August:MonthSchema,
        September:MonthSchema,
        October:MonthSchema,
        November:MonthSchema,
        December:MonthSchema,
    }
});




module.exports = mongoose.model('User', UserSchema);