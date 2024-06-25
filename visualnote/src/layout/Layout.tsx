import React, { Children, Fragment, ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';

type layoutProps = {
 children: ReactNode;
};

export default function layout(props: layoutProps): JSX.Element {
 return (
  <Fragment>
   <div className="">
    <main className="z-10">
     <div>{props.children}</div>
     <Toaster />
    </main>
   </div>
   {/* <Footer />; */}
  </Fragment>
 );
}
