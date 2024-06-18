import NoteList from './recent_notes/NoteList';
import UploadYourImageField from '../UploadYourImageField';
import Output from './Output';

type Props = {};

function Create(props: Props): JSX.Element {
 return (
  <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
   <div
    className="relative flex-col items-start gap-8 md:flex"
    x-chunk="dashboard-03-chunk-0"
   >
    <NoteList />
   </div>

   <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
    {/* <UploadYourImageField /> */}
    <Output />
   </div>
  </main>
 );
}

export default Create;
