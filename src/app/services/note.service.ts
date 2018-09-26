import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Note } from '../models/Note';
import { Observable } from 'rxjs';
import { NotesResponse } from '../models/NotesResponse';
import { NoteResponse } from '../models/NoteResponse';
import { ServerResponse } from '../models/ServerResponse';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private baseUrl = 'http://localhost:3000';

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  constructor(private httpClient: HttpClient) { }

  getAllNotes(): Observable<NotesResponse> {
    return this.httpClient.get<NotesResponse>(this.baseUrl + '/notes', this.options);
  }
  getNote(noteId: number): Observable<NoteResponse> {
    return this.httpClient.get<NoteResponse>(this.baseUrl + '/notes/' + noteId, this.options);
  }

  editNote(note: Note): Observable<ServerResponse> {
    return this.httpClient.put<ServerResponse>(this.baseUrl + '/notes/' + note.id, note, this.options);
  }
  addNote(note: Note): Observable<ServerResponse> {
    return this.httpClient.post<ServerResponse>(this.baseUrl + '/notes', note, this.options);
  }

}
