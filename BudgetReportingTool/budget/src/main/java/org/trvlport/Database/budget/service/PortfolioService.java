package org.trvlport.Database.budget.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.trvlport.Database.budget.entity.Portfolio;
import org.trvlport.Database.budget.entity.Person;
import org.trvlport.Database.budget.repo.PortfolioRepository;
import org.trvlport.Database.budget.repo.PersonRepository;

@Component
public class PortfolioService {
	
	PortfolioRepository portfolioRepository;
	PersonRepository peopleRepository;
	
	@Autowired
	PortfolioService(PortfolioRepository portfolioRepository, PersonRepository peopleRepository){
		this.portfolioRepository = portfolioRepository;
		this.peopleRepository = peopleRepository;
	}
	
	public Portfolio addNewBudget(Portfolio portfolio) {
		Optional<Portfolio> existingPortfolio = portfolioRepository.findById(portfolio.getId());
		if(existingPortfolio.isPresent()) {
			throw new RuntimeException("Budget already exists!");
		} else {
			portfolioRepository.save(portfolio);
		}
		return portfolio;
	}
	public Portfolio createBudget(Portfolio portfolio, long peopleId, String lastName){
		Optional<Portfolio> existingBudget = portfolioRepository.findById(portfolio.getId());
		if(existingBudget.isPresent()) {
			throw new RuntimeException("This budget already exists!");
		} else {
			portfolioRepository.save(portfolio);
		}
		return portfolio;
	}
	
	public Portfolio updateOwner(String portfolioName, long peopleId, String lastName) {
		Portfolio portfolioToUpdate = portfolioRepository.findByPortfolioName(portfolioName);
		if(portfolioToUpdate == null) {
			throw new RuntimeException("Either the budget doesn't exist or the person doesn't exist!");
		} else {
			portfolioRepository.save(portfolioToUpdate);
		}
		return portfolioToUpdate;
	}
	
	public List<Portfolio> findAll() {
		return portfolioRepository.findAll();
	}
	
}
