import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TopicService } from '../services/topic.service';
import { TopicModel } from '../model/topic.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-topic-master',
  templateUrl: './topic-master.component.html',
  styleUrls: ['./topic-master.component.scss']
})
export class TopicMasterComponent implements OnInit {
  topicName: string;
  topicList: TopicModel[];
  constructor(private _topicService: TopicService, private _activatedRoute: ActivatedRoute, private _route: Router) { }
  ngOnInit() {
    this._activatedRoute.params.subscribe(
      param => console.log(param)
    )
    this._activatedRoute.queryParams.subscribe(
      param => console.log(param)
    )
    this._activatedRoute.data.subscribe(
      param => console.log(param)
    )
    this._topicService.fetchTopics().subscribe(
      (response: TopicModel[]) => {
        this.topicList = response;
      },
      (error) => console.log(error),
      () => console.log("Finally block")
    )
  }
  addTopic() {
    this._topicService.saveTopic(this.topicName).subscribe(
      (response) => {
        response && Object.keys(response).length && this.topicList.push(response);
        this.topicName = '';
      },
      (error) => console.log(error),
      () => console.log("Finally block")
    )
  }
  deleteTopic(topic_slug: string) {
    this._topicService.deleteTopic(topic_slug).subscribe(
      (response) => {
        this.topicList = this.topicList.filter(topic => topic.slug != topic_slug)
      }
    )
  }
  editTopic(topic_slug: string) {
    this._route.navigate(['topics', topic_slug]);
  }

}
