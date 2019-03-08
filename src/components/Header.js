import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => (
    <header>
        <h1>Budget</h1>
        <NavLink exact={true} activeClassName='is-active' to='/'>Home</NavLink>
        <NavLink exact={true} activeClassName='is-active' to='/create'>Add Expense</NavLink>
        <NavLink exact={true} activeClassName='is-active' to='/edit'>Edit Expense</NavLink>
        <NavLink exact={true} activeClassName='is-active' to='/help'>Help</NavLink>
    </header>
)
export default Header;