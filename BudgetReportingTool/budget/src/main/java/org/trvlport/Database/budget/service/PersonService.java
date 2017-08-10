package org.trvlport.Database.budget.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.trvlport.Database.budget.entity.Department;
import org.trvlport.Database.budget.entity.Person;
import org.trvlport.Database.budget.entity.Rate;
import org.trvlport.Database.budget.repo.DepartmentRepository;
import org.trvlport.Database.budget.repo.PersonRepository;
import org.trvlport.Database.budget.repo.RateRepository;

@Component
public class PersonService {

	PersonRepository personRepository;
	DepartmentRepository departmentRepository;
	RateRepository rateRepository;
	
	@Autowired
	PersonService(PersonRepository peopleRepository, DepartmentRepository departmentRepository
					,RateRepository rateRepository) {
		this.personRepository = peopleRepository;
		this.departmentRepository = departmentRepository;
		this.rateRepository = rateRepository;
	}
	
	public Person createPeople(Person people, String groupName, String rateName) {
		Department departmentToAdd = departmentRepository.findByName(groupName);
		Rate rateToAdd = rateRepository.findByName(rateName);
		Optional<Person> existingPeople = personRepository.findById(people.getId());
		if(existingPeople.isPresent()) {
			throw new RuntimeException("This person already exists!");
		} else {
			people.setDepartment(departmentToAdd);
			people.setRate(rateToAdd);
			personRepository.save(people);
		}
		return people;
	}
	
	public Person updateDepartmentForPerson(long personId, long departmentId) {
		Person person = personRepository.findOne(personId);
		Department department = departmentRepository.findOne(departmentId);
		person.setDepartment(department);
		personRepository.save(person);
		return person;		
	}
	
	public Person updateRateForPerson(long personId, long rateId) {
		Person person = personRepository.findOne(personId);
		Rate rate = rateRepository.findOne(rateId);
		person.setRate(rate);
		personRepository.save(person);
		return person;
	}
}
