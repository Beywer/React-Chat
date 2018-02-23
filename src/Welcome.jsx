import React from 'react';

export default class Welcome extends React.Component {

    render() {
        const {children} = this.props;
        return (
            <h1>Hello {children}</h1>
        );
    }
}
