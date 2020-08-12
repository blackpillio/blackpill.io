import React from 'react';
import { NavLink } from 'theme-ui';

function MyNavLink(props) {
  return (
    <NavLink href={props.href} p={3} sx={{ flex: '0 1 auto', cursor: 'pointer' }}>
      {props.children}
    </NavLink>
  );
}

export default MyNavLink;
