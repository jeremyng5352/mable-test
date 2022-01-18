import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateNodeComponent } from '../components/create-node/create-node.component';
import { FormsModule } from '@angular/forms';
import { NodeComponent } from '../components/node/node.component';
import { CommonModule } from '@angular/common';
import { NodeConnectorComponent } from '../components/node-connector/node-connector.component';

@NgModule({
  declarations: [
    AppComponent, CreateNodeComponent, NodeComponent, NodeConnectorComponent
  ],
  imports: [
    CommonModule, BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
