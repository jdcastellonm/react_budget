import React from 'react';
import {connect} from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
    <div>
        {
            props.expenses.length === 0 ? (<p>No expenses.</p>) :
            (props.expenses.map((current) => {
                return <ExpenseListItem key={current.id} {...current}/>
            }))
        }
    </div>
);


// this is a hoc/decorator. the wrapper function gets returned from connect(), which is then immediately run to wrap
// the ExpenseList component. likely written this way to be able to make use of the state when preparing the wrapper
const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters) // calling the sort by filters function here before mapping to props
    }
};
export default connect(mapStateToProps)(ExpenseList);