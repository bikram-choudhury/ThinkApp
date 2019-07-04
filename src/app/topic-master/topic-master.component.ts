import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TopicService } from '../services/topic.service';

@Component({
  selector: 'app-topic-master',
  templateUrl: './topic-master.component.html',
  styleUrls: ['./topic-master.component.scss']
})
export class TopicMasterComponent implements OnInit {
  topicName: string;
  constructor(private _topicService: TopicService) { }
  ngOnInit() {
    this._topicService.fetchTopics().subscribe(
      (response) => console.log(response),
      (error) => console.log(error),
      () => console.log("Finally block")
    )
  }
  addTopic() {
    this._topicService.saveTopic(this.topicName).subscribe(
      (response) => console.log(response),
      (error) => console.log(error),
      () => console.log("Finally block")
    )
  }

}
