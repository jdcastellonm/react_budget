import moment from 'moment';

export default [{
    id: '1',
    description: 'snack',
    note: '',
    amount: 195,
    createdAt: 0
},
{
    id: '2',
    description: 'car',
    note: '',
    amount: 43195,
    createdAt: moment(0).add(5, 'days').valueOf()
},
{
    id: '3',
    description: 'card',
    note: '',
    amount: 12300,
    createdAt: moment(0).subtract(3, 'days').valueOf()
}
];