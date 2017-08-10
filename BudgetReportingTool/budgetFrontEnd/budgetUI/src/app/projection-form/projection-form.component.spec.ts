import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionFormComponent } from './projection-form.component';

describe('ProjectionFormComponent', () => {
  let component: ProjectionFormComponent;
  let fixture: ComponentFixture<ProjectionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
