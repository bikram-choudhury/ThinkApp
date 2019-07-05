import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TopicService } from '../services/topic.service';
import { TopicModel } from '../model/topic.model';

@Component({
  selector: 'app-topic-master',
  templateUrl: './topic-master.component.html',
  styleUrls: ['./topic-master.component.scss']
})
export class TopicMasterComponent implements OnInit {
  topicName: string;
  topicList: TopicModel[];
  constructor(private _topicService: TopicService) { }
  ngOnInit() {
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

}
