import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
 CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
 Dialog,
 DialogClose,
 DialogContent,
 DialogDescription,
 DialogFooter,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

import { Trash2, Edit3 } from 'lucide-react';
import { useState } from 'react';

import image from '../../../../../backend/uploads/13f835b5-379d-4d0c-871e-ad942b6c78ca-Screenshot 2024-04-09 163159.png';

type Props = {
 notes: {
  title: string;
  key_concepts: string[];
  description: string;
  explanation: string;
  examples: string[];
  resources: {
   url: string;
   title: string;
  }[];
  exercises: string[];
  timePassed: string;
  image_urls: string[];
  id: string;
 }[];

 handleDelete: (id: string) => void;
 handleEdit: (note: any) => void;
};

function NotesCatalog(props: Props): JSX.Element {
 const [editNote, setEditNote] = useState<any>(null);

 props.notes.map((image) => {
  image.image_urls.map((url) => {
   console.log(`backend/${url}`);
  });
 });

 const handleEditChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  field: string
 ) => {
  const value = e.target.value;
  setEditNote((prev: any) => {
   if (
    field === 'key_concepts' ||
    field === 'examples' ||
    field === 'exercises'
   ) {
    return {
     ...prev,
     [field]: value.split('\n'),
    };
   } else if (field === 'resources') {
    return {
     ...prev,
     resources: value.split('\n').map((res: string) => {
      const [title, url] = res.split('(');
      return { title, url: url?.slice(0, -1) };
     }),
    };
   } else {
    return { ...prev, [field]: value };
   }
  });
 };

 const handleEditSubmit = () => {
  props.handleEdit(editNote);
  setEditNote(null);
 };

 return (
  <Card className="xl:col-span-2 w-full overflow h-full">
   <CardHeader className="flex flex-row items-center">
    <div className="grid gap-2">
     <CardTitle>Notes</CardTitle>
     <CardDescription>All of your created notes</CardDescription>
    </div>
   </CardHeader>
   <CardContent className="overflow-x-hidden overflow-auto max-h-[500px] grid grid-cols-3 gap-4">
    {props.notes.map((note, index) => (
     <Dialog key={index}>
      <DialogTrigger className="flex justify-start">
       <Card key={index} className="cursor-pointer z-10">
        <CardHeader className="gap-2">
         <CardTitle className="text-md">{note.title}</CardTitle>
        </CardHeader>
        <CardContent>
         <CardDescription className="flex flex-col justify-between gap-6">
          <CardDescription className="space-x-2 space-y-2">
           {note.key_concepts.map((concept, index) => (
            <Badge variant="default" key={index} className="bg-gray-500">
             {concept}
            </Badge>
           ))}
          </CardDescription>
         </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between">
         <CardDescription className="place-self-end">
          {note.timePassed}
         </CardDescription>
        </CardFooter>
       </Card>
      </DialogTrigger>
      <DialogContent className="w-full h-3/4 overflow-auto">
       <DialogHeader>
        <DialogTitle>{note.title}</DialogTitle>
        <DialogDescription className="space-y-1 space-x-2">
         {note.key_concepts.map((concept, index) => (
          <Badge variant="default" key={index} className="bg-gray-500">
           {concept}
          </Badge>
         ))}
        </DialogDescription>
       </DialogHeader>
       <div className="flex space-x-2 space-y-2">
        <div className="flex flex-wrap gap-2">
         {note.image_urls.map((url, index) => (
          <img
           src={`../../../../../backend/${url}`}
           className="w-32 h-32 object-cover"
           key={index}
          />
         ))}
        </div>
        <div className="space-y-4">
         <div>
          <div className="font-bold text-lg">Description</div>
          <div>{note.description}</div>
         </div>
         <div>
          <div className="font-bold text-lg">Explanation</div>
          <div>{note.explanation}</div>
         </div>
         <div>
          <div className="font-bold text-lg">Resources</div>
          <ul className="flex flex-col">
           {note.resources.map((resource, index) => (
            <a
             href={resource.url}
             target="_blank"
             className="cursor-pointer text-blue-500"
             key={index}
            >
             <li>{resource.title}</li>
            </a>
           ))}
          </ul>
         </div>
         <div>
          <div className="font-bold text-lg">Examples</div>
          <ul className="flex flex-col">
           {note.examples.map((example, index) => (
            <li key={index}>-{example}</li>
           ))}
          </ul>
         </div>
         <div>
          <div className="font-bold text-lg">Exercises</div>
          <ul>
           {note.exercises.map((exercise, index) => (
            <li key={index}>-{exercise}</li>
           ))}
          </ul>
         </div>
        </div>
       </div>

       <DialogFooter className="sm:justify-end">
        <Dialog>
         <DialogTrigger>
          <CardDescription>
           <Button variant="destructive">
            <Trash2 className="w-6 h-6 z-40" />
           </Button>
          </CardDescription>
         </DialogTrigger>
         <DialogContent className="w-96">
          <DialogHeader>
           <DialogTitle>Remove this Note?</DialogTitle>
           <DialogDescription>
            Are you sure you want to remove this note?
           </DialogDescription>
          </DialogHeader>
          <DialogFooter>
           <DialogClose asChild>
            <Button
             variant="destructive"
             onClick={() => {
              props.handleDelete(note.id);
             }}
            >
             Yes
            </Button>
           </DialogClose>
           <DialogClose asChild>
            <Button variant="default">No</Button>
           </DialogClose>
          </DialogFooter>
         </DialogContent>
        </Dialog>
        <Button
         type="button"
         variant="default"
         className="m-auto"
         onClick={() => setEditNote(note)}
        >
         <Edit3 className="w-6 h-6" />
        </Button>
        <DialogClose asChild>
         <Button type="button" variant="default" className="m-auto">
          Close
         </Button>
        </DialogClose>
       </DialogFooter>
      </DialogContent>

      {editNote && editNote.id === note.id && (
       <DialogContent className="w-full h-3/4 overflow-auto">
        <DialogHeader>
         <DialogTitle>Edit Note</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
         <input
          type="text"
          value={editNote.title}
          onChange={(e) => handleEditChange(e, 'title')}
          className="input input-bordered w-full"
          placeholder="Title"
         />
         <textarea
          value={editNote.description}
          onChange={(e) => handleEditChange(e, 'description')}
          className="textarea textarea-bordered w-full"
          placeholder="Description"
         />
         <textarea
          value={editNote.explanation}
          onChange={(e) => handleEditChange(e, 'explanation')}
          className="textarea textarea-bordered w-full"
          placeholder="Explanation"
         />
         <textarea
          value={editNote.examples.join('\n')}
          onChange={(e) => handleEditChange(e, 'examples')}
          className="textarea textarea-bordered w-full"
          placeholder="Examples (separate by new line)"
         />
         <textarea
          value={editNote.exercises.join('\n')}
          onChange={(e) => handleEditChange(e, 'exercises')}
          className="textarea textarea-bordered w-full"
          placeholder="Exercises (separate by new line)"
         />
         <textarea
          value={editNote.key_concepts.join('\n')}
          onChange={(e) => handleEditChange(e, 'key_concepts')}
          className="textarea textarea-bordered w-full"
          placeholder="Key Concepts (separate by new line)"
         />
         <textarea
          value={editNote.resources
           .map((resource: any) => `${resource.title} (${resource.url})`)
           .join('\n')}
          onChange={(e) => handleEditChange(e, 'resources')}
          className="textarea textarea-bordered w-full"
          placeholder="Resources (format: title (url), separate by new line)"
         />
        </div>
        <DialogFooter>
         <Button type="button" variant="default" onClick={handleEditSubmit}>
          Save
         </Button>
         <DialogClose asChild>
          <Button
           type="button"
           variant="default"
           onClick={() => setEditNote(null)}
          >
           Cancel
          </Button>
         </DialogClose>
        </DialogFooter>
       </DialogContent>
      )}
     </Dialog>
    ))}
   </CardContent>
  </Card>
 );
}

export default NotesCatalog;
