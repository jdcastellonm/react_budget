import moment from 'moment';

// filter expenses function. uses array filter method to get filter results
export default (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((current) => {
        const createdAtMoment = moment(current.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true; 
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
        const textMatch = current.description.toLowerCase().includes(text);

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        }
        if (sortBy === 'amount') {
            return b.amount - a.amount;
        }
    })
}