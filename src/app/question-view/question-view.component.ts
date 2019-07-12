import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionMasterService } from '../services/question-master.service';

@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./question-view.component.scss']
})
export class QuestionViewComponent implements OnInit {
  questionList: any[];
  tableHeaders: string[] = ['#', 'Topic', 'Question Type', 'Question Title', 'Action'];
  closeResult: string;
  ModelContent: any;

  constructor(private _activatedRoute: ActivatedRoute, private modalService: NgbModal, private _questionService: QuestionMasterService) { }
  ngOnInit() {
    this._activatedRoute.data.subscribe(
      (params) => {
        this.questionList = params.questionList;
      }
    )
  }
  showQuestionContent(content, question) {
    this.ModelContent = question;
    this.modalService.open(content, { size: 'lg', backdrop: true, keyboard: false });
  }
  deleteQuestion(question_slug) {
    this._questionService.deleteQuestion(question_slug).subscribe(
      (response) => {
        this.questionList = this.questionList.filter(question => question.questionSlug != question_slug)
      }
    )
  }
}
