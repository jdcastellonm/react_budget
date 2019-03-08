import {createStore, combineReducers} from 'redux';


// actions


store.subscribe(() => {
    // console.log(store.getState());
    const state = store.getState();
    console.log(getVisibleExpenses(state.expenses, state.filters));
});
const expenseOne = store.dispatch(addExpense({description: 'whole foods', amount: 100}));
const expenseTwo = store.dispatch(addExpense({description: 'coffee', amount: 300}));
// store.dispatch(removeExpense(expenseOne.expense.id));
store.dispatch(editExpense(expenseTwo.expense.id, {amount: 700}));
// store.dispatch(setTextFilter('HEY THAR'));
// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));
// store.dispatch(setTextFilter('whol'));
//
const demoState = {
    expenses: [{
        id: 'asdf',
        description: 'january rent',
        note: 'this was the final payment for that address',
        amount: 10230,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
}