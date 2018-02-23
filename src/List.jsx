import React from 'react';

const data = [
    'elem 1',
    'elem 2',
    'elem 3',
    'elem 4',
    'elem 5',
];

export default class List extends React.Component {

    render() {
        return (
            <ul>
                {data.map(elem => (<li key={elem}>{elem}</li>))}
            </ul>
        );
    }
}
