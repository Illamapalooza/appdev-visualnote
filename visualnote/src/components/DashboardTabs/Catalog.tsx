import NotesCatalog from './notes_catalog/NotesCatalog';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { timeElapsed } from '@/lib/computeRecentData';
import { toast } from 'sonner';

type Props = {};

function Catalog(props: Props): JSX.Element {
 const [notes, setNotes] = useState([]);

 useEffect(() => {
  const fetchNotes = async () => {
   try {
    const response = await axios.get('http://localhost:3000/api/get-notes');

    const formattedNotes = response.data.map((note: any) => {
     {
      console.log(note.image_urls);
     }
     return {
      title: note.topic,
      key_concepts: note.content.key_concepts,
      description: note.content.description,
      explanation: note.content.explanation,
      examples: note.content.examples,
      resources: note.content.resources,
      exercises: note.content.exercises,
      timePassed: timeElapsed(note.created_at),
      image_urls: note.image_urls,
      id: note.id,
     };
    });

    setNotes(formattedNotes);
   } catch (error) {
    console.log('error', error);
   }
  };

  fetchNotes();
 }, []);

 const handleDelete = async (id: string) => {
  try {
   const response = await axios.delete(
    `http://localhost:3000/api/delete-note/${id}`
   );
   setNotes(notes.filter((note: any) => note.id !== id));

   if (response.status === 200) {
    toast('Note has been successfully deleted');
   }
  } catch (error) {
   console.log('error', error);
  }
 };

 const handleEdit = async (updatedNote: any) => {
  try {
   const response = await axios.put(
    `http://localhost:3000/api/edit-note/${updatedNote.id}`,
    updatedNote
   );
   setNotes(
    notes.map((note: any) => (note.id === updatedNote.id ? updatedNote : note))
   );

   if (response.status === 200) {
    toast('Note has been successfully updated');
   }
  } catch (error) {
   console.log('error', error);
  }
 };

 return (
  <main className="m-4">
   <div
    className="relative flex-col items-start gap-8 md:flex"
    x-chunk="dashboard-03-chunk-0"
   >
    <NotesCatalog
     notes={notes}
     handleDelete={handleDelete}
     handleEdit={handleEdit}
    />
   </div>
  </main>
 );
}

export default Catalog;
