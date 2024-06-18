import { useState, useCallback } from 'react';
import FileDropZone from './FIleDropZone';
import axios from 'axios';

type Props = {};

function UploadYourImageField(props: Props): JSX.Element {
 const [files, setFiles] = useState<File[] | null>(null);

 const onDrop = useCallback(async (acceptedFiles: File[]) => {
  setFiles(acceptedFiles ? acceptedFiles : null);

  const formData = new FormData();

  acceptedFiles.map((file: File) => formData.append('file', file));

  try {
   const res = await axios.post('http://localhost:3000/api/upload', formData, {
    headers: {
     'Content-Type': 'multipart/form-data',
    },
   });

   const data = res.data;
   console.log(data);
  } catch (error) {
   console.log(error);
  }
 }, []);

 return (
  <>
   <div className="relative">
    <FileDropZone onDrop={onDrop} files={files} />
   </div>
  </>
 );
}

export default UploadYourImageField;
