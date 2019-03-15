export default (expenses = [{amount: 0}]) => {
   // provide initial value to reduce to avoid [number].amount error
   // also check for single expenses (which are a single object, not array)
 return Array.isArray(expenses) ? expenses.reduce((sum, current) => (sum + current.amount), 0) : expenses.amount; }