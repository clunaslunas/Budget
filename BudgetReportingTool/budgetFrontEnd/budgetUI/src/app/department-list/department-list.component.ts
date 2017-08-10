import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Restangular } from 'ngx-restangular';
import { Department } from '../entity/department';
import { Observable } from 'rxjs/Observable';
import { DepartmentService } from '../services/department.service';
import { ProcessZoneService } from '../services/process-zone.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {

  allDepartments;
  departments;
  department;
  extractedData;
  private subscribers;
  public departmentList;
  delete = false;
  label: string;
  progress: number = 0;
  rowToEdit: any;
  editable: boolean=false;
  departmentToEdit = new Department();

  constructor(private departmentService: DepartmentService, private renderer: Renderer2) {
   }

  ngOnInit() {
    this.getDepartments();
  }

  onSubmit(form: NgForm) {
    form.reset();
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

  reload() {
    this.getDepartments();
    console.log("Reloaded");
  }

  getDepartments(){
    this.subscribers = this.departmentService.getDepartments().subscribe(departments => {
      this.departmentList = departments;
      console.log(this.departmentList);
    });
  }

  ngOnDestroy() {    
   this.subscribers.unsubscribe();
  }

  editDepartment(department) {
    let departmentLink = department._links.self.href;
    this.editable = !this.editable;
    this.rowToEdit = "";
    this.departmentService.setDepartmentURL(departmentLink);
    this.departmentService.editDepartment(this.departmentToEdit);

  }

  deleteDepartment(department: any) {
    this.departmentService.setDepartmentURL(department);
    this.departmentService.deleteDepartment();    

    //TODO: if department is associated with a person do not allow delete!!
  }

  setDelete() {
    this.delete = true;
  }

  toggleContentEditable(elem) {
    this.rowToEdit = elem;
    this.toggleEditable();
    this.renderer.setAttribute(elem, 'contenteditable', this.editable.toString());
  }

  resetForm(form: NgForm) {
    form.reset();
  }

  toggleEditable(){
    this.editable = !this.editable;
  }
}
