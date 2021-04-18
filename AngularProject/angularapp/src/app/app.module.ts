import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ChildComponent} from './child.component';
import {Child1} from './child1.component';

@NgModule({
  declarations: [
    AppComponent,ChildComponent,Child1
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent,ChildComponent,Child1]
})
export class AppModule { }
