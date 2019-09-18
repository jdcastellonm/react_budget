import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter, {history} from './routers/AppRouter';
import configureStore from './store/configureStore';
import getVisibleExpenses from './selectors/expenses';
import {startSetExpenses} from './actions/expenses';
// import {setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from './actions/filters';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import {firebase} from './firebase/firebase'
import {login, logout} from './actions/auth';

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


// render functions
ReactDOM.render(<p>Loading data...</p>, document.getElementById("app"));
let hasRendered = false;
const renderApp = () => { // make sure the page renders only once
    if (!hasRendered) {
        ReactDOM.render(App, document.getElementById("app"));
        hasRendered = true;
    }
}

// authentication redirects
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid)); // dispatch the login action and send the user id to the state
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if (history.location.pathname === '/') { // redirect to dashboard if on login page
                history.push('/dashboard');
            }
        });
    } else {
        store.dispatch(logout()); // reset uid to null
        renderApp();
        history.push('/'); // redirect to login page (logged out)
    }
});