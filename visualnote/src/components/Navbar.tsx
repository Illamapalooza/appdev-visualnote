// import logo from '@visualnote/logo/classnotes_app_logo.png';
import logo from '../assets/classnotes_app_logo.png';

import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

type NavbarProps = {};

export function Navbar(props: NavbarProps): JSX.Element {
 return (
  <Fragment>
   <header className="flex items-center justify-center h-[70px] rounded-md z-[999]">
    <p className="text-2xl font-bold">Visual Notes</p>
    <img src={logo} alt="" className="w-14 h-14" />
   </header>
  </Fragment>
 );
}

export default Navbar;
