import React from 'react';

import { PATH_NAMES } from '../../utils/constants';
import NavbarMenu from './NavbarMenu';
import NavbarMenuItem from './NavbarMenuItem';

const UnauthenticatedNavbarMenu = () => {
  return (
    <NavbarMenu>
      <NavbarMenuItem
        href={PATH_NAMES.login}
        text="Se connecter"
        type="button"
      />
    </NavbarMenu>
  );
};

export default UnauthenticatedNavbarMenu;
