import React from 'react';

import { Menu } from 'antd';
import PropTypes from 'prop-types';

import { mq } from '../../styles/styles';
import NavbarMenuItem from './NavbarMenuItem';

const classes = {
  menuDesktop: mq({
    listStyle: 'none',
    display: ['none', 'none', 'flex'],
  }),
  menu: {
    padding: 0,
    backgroundColor: 'transparent',
    borderRight: 'none',
  },
};

const NavbarMenu = ({ children }) => {
  return (
    <Menu css={classes.menu} className="flexRow">
      <NavbarMenuItem
        href="/templates"
        text="Templates"
      />
      {children}
    </Menu>
  );
};

NavbarMenu.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NavbarMenu;
