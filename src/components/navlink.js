import React from 'react';
import { NavLink } from 'theme-ui';

function MyNavLink(props) {
  return (
    <NavLink p={3} sx={{ flex: '0 1 auto', cursor: 'pointer' }}>
      {props.children}
    </NavLink>
  );
}

export default MyNavLink;
