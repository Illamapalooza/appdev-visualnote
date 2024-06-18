import React, { Children, Fragment, ReactNode } from 'react';

type layoutProps = {
 children: ReactNode;
};

export default function layout(props: layoutProps): JSX.Element {
 return (
  <Fragment>
   <div className="">
    <main className="z-10">
     <div>{props.children}</div>
    </main>
   </div>
   {/* <Footer />; */}
  </Fragment>
 );
}
