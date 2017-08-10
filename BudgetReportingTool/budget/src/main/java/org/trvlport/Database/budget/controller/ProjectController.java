package org.trvlport.Database.budget.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.trvlport.Database.budget.entity.Project;
import org.trvlport.Database.budget.service.ProjectService;

@RestController
public class ProjectController {
	
	@Autowired
	ProjectService projectService;
	
	@RequestMapping(path = "/createProject/{portfolioName}", method = RequestMethod.POST)
	Project createProject(@RequestBody Project project, @PathVariable("portfolioName") String portfolioName) {
		return projectService.createProject(project, portfolioName);
	}
	@RequestMapping(path = "/addProject", method = RequestMethod.POST)
	Project addProject(@RequestBody Project project) {
		return projectService.addProject(project);
	}
}
