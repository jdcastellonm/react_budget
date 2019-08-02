import { addExpense, startAddExpense, editExpense, removeExpense, setExpenses, startRemoveExpense, startSetExpenses } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

// set expenses test data in database
beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({id, description, note, amount, createdAt}) => {
        expensesData[id] = {description, note, amount, createdAt};
    });
    database.ref('expenses').set(expensesData).then(() => done());
});

test('test remove expense action', () => {
    const action = removeExpense('asdf123');
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: 'asdf123'
    });
});

test('test remove expense from the databse', (done) => {
    const store = createMockStore({});
    const id = expenses[2].id;
    store.dispatch(startRemoveExpense(id)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        return database.ref(`expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });
});

test('test edit expense action', () => {
    const action = editExpense('asdf123', {note: 'New note value'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: 'asdf123',
        updates: {  // note the new values are passed in as one object, which are spread (...) on the reducer to merge on existing state
            note: 'New note value'
        }
    })
});

test('test add expense action', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('add expense to the database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 5000,
        note: 'gaming mouse',
        createdAt: 4000
    };
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        return database.ref(`expenses/${actions[0].expense.id}`).once('value').then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });
    });
});

test('add expense to the database and store with defaults', (done) => {
    const store = createMockStore({});
    const expenseDefaults = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    };
    store.dispatch(startAddExpense(expenseDefaults)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefaults
            }
        });
        return database.ref(`expenses/${actions[0].expense.id}`).once('value').then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseDefaults);
            done();
        });
    });
});

test('setup set expenses action object with data', () =>  {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('fetch expeses from firebase', (done) => {
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});
// test('test add expense with defaults', () => {
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             description: '',
//             note: '',
//             amount: 0,
//             createdAt: 0,
//             id: expect.any(String)
//         }
//     })
// })