package org.trvlport.Database.budget.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.trvlport.Database.budget.entity.Actual;
import org.trvlport.Database.budget.service.ActualService;

@RestController
public class ActualController {

	@Autowired
	ActualService actualService;
	
	@RequestMapping(path="/addActual/{csr}", method = RequestMethod.POST) 
	public Actual addActual(@RequestBody Actual actual, @PathVariable("csr") String csr) {
		return actualService.createActual(actual, csr);
	}
	
	@RequestMapping(path="/populate/{actualId}", method = RequestMethod.POST)
	public Actual populate(@PathVariable("actualId") long actualId) {
		return actualService.populate(actualId);
	}
}
