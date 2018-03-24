import React from 'react';
import {withStyles} from 'material-ui/styles';
import TextField from "material-ui/TextField";

const styles = (theme) => ({
  drawerHeader: {
    ...theme.mixins.toolbar,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
  },
});

const SearchBar = ({classes, onChange}) => (
  <div className={classes.drawerHeader}>
    <TextField
      fullWidth
      margin="normal"
      placeholder="Search chats..."
      onChange={onChange}/>
  </div>
);

export default withStyles(styles)(SearchBar);
