import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

class SimpleSnackbar extends React.Component {

  state = {
    open: false,
  };

  handleCloseSnackbar = () => {
    this.setState({open: false});
  };

  componentWillReceiveProps(nextProps) {
    this.setState({open: !!nextProps.error});
  }

  render() {
    const {error} = this.props;

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.open}
        autoHideDuration={6000}
        onClose={this.handleCloseSnackbar}
        message={<span>{error}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.handleCloseSnackbar}
          >
            <CloseIcon/>
          </IconButton>,
        ]}
      />
    );
  }
}

export default SimpleSnackbar;
