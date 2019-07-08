import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.scss']
})
export class QuestionViewComponent implements OnInit {
  questionList: any[];
  tableHeaders: string[] = ['#', 'Topic', 'Question Type','Question Title', 'Action'];
  constructor(private _activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this._activatedRoute.data.subscribe(
      (params) => {
        this.questionList = params.questionList;
      }
    )
  }

}
