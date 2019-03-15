import getExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('add multiple expenses', () => {
    const sum = getExpensesTotal(expenses);
    expect(sum).toBe(expenses[0].amount + expenses[1].amount + expenses[2].amount);
});

test('return 0 if no expenses', () => {
    const sum = getExpensesTotal([]);
    expect(sum).toBe(0);
});

test('add single expense', () => {
    // this is passing an object. it can be converted to an array of one element by wrapping the argument with []
    const sum = getExpensesTotal(expenses[1]);
    expect(sum).toBe(expenses[1].amount);
})