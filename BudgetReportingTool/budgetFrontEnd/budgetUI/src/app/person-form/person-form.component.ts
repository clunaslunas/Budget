import { Component, OnInit, Input, ViewChild, AfterViewChecked} from '@angular/core';
import {NgForm} from '@angular/forms';
import { Person } from '../entity/person';
import { Rate } from '../entity/rate';
import { Department } from '../entity/department';
import { Type } from '../entity/type';
import { PersonService } from '../services/person.service';
import { DepartmentService } from '../services/department.service';
import { RateService } from '../services/rate.service';
import { PersonListComponent } from '../person-list/person-list.component';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  rates: any[];
  departments: any[];
  departmentLink: string;
  department;
  rate;
  rateLink: string;
  model = new Person();
  created = false;
  personRateLink;
  personDepartmentLink;
  rateSet = false;
  departmentSet = false;
  type = Type;
  types: any[];
  new = false;
  @ViewChild(PersonListComponent) viewChild: PersonListComponent;

  constructor(private personService: PersonService, private rateService: RateService, private departmentService: DepartmentService) { }

  ngOnInit() {
    this.getDepartments();
    this.getRates();
    this.setTypes();
  }

  newPerson() {
    this.new = true;
  }

  onSubmit(form: NgForm) {
    console.log(this.model);
    this.personService.createPerson(this.model).subscribe(person => {
      console.log(person._links.self.href);
      this.personRateLink = person._links.rate.href;      
      this.personDepartmentLink = person._links.department.href;
    });
    this.created = true;
    form.resetForm();
    this.reloadPersonList();    
  }

  getRates() {
    this.rateService.getRates().subscribe(rates =>{
       this.rates = rates;
       console.log(this.rates);
    });
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe(departments => console.log(departments));
    this.departmentService.getDepartments().subscribe(departments => this.departments = departments);
  }

  setTypes() {
    this.types = [];    
    this.types.push(this.type[this.type.EMP].toString());
    this.types.push(this.type[this.type.Contractor].toString());
    console.log(this.types);    
  }

  setDepartment(form: NgForm){
    this.departmentLink = this.department;
    this.personService.setDepartmentURL(this.personDepartmentLink);
    this.personService.putDepartment(this.departmentLink).subscribe(person => console.log(person));
    this.departmentSet = true;
    form.resetForm();   
    this.reloadPersonList();     
  }

  setRate(form: NgForm){
    this.rateLink = this.rate;
    this.personService.setRateURL(this.personRateLink);
    this.personService.putRate(this.rateLink).subscribe(person => console.log(person));
    this.rateSet = true;
    form.resetForm();  
    this.reloadPersonList();    
  }
  
  reloadPersonList(){
    console.log("Person: " + this.created + "rate: " + this.rateSet + "department: " + this.departmentSet);
    if(this.created === true && this.rateSet === true && this.departmentSet === true) {
      console.log("All three are true!");
      this.viewChild.reload();
      this.created = false;
      this.new = false;
    } else {
      console.log("Not yet....");
    }
  }
  getDiagnostic() { return JSON.stringify(this.model); }

}
