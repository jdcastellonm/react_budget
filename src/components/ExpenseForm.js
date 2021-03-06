import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';

export default class ExpenseForm extends React.Component {
    // a constructor is needed here to use default values
    constructor(props) {
        super(props);
        this.state = {
        description: props.expense ? props.expense.description : '',
        note: props.expense ? props.expense.note : '',
        amount: props.expense ? (props.expense.amount / 100).toString() : '',
        createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
        calendarFocused: false,
        error: ''
        };
    };
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({description}));
    };
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({note}));
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d*(\.\d{0,2})?$/)) {
            this.setState(() => ({amount}));
        }
    };
    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({createdAt}));
        }
    };
    onFocusChange = ({focused}) => {
        this.setState(() => ({calendarFocused: focused}));
    };
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({error: 'Description and amount are required!'}));
        }
        else {
            this.setState(() => ({error: ''}));
            this.props.onSubmit({ // run the function passed down from AddExpensePage. this sends the form's state back to the parent and makes the form reusable
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note // note that this is the 'expense' object argument of the onSubmit function from the parent!
            });
        }
    };
    render() {
        return (
            //<div className="content-container">
                <form className="form" onSubmit={this.onSubmit}>
                    {this.state.error && <p className="form__error">{this.state.error}</p>}
                    <input className="text-input" type='text' placeholder='Description' autoFocus value={this.state.description} onChange={this.onDescriptionChange}/>
                    <input className="text-input" type='text' placeholder='Amount' value={this.state.amount} onChange={this.onAmountChange}/>
                    <textarea className="text-area" placeholder='Add a note about the expense (optional)' value={this.state.note} onChange={this.onNoteChange}/>
                    <SingleDatePicker date={this.state.createdAt} onDateChange={this.onDateChange} focused={this.state.calendarFocused}
                        numberOfMonths={1} isOutsideRange={() => false} onFocusChange={this.onFocusChange}/>
                    <div>
                        <button className="button" type="submit">Add Expense</button>
                    </div>
                </form>
            //</div>
        )
    }
}
