package org.trvlport.Database.budget.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.trvlport.Database.budget.entity.Person;
import org.trvlport.Database.budget.service.PersonService;

@RestController
public class PersonController {

	@Autowired
	PersonService personService;

	@RequestMapping(path = "addPerson/{departmentId}/{rateId}", method = RequestMethod.POST)
	Person addPeople(@RequestBody Person people, @PathVariable("groupName") String groupName,
					 @PathVariable("rateName") String rateName) {
		
		return personService.createPeople(people, groupName, rateName);
	}
	
	@RequestMapping(path="updatePersonDepartment/{personId}/{departmentId}", method = RequestMethod.PUT)
	Person updateDepartment(@PathVariable("personId") long id,@PathVariable("departmentId") long departmentId){
		return personService.updateDepartmentForPerson(id, departmentId);
	}
	
	@RequestMapping(path="updatePersonRate/{personId}/{rateId}", method = RequestMethod.PUT)
	Person updateRate(@PathVariable("personId") long id, @PathVariable("rateId") long rateId) {
		return personService.updateRateForPerson(id, rateId);
	}
	
	
	
}
