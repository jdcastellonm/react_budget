
//expenses reducer. the default state is an empty array since it's an array of expense objects
export default (state = [], action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense]; // concat returns a new array, it doesn't modify the original, but spread is better
        case 'REMOVE_EXPENSE':
            return state.filter((current) => {
                return current.id !== action.id;
            });
        case 'EDIT_EXPENSE':
            return state.map((current) => {
                if (action.id === current.id) {
                    return {...current, ...action.updates} // we use spread objects to create new ones and avoid mutating existing state
                } else {
                    return current;
                }
            });
        case 'SET_EXPENSES':
            return action.expenses;
        default:
            return state;
    }
};
