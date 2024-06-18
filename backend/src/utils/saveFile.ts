import multer from 'multer';
import generateUuid from './generateUuid';

export const storage = multer.diskStorage({
 destination: (req, file, cb) => {
  cb(null, 'uploads');
 },
 filename: (req, file, cb) => {
  const uniqueFilenameID = generateUuid();
  cb(null, uniqueFilenameID + '-' + file.originalname);
 },
});

export const upload = multer({ storage: storage }).array('file');
export const filepaths: string[] = [];
