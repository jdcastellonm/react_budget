import React from 'react';
import {connect} from 'react-redux';
import numeral from 'numeral';
import selectedExpenses from '../selectors/expenses';
import getExpenseTotal from '../selectors/expenses-total';
import {Link} from 'react-router-dom';

export const ExpensesSummary = ({expenseCount, expensesTotal}) => { // destructuring props
    const word = expenseCount === 1 ? 'expense' : 'expenses';
    const totalFormatted = numeral(expensesTotal / 100).format('$0,0.00');
    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Viewing <span>{expenseCount}</span> {word} totalling <span>{totalFormatted}</span></h1>
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    const visibleExpenses = selectedExpenses(state.expenses, state.filters); // reminder this returns a filtered array
    return {
        expenseCount: visibleExpenses.length,
        expensesTotal: getExpenseTotal(visibleExpenses) // get the sum from the filtered array
    }
};

export default connect(mapStateToProps)(ExpensesSummary);
