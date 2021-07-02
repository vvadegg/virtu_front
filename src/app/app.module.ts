import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AppComponent }   from './app.component';
import { DocComponent }   from './component/doc.component';
import { DocFormComponent }   from './component/docform.component';
import { HttpClientModule }   from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpClientModule, BrowserAnimationsModule, BsDatepickerModule.forRoot(), ReactiveFormsModule ],
    declarations: [ AppComponent, DocComponent, DocFormComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }