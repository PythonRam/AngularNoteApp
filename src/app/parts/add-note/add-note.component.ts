import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/Note';
import { ServerResponse } from '../../models/ServerResponse';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {
  noteValue: string;
  @ViewChild('addButton') addButton: ElementRef;

  constructor(private noteService: NoteService, private messageService: MessageService) { }

  ngOnInit() {
  }

  addNote(event: MouseEvent) {
    this.addButton.nativeElement.disabled = true;
    const note: Note = new Note();
    note.id = (new Date).getTime();
    note.note = this.noteValue;
    try {
      this.noteService.addNote(note).subscribe((serverResponse: ServerResponse) => {
        if (serverResponse.success) {
          this.noteValue = '';
          this.noteService.databaseChanged.next(true);
          this.messageService.add({ severity: 'success', summary: 'Successfully added'});
        } else {
          this.messageService.add({ severity: 'info', summary: 'Could not add' });
        }
        this.addButton.nativeElement.disabled = false;
      });
    } catch (error) {
      this.addButton.nativeElement.disabled = false;
      this.messageService.add({ severity: 'error', summary: error.message });
    }
  }

}
