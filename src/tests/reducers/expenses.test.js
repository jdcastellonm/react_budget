import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('test default init state', () => {
    const state = expensesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
});

test('test remove by id', () => {
    const state = expensesReducer(expenses, {type: 'REMOVE_EXPENSE', id: expenses[1].id});
    expect(state).toEqual([expenses[0], expenses[2]]);

});

test('test id not found when removing', () => {
    const state = expensesReducer(expenses, {type: 'REMOVE_EXPENSE', id: '-1'});
    expect(state).toEqual(expenses);

});

test('test add expense', () => {
    const newExp = {
            id: '23',
            description: 'test',
            amount: 12300,
            note: 'hello',
            createdAt: 500
        };
    const state = expensesReducer(expenses, {
        type: 'ADD_EXPENSE',
        expense: newExp
    });
    expect(state).toEqual([...expenses, newExp])
});

test('test edit expense', () => {
    const edits = {
        description: 'wallet',
        amount: 500
    }
    const state = expensesReducer(expenses, {type: 'EDIT_EXPENSE', id: expenses[2].id, updates: edits});
    expect(state[2]).toEqual({
        id: '3',
        description: 'wallet',
        amount: 500,
        note: '',
        createdAt: moment(0).subtract(3, 'days').valueOf()
    })
});

test('test expense not found when editing', () => {
    const state = expensesReducer(expenses, {type: 'EDIT_EXPENSE', id: '-1', updates: {description: 'changed!'}});
    expect(state).toEqual(expenses);
})