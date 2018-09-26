import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { NotesResponse } from '../../models/NotesResponse';
import { Note } from '../../models/Note';

@Component({
  selector: 'app-all-notes',
  templateUrl: './all-notes.component.html',
  styleUrls: ['./all-notes.component.css']
})
export class AllNotesComponent implements OnInit {
  notes: Note[];
  constructor(private noteService: NoteService) {
    this.noteService.databaseChanged.subscribe((changed: boolean) => {
      if (changed) { this.refreshList(); }
    });
  }

  refreshList() {
    this.noteService.getAllNotes().subscribe((notesReponse: NotesResponse) => {
      if (notesReponse.success) {
        this.notes = notesReponse.notes;
      } else {
        this.notes = null;
      }
    });
  }

  ngOnInit() {
    this.refreshList();
  }

}
