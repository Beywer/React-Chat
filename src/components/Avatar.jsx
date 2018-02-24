import React from 'react';
import MUIAvatar from 'material-ui/Avatar';
import titleInitials from 'utils/titleInitials';
import getColor from 'utils/colorFrom';

const Avatar = ({colorFrom, children, ...rest}) => (
  <MUIAvatar style={{backgroundColor: getColor(colorFrom)}} {...rest}>
    {titleInitials(children)}
  </MUIAvatar>
);

export default Avatar;
