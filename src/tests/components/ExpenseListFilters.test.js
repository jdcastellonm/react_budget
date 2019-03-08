import React from 'react';
import {shallow} from 'enzyme';
import {ExpenseListFilters} from '../../components/ExpenseListFilters';
import {filters, dummyFilters} from '../fixtures/filters';
import moment from 'moment';
import {DateRangePicker} from 'react-dates';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;
beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(<ExpenseListFilters filters={filters} setTextFilter={setTextFilter} sortByDate={sortByDate} sortByAmount={sortByAmount} 
        setStartDate={setStartDate} setEndDate={setEndDate}/>)
});

test('render the list filters', () => {
    expect(wrapper).toMatchSnapshot();
});

test('render the filters list with dummy data', () => {
    wrapper.setProps({ // changing wrapper props as it was initialized in beforeEach()
        filters: dummyFilters
    });
    expect(wrapper).toMatchSnapshot();
});

test('handle text change', () => {
    wrapper.find('input').simulate('change', {
        target: {value: 'new text'}
    });
    expect(setTextFilter).toHaveBeenLastCalledWith('new text');
});

test('handle sort by date', () => {
    wrapper.find('select').simulate('change', {
        target: {value: 'date'}
    });
    expect(sortByDate).toHaveBeenCalled(); // this action takes no args
});

test('handle sort by amount', () => {
    wrapper.find('select').simulate('change', {
        target: {value: 'amount'}
    });
    expect(sortByAmount).toHaveBeenCalled(); // this action takes no args
});

test('handle date changes', () => {
    let startDate = moment(0).add(5, 'years');
    let endDate = moment(0).add(10, 'years');
    wrapper.find(DateRangePicker).prop('onDatesChange')({startDate, endDate});
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('handle date focus changes', () => {
    wrapper.find(DateRangePicker).prop('onFocusChange')('startDate');
    expect(wrapper.state('calendarFocused')).toBe('startDate');
});