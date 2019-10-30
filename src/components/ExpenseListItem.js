import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

// the spread can also be destructured like {description, amount, createdAt}
// instead of using props.*
const ExpenseListItem = (props) => (
        <Link className="list-item" to={`/edit/${props.id}`}>
            <div>
                <h3 className="list-item__title">{props.description}</h3>
                <span className="list-item__sub-title">{moment(props.createdAt).format('MMMM Do YYYY')}</span>
            </div>
            <h3 className="list-item__data">{numeral(props.amount / 100).format('$0,0.00')}</h3>
        </Link>
)
// export default connect()(ExpenseListItem); // access to state directly is not needed here, just the dispatch() (used when the remove button was here)
export default ExpenseListItem;
