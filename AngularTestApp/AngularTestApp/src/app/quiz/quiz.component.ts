import { Component, OnInit } from '@angular/core';
import { QuizQuestions } from 'src/quizQuestions';
import { Question } from "src/question.model";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  correctResponseMsg:string="Correct Answer";
  incorrectResponseMsgs:Array<String>=[];
  submitted:boolean=false;
  selectedAnswers:Array<Number>=[];
  questionsArray:Array<Question>=[];
  correctAnswers:Array<Number>=[];
  fractionPass:String = "";
  fractionFail:String = "";
  totalCorrect:Number = 0;
  showQuizBreakdown:boolean = false;
  constructor(public service:QuizQuestions) { }

  ngOnInit(): void {
    this.callQuizQuestions();
  }

  findCorrectAnswers(){
    for(let i = 0; i < this.questionsArray.length; i++){
      this.correctAnswers.push(this.questionsArray[i].CorrectAnswer);
    }
  }

  callQuizQuestions(){
    this.service.loadQuizQuestions().subscribe(data=>this.questionsArray=data);
  }

  onQuizSubmit(userAnswers:any){
    this.findCorrectAnswers();
    let numCorrect = 0;
    for(let i = 1; i < this.questionsArray.length + 1; i++){
      let selectedAnswer = userAnswers.value[i];
      this.selectedAnswers.push(selectedAnswer);
      if(selectedAnswer == this.correctAnswers[i - 1]){
        numCorrect += 1;
        this.incorrectResponseMsgs.push(" ");
      }
      else{
        if(selectedAnswer){
          this.incorrectResponseMsgs.push("For Question " + i + " your selected answer: " + selectedAnswer + " is incorrect");
        }
        else{
          this.incorrectResponseMsgs.push("For Question " + i + " you did not select an answer.");
        }
      }
    }
    this.submitted = true;
    if(numCorrect>7){
      this.fractionPass = "Result: " + numCorrect + "/10: Pass!";
    }
    else{
      this.fractionFail = "Result: " + numCorrect + "/10: Fail!";
    }
  }
  quizBreakdown(){
    this.showQuizBreakdown = true;
  }
}
