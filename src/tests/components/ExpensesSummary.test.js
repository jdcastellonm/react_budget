import React from 'react';
import {shallow} from 'enzyme';
import {ExpensesSummary} from '../../components/ExpensesSummary';

test('render summary with 1 expense', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={234}/>);
    expect(wrapper).toMatchSnapshot();
});
test('render summary with expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={21} expensesTotal={23489234}/>);
    expect(wrapper).toMatchSnapshot();
});