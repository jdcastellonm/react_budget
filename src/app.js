import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import getVisibleExpenses from './selectors/expenses';
import {addExpense, removeExpense, editExpense} from './actions/expenses';
import {setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from './actions/filters';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import './firebase/firebase'

const store = configureStore();
store.subscribe(() => {
    const state = store.getState();
    console.log(getVisibleExpenses(state.expenses, state.filters))
});
const expenseOne = store.dispatch(addExpense({description: 'water bill', amount: 7570}));
const expenseTwo = store.dispatch(addExpense({description: 'gas bill', amount: 2100}));
const expenseThree = store.dispatch(addExpense({description: 'car', amount: 18000}))

const App = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);


ReactDOM.render(App, document.getElementById("app"));