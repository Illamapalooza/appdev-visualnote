import NoteList from './recent_notes/NoteList';
import UploadYourImageField from '../UploadYourImageField';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { timeElapsed } from '@/lib/computeRecentData';

type Props = {};

function Create(props: Props): JSX.Element {
 const [notes, setNotes] = useState([]);
 useEffect(() => {
  const fetchNotes = async () => {
   try {
    const response = await axios.get('http://localhost:3000/api/get-notes');

    const formattedNotes = response.data.map((note: any) => {
     return {
      title: note.topic,
      timePassed: timeElapsed(note.created_at),
     };
    });

    setNotes(formattedNotes);
   } catch (error) {
    console.log('error', error);
   }
  };

  fetchNotes();
 }, [notes]);

 return (
  <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
   <div
    className="flex-col items-start gap-8 md:flex"
    x-chunk="dashboard-03-chunk-0"
   >
    <NoteList notes={notes} />
   </div>

   <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
    <UploadYourImageField />
   </div>
  </main>
 );
}

export default Create;
