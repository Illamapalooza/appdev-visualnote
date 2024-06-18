import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import Loader from './Loader';

type Props = {
 files: File[] | null;
};

export default function CreateNotesButton(props: Props): JSX.Element {
 const [loading, setLoading] = useState<boolean>(false);

 const createNotes = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();

  if (!props.files) {
   console.log('Error. Must have an existing image');
   return;
  }

  setLoading(true);
  // setHasData(false);

  try {
   const res = await axios.post('http://localhost:3000/api/generate-note', {
    headers: {
     'Content-Type': 'application/json',
    },
   });
   if (res.status === 200) setLoading(false);

   const response = res.data;

   // const data = JSON.parse(response);
   console.log(response);
   //  setTopicData(data as TopicData);
   //  setLoading(false);
   //  setHasData(true);
  } catch (error) {
   console.log(error);
  }
 };

 return (
  <>
   <div className="m-auto">
    {loading && <Loader></Loader>}
    <Button onClick={createNotes}>Create Note</Button>
   </div>
  </>
 );
}
