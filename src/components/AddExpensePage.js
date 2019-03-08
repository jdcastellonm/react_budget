import React from 'react';
import ExpenseForm from './ExpenseForm';
import {connect} from 'react-redux';
import {addExpense} from '../actions/expenses';

// refactor to class to use mapDispatchToProps and make testing easier
export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.addExpense(expense);
        this.props.history.push('/');
    };
    render() {
        return (
            <div>
                add expense component
                <ExpenseForm onSubmit={this.onSubmit}/>
            </div>
        );
    }
}

// const AddExpensePage = (props) => (
//     <div>
//         add expense component
//         <ExpenseForm onSubmit={(expense) => { // 'expense' here comes from the form
//             props.dispatch(addExpense(expense));
//             props.history.push('/');
//         }}/>
//     </div>
// )

const mapDispatchToProps = (dispatch) => ({ // allows to call dispatch using simpler props.onSubmit syntax in the class, for easier testing
    addExpense: (expense) => dispatch(addExpense(expense))
});
export default connect(undefined, mapDispatchToProps)(AddExpensePage);