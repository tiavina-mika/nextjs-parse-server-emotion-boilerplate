import React from 'react';

import { PATH_NAMES } from '../../utils/constants';
import NavbarMenu from './NavbarMenu';
import NavbarMenuItem from './NavbarMenuItem';

const AuthenticatedNavbarMenu = () => {
  return (
    <NavbarMenu>
      <NavbarMenuItem
        href="/templates/ajouter"
        text="Ajouter Template"
      />
      <NavbarMenuItem
        href={PATH_NAMES.profile}
        text="Mon Profil"
      />
      <NavbarMenuItem
        href={PATH_NAMES.profile}
        text="Se déconnecter"
        type="button"
      />
    </NavbarMenu>
  );
};

export default AuthenticatedNavbarMenu;
