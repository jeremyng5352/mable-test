import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateNodeComponent } from '../components/create-node/create-node.component';
import { FormsModule } from '@angular/forms';
import { NodeComponent } from '../components/node/node.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent, CreateNodeComponent, NodeComponent
  ],
  imports: [
    CommonModule, BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
