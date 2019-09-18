import {login, logout} from '../../actions/auth';

test('test login action', () => {
    const action = login('TESTID');
    expect(action).toEqual({
        type: 'LOGIN',
        uid: 'TESTID'
    });
});

test('test logout action', () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    });
});