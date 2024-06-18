import React from 'react';

type Props = {};

function Loader(props: Props): JSX.Element {
 return (
  <>
   {' '}
   <div className="modal">
    <div className="loader mb-4"></div>
    <p className="text-lg bg-transparent font-semibold">Generating Your Note</p>
   </div>
  </>
 );
}
export default Loader;
