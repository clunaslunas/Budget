package org.trvlport.Database.budget.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.trvlport.Database.budget.entity.Rate;
import org.trvlport.Database.budget.service.RateService;

@RestController
public class RateController {
	
	@Autowired
	RateService rateService;
	
	@RequestMapping(path = "/addRate", method = RequestMethod.POST)
	Rate addRate(@RequestBody Rate rate) {
		return rateService.addRate(rate);
	}
}
