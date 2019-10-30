import React from 'react';
import {connect} from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
    <div className="content-container">
        <div className="list-header">
            <div className="show-mobile">Expenses</div>
            <div className="show-desktop">Expense</div>
            <div className="show-desktop">Amount</div>
        </div>
        <div className="list-body">
            {
                props.expenses.length === 0 ? (<div className="list-item__message"><span>No expenses.</span></div>) :
                    (props.expenses.map((current) => {
                        return <ExpenseListItem key={current.id} {...current}/>
                    }))
            }
        </div>
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
