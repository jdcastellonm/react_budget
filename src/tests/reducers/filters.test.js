import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('test default filter values', () => {
    const state = filtersReducer(undefined, {type: '@@INIT'});  // default state initialized by redux
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('test setting sortBy to amount', () => {
    const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});
    expect(state.sortBy).toBe('amount');
});

test('test setting sortBy to date', () => {
    const currentState = { // set sortBy to 'amount' here since 'date' is the default value
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };
    const action = { type: 'SORT_BY_DATE'};
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('date');
});

test('test set text filter', () => {
    const state = filtersReducer(undefined, {type: 'SET_TEXT_FILTER', text: 'hello'});
    expect(state.text).toBe('hello');
})

test('test set startDate filter', () => {
    const state = filtersReducer(undefined, {type: 'SET_START_DATE', startDate: moment().startOf('month')})
    expect(state.startDate).toEqual(moment().startOf('month'));
});

test('test set endDate filter', () => {
    const state = filtersReducer(undefined, {type: 'SET_END_DATE', endDate: moment().endOf('month')})
    expect(state.endDate).toEqual(moment().endOf('month'));
});