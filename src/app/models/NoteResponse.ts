import { Note } from './Note';
import { ServerResponse } from './ServerResponse';

export class NoteResponse extends ServerResponse {
    public notes: Note;
}
