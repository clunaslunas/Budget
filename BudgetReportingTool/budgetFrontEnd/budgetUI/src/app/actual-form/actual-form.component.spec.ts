import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualFormComponent } from './actual-form.component';

describe('ActualFormComponent', () => {
  let component: ActualFormComponent;
  let fixture: ComponentFixture<ActualFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
