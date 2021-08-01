import React from 'react';

import { mq } from '../../styles/styles';
import Link from '../Link';

const classes = {
  item: (theme) => mq({
    margin: [false, false, theme.spacing(1.1)],
  }),
  link: {
    color: '#fff',
  },
};

const NavbarMenuItem = ({ text, type = 'link', href }) => {
  return (
    <li css={classes.item}>
      <Link href={href} css={classes.link} type={type}>
        {text}
      </Link>
    </li>
  );
};

export default NavbarMenuItem;
