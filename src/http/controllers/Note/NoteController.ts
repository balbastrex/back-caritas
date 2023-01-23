import { Request, Response } from 'express';
import { Note } from '../../../entities/Note';
import { NoteResource } from './NoteResource';

export const NoteShow = async (request: Request, response: Response) => {
  const note = await Note.findOne(response.locals.findQuery);

  if (!note) {
    return response.status(404).json({ message: 'Note not found.' });
  }

  const noteResource = new NoteResource(note);

  return response.status(200).json(noteResource);
};

export const NoteDelete = async (request: Request, response: Response) => {
  const note = await Note.findOne(response.locals.findQuery);
  const noteId = note.id;

  if (!note) {
    return response.status(404).json({ message: 'Note not found.' });
  }

  await note.remove();

  return response.status(200).json({ id: noteId });
};

export const NoteUpdate = async (request: Request, response: Response) => {
  const note = await Note.findOne(response.locals.findQuery);

  if (!note) {
    return response.status(404).json({ message: 'Note not found.' });
  }

  await fillAndSaveNote(note, request);

  return response.status(200).json({ id: note.id });
};

export const NoteStore = async (request: Request, response: Response) => {
  const note = new Note();
  note.beneficiaryId = request.body.beneficiaryId;

  await fillAndSaveNote(note, request);

  return response.status(200).json({ id: note.id });
};

async function fillAndSaveNote(note: Note, request: Request) {
  note.description = request.body.description;
  note.created = new Date();
  note.updated = new Date();
  await note.save();
}
