package org.trvlport.Database.budget.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.trvlport.Database.budget.entity.Department;
import org.trvlport.Database.budget.repo.DepartmentRepository;

@Component
public class DepartmentService {

	DepartmentRepository departmentRepsository;
	
	@Autowired
	DepartmentService(DepartmentRepository departmentRepository) {
		this.departmentRepsository = departmentRepository;
	}
	
	public Department addDepartment(Department department) {
		Department existingDepartment = departmentRepsository.findByName(department.getName());
		if(existingDepartment != null) {
			throw new RuntimeException("Department already exists!");
		} else {
			departmentRepsository.save(department);
		}
		return department;
	}
}
