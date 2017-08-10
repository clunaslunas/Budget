package org.trvlport.Database.budget.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.trvlport.Database.budget.entity.Projection;
import org.trvlport.Database.budget.service.ProjectionService;

@RestController
public class ProjectionController {

	@Autowired
	ProjectionService projectionService;
	
	@RequestMapping(path="/addProjection/{csr}/{peopleId}", method = RequestMethod.POST)
	Projection addProjection (@RequestBody Projection projection, @PathVariable("csr") String csr, @PathVariable("peopleId") long id) {
		return projectionService.createProjection(projection, csr, id);
	}
}
