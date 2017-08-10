package org.trvlport.Database.budget.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.trvlport.Database.budget.entity.Portfolio;
import org.trvlport.Database.budget.service.PortfolioService;

@RestController
public class PortfolioController {

	@Autowired
	PortfolioService budgetService;

	@RequestMapping(path = "/createBudget", method = RequestMethod.POST)
	Portfolio newBudget(@RequestBody Portfolio budget) {
		return budgetService.addNewBudget(budget);
	}
	@RequestMapping(path = "/createBudget/{peopleId}/{lastName}", method = RequestMethod.POST)
	Portfolio createBudget(@RequestBody Portfolio budget, @PathVariable("peopleId") long peopleId,
			@PathVariable("lastName") String lastName) {
		return budgetService.createBudget(budget, peopleId, lastName);
	}

	@RequestMapping(path = "/updateOwner/{portfolioName}/{peopleId}/{lastName}", method = RequestMethod.PUT)
	Portfolio updateOwner(@RequestBody Portfolio budget, @PathVariable("portfolioName") String portfolioName,
			@PathVariable("peopleId") long peopleId, @PathVariable("lastName") String lastName) {
		return budgetService.updateOwner(portfolioName, peopleId, lastName);
	}
}
