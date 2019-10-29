import React from 'react';
import ExpenseForm from './ExpenseForm';
import {connect} from 'react-redux';
import {startAddExpense} from '../actions/expenses';

// refactor to class to use mapDispatchToProps and make testing easier
// 'expense' variable comes from the ExpenseForm
export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.startAddExpense(expense);
        this.props.history.push('/');
    };
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Save Expense</h1>
                    </div>
                </div>
                <div className="content-container"><ExpenseForm onSubmit={this.onSubmit}/></div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({ // allows to call dispatch using simpler props.onSubmit syntax in the class, for easier testing
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
});
export default connect(undefined, mapDispatchToProps)(AddExpensePage);
