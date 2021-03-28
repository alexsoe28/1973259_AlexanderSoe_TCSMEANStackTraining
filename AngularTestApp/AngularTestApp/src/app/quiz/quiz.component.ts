import { Component, OnInit } from '@angular/core';
import { QuizQuestions } from 'src/quizQuestions';
import { Question } from "src/question.model";
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  questionsArray:Array<Question>=[];
  correctAnswers:Array<Number>=[];
  fractionCorrect:String = "";
  totalCorrect:Number = 0;
  constructor(public service:QuizQuestions) { }

  ngOnInit(): void {
    this.callQuizQuestions();
  }

  findCorrectAnswers(){
    for(let i = 0; i < this.questionsArray.length; i++){
      this.correctAnswers.push(this.questionsArray[i].CorrectAnswer);
    }
    console.log(this.correctAnswers); 
  }

  callQuizQuestions(){
    this.service.loadQuizQuestions().subscribe(data=>this.questionsArray=data);
  }
  onQuizSubmit(userAnswers:any){
    this.findCorrectAnswers();
    let numCorrect = 0;
    for(let i = 1; i < this.questionsArray.length + 1; i++){
      let selectedAnswer = userAnswers.value[i];
      if(selectedAnswer == this.correctAnswers[i - 1]){
        numCorrect += 1;
      }
    }
    this.fractionCorrect = numCorrect + "/10";
  }
}
