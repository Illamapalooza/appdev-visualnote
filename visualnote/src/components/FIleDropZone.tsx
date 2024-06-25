import { useDropzone } from 'react-dropzone';
import { GoUpload } from 'react-icons/go';
import { RxCross2 } from 'react-icons/rx';
import Output from './DashboardTabs/Output';
import { toast } from 'sonner';

import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

import axios from 'axios';
import { useState } from 'react';
import Loader from './Loader';

type Props = {
 onDrop: (acceptedFiles: File[]) => void;
 files: File[] | null;
};

interface topicDataInterface {
 topic: string;
 description: string;
 key_concepts: string[];
 explanation: string;
 examples: string[];
 resources: resourceInterface[];
 exercises: string[];
}

export interface resourceInterface {
 url: string;
 title: string;
}

function FileDropZone(props: Props): JSX.Element {
 const [isLoading, setIsLoading] = useState<boolean>(false);
 const { getRootProps, getInputProps, isDragActive } = useDropzone({
  accept: {
   'image/png': ['.png'],
   'image/jpeg': ['.jpeg'],
   'image/jpg': ['.jpg'],
  },
  onDrop: (acceptedFiles) => props.onDrop(acceptedFiles),
 });

 const [topicData, setTopicData] = useState<topicDataInterface | null>(null);
 const [responseData, setResponseData] = useState<any | null>(null);

 const generateNote = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();

  if (!props.files) {
   console.log('Error. Must have an existing image');
   return;
  }

  setIsLoading(true);

  try {
   const res = await axios.post('http://localhost:3000/api/generate-note', {
    headers: {
     'Content-Type': 'application/json',
    },
   });
   if (res.status === 200) setIsLoading(false);

   const response = res.data;

   setResponseData(response);

   const data = JSON.parse(response);
   //  console.log(response);

   const tData = {
    topic: data.topic,
    description: data.description,
    key_concepts: data.key_concepts,
    explanation: data.explanation,
    examples: data.examples,
    resources: data.resources,
    exercises: data.exercises,
   };
   setTopicData(tData);
  } catch (error) {
   console.log(error);
  }
 };

 const handleAddNote = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();

  if (!responseData || !props.files) {
   console.error('No data or images to save');
   return;
  }

  // console.log(responseData, props.files);

  const formData = new FormData();

  const data = JSON.parse(responseData);
  console.log(data);

  // formData.append('topic', data.topic);
  // formData.append('description', data.description);
  // formData.append('key_concepts', data.key_concepts);
  // formData.append('explanation', data.explanation);
  // formData.append('examples', data.examples);
  // formData.append('resources', data.resources);
  // formData.append('exercises', data.exercises);

  formData.append('data', JSON.stringify(responseData));

  props.files.forEach((file) => {
   formData.append('file', file);
  });

  try {
   const response = await axios.post(
    'http://localhost:3000/api/insert-note',
    formData,
    {
     headers: {
      'Content-Type': 'multipart/form-data',
     },
    }
   );

   const responseStatus = response.status;
   if (responseStatus === 200) {
    toast('Note has been added');
   }
  } catch (err) {
   console.log(err);
  }
 };

 return (
  <>
   {isLoading && <Loader></Loader>}
   {topicData ? (
    <div>
     <Output
      topic={topicData.topic}
      image={props.files}
      description={topicData.description}
      key_concepts={topicData.key_concepts}
      explanation={topicData.explanation}
      examples={topicData.examples}
      resources={topicData.resources}
      exercises={topicData.exercises}
     />
     <div className="flex justify-end gap-4">
      <Button className="" variant="destructive">
       Cancel
      </Button>
      <Button onClick={handleAddNote}>Add to notes</Button>
     </div>
    </div>
   ) : (
    <Card
     className={`border-slate-800 rounded-md overflow-au w-full ${
      isLoading && 'blur-sm'
     }`}
    >
     <CardHeader className="flex flex-col items-center">
      <CardTitle className="text-lg">Upload File</CardTitle>
      <CardDescription className="text-gray-500 text-sm">
       Upload your images and screenshots you want to create notes from.
      </CardDescription>
     </CardHeader>
     <CardContent>
      <div
       {...getRootProps()}
       className="flex flex-col items-center border-2 m-8 cursor-pointer border-dashed p-4"
      >
       <input {...getInputProps()} />
       <CardDescription className="flex flex-col items-center text-gray-400 ">
        {isDragActive ? (
         <CardDescription>
          <GoUpload className="text-[150px]" />
          Drop files here...
         </CardDescription>
        ) : props.files ? (
         <div className="text-center space-y-4">
          <CardDescription className="text-lg text-gray-800">
           Uploaded.
          </CardDescription>
          <CardDescription className="flex flex-col items-center">
           <GoUpload className="text-[50px]" />
           Drag and Drop some files here, or <strong>browse</strong>
          </CardDescription>
         </div>
        ) : (
         <CardDescription className="flex flex-col items-center">
          <GoUpload className="text-[150px]" />
          Drag and Drop some files here, or <strong>browse</strong>
         </CardDescription>
        )}
       </CardDescription>
      </div>
      {props.files && (
       <CardDescription className="flex flex-col w-full space-y-4">
        <p className="m-auto">File/s Preview</p>
        <div className="w-full flex gap-4 justify-center">
         <div className="grid grid-cols-2  w-full gap-4">
          {props.files.map((image, index) => (
           <div key={index}>
            <div className="border-secondary-black border rounded-lg w-full flex items-center p-2 gap-4">
             <a href={URL.createObjectURL(image)} target="_blank">
              <img
               src={URL.createObjectURL(image)}
               alt="Image File"
               className="w-16 h-16 object-contain flex aspect-squarerounded-md cursor-pointer"
              />
             </a>

             <div className="w-full">
              <div className="text-secondary-black flex justify-between items-center">
               <p className="text-secondary-black text-base">{image.name}</p>
               <Button variant="secondary" size="sm" className="p-2">
                <RxCross2 className="w-5 h-5" />
               </Button>
              </div>
              <p className="text-sm">Uploading...</p>
              <Progress
               className="h-2 w-full border-secondary-black border rounded-md"
               value={50}
              />
             </div>
            </div>
           </div>
          ))}
         </div>
        </div>
       </CardDescription>
      )}
     </CardContent>
     <CardFooter>
      {/* <CreateNotesButton files={props.files} /> */}
      <Button className="m-auto" onClick={generateNote}>
       Generate Note
      </Button>
     </CardFooter>
    </Card>
   )}
  </>
 );
}

export default FileDropZone;
