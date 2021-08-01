import React from 'react';

import { useWindowSize } from '../../hooks/useWindowSize';
import { mq } from '../../styles/styles';
import NavbarMenuItem from './NavbarMenuItem';

const classes = {
  menuDesktop: mq({
    listStyle: 'none',
    display: ['none', 'none', 'flex'],
  }),
  menu: (theme) => mq({
    margin: [false, false, -theme.spacing(1.1)],
    padding: 0,
  }),
  overlayMenu: ({ on }) => ({
    listStyle: 'none',
    position: 'absolute',
    left: '50%',
    top: '45%',
    transform: 'translate(-50%, -50%)',

    '& li': {
      opacity: on ? 1 : 0,
      fontSize: 25,
      margin: '50px 0px',
      transition: 'opacity 0.4s ease-in-out',
    },

    '& li:nth-of-type(2)': {
      margin: '50px 0px',
    },
  }),
};

const NavbarMenu = ({ on, children }) => {
  const { isMobile } = useWindowSize();

  return (
    <ul
      css={isMobile
        ? [classes.overlayMenu({ on }), classes.menu]
        : [classes.menuDesktop, classes.menu]}
    >
      <NavbarMenuItem
        href="/templates"
        text="Templates"
      />
      {children}
    </ul>
  );
};

export default NavbarMenu;
