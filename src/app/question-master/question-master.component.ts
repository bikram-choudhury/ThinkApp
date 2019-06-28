import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-master',
  templateUrl: './question-master.component.html',
  styleUrls: ['./question-master.component.scss']
})
export class QuestionMasterComponent implements OnInit {
  questionType: string;
  choiceLength: any[] = new Array(4);
  topicList: string[] = ['Angular', 'React', 'Node', 'Javascript', 'Cricket', 'Footballs']
  selectedTopic: string = 'Topic';
  questionModel: {[key: string]: string} = {
    topicName: '',
    qType: '',
    question: ''
  };
  constructor() { }

  ngOnInit() {
  }
  selectTopic(topic: string) {
    this.selectedTopic = topic.toLowerCase();
  }
  submit() {
    console.log(this.questionModel);
  }

}
