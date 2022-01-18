import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateNodeComponent } from '../components/create-node/create-node.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent, CreateNodeComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent, CreateNodeComponent]
})
export class AppModule { }
