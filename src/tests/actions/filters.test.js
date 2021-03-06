import {setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from '../../actions/filters';
import moment from 'moment';

test('test set start date', () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    });
});

test('test set end date', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    });
});

test('test set text filter', () => {
    const action = setTextFilter('asdf');
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'asdf'
    });
});

test('test sort by amount', () => {
    const action = sortByAmount();
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT',
        // sortBy: 'amount'
    });
});

test('test sort by date', () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: 'SORT_BY_DATE',
        // sortBy: 'date'
    });
});