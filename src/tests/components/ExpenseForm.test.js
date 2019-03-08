import React from 'react';
import {shallow} from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';

test('render the form', () => {
    const wrapper = shallow(<ExpenseForm/>);
    expect(wrapper).toMatchSnapshot();
});

test('render the form with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[2]}/>);
    expect(wrapper).toMatchSnapshot();
});

test('render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm/>);
    expect(wrapper).toMatchSnapshot(); // render with no error

    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}    //  account for e.preventDefault from the form
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0); // test for existance of error string in the state
    expect(wrapper).toMatchSnapshot(); // render with error
});

test('test description on input change', () => {
    const value = 'New description';
    const wrapper = shallow(<ExpenseForm/>);
    wrapper.find('input').at(0).simulate('change', {
        target: {value}
    });
    expect(wrapper.state('description')).toBe(value);
});

test('test set note on textarea change', () => {
    const value = 'new note';
    const wrapper = shallow(<ExpenseForm/>);
    wrapper.find('textarea').simulate('change', {
        target: {value}
    });
    expect(wrapper.state('note')).toBe(value);
});

test('test set amount with valid value', () => {
    const wrapper = shallow(<ExpenseForm/>);
    wrapper.find('input').at(1).simulate('change', {
        target: {value: '23.50'}
    });
    expect(wrapper.state('amount')).toBe('23.50');
});

test('test set amount with invalid value', () => {
    const wrapper = shallow(<ExpenseForm/>);
    wrapper.find('input').at(1).simulate('change', {
        target: {value: '23.5034'}
    });
    expect(wrapper.state('amount')).toBe('');
});

test('test the onSubmit function for the form', () => {
    const spyOnSubmit = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[2]} onSubmit={spyOnSubmit}/>);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('');
    expect(spyOnSubmit).toHaveBeenLastCalledWith({ // a spy is needed here since the onSubmit function is provided by the parent that renders this form. the form then calls it with its data
        description: expenses[2].description,
        amount: expenses[2].amount,
        note: expenses[2].note,
        createdAt: expenses[2].createdAt
    });
});

test('test set new date on dateChange', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm/>);
    wrapper.find(SingleDatePicker).prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('test set calendar focus', () =>  {
    const wrapper = shallow(<ExpenseForm/>);
    wrapper.find(SingleDatePicker).prop('onFocusChange')({focused: true});
    expect(wrapper.state('calendarFocused')).toBe(true);
})