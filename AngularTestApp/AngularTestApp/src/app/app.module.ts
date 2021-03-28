import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { QuizQuestions } from 'src/quizQuestions';
import { QuizComponent } from './quiz/quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule,
  ],
  providers: [QuizQuestions],
  bootstrap: [AppComponent]
})
export class AppModule { }
