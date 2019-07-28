import { Component } from '@angular/core';

interface questionModel {
  question: string,
  options: {[key:string]: any}[],
  Title: string,
  slug: string,
  Type: string,
  isActive: boolean,
  isVisited: boolean,
  notAnswered: boolean
}

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
  questionList: questionModel[] = [{
    "options": [
        {
            "value": "Brian Lara",
            "isCorrect": false,
            "isSelected": false,
        },
        {
            "value": "Rohit Sharma",
            "isCorrect": true,
            "isSelected": false,
        },
        {
            "value": "Sachin Tendulkar",
            "isCorrect": false,
            "isSelected": false,
        },
        {
            "value": "Bikram Choudhury",
            "isCorrect": false,
            "isSelected": false,
        }
    ],
    "isActive": true,
    "isVisited": true,
    "notAnswered": false,
    "Title": "What is highest individual score by a batsman in Test Cricket ?",
    "slug": "what-is-highest-individual-score-by-a-batsman-in-test-cricket-",
    "Type": "mulitple-choice",
    "question": "<p>Stay up to date on the development of Bootstrap Table and reach out to the community with these helpful resources.<\/p><ul><li>Follow&nbsp;<a href=\"https://twitter.com/wenzhixin2010\">@wenzhixin2010 on Twitter<\/a>.<\/li><li>Read&nbsp;<a href=\"https://bootstrap-table.com/news\">The Official Bootstrap Table News<\/a>.<\/li><li>Implementation help may be found at Stack Overflow (tagged&nbsp;<a href=\"https://stackoverflow.com/questions/tagged/bootstrap-table\"><code>bootstrap-table<\/code><\/a>).<\/li><\/ul>"
  }, {
    "options": [
        {
            "value": "option 1",
            "isCorrect": false,
            "isSelected": false,
        },
        {
            "value": "option 2",
            "isCorrect": true,
            "isSelected": false,
        },
        {
            "value": "option 3",
            "isCorrect": false,
            "isSelected": false,
        },
        {
            "value": "option 4",
            "isCorrect": true,
            "isSelected": false,
        }
    ],
    "isActive": false,
    "isVisited": false,
    "notAnswered": false,
    "Title": "What is highest individual score by a batsman in ODI Cricket ?",
    "slug": "what-is-highest-individual-score-by-a-batsman-in-odi-cricket-",
    "Type": "mulitple-choice",
    "question": "<p>Stay up to date on the development of Bootstrap Table and reach out to the community with these helpful resources.<\/p><ul><li>Follow&nbsp;<a href=\"https://twitter.com/wenzhixin2010\">@wenzhixin2010 on Twitter<\/a>.<\/li><li>Read&nbsp;<a href=\"https://bootstrap-table.com/news\">The Official Bootstrap Table News<\/a>.<\/li><li>Implementation help may be found at Stack Overflow (tagged&nbsp;<a href=\"https://stackoverflow.com/questions/tagged/bootstrap-table\"><code>bootstrap-table<\/code><\/a>).<\/li><\/ul>"
  }, {
    "options": [
        {
            "value": "option 1",
            "isCorrect": false,
            "isSelected": false,
        },
        {
            "value": "option 2",
            "isCorrect": true,
            "isSelected": false,
        },
        {
            "value": "option 3",
            "isCorrect": false,
            "isSelected": false,
        },
        {
            "value": "option 4",
            "isCorrect": true,
            "isSelected": false,
        }
    ],
    "isActive": false,
    "isVisited": false,
    "notAnswered": false,
    "Title": "What is highest individual score by a batsman in T20 Cricket ?",
    "slug": "what-is-highest-individual-score-by-a-batsman-in-t20-cricket-",
    "Type": "mulitple-choice",
    "question": "<p>Stay up to date on the development of Bootstrap Table and reach out to the community with these helpful resources.<\/p><ul><li>Follow&nbsp;<a href=\"https://twitter.com/wenzhixin2010\">@wenzhixin2010 on Twitter<\/a>.<\/li><li>Read&nbsp;<a href=\"https://bootstrap-table.com/news\">The Official Bootstrap Table News<\/a>.<\/li><li>Implementation help may be found at Stack Overflow (tagged&nbsp;<a href=\"https://stackoverflow.com/questions/tagged/bootstrap-table\"><code>bootstrap-table<\/code><\/a>).<\/li><\/ul>"
  }];
  activeQuestionNo: string = '0';
  activeQuestion: questionModel = this.questionList[this.activeQuestionNo];

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
  changeActiveQuestion(selectedQuestion: questionModel, selectedIndex: string) {
    this.activeQuestion = selectedQuestion;
    this.activeQuestionNo = selectedIndex;
    // this.questionList[this.activeQuestionNo].isActive = true;

    this.questionList = this.questionList.map(question => {
      question.isActive = question.isVisited = question.notAnswered = false;
      if(this.activeQuestion.slug == question.slug) {
        question.isActive = true;
      }
      const isAnswered = question.options.find(option => option.isSelected == true);
      if(this.activeQuestion.slug != question.slug && isAnswered) {
        question.isVisited = true;
      }
      question.notAnswered = question.isVisited && !isAnswered;
      return question;
    })
  }
}