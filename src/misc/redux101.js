import {createStore} from 'redux';

// reducers are
// 1. pure functions
// 2. never change state or action
const countReducer = (state = {count:  0}, action) => {
    // let incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };
        case 'SET':
            return {
                count: action.count
            }
        case 'RESET':
            return {
                count: 0
            };
        default:
            return state;
    }
};
const store = createStore(countReducer);
const unsub = store.subscribe(() => {
    console.log(store.getState());
});

// action object generators
const incrementCount = ({incrementBy = 1} = {}) => ({ //argument is being destructured
    type: 'INCREMENT',
    incrementBy
});
const decrementCount = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
});
const resetCount = () => ({
    type: 'RESET'
});
const setCount = ({count = 100} = {}) => ({
    type: 'SET',
    count
});

store.dispatch(incrementCount({incrementBy: 3}));
store.dispatch(incrementCount({incrementBy: 3}));
store.dispatch(incrementCount({incrementBy: 1}));
store.dispatch(decrementCount({decrementBy: 3}));
store.dispatch(resetCount());
store.dispatch(setCount({count: 140}));
// action objects, no generator functions
// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 3
// });
// store.dispatch({
//     type: 'RESET'
// });
// store.dispatch({
//     type: 'SET',
//     count: 100
// })

// destructuring
const book = {
    name: 'Quiet',
    author: 'Susan Cain',
    publisher: {
        // name: '',
        location: 'USA'
    }
}

let {name: publisherName = 'Self-Published'} = book.publisher;

console.log(publisherName);

// array destructuring
const coffee = ['coffee (hot)', '$2.00', '$2.50', '$2.75'];
let [item, ,price] = coffee;
console.log(`A medium ${item} costs ${price}`);