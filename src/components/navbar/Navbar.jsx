import React from 'react';

import { Layout } from 'antd';
import dynamic from 'next/dynamic';

import { mq } from '../../styles/styles';
import { isAuthenticated } from '../../utils/utils';

const { Header } = Layout;

const AuthenticatedNavbarMenu = dynamic(() => import('./AuthenticatedNavbarMenu'), { ssr: false });
const UnauthenticatedNavbarMenu = dynamic(() => import('./UnauthenticatedNavbarMenu'), { ssr: false });

const classes = {
  nav: (theme) => ({
    padding: '0 20px',
    // minHeight: '9vh',
    background: theme.colors.dark,
  }),
  logo: {
    fontSize: 25,
    color: 'white',
  },
  menuDesktop: mq({
    listStyle: 'none',
    display: ['none', 'none', 'flex'],
  }),
  navIcon: mq({
    background: 'none',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    display: [false, false, 'none'],
  }),
  line: {
    display: 'block',
    borderRadius: 50,
    width: 25,
    height: 3,
    margin: 5,
    backgroundColor: '#fff',
    transition: 'width 0.4s ease-in-out',
  },
  lineAnimate: ({ on }) => ({
    width: on ? '40%' : '70%',
  }),
  overlay: ({ on }) => mq({
    position: 'absolute',
    height: on ? '91vh' : 0,
    width: '100vw',
    background: '#1c2022',
    transition: 'height 0.4s ease-in-out',
    display: [false, false, 'none'],
  }),
};

const Navbar = () => {
  const menu = isAuthenticated() ? <AuthenticatedNavbarMenu /> : <UnauthenticatedNavbarMenu />;

  return (
    <Header css={classes.nav} className="flexRow spaceBetween">
      <h1 css={classes.logo}>Tiavina Mika</h1>
      {menu}
    </Header>
  );
};

export default Navbar;
