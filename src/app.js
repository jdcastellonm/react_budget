import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import getVisibleExpenses from './selectors/expenses';
import {startSetExpenses} from './actions/expenses';
import {setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from './actions/filters';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import {firebase} from './firebase/firebase'

const store = configureStore();
store.subscribe(() => {
    const state = store.getState();
    console.log(getVisibleExpenses(state.expenses, state.filters))
});

const App = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('log in');
    } else {
        console.log('log out');
    }
});

ReactDOM.render(<p>Loading data...</p>, document.getElementById("app"));
store.dispatch(startSetExpenses()).then(() => {
    ReactDOM.render(App, document.getElementById("app"));
});