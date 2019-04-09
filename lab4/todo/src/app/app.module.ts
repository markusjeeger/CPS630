import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { NgModule } 	 from '@angular/core';
import { FileDropModule } from 'ngx-file-drop';

import { AppComponent } from './app.component';
import { TaskFormComponent } from './task-form///task-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskFormComponent,
  ],
  imports: [
    BrowserModule,
	FormsModule,
	FileDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
