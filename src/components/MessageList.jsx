import Message from "components/Message";
import React from 'react';
import {withStyles} from 'material-ui/styles';

const styles = (theme) => ({
    messagesWrapper: {
        overflowX: 'hidden',
        width: '100%',
        padding: theme.spacing.unit * 3,
        boxSizing: 'border-box',
        height: '100%',
        paddingBottom: '112px',
    },
});

class MessageList extends React.Component {

    componentDidMount() {
        this.scrollDownHistory();
    }

    componentDidUpdate() {
        this.scrollDownHistory();
    }

    scrollDownHistory() {
        const messagesWrapper = this.refs.messagesWrapper;
        if (messagesWrapper) {
            messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
        }
    }

    render() {
        const {classes, messages} = this.props;
        return (
            <div className={classes.messagesWrapper} ref="messagesWrapper">
                {messages && messages.map((message, index) =>
                    <Message key={index} message={message}/>
                )}
            </div>
        )
    }
}

export default withStyles(styles)(MessageList);
