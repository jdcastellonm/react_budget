import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
import ExpensesSummary from './ExpensesSummary'; // the default export is connected to the store so no need to pass in props

const ExpenseDashboardPage = () => (
    <div>
        <ExpensesSummary/>
        <ExpenseListFilters/>
        <ExpenseList/>
    </div>
)
export default ExpenseDashboardPage;