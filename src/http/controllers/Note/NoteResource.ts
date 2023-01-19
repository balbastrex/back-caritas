import { Note } from '../../../entities/Note';

export class NoteResource {
  id: number;
  description: string;
  constructor(note: Note) {
    this.id = note.id;
    this.description = note.description;
  }
}
