import { Component, OnInit, Input, NgZone, ElementRef, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Person } from '../entity/person';
import { PersonService } from '../services/person.service';
import { Department } from '../entity/department';
import { DepartmentService } from '../services/department.service';
import { RateService } from '../services/rate.service';
import { Rate } from '../entity/rate';
import { Type } from '../entity/type';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  errorMessage: string;
  changeDetected = false;
  personLength = 0;
  @Input() persons: Person[];
  department: Department;
  rate: Rate;
  newRate: any;
  newDepartment: any;
  isGreater = false;
  next = false;
  mode = 'Observable';
  delete=false;
  person: any;
  label: string;
  progress: number = 0;
  contenteditable: boolean=false;
  rates: any[];
  departments: any[];
  editable: boolean=false;
  rowToEdit: any;
  personEdit = new Person();
  type = Type;
  types: any[];
  mainForm: NgForm;

  constructor(private personService: PersonService, private departmentService: DepartmentService
              ,private rateService: RateService, private element: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.getPersons();
    this.setTypes();    
  }

  onSubmit(form: NgForm) {    
    this.resetForm(form);
  }

  reload(){
    console.log("Reloading");
    this.ngOnInit();    
    this.rowToEdit = "";
  }

  resetForm(form: NgForm) {
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

  setTypes() {
    this.types = [];    
    this.types.push(this.type[this.type.EMP].toString());
    this.types.push(this.type[this.type.Contractor].toString());
    console.log(this.types);    
  }

  getPersons() {
    this.next = false;
    this.personService.getPersons()
    .subscribe( persons => {
      this.persons = persons 
      this.personLength = this.persons.length; 
      console.log(this.personLength);
      let num = 0;
      let numTwo = 0;

      if(this.personLength > 18) {        
        this.isGreater = true;
        console.log(this.isGreater);
      }

      for(let peeps of persons) {
        let departmentLink = peeps._links.department.href;
        let rateLink = peeps._links.rate.href;
        this.departmentService.setDepartmentURL(departmentLink);
        this.rateService.setRateURL(rateLink);        
        this.departmentService.getDepartment().subscribe( department =>{    
        this.department = department
        this.persons[num].department = this.department
        //console.log(this.persons[num].department);                        
        num++;
        });    
        this.rateService.getRate().subscribe( rate => {   
          this.rate = rate;       
          this.persons[numTwo].rate = this.rate; 
          //console.log(numTwo);
          numTwo++;

        })        
      }      
    },            
      error => this.errorMessage = <any>error);
   
    // this.personService.getPersons().subscribe(
    //   persons => {
    //     for(let peeps of persons) {
    //       console.log(peeps);
    //     }
    //   }
    // )    
  }

  loadNext() {
    this.isGreater = false;
    this.next = true;

    this.personService.getNextPersons().subscribe( persons => {
      this.persons = persons 
      this.personLength = this.persons.length; 
      let num = 0;
      let numTwo = 0;
      for(let peeps of persons) {
        let departmentLink = peeps._links.department.href;
        let rateLink = peeps._links.rate.href;
        this.departmentService.setDepartmentURL(departmentLink);
        this.rateService.setRateURL(rateLink);        
        this.departmentService.getDepartment().subscribe( department =>{    
        this.department = department
        this.persons[num].department = this.department                            
        num++;
        });    
        this.rateService.getRate().subscribe( rate => {   
          this.rate = rate;       
          this.persons[numTwo].rate = this.rate;       
          numTwo++;

        })        
      }      
    },            
    error => this.errorMessage = <any>error);
  }
  testDelete(person: any) {
    console.log(person);
  }
  setDelete(){
    this.delete=true;
  }

  deleting(person: any) {
    this.personService.setPersonURL(person);
    this.personService.deletePerson().subscribe( person =>{
      console.log(person);
    });
  }

  deletePerson(form: NgForm){
    this.delete = false
    this.personService.setPersonURL(this.person);
    this.personService.deletePerson().subscribe(person =>{
      console.log(person);
    });
    form.reset();
  }

  editPerson(person, department, rate) {
    let personLink = person._links.self.href;
    this.editable = !this.editable;    
    let personDepartmentLink = person._links.department.href;
    console.log(personDepartmentLink);
    let personRateLink = person._links.rate.href;
    console.log(personRateLink);
    console.log(department);
    let departmentLink = department;
    console.log(rate);
    let rateLink = rate;
    this.personService.setPersonURL(personLink);
    this.personService.setDepartmentURL(personDepartmentLink);
    this.personService.setRateURL(personRateLink);
    this.personService.editPerson(this.personEdit);
    this.personService.putDepartment(departmentLink).subscribe( department => {
      console.log(person);
    });
    this.personService.putRate(rateLink).subscribe( person => {
      console.log(person);
    });         
  }

  toggleContentEditable(elem) {
    this.rowToEdit = elem;
    this.editable = !this.editable;
    this.renderer.setAttribute(elem, 'contenteditable', this.editable.toString());
    this.departmentService.getDepartments().subscribe( departments => {
      this.departments = departments;
    });
    this.rateService.getRates().subscribe( rates => {
      this.rates = rates;
    });
  }

  testing(elem ) {
    console.log(elem);
    this.rowToEdit = elem;
    this.editable = !this.editable;
    this.renderer.setAttribute(elem, 'contenteditable', this.editable.toString());      
  }
}