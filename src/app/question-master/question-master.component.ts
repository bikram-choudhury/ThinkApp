import { Component, OnInit } from '@angular/core';
import { QuestionMasterService } from '../services/question-master.service';

@Component({
  selector: 'app-question-master',
  templateUrl: './question-master.component.html',
  styleUrls: ['./question-master.component.scss']
})
export class QuestionMasterComponent implements OnInit {
  questionType: string;
  topicList: string[] = ['Angular', 'React', 'Node', 'Javascript', 'Cricket', 'Footballs']
  selectedTopic: string = 'Topic';
  optionConfigs: any = [];
  questionModel: {[key: string]: any} = {
    topicName: 'Topic',
    qType: '',
    question: '',
    options: this.optionConfigs,
    subjectiveAnswer: ''
  };
  constructor(private _questionService: QuestionMasterService) { }

  ngOnInit() {
    this.createOptionHolder();
  }
  selectTopic(topic: string) {
    this.questionModel.topicName = topic.toLowerCase();
  }
  createOptionHolder() {
    for(let i=0; i<4; i++) {
      this.optionConfigs.push({value: '', isCorrect: false});
    } 
  }
  createQuestion() {
    const question = {...this.questionModel};
    if(question.qType == 'subjective'){
      delete question.options;
    } else if(question.qType == 'mulitple-choice') {
      delete question.subjectiveAnswer;
    }
    console.log(question);
    this._questionService.saveQuestion(question).subscribe(
      (success) => console.log("success: ", success),
      (error) => console.error("error: ", error),
      () => console.log("Finally")
    )
  }

}
