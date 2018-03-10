import React from 'react';
import {withStyles} from 'material-ui/styles';
import Button from "material-ui/Button/Button";
import AddIcon from 'material-ui-icons/Add';
import Modal from "material-ui/Modal/Modal";
import TextField from "material-ui/TextField/TextField";

const styles = (theme) => ({
  modalWindow: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    margin: 0
  },
  modalContent: {
    width: '25%',
    minWidth: '150px',
    backgroundColor: 'white',
    padding: theme.spacing.unit * 2
  },
  newChatName: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit
  }
});

class CreateChatButton extends React.Component {

  state = {
    modalOpened: false,
    newChatName: ''
  };

  handleButtonClick = (e) => this.setState({modalOpened: true});
  handleModalClose = (e) => this.setState({modalOpened: false, newChatName: ''});

  handleChatNameChange = (e) => this.setState({newChatName: e.target.value});

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onChatCreate(this.state.newChatName);
    this.handleModalClose();
  };

  render() {
    const {className, classes} = this.props;
    const {newChatName} = this.state;
    return (
      <React.Fragment>
        <Button
          variant="fab"
          color="primary"
          className={className}
          onClick={this.handleButtonClick}
        >
          <AddIcon/>
        </Button>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className={classes.modalWindow}
          open={this.state.modalOpened}
          onClose={this.handleModalClose}
        >
          <form className={classes.modalContent} onSubmit={this.handleSubmit}>
            <h2 className={classes.modalTitle}>Dialog title</h2>
            <TextField
              fullWidth
              required
              type="text"
              className={classes.newChatName}
              onChange={this.handleChatNameChange}
              label="New chat"
              placeholder="Type the title..."
              value={newChatName}
            />
            <Button
              color="primary"
              type="submit"
            >Create</Button>
          </form>
        </Modal>

      </React.Fragment>
    );
  }
}

export default withStyles(styles)(CreateChatButton);
