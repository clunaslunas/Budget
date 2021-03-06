import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionListComponent } from './projection-list.component';

describe('ProjectionListComponent', () => {
  let component: ProjectionListComponent;
  let fixture: ComponentFixture<ProjectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
