import { Component } from '@angular/core';
import { questionModel } from '../model/question.model';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {

  classList: {[key:string]: boolean} = {'active': false, 'visited': false, 'not-answered': false};
  /* 
    After getting question list from serverside add 3 fields to the each question object. i.e: 
    options.$.isSelcted: false
    isActive: false,
    isVisited: false

  */
  questionList: questionModel[];
  activeQuestionNo: number = 0;
  activeQuestion: questionModel;

  constructor(private _quizService: QuizService){
    this._quizService.fetchQuizData().subscribe(
      success => {
        this.questionList = success;
        this.activeQuestion = this.questionList[this.activeQuestionNo];
        this.questionList[this.activeQuestionNo].isActive = true;
        this.questionList[this.activeQuestionNo].isVisited = true;
      }
    );
  }

  fetchClass(question: questionModel) {
    this.classList.active = question.isActive;
    this.classList.visited = !question.isActive && question.isVisited;
    this.classList['not-answered'] = question.notAnswered;
    return this.classList;
  }
  onChangeHandler(selectedIndex: string) {
    const options = this.activeQuestion.options;
    const optionsFromList = this.questionList[this.activeQuestionNo].options;
    if(this.activeQuestion.Type == 'mulitple-choice') {
      for(const index in options) {
        optionsFromList[index].isSelected = options[index].isSelected = (index == selectedIndex)
      }
    } else if(this.activeQuestion.Type == 'mulitple-select') { 
      for(const index in options) {
        optionsFromList[index].isSelected = options[index].isSelected = selectedIndex.includes(index)
      }
    }

  }
  changeActiveQuestion(selectedQuestion: questionModel, selectedIndex: number) {
    this.activeQuestion = selectedQuestion;
    this.activeQuestionNo = selectedIndex;
    this.questionList[this.activeQuestionNo].isActive = true;
    this.questionList[selectedIndex].isVisited = true;

    this.questionList = this.questionList.map(question => {
      question.isActive = question.notAnswered = false;
      if(this.activeQuestion.slug == question.slug) {
        question.isActive = true;
      }
      const isAnswered = question.options.find(option => option.isSelected == true);
      if(this.activeQuestion.slug != question.slug && question.isVisited && !isAnswered) {
        question.notAnswered = true;
      }
      return question;
    })
  }
}