import React from 'react';
// import ReactShallowRenderer from 'react-test-renderer/shallow';
import {shallow} from 'enzyme';
import {Header} from '../../components/Header';

test('Header', () => {
    const wrapper = shallow(<Header startLogout={() => {}}/>);
    expect(wrapper).toMatchSnapshot();
});

test('call startLogout on button click', () => {
    const startLogout =  jest.fn();
    const wrapper = shallow(<Header startLogout={startLogout}/>);
    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
});