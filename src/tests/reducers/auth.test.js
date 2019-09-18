import authReducer from '../../reducers/auth';

test('test login', () => {
    const state = authReducer({}, {type: 'LOGIN', uid: 'TESTID'});
    expect(state.uid).toBe('TESTID');
});

test('test logout', () => {
    const state = authReducer({uid: 'TESTID'}, {type: 'LOGOUT'});
    expect(state).toEqual({});
});