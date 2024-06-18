import multer from 'multer';
import express from 'express';

import { filepaths, upload } from '../../utils/saveFile';

const handleFileUpload = (req: express.Request, res: express.Response) => {
  upload(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    }

    if (Array.isArray(req.files)) {
      req.files.map((file: Express.Multer.File) => {
        filepaths.push(file.path);
      });
    }

    return res.status(200).send(req.files);
  });
};

export default handleFileUpload;
