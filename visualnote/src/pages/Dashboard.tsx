import { LifeBuoy, SquareUser, FilePlus2, Notebook } from 'lucide-react';
import logo from '../assets/classnotes_app_logo.png';

import { Button } from '@/components/ui/button';
import {
 Tooltip,
 TooltipContent,
 TooltipTrigger,
 TooltipProvider,
} from '@/components/ui/tooltip';

import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

type Props = {};

function Dashboard(props: Props): JSX.Element {
 const [navLinks, setNavLinks] = useState([
  {
   name: 'Create',
   icon: <FilePlus2 className="size-5" />,
   navLink: 'create',
  },
  {
   name: 'All Visual Notes',
   icon: <Notebook className="size-5" />,
   navLink: 'notes',
  },
 ]);

 const handleSetActiveLink = (name: string) => {
  setNavLinks(
   navLinks.map((link) =>
    link.name === name
     ? { ...link, isActive: true }
     : { ...link, isActive: false }
   )
  );
 };

 const navMenu2 = [
  {
   title: 'Help',
   icon: <LifeBuoy className="size-5" />,
   isActive: false,
  },
  {
   title: 'Account',
   icon: <SquareUser className="size-5" />,
   isActive: false,
  },
 ];

 return (
  <div className="grid h-screen w-full pl-[56px]">
   <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
    <div className="border-b p-2">
     <Button variant="outline" size="icon" aria-label="Home">
      <img src={logo} alt="Classnotes" className="h-8" />
     </Button>
    </div>
    <TooltipProvider>
     <nav className="grid gap-1 p-2 z-40">
      {navLinks.map((item, index) => (
       <NavLink
        key={index}
        to={item.navLink}
        className={({ isActive }) => [isActive ? 'active' : ''].join(' ')}
       >
        <Tooltip>
         <TooltipTrigger asChild>
          <Button
           variant="ghost"
           size="icon"
           className="rounded-lg hover:bg-hover"
           aria-label={item.name}
           onClick={() => handleSetActiveLink(item.name)}
          >
           {item.icon}
          </Button>
         </TooltipTrigger>
         <TooltipContent side="right" sideOffset={5}>
          {item.name}
         </TooltipContent>
        </Tooltip>
       </NavLink>
      ))}
     </nav>
     <nav className="mt-auto grid gap-1 p-2">
      <Tooltip>
       <TooltipTrigger asChild>
        <Button
         variant="ghost"
         size="icon"
         className="mt-auto rounded-lg"
         aria-label="Help"
        >
         <LifeBuoy className="size-5" />
        </Button>
       </TooltipTrigger>
       <TooltipContent side="right" sideOffset={5}>
        Help
       </TooltipContent>
      </Tooltip>
      <Tooltip>
       <TooltipTrigger asChild>
        <Button
         variant="ghost"
         size="icon"
         className="mt-auto rounded-lg"
         aria-label="Account"
        >
         <SquareUser className="size-5" />
        </Button>
       </TooltipTrigger>
       <TooltipContent side="right" sideOffset={5}>
        Account
       </TooltipContent>
      </Tooltip>
     </nav>
    </TooltipProvider>
   </aside>
   <div className="flex flex-col">
    <header className="sticky top-0 z-20 flex h-[57px] items-center gap-1 border-b bg-background px-4">
     <h1 className="text-xl font-semibold">Visual Notes</h1>
    </header>
    <Outlet />
   </div>
  </div>
 );
}

export default Dashboard;
