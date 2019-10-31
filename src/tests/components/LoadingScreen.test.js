import React from 'react';
import {shallow} from 'enzyme';
import LoadingScreen from '../../components/LoadingScreen';

test('render the loading gif', () => {
    const wrapper = shallow(<LoadingScreen/>);
    expect(wrapper).toMatchSnapshot();
});
