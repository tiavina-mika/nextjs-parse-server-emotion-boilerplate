import React, { useState } from 'react';

import { mq } from '../styles/styles';
import Link from './Link';

const classes = {
  nav: (theme) => ({
    padding: '0 20px',
    minHeight: '9vh',
    background: theme.colors.dark,
  }),
  logo: {
    fontSize: 25,
    color: 'white',
  },
  menu: mq({
    listStyle: 'none',
    display: ['none', 'none', 'flex'],
  }),
  link: {
    color: '#fff',
  },
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

const Navbar = () => {
  const [on, toggle] = useState(false);

  const menu = (
    <li>
      <Link href="/templates" css={classes.link}>
        Templates
      </Link>
    </li>
  );

  return (
    <>
      <nav css={classes.nav} className="flexRow alignCenter spaceBetween">
        <h1 css={classes.logo}>Tiavina Mika</h1>
        <ul css={classes.menu}>
          {menu}
        </ul>
        <button onClick={() => toggle(!on)} css={classes.navIcon} type="button">
          <span css={classes.line} />
          <span css={[classes.line, classes.lineAnimate({ on })]} />
          <span css={classes.line} />
        </button>
      </nav>
      {/* -------------- mobile menu -------------- */}
      <div css={classes.overlay({ on })}>
        <ul css={classes.overlayMenu({ on })}>
          {menu}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
