import React from 'react';

export default class Clock extends React.Component {
    state = {
        time: new Date()
    };

    componentDidMount() {
        this._intervalId = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this._intervalId);
    }

    tick() {
        this.setState({time: new Date()});
    }

    render() {
        return (
            <p>colck {this.state.time.toLocaleTimeString()}</p>
        );
    }
}
