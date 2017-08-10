import { Component, OnInit, ViewChild, AfterViewChecked, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../entity/department';
import { DepartmentService } from '../services/department.service';
import { DepartmentListComponent } from '../department-list/department-list.component';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {

  createDepartment: boolean=false;
  departmentModel = new Department();
  label: string;
  progress: number = 0;
  @ViewChild(DepartmentListComponent) viewChild: DepartmentListComponent;

  constructor(private departmentService: DepartmentService, ngZone: NgZone) { }

  ngOnInit() {
  }

  processWithinAngularZone() {
    this.label = 'inside';
    this.progress = 0;
    this._increaseProgress(() => this.reload());

  }

  _increaseProgress(doneCallback: () => void) {
    this.progress += 1;
    console.log(`Current progress: ${this.progress}%`);
 
    if (this.progress < 100) {
      window.setTimeout(() => this._increaseProgress(doneCallback)), 10;
    } else {
      doneCallback();
    }
  }

  onSubmit(form: NgForm) {
    this.departmentService.createDepartment(this.departmentModel).subscribe(department =>
    {
      console.log(department);
    });
    this.resetForm(form);
    this.createDepartment = false;
  }

  newDepartment() {
    this.createDepartment = !this.createDepartment;
    console.log(this.createDepartment);
  }

  resetForm(form: NgForm) {
    form.reset();
  }

  reload() {    
    this.viewChild.reload();      
  }

}
