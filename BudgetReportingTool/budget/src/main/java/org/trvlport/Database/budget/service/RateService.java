package org.trvlport.Database.budget.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.trvlport.Database.budget.entity.Rate;
import org.trvlport.Database.budget.repo.RateRepository;

@Component
public class RateService {
	
	RateRepository rateRepository;
	
	@Autowired
	RateService(RateRepository rateRepository) {
		this.rateRepository = rateRepository;
	}
	
	public Rate addRate(Rate rate) {
		Optional<Rate> existingRate = rateRepository.findById(rate.getId());
		if(existingRate.isPresent()) {
			throw new RuntimeException("Rate already exists!");
		} else {
			rateRepository.save(rate);
		}
		return rate;
	}
}
