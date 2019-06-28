import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicMasterComponent } from './topic-master.component';

describe('TopicMasterComponent', () => {
  let component: TopicMasterComponent;
  let fixture: ComponentFixture<TopicMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
