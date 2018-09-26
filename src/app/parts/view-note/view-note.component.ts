import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Note } from '../../models/Note';
import { NoteService } from '../../services/note.service';
import { MessageService } from 'primeng/api';
import { ServerResponse } from '../../models/ServerResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteResponse } from '../../models/NoteResponse';

@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.component.html',
  styleUrls: ['./view-note.component.css']
})
export class ViewNoteComponent implements OnInit {
  note: Note = new Note();
  @ViewChild('saveButton') saveButton: ElementRef;
  @ViewChild('deleteButton') deleteButton: ElementRef;


  constructor(private noteService: NoteService,
    private messageService: MessageService, private route: ActivatedRoute, private router: Router) {
    this.note.id = 0;
    this.note.note = 'Loading...';
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.note.id = params['id'];
      this.note.note = 'Loading...';
      this.noteService.getNote(params['id']).subscribe((noteResponse: NoteResponse) => {
        console.log(noteResponse);
        if (noteResponse.success) {
          this.note = noteResponse.notes;
        } else {
          this.router.navigate(['/dashboard']);
        }
      });
    });
  }

  toggleButtons(toggleValue: boolean) {
    this.saveButton.nativeElement.disabled = toggleValue;
    this.deleteButton.nativeElement.disabled = toggleValue;
  }

  saveNote(event: MouseEvent) {
    this.toggleButtons(true);
    const note: Note = new Note();
    note.id = this.note.id;
    note.note = this.note.note;
    try {
      this.noteService.editNote(note).subscribe((serverResponse: ServerResponse) => {
        if (serverResponse.success) {
          this.note.note = note.note;
          this.noteService.databaseChanged.next(true);
          this.messageService.add({ severity: 'success', summary: 'Successfully saved' });
        } else {
          this.messageService.add({ severity: 'info', summary: 'Could not save' });
        }
        this.toggleButtons(false);
      });
    } catch (error) {
      this.toggleButtons(false);
      this.messageService.add({ severity: 'error', summary: error.message });
    }
  }

  deleteNote(event: MouseEvent) {
    this.toggleButtons(true);
    const note: Note = new Note();
    note.id = this.note.id;
    note.note = this.note.note;
    try {
      this.noteService.deleteNote(note.id).subscribe((serverResponse: ServerResponse) => {
        if (serverResponse.success) {
          this.note.note = note.note;
          this.noteService.databaseChanged.next(true);
          this.messageService.add({ severity: 'success', summary: 'Successfully deleted' });
          this.router.navigate(['/dashboard']);
        } else {
          this.messageService.add({ severity: 'info', summary: 'Could not deleted' });
        }
        this.toggleButtons(false);
      });
    } catch (error) {
      this.toggleButtons(false);
      this.messageService.add({ severity: 'error', summary: error.message });
    }
  }

}
