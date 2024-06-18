import router from '../../router/app.router';
import handleFileUpload from './uploads.service';

export const uploadFilesRoute = router.post('/upload', (req, res) => {
 handleFileUpload(req, res);
});

export default uploadFilesRoute;
