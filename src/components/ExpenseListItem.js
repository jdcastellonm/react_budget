import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

// the spread can also be destructured like {description, amount, createdAt}
// instead of using props.*
const ExpenseListItem = (props) => (
    <div>
        <Link to={`/edit/${props.id}`}>
            <h3>{props.description}</h3>
        </Link>
        <p>{numeral(props.amount / 100).format('$0,0.00')} -- {moment(props.createdAt).format('MMMM Do YYYY')}</p>
    </div>
)
// export default connect()(ExpenseListItem); // access to state directly is not needed here, just the dispatch() (used when the remove button was here)
export default ExpenseListItem;