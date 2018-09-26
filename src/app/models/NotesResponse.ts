import { Note } from './Note';
import { ServerResponse } from './ServerResponse';

export class NotesResponse extends ServerResponse {
    public notes: Note[];
}
