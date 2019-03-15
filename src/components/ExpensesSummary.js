import React from 'react';
import {connect} from 'react-redux';
import numeral from 'numeral';
import selectedExpenses from '../selectors/expenses';
import getExpenseTotal from '../selectors/expenses-total';

export const ExpensesSummary = ({expenseCount, expensesTotal}) => { // destructuring props
    const word = expenseCount === 1 ? 'expense' : 'expenses';
    const totalFormatted = numeral(expensesTotal / 100).format('$0,0.00');
    return (
        <div>
            <h1>Viewing {expenseCount} {word} totalling {totalFormatted}</h1>
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