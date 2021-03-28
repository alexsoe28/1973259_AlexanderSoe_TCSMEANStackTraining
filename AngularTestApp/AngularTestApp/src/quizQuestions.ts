import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Question } from "./question.model";

@Injectable()
export class QuizQuestions{
    constructor(public http:HttpClient){}

    loadQuizQuestions():Observable<Question[]> {
        return this.http.get<Question[]>("./assets/QuizQuestions.json");
    }
}