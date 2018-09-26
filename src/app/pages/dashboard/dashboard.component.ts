import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { NotesResponse } from '../../models/NotesResponse';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private noteService: NoteService) {
  
  }

  ngOnInit() {
  }

}
