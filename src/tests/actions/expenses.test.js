import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('test remove expense action', () => {
    const action = removeExpense('asdf123');
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: 'asdf123'
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
    const expenseData = {
        description: 'Foo',
        amount: 123400,
        createdAt: 1400,
        note: 'Bar'
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            // instead of typing each property, we can spread 'expenseData' for the same results
            ...expenseData,
            // description: 'Foo',
            // amount: 123400,
            // createdAt: 1400,
            // note: 'Bar',
            id: expect.any(String)
        }
    });
});

test('test add expense with defaults', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            description: '',
            note: '',
            amount: 0,
            createdAt: 0,
            id: expect.any(String)
        }
    })
})