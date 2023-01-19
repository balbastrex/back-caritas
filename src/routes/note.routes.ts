import { Router } from 'express';
import { NoteShow, NoteStore, NoteUpdate } from '../http/controllers/Note/NoteController';

const router = Router();

router.get('/api/v1/note/:id', NoteShow);
router.put('/api/v1/note/:id', NoteUpdate);
router.post('/api/v1/note', NoteStore);


export default router;
