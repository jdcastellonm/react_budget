// import uuid from 'uuid';
import database from '../firebase/firebase';

export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});
export const startAddExpense = ((expenseData = {}) => { // use thunk to return a function that will dispatch the action
    return (dispatch) => {
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData;
        const expense = {description, note, amount, createdAt};
        return database.ref('expenses').push(expense).then((ref) => { // return the then() to allow promise chaining
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
});

export const removeExpense = (id) => ({
    type: 'REMOVE_EXPENSE',
    id
});
export const editExpense = (id, updates) => ({ // 'updates' is an object containing the updated properties
    type: 'EDIT_EXPENSE',
    id,
    updates
});