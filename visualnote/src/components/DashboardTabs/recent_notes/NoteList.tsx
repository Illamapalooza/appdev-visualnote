import { ArrowUpRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from '@/components/ui/card';

import { NavLink } from 'react-router-dom';

type Props = {
 notes: {
  title: string;
  timePassed: string;
 }[];
};

function NoteList(props: Props): JSX.Element {
 return (
  <Card className="xl:col-span-2 w-full overflow ">
   <CardHeader className="flex flex-row items-center">
    <div className="grid gap-2">
     <CardTitle>Notes</CardTitle>
     <CardDescription>Recently created visual notes</CardDescription>
    </div>
    <Button asChild size="sm" className="ml-auto gap-1">
     <NavLink to="../notes">
      View All
      <ArrowUpRight className="h-4 w-4" />
     </NavLink>
    </Button>
   </CardHeader>
   <CardContent className="space-y-4 overflow-x-hidden overflow-auto max-h-[500px]">
    {props.notes.slice(0, 4).map((note, index) => (
     <Card key={index} className="cursor-pointer">
      <CardHeader className="gap-2">
       <CardTitle className="text-md">{note.title}</CardTitle>
       <CardDescription className="flex justify-between">
        <CardDescription>{note.timePassed}</CardDescription>
       </CardDescription>
      </CardHeader>
     </Card>
    ))}
   </CardContent>
  </Card>
 );
}

export default NoteList;
