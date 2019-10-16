import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {startLogout} from '../actions/auth';

export const Header = (props) => (
    <header>
        <h1>Budget</h1>
        <NavLink activeClassName='is-active' to='/dashboard'>Home</NavLink>
        <NavLink exact={true} activeClassName='is-active' to='/create'>Add Expense</NavLink>
        <button onClick={props.startLogout}>Logout</button>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});
export default connect(undefined, mapDispatchToProps)(Header);
