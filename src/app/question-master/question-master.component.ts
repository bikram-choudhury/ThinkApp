import { Component, OnInit } from '@angular/core';
import { QuestionMasterService } from '../services/question-master.service';
import { TopicService } from '../services/topic.service';
import { TopicModel } from '../model/topic.model';
declare var $:any;

@Component({
  selector: 'app-question-master',
  templateUrl: './question-master.component.html',
  styleUrls: ['./question-master.component.scss']
})
export class QuestionMasterComponent implements OnInit {
  questionType: string;
  topicList: TopicModel[];
  topicName: string = 'Topic';
  selectedTopic: string = 'Topic';
  optionConfigs: any = [];
  questionModel: {[key: string]: any} = {
    questionTitle: '',
    topicSlug: '',
    qType: '',
    question: '',
    options: this.optionConfigs,
    subjectiveAnswer: ''
  };
  options: Object = {
    placeholderText: 'Edit Your Content Here!',
    toolbarButtons: ['undo', 'redo', '|', 'bold', 'italic', 'underline', '|',
      'align', 'formatOL', 'formatUL', 'outdent', 'indent', '|',
      'insertLink', 'paragraphFormat', 'html', 'clearFormatting', 'fullscreen'
    ],
    toolbarButtonsXS: ['undo', 'redo', '|', 'bold', 'italic', 'underline', '|',
      'align', 'formatOL', 'formatUL', 'outdent', 'indent', '|',
      'insertLink', 'clearFormatting'
    ],
    toolbarButtonsSM: ['undo', 'redo', '|', 'bold', 'italic', 'underline', '|',
      'align', 'formatOL', 'formatUL', 'outdent', 'indent', '|',
      'insertLink', 'clearFormatting'
    ],
    toolbarButtonsMD: ['undo', 'redo', '|', 'bold', 'italic', 'underline', '|',
      'align', 'formatOL', 'formatUL', 'outdent', 'indent', '|',
      'insertLink', 'paragraphFormat', 'clearFormatting'
    ],

    heightMin: 200,
    heightMax: 250
  };
  constructor(private _questionService: QuestionMasterService, private _topicService: TopicService) { }

  ngOnInit() {
    this._topicService.fetchTopics().subscribe(
      (topicList => this.topicList = topicList)
    )
    this.createOptionHolder();
  }
  selectTopic(tpSlug: string) {
    this.questionModel.topicSlug = tpSlug;
    const topic = this.topicList.find(topic=>topic.slug===tpSlug);
    this.topicName = topic && topic.name || 'Topic';
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
    this._questionService.saveQuestion(question).subscribe(
      (success) => console.log("success: ", success),
      (error) => console.error("error: ", error),
      () => console.log("Finally")
    )
  }

}
