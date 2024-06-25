import router from '../../router/app.router';
import { generateNote, generateNoteTest } from './aiNote.service';

export const aiNoteRoute = router.post('/generate-note', (req, res) => {
 // const generated = generateNoteTest(req, res);
 generateNote(req, res);
});

export default aiNoteRoute;
