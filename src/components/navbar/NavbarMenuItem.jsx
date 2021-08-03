import React from 'react';

import { Menu } from 'antd';
import PropTypes from 'prop-types';

import { mq } from '../../styles/styles';
import Link from '../Link';

const classes = {
  navbarMenuItem: (theme) => mq({
    margin: [false, false, theme.spacing(1.1)],
    '&:active': {
      backgroundColor: 'transparent !important',
    },
  }),
  link: {
    color: '#fff !important',
  },
};

const NavbarMenuItem = ({ text, type = 'link', href }) => {
  return (
    <Menu.Item css={classes.navbarMenuItem}>
      <Link href={href} className={classes.link} type={type}>
        {text}
      </Link>
    </Menu.Item>
  );
};

NavbarMenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['link', 'button']),
};

export default NavbarMenuItem;
