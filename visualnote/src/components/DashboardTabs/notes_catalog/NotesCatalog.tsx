import { ArrowUpRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from '@/components/ui/card';

import React from 'react';

type Props = {};

function NotesCatalog(props: Props): JSX.Element {
 const notes = [
  {
   title: 'Introduction to the Principes of Programming Languages',
   subject: 'CS112',
   timePassed: '6 mins ago',
  },
  {
   title: 'Introduction to the Principes of Programming Languages',
   subject: 'CS112',
   timePassed: '6 mins ago',
  },
  {
   title: 'Introduction to the Principes of Programming Languages',
   subject: 'CS112',
   timePassed: '6 mins ago',
  },
 ];
 return (
  <Card className="xl:col-span-2 w-full overflow h-full">
   <CardHeader className="flex flex-row items-center">
    <div className="grid gap-2">
     <CardTitle>Notes</CardTitle>
     <CardDescription>All of your created notes</CardDescription>
    </div>
   </CardHeader>
   <CardContent className="overflow-x-hidden overflow-auto max-h-[500px] grid grid-cols-3 gap-4">
    {notes.map((note, index) => (
     <Card key={index} className="cursor-pointer">
      <CardHeader className="gap-2">
       <CardTitle className="text-md">{note.title}</CardTitle>
       <CardDescription className="flex justify-between">
        <CardDescription>{note.subject}</CardDescription>
        <CardDescription>{note.timePassed}</CardDescription>
       </CardDescription>
      </CardHeader>
     </Card>
    ))}
   </CardContent>
  </Card>
 );
}

export default NotesCatalog;
