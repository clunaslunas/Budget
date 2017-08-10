package org.trvlport.Database.budget.service;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.trvlport.Database.budget.entity.Actual;
import org.trvlport.Database.budget.entity.Project;
import org.trvlport.Database.budget.repo.ActualRepository;
import org.trvlport.Database.budget.repo.ProjectRepository;

@Component
public class ActualService {
	
	ActualRepository actualRepository;
	ProjectRepository projectRepository;

	@Autowired
	public ActualService(ActualRepository actualRepository, ProjectRepository projectRepository) {
		this.actualRepository = actualRepository;
		this.projectRepository = projectRepository;
	}
	
	public Actual createActual(Actual actual, String csr) {
		Optional<Actual> existingActual = actualRepository.findById(actual.getId());
		Project projectToAdd = projectRepository.findByCsr(csr);
		if(existingActual.isPresent()) {
			throw new RuntimeException("Actual already exists!");
		} else {
			actual.setProject(projectToAdd);
			actualRepository.save(actual);
		}
		return actual;
	}
	
	public Actual populate(long actualId) {
		Actual actualToPopulate = actualRepository.findOne(actualId);
		actualToPopulate.setTotal(actualToPopulate.getProject().getPortfolio().getAnnualBudget());
		actualRepository.save(actualToPopulate);
		return actualToPopulate;
	}
	
	public ArrayList<Actual> findAll() {
		return actualRepository.findAll();
	}
	
	
}
