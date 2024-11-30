const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Add a new user
// router.post('/', async (req, res) => {
//   try {
//     const newUser = new User(req.body);
//     const savedUser = await newUser.save();
//     res.status(201).json(savedUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// Add an expense to a specific month
// router.post('/:userId/:month/expenses', async (req, res) => {
//   const { userId, month } = req.params;
//   const expense = req.body;

//   try {
//     const user = await User.findById(userId);
//     if (!user) 
//         return res.status(404).json({ message: 'User not found' });
//     if(!user.months[month].expense.push(expense)){
//         user.months[month] = {expense: []};
//     }
//     user.months[month].expenses.push(expense);
//     await user.save();

//     res.status(201).json(user);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// Get a month's data
router.get('/:id/months/:month', async (req, res) => {
    const {id, month} = req.params;
    try {
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({expenses: user.months[month].expenses});
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

// Post
router.post('/:id/months/:month/expenses', async (req, res) => {
    const {id, month} = req.params;
    const {amount, date, comment, amountType} = req.body;

    try {
        const user = await User.findById(id);
        if (!user) 
            return res.status(404).json({ message: 'User not found' });
        if(!user.months[month]){
            user.months[month] = {expenses:[]};
        }
        const newExpense = {amount, date, comment, amountType};
        user.months[month].expenses.push(newExpense);
        await user.save();
        res.status(201).json({message: "Expense added", expense:newExpense});
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

// Update an expense
router.patch('/:id/months/:month/expenses/:expenseId', async (req, res) => {
    try {
        const { id, month, expenseId } = req.params;
        const { amount, date, comment, amountType } = req.body;
  
        const user = await User.findById(id);
        if (!user || !user.months[month]) {
            return res.status(404).json({ message: 'User or month not found' });
        }
    
        // Find the expense by id
        const expense = user.months[month].expenses.id(expenseId);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
    
        // Update the expense
        if (amount !== undefined) 
            expense.amount = amount;
        if (date !== undefined) 
            expense.date = date;
        if (comment !== undefined) 
            expense.comment = comment;
        if (amountType !== undefined) 
            expense.amountType = amountType;
    
        await user.save();
        res.status(200).json({ message: 'Expense updated successfully', expense });
        } catch (error) {
        res.status(400).json({ message: error });
    }
});
  

// Delete an expense
router.delete('/:id/months/:month/expenses/:expenseId', async (req, res) => {
    try {
        const { id, month, expenseId } = req.params;
    
        const user = await User.findById(id);
        if (!user || !user.months[month]) {
            return res.status(404).json({ message: 'User or month not found' });
        }
    
        // Find the index of the expense to delete
        const expenseIndex = user.months[month].expenses.findIndex(
            (expense) => expense._id.toString() === expenseId
        );
    
        if (expenseIndex === -1) {
            return res.status(404).json({ message: 'Expense not found' });
        }
    
        // Remove the expense from the array
        user.months[month].expenses.splice(expenseIndex, 1);
    
        await user.save();
        res.status(200).json({ message: 'Expense deleted successfully' });
        } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
  

module.exports = router;
