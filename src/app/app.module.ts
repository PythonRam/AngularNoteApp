import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {ToastModule} from 'primeng/toast';
import {CardModule} from 'primeng/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AllNotesComponent } from './parts/all-notes/all-notes.component';
import { AddNoteComponent } from './parts/add-note/add-note.component';
import { ViewNoteComponent } from './parts/view-note/view-note.component';
import { NoteService } from './services/note.service';
import { MessageService } from 'primeng/api';
import { AuthGuard } from './services/auth.guard';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AllNotesComponent,
    AddNoteComponent,
    ViewNoteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    InputTextareaModule,
    HttpClientModule,
    CardModule
  ],
  providers: [NoteService, MessageService, AuthGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
