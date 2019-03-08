import React from 'react';
import {shallow} from 'enzyme';
import ExpenseDashBoardPage from '../../components/ExpenseDashboardPage';

test('render dashboard', () => {
    const wrapper = shallow(<ExpenseDashBoardPage/>);
    expect(wrapper).toMatchSnapshot();
})