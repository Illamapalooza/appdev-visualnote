import NotesCatalog from './notes_catalog/NotesCatalog';

type Props = {};

function Catalog(props: Props): JSX.Element {
 return (
  <main className="m-4">
   <div
    className="relative flex-col items-start gap-8 md:flex"
    x-chunk="dashboard-03-chunk-0"
   >
    <NotesCatalog />
   </div>
  </main>
 );
}

export default Catalog;
