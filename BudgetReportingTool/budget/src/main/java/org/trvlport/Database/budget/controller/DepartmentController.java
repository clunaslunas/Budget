package org.trvlport.Database.budget.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.trvlport.Database.budget.entity.Department;
import org.trvlport.Database.budget.service.DepartmentService;

@RestController
public class DepartmentController {

	@Autowired
	DepartmentService departmentService;
	
	@RequestMapping(path="/addDepartment", method=RequestMethod.POST)
	Department addDepartment(@RequestBody Department department) {
		return departmentService.addDepartment(department);
	}
}
